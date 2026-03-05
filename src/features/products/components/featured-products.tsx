'use client';

import Link from 'next/link';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { ProductGrid } from './product-grid';
import { useProducts } from '../hooks/use-products';
import { useCart } from '@/hooks/use-cart';
import type { SeedProduct } from '../types';

export interface FeaturedProductsProps {
  locale: string;
}

export function FeaturedProducts({ locale }: FeaturedProductsProps) {
  const { featuredProducts } = useProducts();
  const { addItem } = useCart();
  const isRtl = locale === 'ar';

  const handleAddToCart = (product: SeedProduct) => {
    addItem({
      productId: product._id,
      name: product.name,
      price: product.price,
      image: product.images[0],
    });
    toast.success(isRtl ? 'تمت الإضافة إلى السلة' : 'Produit ajoute au panier');
  };

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-10">
          <div className="space-y-2">
            <p className="text-sm font-medium tracking-[0.15em] uppercase text-honey">
              {isRtl ? 'اختيارنا' : 'Notre selection'}
            </p>
            <h2 className="font-[var(--font-display)] text-3xl font-bold tracking-tight md:text-4xl">
              {isRtl ? 'عسلنا المميز' : 'Nos miels vedettes'}
            </h2>
          </div>
          <Link
            href={`/${locale}/products`}
            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
          >
            {isRtl ? 'عرض جميع أنواع العسل' : 'Voir tous les miels'}
            {isRtl ? (
              <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
            ) : (
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            )}
          </Link>
        </div>
        <ProductGrid
          products={featuredProducts}
          locale={locale}
          onAddToCart={handleAddToCart}
        />
      </div>
    </section>
  );
}
