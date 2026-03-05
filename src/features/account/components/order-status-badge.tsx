'use client';

import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type OrderStatus = 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';

interface OrderStatusBadgeProps {
  status: OrderStatus;
  locale: string;
}

const statusLabels: Record<OrderStatus, { fr: string; ar: string }> = {
  pending: { fr: 'En attente', ar: 'قيد الانتظار' },
  paid: { fr: 'Payee', ar: 'مدفوع' },
  shipped: { fr: 'Expediee', ar: 'تم الشحن' },
  delivered: { fr: 'Livree', ar: 'تم التوصيل' },
  cancelled: { fr: 'Annulee', ar: 'ملغى' },
};

const statusColors: Record<OrderStatus, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  paid: 'bg-blue-100 text-blue-800',
  shipped: 'bg-purple-100 text-purple-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
};

export function OrderStatusBadge({ status, locale }: OrderStatusBadgeProps) {
  const label =
    locale === 'ar' ? statusLabels[status].ar : statusLabels[status].fr;

  return (
    <Badge variant="secondary" className={cn(statusColors[status])}>
      {label}
    </Badge>
  );
}
