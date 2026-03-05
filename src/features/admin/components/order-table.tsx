'use client';

import { useQuery, useMutation } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import type { Id } from '../../../../convex/_generated/dataModel';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { OrderStatusBadge } from '@/features/account';
import { formatPrice, formatDate } from '@/lib/utils';
import type { Order } from '@/types';

interface OrderTableProps {
  locale: string;
}

const statuses = [
  'pending',
  'paid',
  'shipped',
  'delivered',
  'cancelled',
] as const;

export function OrderTable({ locale }: OrderTableProps) {
  const orders = useQuery(api.orders.listAll);
  const updateStatus = useMutation(api.orders.updateStatus);
  const isRtl = locale === 'ar';

  if (!orders) {
    return (
      <p className="text-muted-foreground">
        {isRtl ? 'جار التحميل...' : 'Chargement...'}
      </p>
    );
  }

  if (orders.length === 0) {
    return (
      <p className="text-muted-foreground">
        {isRtl ? 'لا توجد طلبات.' : 'Aucune commande.'}
      </p>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{isRtl ? 'رقم الطلب' : 'N°'}</TableHead>
          <TableHead>{isRtl ? 'التاريخ' : 'Date'}</TableHead>
          <TableHead>{isRtl ? 'المجموع' : 'Total'}</TableHead>
          <TableHead>{isRtl ? 'الحالة' : 'Statut'}</TableHead>
          <TableHead>{isRtl ? 'تحديث' : 'Modifier'}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order: Order) => (
          <TableRow key={order._id}>
            <TableCell className="font-mono text-xs">
              {order._id.slice(-6)}
            </TableCell>
            <TableCell>{formatDate(order.createdAt, locale)}</TableCell>
            <TableCell>{formatPrice(order.totalAmount, locale)}</TableCell>
            <TableCell>
              <OrderStatusBadge status={order.status} locale={locale} />
            </TableCell>
            <TableCell>
              <Select
                value={order.status}
                onValueChange={(v) =>
                  updateStatus({
                    id: order._id as Id<'orders'>,
                    status: v as (typeof statuses)[number],
                  })
                }
              >
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {statuses.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
