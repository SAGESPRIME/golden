'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { formatPrice } from '@/lib/utils';
import { ImageGallery } from './image-gallery';
import { AddToCartButton } from './add-to-cart-button';
import type { SeedProduct } from '../types';

export interface ProductDetailProps {
  product: SeedProduct;
  locale: string;
  onAddToCart?: (product: SeedProduct) => void;
}

export function ProductDetail({ product, locale }: ProductDetailProps) {
  const name = locale === 'ar' ? product.name.ar : product.name.fr;
  const description = locale === 'ar' ? product.description.ar : product.description.fr;
  const isRtl = locale === 'ar';
  const hasPromo = product.compareAtPrice !== undefined;
  const discount = hasPromo
    ? Math.round((1 - product.price / product.compareAtPrice!) * 100)
    : 0;

  return (
    <div>
      <Link
        href={`/${locale}/products`}
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6"
      >
        {isRtl ? <ArrowRight className="size-4" /> : <ArrowLeft className="size-4" />}
        {isRtl ? 'العودة إلى الكتالوج' : 'Retour au catalogue'}
      </Link>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <ImageGallery images={product.images} alt={name} />

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Badge variant="outline">{product.category}</Badge>
            {!product.inStock && (
              <Badge variant="destructive">
                {isRtl ? 'نفذ من المخزون' : 'Rupture de stock'}
              </Badge>
            )}
          </div>

          <h1 className="text-3xl font-bold">{name}</h1>

          <div className="flex items-baseline gap-3">
            <span className="text-2xl font-bold text-primary">
              {formatPrice(product.price, locale)}
            </span>
            {hasPromo && (
              <>
                <span className="text-lg text-muted-foreground line-through">
                  {formatPrice(product.compareAtPrice!, locale)}
                </span>
                <Badge variant="default">-{discount}%</Badge>
              </>
            )}
          </div>

          <p className="text-muted-foreground">{description}</p>

          <div className="text-sm text-muted-foreground">
            {isRtl ? `${product.weight} غرام` : `${product.weight}g`}
          </div>

          <Separator />

          <AddToCartButton product={product} locale={locale} size="lg" />
        </div>
      </div>
    </div>
  );
}
