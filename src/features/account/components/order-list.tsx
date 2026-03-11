'use client';

import { useQuery } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { useAuth } from '@/hooks/use-auth';
import { OrderCard } from './order-card';
import type { Order } from '@/types';

interface OrderListProps {
  locale: string;
}

export function OrderList({ locale }: OrderListProps) {
  const { isAuthenticated } = useAuth();
  const isRtl = locale === 'ar';

  // listByUser reads userId from auth context server-side — skip if not logged in
  const orders = useQuery(api.orders.listByUser, isAuthenticated ? {} : 'skip');

  if (orders === undefined) {
    return (
      <p className="text-muted-foreground">
        {isRtl ? 'جار التحميل...' : 'Chargement...'}
      </p>
    );
  }

  if (orders.length === 0) {
    return (
      <p className="text-muted-foreground">
        {isRtl ? 'ليس لديك طلبات بعد.' : "Vous n'avez pas encore de commande."}
      </p>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {orders.map((order: Order) => (
        <OrderCard key={order._id} order={order} locale={locale} />
      ))}
    </div>
  );
}
