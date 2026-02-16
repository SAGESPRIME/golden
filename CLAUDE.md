# Golden Defla

E-commerce bilingue (Francais/Arabe) de miel premium algerien. Application fullstack performante avec support RTL, catalogue produits, panier, checkout Stripe et gestion des commandes.

## Stack

| Technologie | Version | Usage |
|-------------|---------|-------|
| Next.js | 16.x | Framework React (App Router) |
| React | 19.x | UI Library |
| TypeScript | 5.x | Langage (strict mode) |
| Tailwind CSS | 4.x | Styling (utility-first) |
| shadcn/ui | latest | Composants UI (theme Energy) |
| Zustand | 5.x | State management (panier) |
| Convex | 1.x | BaaS (base de donnees, fonctions, temps reel) |
| Convex Auth | 0.x | Authentification |
| Stripe | 20.x | Paiement (Checkout Session) |
| next-intl | 4.x | Internationalisation (FR + AR) |
| next-themes | 0.x | Dark mode |
| Vitest | 4.x | Tests unitaires |
| React Testing Library | 16.x | Tests composants |
| Zod | 4.x | Validation schemas |
| Lucide React | 0.564.x | Icons |

## Structure du projet

```
golden-defla/
├── convex/                         # Backend Convex
│   ├── schema.ts                   # Schema BDD (products, users, orders)
│   ├── products.ts                 # Queries produits (list, getBySlug, etc.)
│   ├── auth.ts                     # Configuration Convex Auth
│   └── tsconfig.json
│
├── specs/                          # Specifications et plans
│   ├── constitution.md             # Principes non-negociables du projet
│   └── 001-catalogue-produits-*/   # PRD, plan, contracts par feature
│
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout (metadata globale)
│   │   ├── not-found.tsx           # Page 404
│   │   ├── globals.css             # Theme shadcn/ui Energy (Orange)
│   │   └── [locale]/               # Routes i18n (fr, ar)
│   │       ├── layout.tsx          # Layout locale (RTL/LTR, Header, Toaster)
│   │       ├── providers.tsx       # Convex + ThemeProvider
│   │       ├── page.tsx            # Homepage (hero + produits vedettes)
│   │       └── products/
│   │           ├── page.tsx        # /[locale]/products (listing + filtres)
│   │           └── [slug]/
│   │               └── page.tsx    # /[locale]/products/[slug] (fiche produit)
│   │
│   ├── features/                   # Modules feature (architecture modulaire)
│   │   └── products/
│   │       ├── components/         # ProductCard, ProductGrid, CategoryFilter,
│   │       │                       # ImageGallery, ProductDetail, AddToCartButton,
│   │       │                       # FeaturedProducts, ProductCatalog
│   │       ├── hooks/
│   │       │   └── use-products.ts # Hook donnees produits (seed fallback)
│   │       ├── data/
│   │       │   └── seed.ts         # 7 produits de demo bilingues
│   │       ├── types.ts            # SeedProduct, CategoryKey, Category
│   │       └── index.ts            # Exports publics
│   │
│   ├── components/
│   │   ├── ui/                     # shadcn/ui (button, card, badge, input,
│   │   │                           # label, separator, sonner)
│   │   └── layout/
│   │       └── header.tsx          # Header sticky avec nav + compteur panier
│   │
│   ├── stores/
│   │   └── cart-store.ts           # Zustand store panier (persist localStorage)
│   │
│   ├── hooks/
│   │   ├── use-cart.ts             # Hook panier (addItem, removeItem, totals)
│   │   └── use-text-direction.ts   # Hook direction RTL/LTR
│   │
│   ├── i18n/
│   │   ├── routing.ts             # Locales: ['fr', 'ar'], default: 'fr'
│   │   ├── request.ts             # Config next-intl server
│   │   └── navigation.ts          # Link, redirect, usePathname i18n
│   │
│   ├── lib/
│   │   ├── utils.ts               # cn(), formatPrice(), formatDate()
│   │   ├── stripe.ts              # Client Stripe (STRIPE_SECRET_KEY)
│   │   └── validators.ts          # Schema Zod (shippingAddress)
│   │
│   ├── messages/
│   │   ├── fr.json                # Traductions FR (nav, products, categories, etc.)
│   │   └── ar.json                # Traductions AR
│   │
│   ├── types/
│   │   └── index.ts               # Types globaux (Product, CartItem, Order, User, etc.)
│   │
│   ├── middleware.ts              # Middleware next-intl (redirect locale)
│   └── test/
│       └── setup.ts              # Setup Vitest (@testing-library/jest-dom)
│
└── public/
    └── images/                    # Assets statiques (images produits)
```

## Commandes

| Commande | Description |
|----------|-------------|
| `npm run dev` | Serveur de developpement (localhost:3000) |
| `npm run build` | Build de production |
| `npm run lint` | ESLint |
| `npm run format` | Prettier |
| `npm run test` | Tests Vitest |
| `npm run typecheck` | Verification TypeScript (`tsc --noEmit`) |
| `npx convex dev` | Convex en mode developpement |
| `npx convex deploy` | Deployer Convex en production |

## Design System

### Theme Energy (shadcn/ui)

- **Couleur primaire** : Orange (`oklch(0.646 0.222 41.116)`)
- **Couleur neutre** : Neutral
- **Border radius** : `0.375rem`
- **Mode par defaut** : light (dark mode supporte via `next-themes`)
- **Theme CSS** : `src/app/globals.css`

### Composants shadcn/ui disponibles

`button`, `card` (+ CardHeader, CardTitle, CardContent, CardFooter), `badge`, `input`, `label`, `separator`, `sonner` (toast)

### Classes utilitaires custom

```css
/* Disponibles via globals.css */
bg-background, text-foreground, bg-card, text-card-foreground,
bg-primary, text-primary-foreground, bg-muted, text-muted-foreground,
bg-destructive, border-border, ring-ring
```

## Conventions de code

### TypeScript

```typescript
// Toujours typer les props
interface ProductCardProps {
  product: SeedProduct;
  locale: string;
  onAddToCart?: (product: SeedProduct) => void;
}

// JAMAIS de any - interdit par la constitution
// Types partages dans src/types/index.ts
// Types par feature dans src/features/[name]/types.ts
```

### Composants React

```typescript
// Composants fonctionnels uniquement
// 'use client' obligatoire pour composants interactifs
// Pages = Server Components (async, setRequestLocale)
// Composants interactifs = Client Components

'use client';

export function ProductCard({ product, locale }: ProductCardProps) {
  // ...
}
```

### Imports

```typescript
// 1. React / Next
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// 2. Libs externes
import { toast } from 'sonner';

// 3. Composants internes (@/)
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/use-cart';

// 4. Feature locale (relative)
import { ProductCard } from './product-card';
import type { SeedProduct } from '../types';
```

### Nommage

- **Fichiers** : `kebab-case` (`product-card.tsx`, `use-products.ts`)
- **Composants** : `PascalCase` (`ProductCard`, `CategoryFilter`)
- **Hooks** : `camelCase` prefixe `use` (`useProducts`, `useCart`)
- **Types/Interfaces** : `PascalCase` (`SeedProduct`, `CartItem`)

### Styling

```typescript
// Tailwind utility-first + cn() pour classes conditionnelles
import { cn } from '@/lib/utils';

<div className={cn(
  'base-classes',
  isActive && 'active-classes',
  className
)} />

// RTL : utiliser classes logiques
// ms- (margin-start) au lieu de ml-
// me- (margin-end) au lieu de mr-
// ps- (padding-start) au lieu de pl-
// pe- (padding-end) au lieu de pr-
// start-2 au lieu de left-2
// end-2 au lieu de right-2
```

### Tests (TDD)

```typescript
// Tests AVANT le code (constitution Article I)
// Vitest + React Testing Library
// Mocker next/image, next/link, hooks externes dans les tests composants

vi.mock('next/image', () => ({
  default: (props: Record<string, unknown>) => {
    const { fill, priority, ...rest } = props;
    return <img {...rest} />;
  },
}));
```

### i18n

```typescript
// Pages server : useTranslations() de next-intl
const t = useTranslations('products');
<h1>{t('title')}</h1>

// Composants client : texte inline avec condition locale
const name = locale === 'ar' ? product.name.ar : product.name.fr;

// Ajouter les cles dans BOTH fr.json ET ar.json
```

## Donnees du projet

### Seed data (`src/features/products/data/seed.ts`)

7 produits de miel algerien bilingues FR/AR :
- Miel de Jijel (mountain, featured)
- Miel de Foret de Chrea (forest, featured, promo)
- Miel de Fleurs de Kabylie (flower)
- Miel de Sidr/Jujubier (rare, featured)
- Miel Bio de l'Atlas (organic)
- Miel de Lavande de Medea (flower, rupture de stock)
- Miel de Foret de Tikjda (forest)

### Categories

| Cle | FR | AR |
|-----|----|----|
| `mountain` | Miel de montagne | عسل الجبال |
| `forest` | Miel de foret | عسل الغابة |
| `flower` | Miel de fleurs | عسل الأزهار |
| `rare` | Miel rare | عسل نادر |
| `organic` | Miel bio | عسل عضوي |

### Schema Convex (`convex/schema.ts`)

3 tables definies :
- **products** : nom bilingue, slug, prix (centimes), images, categorie, poids, stock, featured
- **users** : name, email, role (customer/admin), tokenIdentifier
- **orders** : userId, items[], totalAmount, status, stripeSessionId, shippingAddress

### Queries Convex (`convex/products.ts`)

| Query | Args | Retour |
|-------|------|--------|
| `products.list` | - | `Product[]` |
| `products.listFeatured` | - | `Product[]` |
| `products.getBySlug` | `{ slug }` | `Product \| null` |
| `products.listByCategory` | `{ category }` | `Product[]` |

### Panier (Zustand `src/stores/cart-store.ts`)

Store persiste dans localStorage (`golden-defla-cart`) :
- `addItem(item)` : ajoute ou incremente quantite
- `removeItem(productId)` : supprime du panier
- `updateQuantity(productId, qty)` : modifie quantite (supprime si <= 0)
- `clearCart()` : vide le panier
- `getTotalItems()` : nombre total d'articles
- `getTotalPrice()` : montant total en centimes

### Validation (`src/lib/validators.ts`)

Schema Zod pour `shippingAddress` : fullName, address, city, postalCode, country, phone.

## Variables d'environnement

```env
NEXT_PUBLIC_CONVEX_URL=       # URL du backend Convex
STRIPE_SECRET_KEY=            # Cle secrete Stripe
NEXT_PUBLIC_STRIPE_KEY=       # Cle publique Stripe (future)
```

## Etat d'avancement

### Termine

- [x] Init projet (Next.js 16, Tailwind 4, shadcn/ui Energy, Convex, i18n)
- [x] Schema Convex (products, users, orders)
- [x] Queries Convex produits
- [x] Cart store Zustand + hook useCart
- [x] **Catalogue produits** (feature/catalogue-produits, PR #1)
  - Seed data 7 produits bilingues
  - Page listing avec grille responsive
  - Filtrage par categorie cote client
  - Fiche produit avec galerie d'images
  - Ajout au panier avec toast feedback
  - Produits vedettes sur homepage
  - Header avec compteur panier
  - 51 tests

### A faire

- [ ] Page panier (`/[locale]/cart`) : liste items, modification quantites, total, bouton checkout
- [ ] Checkout Stripe (`/[locale]/checkout`) : formulaire adresse, Stripe Checkout Session, page confirmation
- [ ] Webhooks Stripe (`/api/webhooks/stripe`) : traitement evenements paiement
- [ ] Auth Convex : inscription/connexion, espace client
- [ ] Commandes (`/[locale]/account/orders`) : historique, suivi statut
- [ ] Admin (`/[locale]/admin`) : gestion produits et commandes
- [ ] Footer
- [ ] SEO (metadata par page, Schema.org)
- [ ] Migration seed data vers Convex reel

## Contraintes absolues

```
A FAIRE :
- TypeScript strict (pas de any)
- Tests TDD (tests AVANT le code)
- Fichiers < 100 lignes
- next/image pour TOUTES les images
- Tailwind CSS utility-first
- Mobile-first responsive
- Composants fonctionnels uniquement
- Textes traduits FR + AR
- Support RTL (classes logiques ms-, me-, ps-, pe-)
- Prix en centimes EUR, formater a l'affichage
- Stripe Checkout Session (jamais de donnees carte)
- Chaque feature = module isole dans src/features/

A NE PAS FAIRE :
- any type
- console.log en production
- <img> HTML (utiliser next/image)
- styled-components / CSS-in-JS
- Dependances lourdes (lodash, moment)
- localStorage direct (utiliser Zustand persist)
- Stocker des donnees de carte
- Classes directionnelles (ml-, mr-, pl-, pr- → ms-, me-, ps-, pe-)
```

## Workflow de modification

### Ajouter une nouvelle feature

1. Creer un PRD dans `specs/NNN-feature-name/prd.md`
2. Creer le plan technique dans `specs/NNN-feature-name/plan.md`
3. Creer la branche `feature/feature-name`
4. Creer le module `src/features/feature-name/` (components, hooks, types, index)
5. Ecrire les tests AVANT le code
6. Implementer, verifier : `npm run typecheck && npm run lint && npm run test`
7. Commit, push, PR vers master

### Ajouter une page

1. Creer le dossier `src/app/[locale]/nom-page/page.tsx`
2. Page = Server Component async avec `setRequestLocale(locale)`
3. Composants interactifs = Client Components separes
4. Ajouter traductions dans `fr.json` et `ar.json`

### Ajouter un composant shadcn/ui

```bash
npx shadcn@latest add [composant]
# Installe dans src/components/ui/
```

Composants installes : button, card, badge, input, label, separator, sonner

### Modifier le contenu produits

Editer `src/features/products/data/seed.ts` (temporaire, sera migre vers Convex).

## Checklist avant commit

- [ ] `npm run test` passe (vitest)
- [ ] `npm run typecheck` passe (tsc --noEmit)
- [ ] `npm run lint` passe sans erreur
- [ ] Pas de `any` dans le code
- [ ] Pas de `console.log`
- [ ] Textes traduits FR + AR
- [ ] Composants compatibles RTL
- [ ] Fichiers < 100 lignes (hors config/schemas)

## Workflow de developpement

### Avec Ralph (recommande)

```
/start         →  Detecte l'etat, propose la suite
      ↓
/constitution  →  Principes du projet (une seule fois) ✓
      ↓
/prd [feature] →  PRD avec user stories
      ↓
/plan          →  Plan technique
      ↓
/ralph         →  Implementation autonome + PR
```

### Skills disponibles

| Skill | Description |
|-------|-------------|
| `/start` | Point d'entree : detecte l'etat et guide |
| `/init` | Initialiser le projet |
| `/constitution` | Definir les principes du projet |
| `/prd [description]` | Creer un PRD |
| `/plan` | Creer le plan technique |
| `/ralph` | Lancer l'implementation autonome |
| `/review` | Review du code |
| `/test` | Lancer et analyser les tests |
| `/fix [erreur]` | Corriger une erreur |

## Agents (subagents)

| Agent | Modele | Description |
|-------|--------|-------------|
| `fullstack-architect` | sonnet | Architecture Next.js + Convex, routing, performance, i18n, RTL |
| `git-workflow` | sonnet | Branches, PR, merges, releases |

## Regles

@.claude/rules/workflow.md
@.claude/rules/onboarding.md

---

*Derniere mise a jour : Fevrier 2026*
