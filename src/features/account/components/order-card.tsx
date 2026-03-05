'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { formatPrice, formatDate } from '@/lib/utils';
import { OrderStatusBadge } from './order-status-badge';
import type { Order } from '@/types';

interface OrderCardProps {
  order: Order;
  locale: string;
}

export function OrderCard({ order, locale }: OrderCardProps) {
  const isRtl = locale === 'ar';
  const itemCount = order.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="text-sm font-medium">
          {isRtl
            ? `طلب #${order._id.slice(-6)}`
            : `Commande #${order._id.slice(-6)}`}
        </div>
        <OrderStatusBadge status={order.status} locale={locale} />
      </CardHeader>
      <CardContent className="space-y-1">
        <p className="text-sm text-muted-foreground">
          {formatDate(order.createdAt, locale)}
        </p>
        <p className="text-sm">
          {isRtl ? `${itemCount} عنصر` : `${itemCount} article(s)`}
        </p>
        <p className="font-semibold">
          {formatPrice(order.totalAmount, locale)}
        </p>
      </CardContent>
    </Card>
  );
}
