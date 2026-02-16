# Data Model : Catalogue Produits

## Schema Convex (existant)

Le schema `products` est deja defini dans `convex/schema.ts`. Aucune modification necessaire.

```typescript
// convex/schema.ts (existant, pas de changement)
products: defineTable({
  name: v.object({
    fr: v.string(),
    ar: v.string(),
  }),
  description: v.object({
    fr: v.string(),
    ar: v.string(),
  }),
  slug: v.string(),
  price: v.number(),              // En centimes EUR
  compareAtPrice: v.optional(v.number()), // Ancien prix (promo)
  images: v.array(v.string()),    // URLs des images (1-3)
  category: v.string(),           // Ex: "mountain", "forest", "flower"
  weight: v.number(),             // En grammes
  inStock: v.boolean(),
  featured: v.boolean(),
})
  .index('by_slug', ['slug'])
  .index('by_category', ['category'])
  .index('by_featured', ['featured'])
```

## Queries Convex (existantes)

| Query | Args | Retour | Usage |
|-------|------|--------|-------|
| `products.list` | - | `Product[]` | Page listing |
| `products.listFeatured` | - | `Product[]` | Homepage vedettes |
| `products.getBySlug` | `{ slug }` | `Product \| null` | Fiche produit |
| `products.listByCategory` | `{ category }` | `Product[]` | Filtrage (futur) |

## Seed Data

Les seed data dans `src/features/products/data/seed.ts` suivent exactement le meme schema, avec un `_id` string genere localement.

### Categories prevues

| Cle | FR | AR |
|-----|----|----|
| `mountain` | Miel de montagne | عسل الجبال |
| `forest` | Miel de foret | عسل الغابة |
| `flower` | Miel de fleurs | عسل الأزهار |
| `rare` | Miel rare | عسل نادر |
| `organic` | Miel bio | عسل عضوي |

## Relations

```
Product (standalone, pas de relations)
   │
   └──> CartItem (copie partielle dans le store Zustand)
         - productId: string (reference Product._id)
         - name: BilingualText (copie pour affichage offline)
         - price: number (copie pour calcul offline)
         - quantity: number
         - image: string (premiere image)
```

Pas de relation Convex car le panier est cote client (Zustand persist).
