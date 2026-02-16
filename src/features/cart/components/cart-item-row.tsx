'use client';

import Image from 'next/image';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/lib/utils';
import type { CartItem } from '@/stores/cart-store';

interface CartItemRowProps {
  item: CartItem;
  locale: string;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
}

export function CartItemRow({ item, locale, onUpdateQuantity, onRemove }: CartItemRowProps) {
  const name = locale === 'ar' ? item.name.ar : item.name.fr;
  const lineTotal = item.price * item.quantity;

  return (
    <div className="flex items-center gap-4 py-4 border-b last:border-b-0">
      <div className="relative size-20 shrink-0 overflow-hidden rounded-lg bg-muted">
        <Image src={item.image} alt={name} fill className="object-cover" sizes="80px" />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-medium truncate">{name}</h3>
        <p className="text-sm text-muted-foreground">
          {formatPrice(item.price, locale)}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon-xs"
          onClick={() => onUpdateQuantity(item.productId, item.quantity - 1)}
        >
          -
        </Button>
        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
        <Button
          variant="outline"
          size="icon-xs"
          onClick={() => onUpdateQuantity(item.productId, item.quantity + 1)}
        >
          +
        </Button>
      </div>

      <span className="w-24 text-end font-medium">{formatPrice(lineTotal, locale)}</span>

      <Button
        variant="ghost"
        size="icon-xs"
        onClick={() => onRemove(item.productId)}
        aria-label={locale === 'ar' ? 'حذف' : 'Supprimer'}
      >
        <Trash2 className="size-4 text-destructive" />
      </Button>
    </div>
  );
}
