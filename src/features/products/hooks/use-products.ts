'use client';

import { useMemo } from 'react';
import { useQuery } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { seedProducts } from '../data/seed';
import type { CategoryKey, SeedProduct, UseProductsReturn } from '../types';

export function useProducts(): UseProductsReturn {
  const convexProducts = useQuery(api.products.list);

  // Fallback to seed data while Convex loads or if unavailable
  const products: SeedProduct[] = useMemo(() => {
    if (convexProducts === undefined) return seedProducts;
    if (convexProducts.length === 0) return seedProducts;
    return convexProducts.map((p) => ({
      ...p,
      _id: p._id.toString(),
    }));
  }, [convexProducts]);

  const featuredProducts = useMemo(
    () => products.filter((p) => p.featured),
    [products]
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
    isLoading: convexProducts === undefined,
  };
}
