'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/hooks/use-cart';
import { formatPrice } from '@/lib/utils';
import { CheckoutForm } from './checkout-form';
import type { ShippingAddressFormData } from '@/lib/validators';

export function CheckoutContent({ locale }: { locale: string }) {
  const { items, totalPrice, totalItems, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isRtl = locale === 'ar';

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

  const handleSubmit = async (shippingAddress: ShippingAddressFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items, shippingAddress, locale }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? 'Checkout failed');
      }

      clearCart();
      window.location.href = data.url;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erreur';
      toast.error(message);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>{isRtl ? 'عنوان التوصيل' : 'Adresse de livraison'}</CardTitle>
          </CardHeader>
          <CardContent>
            <CheckoutForm locale={locale} onSubmit={handleSubmit} isSubmitting={isSubmitting} />
          </CardContent>
        </Card>
      </div>

      <div>
        <Card>
          <CardHeader>
            <CardTitle>{isRtl ? 'ملخص الطلب' : 'Resume'}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {items.map((item) => (
              <div key={item.productId} className="flex justify-between text-sm">
                <span>
                  {isRtl ? item.name.ar : item.name.fr} x{item.quantity}
                </span>
                <span>{formatPrice(item.price * item.quantity, locale)}</span>
              </div>
            ))}
            <Separator />
            <div className="flex justify-between font-bold">
              <span>{isRtl ? 'المجموع' : 'Total'} ({totalItems})</span>
              <span className="text-primary">{formatPrice(totalPrice, locale)}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
