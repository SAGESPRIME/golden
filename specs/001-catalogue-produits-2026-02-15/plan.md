# Plan technique : Catalogue Produits

> Spec : 001-catalogue-produits-2026-02-15
> PRD : ./prd.md
> Constitution : ../constitution.md

## Vue d'ensemble

Le catalogue produits est la premiere feature visible du site. L'approche est **modulaire** : tout le code specifique vit dans `src/features/products/`. Les donnees seed permettent de developper sans backend Convex connecte. Les composants sont bilingues FR/AR avec support RTL via les classes logiques Tailwind (`ms-`, `me-`, `ps-`, `pe-`).

Ordre d'implementation : seed data d'abord (US-005), puis listing (US-001), filtrage (US-002), fiche produit (US-003), ajout panier (US-004), homepage (US-006).

## Decisions d'architecture

### 1. Donnees : seed data vs Convex

**Choix** : Hook `useProducts()` avec seed data en fallback
**Alternatives considerees** : Mock Convex provider, fichiers JSON statiques
**Justification** : Le backend Convex n'est pas encore connecte. Un hook custom avec fallback permet de developper immediatement et de switcher vers Convex plus tard sans toucher aux composants. Les composants consomment le hook, pas la source de donnees.

### 2. Filtrage : cote client

**Choix** : Filtrage cote client avec `useState`
**Alternatives considerees** : Query Convex `listByCategory`, URL search params
**Justification** : Avec 6-8 produits et 3-5 categories, le filtrage cote client est instantane. Pas de rechargement, pas de round-trip serveur. `useState` suffit, pas besoin de Zustand.

### 3. Galerie d'images : composant custom simple

**Choix** : Composant `ImageGallery` custom avec `useState`
**Alternatives considerees** : Librairie swiper/carousel, headless UI
**Justification** : 1-3 images seulement, pas besoin de librairie. Un `useState` pour l'index de l'image active + miniatures cliquables. Respecte le principe "pas de dependances lourdes".

### 4. Toast feedback : composant shadcn/ui

**Choix** : Installer le composant `sonner` via shadcn/ui
**Alternatives considerees** : Toast custom, animation CSS simple
**Justification** : shadcn/ui fournit `sonner` comme toast optimise. Leger, accessible, deja integre au design system. Evite de reinventer la roue.

### 5. Pages : Server Components + Client Components

**Choix** : Pages server (async, `setRequestLocale`), composants interactifs client
**Alternatives considerees** : Tout client, tout server
**Justification** : Pattern Next.js 16 standard. Les pages sont des Server Components (SEO, metadata). Les composants interactifs (filtrage, ajout panier, galerie) sont des Client Components. Separation claire.

## Structure des fichiers

```
src/
├── features/
│   └── products/
│       ├── components/
│       │   ├── product-card.tsx          # Card produit (listing + homepage)
│       │   ├── product-card.test.tsx     # Tests ProductCard
│       │   ├── product-grid.tsx          # Grille responsive de cards
│       │   ├── product-grid.test.tsx     # Tests ProductGrid
│       │   ├── product-detail.tsx        # Detail produit (fiche)
│       │   ├── product-detail.test.tsx   # Tests ProductDetail
│       │   ├── image-gallery.tsx         # Galerie images avec miniatures
│       │   ├── image-gallery.test.tsx    # Tests ImageGallery
│       │   ├── category-filter.tsx       # Barre de filtres par categorie
│       │   ├── category-filter.test.tsx  # Tests CategoryFilter
│       │   ├── add-to-cart-button.tsx    # Bouton ajout panier + feedback
│       │   ├── add-to-cart-button.test.tsx
│       │   ├── featured-products.tsx     # Section vedettes homepage
│       │   └── featured-products.test.tsx
│       ├── hooks/
│       │   ├── use-products.ts           # Hook donnees produits (seed/Convex)
│       │   └── use-products.test.ts      # Tests hook
│       ├── data/
│       │   └── seed.ts                   # Donnees de demo (6-8 produits)
│       ├── types.ts                      # Types specifiques feature
│       └── index.ts                      # Exports publics
├── app/
│   └── [locale]/
│       └── products/
│           ├── page.tsx                  # Page listing /[locale]/products
│           └── [slug]/
│               └── page.tsx             # Page fiche /[locale]/products/[slug]
└── components/
    └── layout/
        └── header.tsx                    # Header minimal avec compteur panier
```

## Fichiers a creer

| Fichier | Description | US |
|---------|-------------|-----|
| `src/features/products/data/seed.ts` | 6-8 produits de demo bilingues | US-005 |
| `src/features/products/types.ts` | Types specifiques (SeedProduct, Category) | US-005 |
| `src/features/products/hooks/use-products.ts` | Hook avec seed fallback | US-005 |
| `src/features/products/hooks/use-products.test.ts` | Tests hook | US-005 |
| `src/features/products/components/product-card.tsx` | Card produit | US-001 |
| `src/features/products/components/product-card.test.tsx` | Tests card | US-001 |
| `src/features/products/components/product-grid.tsx` | Grille responsive | US-001 |
| `src/features/products/components/product-grid.test.tsx` | Tests grille | US-001 |
| `src/app/[locale]/products/page.tsx` | Page listing | US-001 |
| `src/features/products/components/category-filter.tsx` | Filtres categorie | US-002 |
| `src/features/products/components/category-filter.test.tsx` | Tests filtres | US-002 |
| `src/features/products/components/image-gallery.tsx` | Galerie images | US-003 |
| `src/features/products/components/image-gallery.test.tsx` | Tests galerie | US-003 |
| `src/features/products/components/product-detail.tsx` | Detail produit | US-003 |
| `src/features/products/components/product-detail.test.tsx` | Tests detail | US-003 |
| `src/app/[locale]/products/[slug]/page.tsx` | Page fiche produit | US-003 |
| `src/features/products/components/add-to-cart-button.tsx` | Bouton panier | US-004 |
| `src/features/products/components/add-to-cart-button.test.tsx` | Tests bouton | US-004 |
| `src/components/layout/header.tsx` | Header avec compteur panier | US-004 |
| `src/features/products/components/featured-products.tsx` | Section vedettes | US-006 |
| `src/features/products/components/featured-products.test.tsx` | Tests vedettes | US-006 |
| `src/features/products/index.ts` | Exports publics du module | US-001 |

## Fichiers a modifier

| Fichier | Modification | Raison |
|---------|--------------|--------|
| `src/messages/fr.json` | Ajouter cles `products.*`, `categories.*` | Traductions filtres, detail, stock |
| `src/messages/ar.json` | Ajouter cles `products.*`, `categories.*` | Traductions AR |
| `src/app/[locale]/page.tsx` | Integrer `FeaturedProducts` | Section vedettes homepage |
| `src/app/[locale]/layout.tsx` | Ajouter `Header` | Navigation + compteur panier |

## Dependances

### Packages a installer

Aucun nouveau package necessaire.

### Composants shadcn/ui a ajouter

```bash
npx shadcn@latest add sonner separator
```

- `sonner` : Toast notifications pour feedback ajout panier
- `separator` : Separation visuelle dans la fiche produit

## Ordre d'implementation

```
US-005 (Seed data)     ─┐
                         ├─→ US-001 (Listing) ─→ US-002 (Filtres) ─┐
                         │                                          ├─→ US-004 (Panier)
                         │   US-001 ─→ US-003 (Fiche produit) ─────┘
                         │
                         └─→ US-006 (Homepage vedettes)
```

**Etape 1** : US-005 — Seed data + hook useProducts()
**Etape 2** : US-001 — ProductCard + ProductGrid + page listing
**Etape 3** : US-002 — CategoryFilter
**Etape 4** : US-003 — ImageGallery + ProductDetail + page fiche
**Etape 5** : US-004 — AddToCartButton + Header + sonner toast
**Etape 6** : US-006 — FeaturedProducts + integration homepage

Chaque etape suit le TDD : tests d'abord, implementation ensuite.
