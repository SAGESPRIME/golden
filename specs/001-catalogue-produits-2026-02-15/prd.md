# PRD: Catalogue Produits

> Spec : 001-catalogue-produits-2026-02-15
> Cree le : 2026-02-15
> Constitution : specs/constitution.md

## Contexte

### Utilisateurs cibles

Visiteurs du site (pas de compte requis). Tout le monde peut parcourir le catalogue, voir les fiches produits et ajouter au panier.

### Probleme a resoudre

Le site Golden Defla n'a actuellement aucune page produit. Les visiteurs ne peuvent pas decouvrir, parcourir et consulter les miels disponibles. Il faut un catalogue bilingue (FR/AR) avec listing en grille et fiches produits detaillees.

### Objectifs

- Permettre aux visiteurs de parcourir les miels par categorie
- Afficher les fiches produits avec galerie d'images et details
- Permettre l'ajout rapide au panier depuis le listing et la fiche
- Offrir une experience bilingue FR/AR avec support RTL complet

## Clarifications

### Questions posees

| Question | Reponse |
|----------|---------|
| Utilisateurs ? | Visiteurs uniquement (pas de compte requis) |
| Composants UI ? | Grille de cards + fiche produit avec galerie |
| Categories ? | 3-5 categories (montagne, foret, fleurs, rare...) |
| Ajout panier sur card ? | Oui, bouton rapide sur chaque card |
| Images par produit ? | 1-3 images avec galerie sur la fiche |
| Produits en rupture ? | Visibles avec badge "Rupture" + bouton desactive |

### Points a clarifier

Aucun point en suspens.

## Perimetre

### Inclus

- Page listing `/[locale]/products` avec grille de cards
- Filtrage par categorie (onglets ou boutons)
- Page fiche produit `/[locale]/products/[slug]`
- Galerie d'images (1-3 images, miniatures)
- Bouton "Ajouter au panier" sur card et fiche
- Badge "Rupture de stock" pour produits indisponibles
- Badge promo quand `compareAtPrice` existe
- Affichage du poids
- Traductions completes FR + AR
- Support RTL
- Donnees seed pour le developpement (produits de demo)

### Exclus

- Recherche textuelle (feature future)
- Pagination / infinite scroll (petite catalogue, pas necessaire)
- Tri (par prix, nom, etc.) — feature future
- Favoris / wishlist (necessite auth)
- Avis clients sur les produits
- Gestion admin des produits (feature future)

## User Stories

### US-001: Page listing produits

**Priorite** : 1
**Bloque par** : -
**Estimation** : M

**Description** :
En tant que visiteur, je veux voir la liste de tous les miels disponibles afin de decouvrir l'offre Golden Defla.

**Criteres d'acceptation** :
- [ ] Page accessible sur `/fr/products` et `/ar/products`
- [ ] Grille responsive : 1 col mobile, 2 col tablette, 3 col desktop
- [ ] Chaque card affiche : image, nom, prix, poids, categorie
- [ ] Si `compareAtPrice` existe : ancien prix barre + badge promo
- [ ] Produits en rupture : badge "Rupture de stock", card legerement opaque
- [ ] typecheck passe
- [ ] tests passent
- [ ] Traductions FR + AR presentes
- [ ] Compatible RTL

**Notes techniques** :
- Utiliser la query Convex `products.list` existante
- Composant `ProductCard` dans `src/features/products/components/`
- Utiliser les composants shadcn/ui `Card`, `Badge`
- Prix formate avec `formatPrice()` de `src/lib/utils.ts`

---

### US-002: Filtrage par categorie

**Priorite** : 2
**Bloque par** : US-001
**Estimation** : S

**Description** :
En tant que visiteur, je veux filtrer les miels par categorie afin de trouver rapidement le type de miel qui m'interesse.

**Criteres d'acceptation** :
- [ ] Barre de filtres au-dessus de la grille (boutons/onglets)
- [ ] Option "Tous" pour afficher tout le catalogue
- [ ] Un bouton par categorie existante
- [ ] Filtrage cote client (pas de rechargement)
- [ ] Categorie active visuellement mise en evidence
- [ ] typecheck passe
- [ ] tests passent
- [ ] Traductions FR + AR des noms de categories
- [ ] Compatible RTL

**Notes techniques** :
- Utiliser la query Convex `products.listByCategory` ou filtrer cote client
- Composant `CategoryFilter` dans `src/features/products/components/`
- Etat local avec `useState` (pas besoin de Zustand pour ca)

---

### US-003: Fiche produit

**Priorite** : 3
**Bloque par** : US-001
**Estimation** : M

**Description** :
En tant que visiteur, je veux consulter la fiche detaillee d'un miel afin de voir ses images, sa description et ses caracteristiques avant d'acheter.

**Criteres d'acceptation** :
- [ ] Page accessible sur `/fr/products/[slug]` et `/ar/products/[slug]`
- [ ] Galerie d'images : image principale + miniatures cliquables
- [ ] Nom, description, prix, poids, categorie affiches
- [ ] Si `compareAtPrice` : ancien prix barre + pourcentage de reduction
- [ ] Si rupture de stock : mention claire, bouton desactive
- [ ] Lien retour vers le catalogue
- [ ] typecheck passe
- [ ] tests passent
- [ ] Traductions FR + AR presentes
- [ ] Compatible RTL

**Notes techniques** :
- Utiliser la query Convex `products.getBySlug`
- Composant `ProductDetail` dans `src/features/products/components/`
- Composant `ImageGallery` dans `src/features/products/components/`
- Page 404 si slug invalide

---

### US-004: Ajout au panier

**Priorite** : 4
**Bloque par** : US-001, US-003
**Estimation** : S

**Description** :
En tant que visiteur, je veux ajouter un miel au panier depuis la card ou la fiche produit afin de preparer ma commande.

**Criteres d'acceptation** :
- [ ] Bouton "Ajouter au panier" sur chaque `ProductCard`
- [ ] Bouton "Ajouter au panier" sur la fiche produit
- [ ] Bouton desactive si produit en rupture de stock
- [ ] Feedback visuel apres ajout (toast ou animation)
- [ ] Le compteur panier dans le header se met a jour
- [ ] typecheck passe
- [ ] tests passent
- [ ] Traductions FR + AR presentes
- [ ] Compatible RTL

**Notes techniques** :
- Utiliser le hook `useCart()` existant et le store Zustand
- Le header avec compteur panier sera un placeholder minimal (juste le compteur)
- Composant toast ou notification simple pour le feedback

---

### US-005: Donnees seed de developpement

**Priorite** : 1
**Bloque par** : -
**Estimation** : S

**Description** :
En tant que developpeur, je veux des donnees de produits de demo afin de pouvoir developper et tester le catalogue sans backend Convex connecte.

**Criteres d'acceptation** :
- [ ] Fichier de donnees seed avec 6-8 produits de demo
- [ ] Variete de categories (3-5 differentes)
- [ ] Mix de produits en stock et en rupture
- [ ] Au moins 1 produit avec `compareAtPrice`
- [ ] Noms et descriptions bilingues FR + AR
- [ ] Images placeholder (URLs ou fichiers locaux)
- [ ] Hook/provider pour utiliser les seed data quand Convex n'est pas connecte
- [ ] typecheck passe
- [ ] tests passent

**Notes techniques** :
- Fichier `src/features/products/data/seed.ts`
- Hook `useProducts()` qui retourne seed data en fallback
- Les seed data suivent exactement le schema Convex `products`

---

### US-006: Section produits vedettes sur la homepage

**Priorite** : 5
**Bloque par** : US-001, US-005
**Estimation** : S

**Description** :
En tant que visiteur, je veux voir les miels vedettes sur la page d'accueil afin de decouvrir les produits phares sans aller sur le catalogue.

**Criteres d'acceptation** :
- [ ] Section "Nos miels vedettes" sur la homepage
- [ ] Affiche 3-4 produits avec `featured: true`
- [ ] Utilise le meme composant `ProductCard`
- [ ] Lien "Voir tous les miels" vers `/[locale]/products`
- [ ] typecheck passe
- [ ] tests passent
- [ ] Traductions FR + AR presentes
- [ ] Compatible RTL

**Notes techniques** :
- Composant `FeaturedProducts` dans `src/features/products/components/`
- Utiliser la query `products.listFeatured` ou filtrer les seed data
- Integrer dans la page `src/app/[locale]/page.tsx`

---

## Criteres de succes globaux

- [ ] Toutes les US implementees (US-001 a US-006)
- [ ] Tests > 80% coverage sur les composants produits
- [ ] Pas d'erreur TypeScript
- [ ] Traductions completes FR + AR
- [ ] Compatible RTL (classes logiques Tailwind)
- [ ] Responsive : mobile (375px), tablette (768px), desktop (1280px)
- [ ] Produits en rupture clairement identifies
- [ ] Ajout au panier fonctionnel avec feedback
- [ ] Review effectuee
