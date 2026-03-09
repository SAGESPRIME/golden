'use client';

import { useQuery, useMutation } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import type { Id } from '../../../../convex/_generated/dataModel';
import Link from 'next/link';
import { Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatPrice } from '@/lib/utils';
import type { Product } from '@/types';

interface ProductTableProps {
  locale: string;
}

export function ProductTable({ locale }: ProductTableProps) {
  const products = useQuery(api.products.list);
  const removeProduct = useMutation(api.products.remove);
  const isRtl = locale === 'ar';

  if (!products) {
    return (
      <p className="text-muted-foreground">
        {isRtl ? 'جار التحميل...' : 'Chargement...'}
      </p>
    );
  }

  const handleDelete = async (id: Id<'products'>) => {
    if (
      confirm(
        isRtl ? 'هل أنت متأكد من حذف هذا المنتج؟' : 'Supprimer ce produit ?'
      )
    ) {
      await removeProduct({ id });
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{isRtl ? 'المنتج' : 'Produit'}</TableHead>
          <TableHead>{isRtl ? 'الفئة' : 'Categorie'}</TableHead>
          <TableHead>{isRtl ? 'السعر' : 'Prix'}</TableHead>
          <TableHead>{isRtl ? 'الحالة' : 'Statut'}</TableHead>
          <TableHead className="text-end">
            {isRtl ? 'إجراءات' : 'Actions'}
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product: Product) => (
          <TableRow key={product._id}>
            <TableCell className="font-medium">
              {isRtl ? product.name.ar : product.name.fr}
            </TableCell>
            <TableCell>{product.category}</TableCell>
            <TableCell>{formatPrice(product.price, locale)}</TableCell>
            <TableCell>
              {product.inStock ? (
                <Badge variant="secondary">
                  {isRtl ? 'متوفر' : 'En stock'}
                </Badge>
              ) : (
                <Badge variant="destructive">{isRtl ? 'نفذ' : 'Rupture'}</Badge>
              )}
            </TableCell>
            <TableCell className="text-end">
              <div className="flex justify-end gap-1">
                <Button variant="ghost" size="icon" asChild>
                  <Link href={`/${locale}/admin/products/${product._id}/edit`}>
                    <Pencil className="size-4" />
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(product._id as Id<'products'>)}
                >
                  <Trash2 className="size-4 text-destructive" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
