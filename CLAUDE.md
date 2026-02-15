# Golden Defla

E-commerce bilingue (Francais/Arabe) de miel premium. Application fullstack performante avec support RTL, catalogue produits, panier, checkout Stripe et gestion des commandes.

## Stack

- **Framework** : Next.js 15 (App Router)
- **Styling** : Tailwind CSS
- **UI** : shadcn/ui (Base UI)
- **State** : Zustand (panier, preferences locales)
- **Backend** : Convex (BaaS - base de donnees, fonctions, temps reel)
- **Auth** : Convex Auth
- **Paiement** : Stripe
- **Tests** : Vitest
- **Linting** : ESLint + Prettier
- **i18n** : Francais (defaut) + Arabe (RTL)

## Structure du projet

```
src/
├── app/
│   ├── [locale]/           # Routes i18n (fr, ar)
│   │   ├── layout.tsx      # Layout avec direction RTL/LTR
│   │   ├── page.tsx        # Homepage
│   │   ├── products/       # Catalogue produits
│   │   ├── cart/           # Panier
│   │   ├── checkout/       # Tunnel d'achat Stripe
│   │   ├── account/        # Espace client
│   │   └── admin/          # Back-office
│   └── api/
│       └── webhooks/       # Webhooks Stripe
├── components/
│   ├── ui/                 # shadcn/ui
│   ├── layout/             # Header, Footer, Navigation
│   ├── products/           # Cards, Gallery, Filters
│   ├── cart/               # CartDrawer, CartItem
│   └── checkout/           # CheckoutForm, PaymentStatus
├── convex/
│   ├── schema.ts           # Schema de la base de donnees
│   ├── products.ts         # Fonctions produits
│   ├── orders.ts           # Fonctions commandes
│   ├── users.ts            # Fonctions utilisateurs
│   └── auth.ts             # Configuration Convex Auth
├── lib/
│   ├── utils.ts            # Helpers (cn, formatPrice, etc.)
│   ├── i18n.ts             # Configuration internationalisation
│   ├── stripe.ts           # Client Stripe
│   └── validators.ts       # Schemas de validation
├── stores/
│   └── cart-store.ts       # Zustand store pour le panier
├── hooks/
│   └── use-cart.ts         # Hook panier
├── messages/
│   ├── fr.json             # Traductions francaises
│   └── ar.json             # Traductions arabes
└── types/
    └── index.ts            # Types TypeScript
```

## Commandes

| Commande | Description |
|----------|-------------|
| `npm run dev` | Serveur de developpement |
| `npm run build` | Build de production |
| `npm run lint` | ESLint |
| `npm run format` | Prettier |
| `npm run test` | Tests Vitest |
| `npm run typecheck` | Verification TypeScript |
| `npx convex dev` | Convex en mode developpement |
| `npx convex deploy` | Deployer Convex en production |

## Conventions

### Code

- TypeScript strict (pas de `any`)
- Composants fonctionnels avec hooks
- Nommage : `kebab-case` fichiers, `PascalCase` composants
- Imports absolus avec `@/`

### Styling

- Tailwind CSS utility-first
- Theme shadcn/ui : **Energy** (Orange + Neutral)
- Dark mode supporte
- Support RTL pour l'arabe (dir="rtl")

### i18n

- Francais : langue par defaut
- Arabe : support complet RTL
- Fichiers de traduction dans `messages/`
- Utiliser `useTranslations()` pour les textes

### Convex

- Schema dans `convex/schema.ts`
- Fonctions dans `convex/` (queries, mutations, actions)
- Utiliser `useQuery()` et `useMutation()` de Convex
- Validation des arguments avec `v.` (validateurs Convex)

### Stripe

- Webhook pour les evenements de paiement
- Checkout Session pour le tunnel d'achat
- Prix en centimes (EUR)

## Theme UI

Ce projet utilise le theme **Energy** :
- Couleur primaire : **Orange** (24.6 95% 53.1%)
- Couleur neutre : **Neutral**
- Radius : **0.375rem** (arrondi moyen)
- Mode par defaut : **light**

Pour modifier le theme, editer `src/app/globals.css`.

## Workflow de developpement

### Avec Ralph (recommande)

```
/start         →  Detecte l'etat, propose la suite
      ↓
/constitution  →  Principes du projet (une seule fois)
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
| `fullstack-architect` | sonnet | Architecture Next.js + Convex, routing, performance, i18n |
| `git-workflow` | sonnet | Branches, PR, merges, releases |

## Regles

@.claude/rules/workflow.md
@.claude/rules/onboarding.md
