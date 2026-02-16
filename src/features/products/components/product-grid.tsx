'use client';

import { ProductCard } from './product-card';
import type { SeedProduct } from '../types';

export interface ProductGridProps {
  products: SeedProduct[];
  locale: string;
  onAddToCart?: (product: SeedProduct) => void;
}

export function ProductGrid({ products, locale, onAddToCart }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <p className="text-center text-muted-foreground py-12">
        {locale === 'ar' ? 'لا توجد منتجات في هذه الفئة' : 'Aucun produit dans cette categorie'}
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
          locale={locale}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
}
