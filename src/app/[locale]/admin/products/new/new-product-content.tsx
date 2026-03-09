'use client';

import { AdminLayout, ProductForm } from '@/features/admin';

interface NewProductContentProps {
  locale: string;
}

export function NewProductContent({ locale }: NewProductContentProps) {
  const isRtl = locale === 'ar';

  return (
    <AdminLayout locale={locale}>
      <h1 className="mb-6 text-2xl font-bold">
        {isRtl ? 'منتج جديد' : 'Nouveau produit'}
      </h1>
      <ProductForm locale={locale} />
    </AdminLayout>
  );
}
