# Contracts : Catalogue Produits

## Types specifiques au module

```typescript
// src/features/products/types.ts

import type { BilingualText } from '@/types';

/** Produit tel que retourne par le hook useProducts */
export interface SeedProduct {
  _id: string;
  name: BilingualText;
  description: BilingualText;
  slug: string;
  price: number;
  compareAtPrice?: number;
  images: string[];
  category: string;
  weight: number;
  inStock: boolean;
  featured: boolean;
}

/** Cle de categorie */
export type CategoryKey = 'mountain' | 'forest' | 'flower' | 'rare' | 'organic';

/** Categorie avec label traduit */
export interface Category {
  key: CategoryKey | 'all';
  label: BilingualText;
}
```

## Props des composants

```typescript
// ProductCard
export interface ProductCardProps {
  product: SeedProduct;
  locale: string;
  onAddToCart?: (product: SeedProduct) => void;
}

// ProductGrid
export interface ProductGridProps {
  products: SeedProduct[];
  locale: string;
  onAddToCart?: (product: SeedProduct) => void;
}

// CategoryFilter
export interface CategoryFilterProps {
  categories: Category[];
  activeCategory: CategoryKey | 'all';
  onCategoryChange: (category: CategoryKey | 'all') => void;
  locale: string;
}

// ImageGallery
export interface ImageGalleryProps {
  images: string[];
  alt: string;
}

// ProductDetail
export interface ProductDetailProps {
  product: SeedProduct;
  locale: string;
  onAddToCart?: (product: SeedProduct) => void;
}

// AddToCartButton
export interface AddToCartButtonProps {
  product: SeedProduct;
  locale: string;
  size?: 'sm' | 'default' | 'lg';
}

// FeaturedProducts
export interface FeaturedProductsProps {
  locale: string;
}
```

## Hook

```typescript
// src/features/products/hooks/use-products.ts

export interface UseProductsReturn {
  products: SeedProduct[];
  featuredProducts: SeedProduct[];
  getBySlug: (slug: string) => SeedProduct | undefined;
  getByCategory: (category: string) => SeedProduct[];
  categories: CategoryKey[];
  isLoading: boolean;
}

export function useProducts(): UseProductsReturn;
```

## Traductions a ajouter

```typescript
// Nouvelles cles dans messages/fr.json et messages/ar.json

{
  "products": {
    // Cles existantes : title, addToCart, outOfStock, weight, category, featured, price
    // Nouvelles cles :
    "description": "...",
    "backToCatalog": "...",
    "discount": "...",          // "-{percent}%"
    "grams": "...",             // "{weight}g"
    "noProducts": "...",        // "Aucun produit dans cette categorie"
    "addedToCart": "..."        // "Produit ajoute au panier"
  },
  "categories": {
    "all": "...",
    "mountain": "...",
    "forest": "...",
    "flower": "...",
    "rare": "...",
    "organic": "..."
  },
  "header": {
    "cart": "...",
    "cartCount": "..."         // "{count} article(s)"
  }
}
```
