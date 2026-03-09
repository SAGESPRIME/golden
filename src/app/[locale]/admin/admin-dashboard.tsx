'use client';

import { useQuery } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { AdminLayout } from '@/features/admin';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, ShoppingCart, DollarSign } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

interface AdminDashboardProps {
  locale: string;
}

export function AdminDashboard({ locale }: AdminDashboardProps) {
  const products = useQuery(api.products.list);
  const orders = useQuery(api.orders.listAll);
  const isRtl = locale === 'ar';

  const totalRevenue =
    orders?.reduce(
      (sum: number, o: { status: string; totalAmount: number }) => {
        return o.status !== 'cancelled' ? sum + o.totalAmount : sum;
      },
      0
    ) ?? 0;

  const stats = [
    {
      label: isRtl ? 'إجمالي المنتجات' : 'Total produits',
      value: products?.length ?? 0,
      icon: Package,
    },
    {
      label: isRtl ? 'إجمالي الطلبات' : 'Total commandes',
      value: orders?.length ?? 0,
      icon: ShoppingCart,
    },
    {
      label: isRtl ? 'الإيرادات' : "Chiffre d'affaires",
      value: formatPrice(totalRevenue, locale),
      icon: DollarSign,
    },
  ];

  return (
    <AdminLayout locale={locale}>
      <h1 className="mb-6 text-2xl font-bold">
        {isRtl ? 'لوحة التحكم' : 'Tableau de bord'}
      </h1>
      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </CardTitle>
              <stat.icon className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </AdminLayout>
  );
}
