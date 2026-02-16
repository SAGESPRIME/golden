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
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            {isRtl ? 'عسلنا المميز' : 'Nos miels vedettes'}
          </h2>
          <Link
            href={`/${locale}/products`}
            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            {isRtl ? 'عرض جميع أنواع العسل' : 'Voir tous les miels'}
            {isRtl ? <ArrowLeft className="size-4" /> : <ArrowRight className="size-4" />}
          </Link>
        </div>
        <ProductGrid products={featuredProducts} locale={locale} onAddToCart={handleAddToCart} />
      </div>
    </section>
  );
}
