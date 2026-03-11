# Plan technique : Security Review

> Spec : 003-security-review-2026-03-11
> Stack : Next.js 16 App Router + Convex + Stripe + Convex Auth

---

## Vue d'ensemble

Audit de sécurité complet du projet Golden Defla. 10 vulnérabilités critiques ou majeures identifiées. Ce document liste chaque problème, son niveau de risque, et le fix copy-paste prêt à appliquer.

---

## CRITIQUE 🔴

### 1. Convex mutations sans auth — Accès public complet (IDOR)

**Fichiers** : `convex/orders.ts`, `convex/products.ts`, `convex/users.ts`

**Problème** : Toutes les mutations critiques sont publiques. N'importe qui peut :

- Créer des commandes avec n'importe quel `userId`
- Modifier/supprimer des produits (`products.create`, `products.update`, `products.remove`)
- Changer le statut d'une commande (`orders.updateStatus`)
- Promouvoir n'importe quel utilisateur en admin (`users.makeAdmin`, `users.updateRole`)
- Lire toutes les commandes de tous les utilisateurs (`orders.listAll`, `orders.listByUser`)

**Fix — `convex/orders.ts`** :

```typescript
import { mutation, query } from './_generated/server';
import { v } from 'convex/values';
import { Id } from './_generated/dataModel';

// Helper: récupère l'utilisateur authentifié ou lève une erreur
async function requireAuth(ctx: {
  auth: { getUserIdentity: () => Promise<{ subject: string } | null> };
}) {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) throw new Error('Unauthorized');
  const userId = identity.subject.split('|')[0] as Id<'users'>;
  return userId;
}

async function requireAdmin(ctx: any) {
  const userId = await requireAuth(ctx);
  const user = await ctx.db.get(userId);
  if (!user || user.role !== 'admin') throw new Error('Forbidden');
  return user;
}

// orders.create : côté serveur seulement (appelé depuis webhook/checkout route)
// → Pas de changement ici, la route /api/checkout valide via Stripe

// orders.listByUser : l'utilisateur ne peut voir QUE ses propres commandes
export const listByUser = query({
  args: {},
  handler: async (ctx) => {
    const userId = await requireAuth(ctx);
    return await ctx.db
      .query('orders')
      .withIndex('by_user', (q) => q.eq('userId', userId))
      .order('desc')
      .collect();
  },
});

// orders.getById : l'utilisateur ne peut voir que sa propre commande
export const getById = query({
  args: { id: v.id('orders') },
  handler: async (ctx, args) => {
    const userId = await requireAuth(ctx);
    const order = await ctx.db.get(args.id);
    if (!order) return null;
    if (order.userId !== userId) throw new Error('Forbidden');
    return order;
  },
});

// orders.listAll : admin seulement
export const listAll = query({
  args: {},
  handler: async (ctx) => {
    await requireAdmin(ctx);
    return await ctx.db.query('orders').order('desc').collect();
  },
});

// orders.updateStatus : admin seulement
export const updateStatus = mutation({
  args: {
    id: v.id('orders'),
    status: v.union(
      v.literal('pending'),
      v.literal('paid'),
      v.literal('shipped'),
      v.literal('delivered'),
      v.literal('cancelled')
    ),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    await ctx.db.patch(args.id, { status: args.status });
  },
});
```

**Fix — `convex/products.ts`** : ajouter `requireAdmin` sur `create`, `update`, `remove`, `updateImagesBySlug` :

```typescript
export const create = mutation({
  args: productFields,
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    return await ctx.db.insert('products', args);
  },
});

export const update = mutation({
  args: { id: v.id('products'), ...productFields },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    const { id, ...fields } = args;
    await ctx.db.replace(id, fields);
  },
});

export const remove = mutation({
  args: { id: v.id('products') },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    await ctx.db.delete(args.id);
  },
});
```

**Fix — `convex/users.ts`** : `updateRole` et `makeAdmin` doivent exiger un admin existant :

```typescript
export const updateRole = mutation({
  args: {
    userId: v.id('users'),
    role: v.union(v.literal('customer'), v.literal('admin')),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    await ctx.db.patch(args.userId, { role: args.role });
  },
});

// makeAdmin → réservé au CLI Convex (internal action), ne pas exposer publiquement
// Utiliser npx convex run users:makeAdmin '{"email":"..."}' en local uniquement
```

---

### 2. `orders.getByStripeSession` — Fuite de commandes par brute-force

**Fichier** : `convex/orders.ts`

**Problème** : N'importe qui peut appeler `getByStripeSession` avec un `stripeSessionId` deviné/trouvé et récupérer adresse de livraison + items d'une commande tierce.

**Fix** :

```typescript
export const getByStripeSession = query({
  args: { stripeSessionId: v.string() },
  handler: async (ctx, args) => {
    const userId = await requireAuth(ctx);
    const order = await ctx.db
      .query('orders')
      .withIndex('by_stripe_session', (q) =>
        q.eq('stripeSessionId', args.stripeSessionId)
      )
      .unique();
    if (!order) return null;
    // Autorise : l'owner de la commande OU un admin
    const user = await ctx.db.get(userId);
    if (order.userId !== userId && user?.role !== 'admin')
      throw new Error('Forbidden');
    return order;
  },
});
```

---

### 3. `/api/checkout` — Prix non vérifiés côté serveur (Price Injection)

**Fichier** : `src/app/api/checkout/route.ts`

**Problème** : Le `price` de chaque item vient du client (panier Zustand). Un attaquant peut modifier le prix à 1 centime avant d'envoyer la requête.

**Fix** : Recharger les prix depuis Convex côté serveur :

```typescript
export async function POST(request: NextRequest) {
  const body = (await request.json()) as CheckoutRequestBody;
  const { items, shippingAddress, locale, email } = body;

  if (!items || items.length === 0) {
    return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
  }

  const addressResult = shippingAddressSchema.safeParse(shippingAddress);
  if (!addressResult.success) {
    return NextResponse.json(
      { error: 'Invalid shipping address' },
      { status: 400 }
    );
  }

  const convex = getConvex();

  // ✅ Vérifier les prix côté serveur
  const verifiedItems = await Promise.all(
    items.map(async (item) => {
      const product = await convex.query(api.products.getById, {
        id: item.productId as Id<'products'>,
      });
      if (!product) throw new Error(`Product not found: ${item.productId}`);
      if (!product.inStock)
        throw new Error(`Product out of stock: ${item.productId}`);
      return { ...item, price: product.price }; // ← prix autoritatif
    })
  );

  const totalAmount = verifiedItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Limiter quantité max par item
  for (const item of verifiedItems) {
    if (item.quantity < 1 || item.quantity > 99) {
      return NextResponse.json({ error: 'Invalid quantity' }, { status: 400 });
    }
  }

  // ... suite du code avec verifiedItems
}
```

---

### 4. Protection admin côté client uniquement (Client-Side AuthGuard)

**Fichier** : `src/features/auth/components/auth-guard.tsx`

**Problème** : La protection admin (`requireAdmin`) est faite en JavaScript côté client. Désactiver JS ou modifier le state suffit à contourner la redirection. Les pages admin (`/admin/products`, `/admin/orders`) ne vérifient pas le rôle côté serveur.

**Fix — Middleware Next.js** (`src/middleware.ts`) :

```typescript
// Ajouter après le middleware next-intl existant
// Pour les routes admin, vérifier l'authentification via cookie de session
// Convex Auth utilise un cookie httpOnly — vérifiable dans le middleware

import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protection basique : rediriger vers login si pas de session Convex
  // Note: la vérification du rôle admin reste dans les Server Components
  if (pathname.includes('/admin')) {
    const convexToken = request.cookies.get('__convex_auth_token');
    if (!convexToken) {
      const loginUrl = new URL(
        `/${pathname.split('/')[1]}/auth/login`,
        request.url
      );
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}
```

**Fix — Server Component admin** : Vérifier le rôle dans le layout serveur :

```typescript
// src/app/[locale]/admin/layout.tsx
import { fetchQuery } from 'convex/nextjs';
import { api } from '../../../../convex/_generated/api';
import { redirect } from 'next/navigation';
import { getAuthToken } from '@convex-dev/auth/nextjs/server';

export default async function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const token = await getAuthToken();

  if (!token) redirect(`/${locale}/auth/login`);

  // Vérifier le rôle admin
  const user = await fetchQuery(api.users.currentUser, {}, { token });
  if (!user || user.role !== 'admin') redirect(`/${locale}`);

  return <>{children}</>;
}
```

---

## MAJEUR 🟠

### 5. `/api/chat` — Pas de rate limiting (DDoS / abus IA)

**Fichier** : `src/app/api/chat/route.ts`

**Problème** : Endpoint ouvert, sans auth, sans rate limit. Un attaquant peut générer des milliers de requêtes → coût OpenRouter illimité.

**Fix** :

```typescript
import { NextRequest } from 'next/server';

// Rate limit simple en mémoire (production : utiliser Upstash Redis)
const requestCounts = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 20; // requêtes par fenêtre
const WINDOW_MS = 60_000; // 1 minute

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = requestCounts.get(ip);

  if (!entry || now > entry.resetAt) {
    requestCounts.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }

  if (entry.count >= RATE_LIMIT) return false;
  entry.count++;
  return true;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] ?? 'unknown';

  if (!checkRateLimit(ip)) {
    return new Response('Trop de requêtes. Réessayez dans une minute.', {
      status: 429,
    });
  }

  const { messages, locale } = await req.json();

  // Limiter la taille de l'historique
  const trimmedMessages = (messages as unknown[]).slice(-10);

  // ... reste du code
}
```

---

### 6. `/api/checkout` — Pas de rate limiting (abus commandes)

**Même solution** que le point 5 : ajouter un rate limit par IP sur `/api/checkout`.

---

### 7. Secrets exposés / Headers de sécurité manquants

**Fichier** : `next.config.ts`

**Problème** :

- Aucun header de sécurité (`X-Frame-Options`, `X-Content-Type-Options`, `CSP`, `Referrer-Policy`)
- `STRIPE_WEBHOOK_SECRET` absent des env vars documentés
- `OPENROUTER_API_KEY` absent des env vars documentés

**Fix — `next.config.ts`** :

```typescript
import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'", // unsafe-eval requis par Next.js dev
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https:",
      "font-src 'self'",
      "connect-src 'self' https://*.convex.cloud wss://*.convex.cloud https://openrouter.ai https://play.gumlet.io https://api.stripe.com",
      'frame-src https://js.stripe.com https://play.gumlet.io',
      "frame-ancestors 'none'",
    ].join('; '),
  },
];

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [{ protocol: 'https', hostname: '**.convex.cloud' }],
  },
  async headers() {
    return [{ source: '/(.*)', headers: securityHeaders }];
  },
};

export default withNextIntl(nextConfig);
```

**Fix — `.env.local` (documenter les variables manquantes)** :

```env
NEXT_PUBLIC_CONVEX_URL=
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_KEY=
STRIPE_WEBHOOK_SECRET=        # ← Obligatoire pour valider les webhooks
OPENROUTER_API_KEY=           # ← Clé IA chatbot
```

---

### 8. `users.getById` — Fuite de données utilisateur

**Fichier** : `convex/users.ts`

**Problème** : N'importe qui peut appeler `getById` avec n'importe quel userId et récupérer nom, email, rôle.

**Fix** :

```typescript
export const getById = query({
  args: { id: v.id('users') },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error('Unauthorized');
    const callerId = identity.subject.split('|')[0] as Id<'users'>;
    const caller = await ctx.db.get(callerId);

    // Autorise : soi-même OU admin
    if (callerId !== args.id && caller?.role !== 'admin')
      throw new Error('Forbidden');
    return await ctx.db.get(args.id);
  },
});
```

---

## MODÉRÉ 🟡

### 9. `/api/chat` — Injection de prompt via `messages`

**Problème** : Le tableau `messages` envoyé par le client est passé directement à l'API IA sans validation. Un attaquant peut injecter des messages `system` pour contourner les instructions.

**Fix** :

```typescript
export async function POST(req: NextRequest) {
  const { messages, locale } = await req.json();

  // Filtrer les messages malveillants
  const safeMessages = (messages as Array<{ role: string; content: string }>)
    .filter((m) => m.role === 'user' || m.role === 'assistant') // interdire 'system'
    .filter((m) => typeof m.content === 'string' && m.content.length < 2000)
    .slice(-10); // max 10 messages d'historique

  if (safeMessages.length === 0) {
    return new Response('Messages invalides', { status: 400 });
  }

  // ... reste du code avec safeMessages
}
```

---

### 10. Stripe webhook — `stripeSessionId` non sauvegardé après `updateStatus`

**Fichier** : `src/app/api/webhooks/stripe/route.ts`

**Problème** : La logique de déduplication vérifie `getByStripeSession` AVANT `updateStatus`, mais ne sauvegarde jamais le `stripeSessionId` sur la commande. Si le webhook est rejoué, la condition `!existing` sera toujours vraie → `updateStatus` appelé plusieurs fois (inoffensif ici mais mauvaise pratique).

**Fix** :

```typescript
case 'checkout.session.completed': {
  const session = event.data.object as Stripe.Checkout.Session;
  const orderId = session.metadata?.orderId;

  if (orderId) {
    // Vérifier si déjà traité via stripeSessionId
    const existing = await convex.query(api.orders.getByStripeSession, {
      stripeSessionId: session.id,
    });

    if (!existing) {
      // Mettre à jour statut ET sauvegarder stripeSessionId atomiquement
      await convex.mutation(api.orders.markAsPaid, {
        id: orderId as Id<'orders'>,
        stripeSessionId: session.id, // ← sauvegarde pour déduplication
      });
    }
  }
  break;
}
```

---

## Récapitulatif des priorités

| #   | Problème                        | Risque      | Effort | Priorité |
| --- | ------------------------------- | ----------- | ------ | -------- |
| 1   | Mutations Convex sans auth      | 🔴 Critique | Moyen  | P0       |
| 2   | `getByStripeSession` public     | 🔴 Critique | Faible | P0       |
| 3   | Prix non vérifiés côté serveur  | 🔴 Critique | Moyen  | P0       |
| 4   | AuthGuard client-side seulement | 🔴 Critique | Moyen  | P0       |
| 5   | Rate limit `/api/chat`          | 🟠 Majeur   | Faible | P1       |
| 6   | Rate limit `/api/checkout`      | 🟠 Majeur   | Faible | P1       |
| 7   | Headers de sécurité manquants   | 🟠 Majeur   | Faible | P1       |
| 8   | `users.getById` public          | 🟠 Majeur   | Faible | P1       |
| 9   | Injection de prompt chat        | 🟡 Modéré   | Faible | P2       |
| 10  | Webhook déduplication           | 🟡 Modéré   | Faible | P2       |

## Ordre d'implémentation recommandé

1. **Sprint 1 (P0)** — Ajouter `requireAuth` + `requireAdmin` dans tous les fichiers Convex
2. **Sprint 2 (P0)** — Vérification des prix côté serveur dans `/api/checkout`
3. **Sprint 3 (P1)** — Headers sécurité dans `next.config.ts` + rate limiting API routes
4. **Sprint 4 (P2)** — Filtrage messages chatbot + déduplication webhook
