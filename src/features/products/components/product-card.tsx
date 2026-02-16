'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/lib/utils';
import { cn } from '@/lib/utils';
import type { SeedProduct } from '../types';

export interface ProductCardProps {
  product: SeedProduct;
  locale: string;
  onAddToCart?: (product: SeedProduct) => void;
}

export function ProductCard({ product, locale, onAddToCart }: ProductCardProps) {
  const name = locale === 'ar' ? product.name.ar : product.name.fr;
  const hasPromo = product.compareAtPrice !== undefined;

  return (
    <Card className={cn('overflow-hidden group', !product.inStock && 'opacity-60')}>
      <Link href={`/${locale}/products/${product.slug}`} className="block">
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={product.images[0]}
            alt={name}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute top-2 end-2 flex flex-col gap-1">
            {!product.inStock && (
              <Badge variant="destructive">Rupture de stock</Badge>
            )}
            {hasPromo && product.inStock && (
              <Badge variant="default">Promo</Badge>
            )}
          </div>
        </div>
      </Link>
      <CardContent className="space-y-2">
        <Badge variant="outline" className="text-xs">
          {product.category}
        </Badge>
        <Link href={`/${locale}/products/${product.slug}`} className="block">
          <h3 className="font-semibold line-clamp-1">{name}</h3>
        </Link>
        <div className="flex items-center gap-2">
          <span className="font-bold text-primary">
            {formatPrice(product.price, locale)}
          </span>
          {hasPromo && (
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(product.compareAtPrice!, locale)}
            </span>
          )}
        </div>
        <p className="text-xs text-muted-foreground">{product.weight}g</p>
        {onAddToCart && (
          <Button
            size="sm"
            className="w-full"
            disabled={!product.inStock}
            onClick={() => onAddToCart(product)}
          >
            <ShoppingCart className="size-4" />
            {locale === 'ar' ? 'أضف إلى السلة' : 'Ajouter au panier'}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
