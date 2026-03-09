'use client';

import { AdminLayout, OrderTable } from '@/features/admin';

interface OrdersAdminProps {
  locale: string;
}

export function OrdersAdmin({ locale }: OrdersAdminProps) {
  const isRtl = locale === 'ar';

  return (
    <AdminLayout locale={locale}>
      <h1 className="mb-6 text-2xl font-bold">
        {isRtl ? 'الطلبات' : 'Commandes'}
      </h1>
      <OrderTable locale={locale} />
    </AdminLayout>
  );
}
