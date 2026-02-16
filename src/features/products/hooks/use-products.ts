import { useMemo } from 'react';
import { seedProducts } from '../data/seed';
import type { CategoryKey, SeedProduct, UseProductsReturn } from '../types';

export function useProducts(): UseProductsReturn {
  const products = seedProducts;

  const featuredProducts = useMemo(
    () => products.filter((p) => p.featured),
    [products],
  );

  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(products.map((p) => p.category))];
    return uniqueCategories as CategoryKey[];
  }, [products]);

  const getBySlug = (slug: string): SeedProduct | undefined =>
    products.find((p) => p.slug === slug);

  const getByCategory = (category: string): SeedProduct[] =>
    products.filter((p) => p.category === category);

  return {
    products,
    featuredProducts,
    getBySlug,
    getByCategory,
    categories,
    isLoading: false,
  };
}
