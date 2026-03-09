'use client';

import Link from 'next/link';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AdminLayout, ProductTable } from '@/features/admin';

interface ProductsAdminProps {
  locale: string;
}

export function ProductsAdmin({ locale }: ProductsAdminProps) {
  const isRtl = locale === 'ar';

  return (
    <AdminLayout locale={locale}>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          {isRtl ? 'المنتجات' : 'Produits'}
        </h1>
        <Button asChild>
          <Link href={`/${locale}/admin/products/new`}>
            <Plus className="me-2 size-4" />
            {isRtl ? 'منتج جديد' : 'Nouveau produit'}
          </Link>
        </Button>
      </div>
      <ProductTable locale={locale} />
    </AdminLayout>
  );
}
