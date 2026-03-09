'use client';

import { useQuery } from 'convex/react';
import { api } from '../../../../../../../convex/_generated/api';
import type { Id } from '../../../../../../../convex/_generated/dataModel';
import { AdminLayout, ProductForm } from '@/features/admin';

interface EditProductContentProps {
  locale: string;
  productId: string;
}

export function EditProductContent({
  locale,
  productId,
}: EditProductContentProps) {
  const product = useQuery(api.products.getById, {
    id: productId as Id<'products'>,
  });
  const isRtl = locale === 'ar';

  return (
    <AdminLayout locale={locale}>
      <h1 className="mb-6 text-2xl font-bold">
        {isRtl ? 'تعديل المنتج' : 'Modifier le produit'}
      </h1>
      {product === undefined && (
        <p className="text-muted-foreground">
          {isRtl ? 'جار التحميل...' : 'Chargement...'}
        </p>
      )}
      {product === null && (
        <p className="text-destructive">
          {isRtl ? 'المنتج غير موجود' : 'Produit introuvable'}
        </p>
      )}
      {product && (
        <ProductForm
          locale={locale}
          initialData={{
            _id: product._id,
            name: product.name,
            description: product.description,
            slug: product.slug,
            price: product.price,
            compareAtPrice: product.compareAtPrice,
            images: product.images,
            category: product.category,
            weight: product.weight,
            inStock: product.inStock,
            featured: product.featured,
          }}
        />
      )}
    </AdminLayout>
  );
}
