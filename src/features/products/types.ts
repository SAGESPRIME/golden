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
export type CategoryKey =
  | 'mountain'
  | 'forest'
  | 'flower'
  | 'rare'
  | 'organic';

/** Categorie avec label traduit */
export interface Category {
  key: CategoryKey | 'all';
  label: BilingualText;
}

export interface UseProductsReturn {
  products: SeedProduct[];
  featuredProducts: SeedProduct[];
  getBySlug: (slug: string) => SeedProduct | undefined;
  getByCategory: (category: string) => SeedProduct[];
  categories: CategoryKey[];
  isLoading: boolean;
}
