'use client';

import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { formatPrice } from '@/lib/utils';

interface CartSummaryProps {
  totalPrice: number;
  totalItems: number;
  locale: string;
  onCheckout: () => void;
}

export function CartSummary({ totalPrice, totalItems, locale, onCheckout }: CartSummaryProps) {
  const isRtl = locale === 'ar';

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isRtl ? 'ملخص الطلب' : 'Resume de la commande'}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">
            {isRtl ? 'عدد المنتجات' : 'Articles'}
          </span>
          <span>{totalItems}</span>
        </div>
        <Separator />
        <div className="flex justify-between font-bold text-lg">
          <span>{isRtl ? 'المجموع' : 'Total'}</span>
          <span className="text-primary">{formatPrice(totalPrice, locale)}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" size="lg" disabled={totalItems === 0} onClick={onCheckout}>
          <ShoppingCart className="size-4" />
          {isRtl ? 'إتمام الطلب' : 'Commander'}
        </Button>
      </CardFooter>
    </Card>
  );
}
