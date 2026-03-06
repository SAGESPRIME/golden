'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Star } from 'lucide-react';
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

export function ProductCard({
  product,
  locale,
  onAddToCart,
}: ProductCardProps) {
  const name = locale === 'ar' ? product.name.ar : product.name.fr;
  const isRtl = locale === 'ar';
  const hasPromo = product.compareAtPrice !== undefined;

  return (
    <div
      className={cn(
        'group flex flex-col bg-card border border-border/50 overflow-hidden',
        !product.inStock && 'opacity-70'
      )}
    >
      <Link
        href={`/${locale}/products/${product.slug}`}
        className="block relative aspect-square overflow-hidden bg-secondary/30"
      >
        <Image
          src={product.images[0]}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute top-3 start-3 flex flex-col gap-1.5">
          {hasPromo && product.inStock && (
            <Badge className="rounded-sm bg-primary text-primary-foreground text-xs px-2">
              {isRtl ? 'عرض' : 'Promo'}
            </Badge>
          )}
          {!product.inStock && (
            <Badge variant="destructive" className="rounded-sm text-xs px-2">
              {isRtl ? 'نفذ' : 'Rupture'}
            </Badge>
          )}
        </div>
      </Link>

      <div className="flex flex-col gap-2 p-4 flex-1">
        <div className="flex items-center justify-between gap-2">
          <Badge
            variant="outline"
            className="text-xs rounded-sm border-border/60 shrink-0"
          >
            {product.category}
          </Badge>
          <span className="text-xs text-muted-foreground">
            {product.weight}g
          </span>
        </div>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star key={i} className="size-3 fill-gold-400 text-gold-400" />
          ))}
          <span className="text-xs text-muted-foreground ms-1">4.8/5</span>
        </div>
        <Link href={`/${locale}/products/${product.slug}`} className="block">
          <h3 className="font-semibold text-sm line-clamp-2 hover:text-primary transition-colors">
            {name}
          </h3>
        </Link>
        <div className="flex items-center gap-2">
          <span className="font-bold text-primary">
            {formatPrice(product.price, locale)}
          </span>
          {hasPromo && (
            <span className="text-xs text-muted-foreground line-through">
              {formatPrice(product.compareAtPrice!, locale)}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-1.5 mt-auto pt-1">
          <Button
            size="sm"
            className="w-full rounded-none uppercase tracking-wider text-[10px] sm:text-xs font-bold px-1"
            disabled={!product.inStock}
            onClick={() => onAddToCart?.(product)}
          >
            {isRtl ? 'أضف للسلة' : 'AU PANIER'}
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="w-full rounded-none uppercase tracking-wider text-[10px] sm:text-xs font-bold px-1"
            asChild
          >
            <Link href={`/${locale}/products/${product.slug}`}>
              {isRtl ? 'عرض المنتج' : 'VOIR'}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
