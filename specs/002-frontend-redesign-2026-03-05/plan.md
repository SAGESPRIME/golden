# Plan technique : Redesign Frontend style Famille Mary

> Spec : 002-frontend-redesign-2026-03-05
> Inspiration : https://www.famillemary.fr/
> Branche : feature/frontend-redesign

## Vue d'ensemble

Refonte complete du frontend de Golden Defla pour adopter le layout e-commerce classique de Famille Mary : header multi-barres, hero carousel plein-largeur, grille de categories avec icones, cards produits style boutique, carousel des bienfaits, bandeau services, footer enrichi.

Le design system existant (couleurs or/miel, typographie Playfair Display) est conserve car il correspond deja au style Famille Mary.

## Analyse de l'ecart actuel vs famillemary.fr

| Element     | Actuel (Golden Defla)                   | Cible (Famille Mary)                                                   |
| ----------- | --------------------------------------- | ---------------------------------------------------------------------- |
| Header      | 2 zones (annonce + nav+logo+icons)      | 4 zones (annonce + utilitaire + logo+recherche+panier + categorie-nav) |
| Hero        | Split 2 colonnes (texte + SVG hexagone) | Slider plein-largeur avec photo produit                                |
| Trust       | Stats chiffrees (100%, 7+, 48h, 4.9/5)  | Badges texte narratifs (depuis 1921, savoir-faire...)                  |
| Categories  | Absente                                 | Grille d'icones categories avec images                                 |
| Produits    | Cards arrondies avec 1 bouton rond      | Cards classiques avec 2 boutons uppercase                              |
| Temoignages | Carrousel infini auto                   | Carousel discret (benefits, pas temoignages)                           |
| Story       | Section 4 piliers                       | Bandeau narratif + CTA "Qui sommes-nous"                               |
| Services    | Absente                                 | Bandeau 6 garanties icones                                             |
| Footer      | Absent (a faire)                        | Multi-colonnes sombre + newsletter                                     |

## Decisions d'architecture

### 1. Header a 4 barres

**Choix** : Decomposer le header en 4 sous-composants dans `header.tsx`
**Justification** : Famille Mary a une navigation utilitaire separee (boutiques, blog, contact) + recherche centree + nav categorie complete. Cela implique de restructurer le composant existant.
**Structure** :

- `AnnouncementBar` : barre noire, message livraison
- `UtilityBar` : liens secondaires (blog, contact) + selecteur langue
- `MainBar` : logo gauche + barre de recherche (non fonctionnelle pour l'instant) + compte+panier
- `CategoryNav` : navigation horizontale par categorie produit avec pipe separateurs

### 2. Hero Carousel

**Choix** : Slider CSS pur sans librairie externe (contrainte : pas de deps lourdes)
**Alternatives** : Embla Carousel (leger, ~10kb), CSS scroll snap
**Justification** : Utiliser `useState` + CSS transitions pour un slider 3 slides. Pas de lib car constitution = pas de deps lourdes. Si l'equipe veut Embla plus tard, remplacement simple.

### 3. CategoryGrid

**Choix** : Nouveau composant avec images placeholder (emojis/SVG) en attendant les vraies images
**Justification** : Famille Mary affiche une grille de 6 categories avec images rondes/carrees. Golden Defla a 5 categories (mountain, forest, flower, rare, organic). On affiche les 5 + "Voir tout".

### 4. ProductCard classique

**Choix** : Refactorer `product-card.tsx` pour le style e-commerce classique
**Layout** : Image plein-cadre + overlay badges | Nom produit | Etoiles | Prix | [AJOUTER AU PANIER] + [VOIR LE PRODUIT]
**Style boutons** : uppercase, rectilinear (radius-sm), couleurs distinctes (primary vs outline)

### 5. BenefitsCarousel

**Choix** : Remplacer `TestimonialsSection` par un carousel des types de miel
**Justification** : Famille Mary a un carousel "Les bienfaits des tresors de la ruche" avec des articles/categories. On adapte avec les categories de Golden Defla.

### 6. ServicesStrip

**Choix** : Nouveau composant bandeau 6 garanties (horizontal sur desktop, grille 2x3 sur mobile)
**Icones** : Lucide React (Truck, Shield, Clock, Headphones, Store, Zap)

### 7. Footer

**Choix** : Nouveau composant footer complet avec newsletter + 4 colonnes
**Position** : A ajouter dans `src/components/layout/footer.tsx` (fichier absent actuellement)

## Structure des fichiers

```
src/
├── app/[locale]/
│   └── page.tsx                         # Modifier ordre des sections
│
├── components/layout/
│   ├── header.tsx                       # Refonte complete 4-barres
│   └── footer.tsx                       # CREER (absent actuellement)
│
└── features/home/
    ├── index.ts                         # Ajouter exports
    └── components/
        ├── hero-section.tsx             # Remplacer par hero-carousel
        ├── trust-stats.tsx              # Remplacer par trust-badges
        ├── category-grid.tsx            # CREER
        ├── story-section.tsx            # Remplacer par brand-story-banner
        ├── testimonials-section.tsx     # Remplacer par benefits-carousel
        ├── cta-banner.tsx               # Transformer en services-strip
        └── services-strip.tsx           # CREER
```

## Fichiers a creer

| Fichier                                           | Description                            | Priorite |
| ------------------------------------------------- | -------------------------------------- | -------- |
| `src/features/home/components/category-grid.tsx`  | Grille 6 categories avec icones/images | P1       |
| `src/features/home/components/services-strip.tsx` | Bandeau 6 garanties e-commerce         | P1       |
| `src/components/layout/footer.tsx`                | Footer complet multi-colonnes          | P1       |

## Fichiers a modifier

| Fichier                                                 | Modification                                                   | Impact |
| ------------------------------------------------------- | -------------------------------------------------------------- | ------ |
| `src/components/layout/header.tsx`                      | Refonte 4-barres (annonce + utilitaire + main + categorie-nav) | Haut   |
| `src/features/home/components/hero-section.tsx`         | Remplacer SVG hex par carousel plein-largeur                   | Haut   |
| `src/features/home/components/trust-stats.tsx`          | Chiffres -> badges narratifs horizontaux                       | Moyen  |
| `src/features/home/components/story-section.tsx`        | Section piliers -> bandeau narratif + CTA                      | Moyen  |
| `src/features/home/components/testimonials-section.tsx` | Temoignages -> carousel bienfaits categories                   | Moyen  |
| `src/features/home/components/cta-banner.tsx`           | Transformer en bandeau cadeau/promo                            | Faible |
| `src/features/products/components/product-card.tsx`     | Style boutique classique + 2 boutons uppercase                 | Haut   |
| `src/features/home/index.ts`                            | Ajouter exports nouveaux composants                            | Faible |
| `src/app/[locale]/page.tsx`                             | Reordonner sections                                            | Moyen  |
| `src/app/[locale]/layout.tsx`                           | Ajouter Footer                                                 | Moyen  |
| `src/messages/fr.json`                                  | Nouvelles cles (categories, services, footer)                  | Moyen  |
| `src/messages/ar.json`                                  | Traductions AR correspondantes                                 | Moyen  |

## Ordre des sections homepage apres redesign

```
1. Header (AnnouncementBar + UtilityBar + MainBar + CategoryNav)
2. HeroCarousel         ← plein-largeur, slides produits/promo
3. TrustBadges          ← 5 badges narratifs horizontaux
4. CategoryGrid         ← NOUVEAU : grille 5-6 icones categories
5. FeaturedProducts     ← section "Nouveautes" style Famille Mary
6. BenefitsCarousel     ← carousel "types de miel"
7. BrandStoryBanner     ← texte + image + CTA "Qui sommes-nous"
8. ServicesStrip        ← NOUVEAU : 6 garanties icones
9. Footer               ← NOUVEAU : multi-colonnes + newsletter
```

## Nouvelles cles de traduction a ajouter

### fr.json

```json
"home": {
  "trustBadges": {
    "heritage": { "title": "Miel algerien authentique", "desc": "Recolte dans les montagnes d'Algerie" },
    "quality": { "title": "Qualite artisanale", "desc": "Sans additif, sans traitement" },
    "bees": { "title": "Respect des abeilles", "desc": "Apiculture traditionnelle preservee" },
    "natural": { "title": "100% naturel", "desc": "Origine unique et tracable" },
    "reviews": { "title": "Avis clients verifies", "desc": "+500 commandes livrees" }
  },
  "categoryGrid": {
    "title": "Nos miels par terroir",
    "viewAll": "Voir tous nos miels"
  },
  "benefits": {
    "title": "Les bienfaits du miel algerien",
    "items": [
      "Miel de montagne",
      "Miel de foret",
      "Miel de fleurs",
      "Miel rare",
      "Miel bio"
    ]
  },
  "brandStory": {
    "title": "Le miel algerien, un tresor de la ruche",
    "text": "Nos apiculteurs partenaires en Algerie perpetuent des pratiques ancestrales...",
    "cta": "Qui sommes-nous ?"
  },
  "services": [
    { "title": "Livraison soignee", "desc": "Colis protege" },
    { "title": "Paiement securise", "desc": "Stripe certifie" },
    { "title": "Livraison 48h-72h", "desc": "Partout en France" },
    { "title": "Service client", "desc": "A votre ecoute" },
    { "title": "Retrait boutique", "desc": "Gratuit et rapide" },
    { "title": "Expedition rapide", "desc": "Commande avant 14h" }
  ]
},
"footer": {
  "newsletter": { "title": "Restons en contact", "placeholder": "Votre email", "cta": "S'inscrire" },
  "columns": {
    "products": "Nos produits",
    "company": "La maison",
    "help": "Aide",
    "legal": "Mentions legales"
  }
}
```

## Detail des composants cles

### Header (4 barres)

```
[AnnouncementBar]   bg-black text-xs py-1.5 → "Livraison offerte des 45€"
[UtilityBar]        bg-gray-100 text-xs py-1 → liens secondaires + langue FR/AR
[MainBar]           bg-white h-20 → Logo | SearchInput (decoratif) | Compte+Panier
[CategoryNav]       bg-white border-b → liens categories avec pipe | separateurs
```

### HeroCarousel

```
Slide 1 : "Miel de Jijel" — photo produit gauche + texte promo droite, bg gold
Slide 2 : "Selection bio" — image ruche + texte + CTA, bg cream
Slide 3 : "Offre decouverte" — coffret + promo, bg brown

Navigation : dots + fleches prev/next
Auto-play : 5s, pause on hover
Transition : fade ou slide horizontal CSS
```

### CategoryGrid

```
6 tiles (5 categories + "Voir tout")
Layout : grille 3x2 mobile, 6x1 ou 3x2 desktop
Chaque tile : image/emoji dans cercle bg-gold-100 + nom category dessous
Hover : scale-105 + border-primary
```

### ProductCard (style Famille Mary)

```
Image : aspect-square, overflow-hidden, hover scale-105
Badges : "Nouveaute" | "Bio" | "Promo -X%" — absolus top-left
Contenu :
  - Etoiles fixes 4.8/5 (pas encore dynamiques)
  - Nom produit (line-clamp-2, font-semibold)
  - Prix (bold primary) + prix barre si promo
  - [AJOUTER AU PANIER]  → btn primary plein largeur uppercase tracking-wide
  - [VOIR LE PRODUIT]    → btn outline plein largeur uppercase tracking-wide
```

### ServicesStrip

```
6 icones en ligne (Truck | Shield | Clock | Headphones | Store | Zap)
Desktop : flex row gap-8 avec separateurs
Mobile : grid 2 colonnes
Style : icone gold + texte dessous (titre + description)
Background : bg-muted border-y
```

### Footer

```
[Haut] Newsletter input + CTA + icones reseaux sociaux
[Colonnes] 4 colonnes : Produits | La maison | Aide | Legal
[Bas] Copyright + paiements acceptes + certifications
Background : bg-warm-brown text-gold-200
```

## Dependances

### Aucune nouvelle dependance npm requise

Le projet dispose deja de :

- `lucide-react` : toutes les icones necessaires
- `next-intl` : traductions
- `tailwindcss` : toutes les classes utilisees
- `shadcn/ui` : Button, Card, Badge deja installes

### Composants shadcn/ui optionnels

```bash
# Si le carousel devient complexe (optionnel)
npx shadcn@latest add carousel
```

## Conventions a respecter

- Fichiers < 100 lignes (decouper si besoin)
- 'use client' uniquement si interaction (carousel, hover states)
- RTL : classes ms-, me-, ps-, pe-, start-, end- (pas de ml-, mr-)
- Traductions FR + AR pour chaque nouveau texte
- next/image pour toutes les images (meme les placeholders)
- Pas de console.log

## Checklist avant livraison

- [ ] `npm run typecheck` sans erreur
- [ ] `npm run lint` sans erreur
- [ ] `npm run test` : tests existants toujours verts (pas de regression)
- [ ] Responsive : 375px (mobile) + 768px (tablet) + 1280px (desktop)
- [ ] RTL teste en arabe
- [ ] Header visible et fonctionnel sur toutes les pages
- [ ] Footer present sur toutes les pages
- [ ] ProductCard : 2 boutons fonctionnels (add to cart + navigate)
