'use client';

import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/use-cart';
import { CartItemRow } from './cart-item-row';
import { CartSummary } from './cart-summary';

export function CartContent({ locale }: { locale: string }) {
  const { items, updateQuantity, removeItem, totalItems, totalPrice } = useCart();
  const router = useRouter();
  const isRtl = locale === 'ar';

  const handleCheckout = () => {
    router.push(`/${locale}/checkout`);
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <ShoppingCart className="size-16 text-muted-foreground" />
        <h2 className="text-xl font-semibold">
          {isRtl ? 'سلتك فارغة' : 'Votre panier est vide'}
        </h2>
        <Button asChild>
          <Link href={`/${locale}/products`}>
            {isRtl ? 'متابعة التسوق' : 'Continuer vos achats'}
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      <div className="lg:col-span-2">
        {items.map((item) => (
          <CartItemRow
            key={item.productId}
            item={item}
            locale={locale}
            onUpdateQuantity={updateQuantity}
            onRemove={removeItem}
          />
        ))}
        <div className="mt-4">
          <Button variant="outline" asChild>
            <Link href={`/${locale}/products`}>
              {isRtl ? 'متابعة التسوق' : 'Continuer vos achats'}
            </Link>
          </Button>
        </div>
      </div>
      <div>
        <CartSummary
          totalPrice={totalPrice}
          totalItems={totalItems}
          locale={locale}
          onCheckout={handleCheckout}
        />
      </div>
    </div>
  );
}
