'use client';

import { useState } from 'react';
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { OrderStatusBadge } from '@/features/account';
import { formatPrice, formatDate } from '@/lib/utils';
import type { Order } from '@/types';

interface OrderTableProps {
  locale: string;
}

type OrderStatus = 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';

const statuses: OrderStatus[] = [
  'pending',
  'paid',
  'shipped',
  'delivered',
  'cancelled',
];

const statusLabels: Record<OrderStatus, string> = {
  pending: 'En attente',
  paid: 'Payée',
  shipped: 'Expédiée',
  delivered: 'Livrée',
  cancelled: 'Annulée',
};

export function OrderTable({ locale }: OrderTableProps) {
  const orders = useQuery(api.orders.listAll);
  const updateStatus = useMutation(api.orders.updateStatus);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [filterStatus, setFilterStatus] = useState<OrderStatus | 'all'>('all');
  const isRtl = locale === 'ar';

  if (!orders) {
    return (
      <p className="text-muted-foreground">
        {isRtl ? 'جار التحميل...' : 'Chargement...'}
      </p>
    );
  }

  const filtered =
    filterStatus === 'all'
      ? orders
      : orders.filter((o: Order) => o.status === filterStatus);

  if (orders.length === 0) {
    return (
      <p className="text-muted-foreground">
        {isRtl ? 'لا توجد طلبات.' : 'Aucune commande.'}
      </p>
    );
  }

  return (
    <>
      {/* Filters */}
      <div className="mb-4 flex flex-wrap gap-2">
        {(['all', ...statuses] as const).map((s) => (
          <Button
            key={s}
            size="sm"
            variant={filterStatus === s ? 'default' : 'outline'}
            onClick={() => setFilterStatus(s)}
          >
            {s === 'all' ? 'Toutes' : statusLabels[s]}
            {s !== 'all' && (
              <Badge variant="secondary" className="ms-1 text-xs">
                {orders.filter((o: Order) => o.status === s).length}
              </Badge>
            )}
          </Button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-muted-foreground text-sm">
          Aucune commande avec ce statut.
        </p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{isRtl ? 'رقم' : 'N°'}</TableHead>
              <TableHead>{isRtl ? 'التاريخ' : 'Date'}</TableHead>
              <TableHead>{isRtl ? 'العميل' : 'Client'}</TableHead>
              <TableHead>{isRtl ? 'المنتجات' : 'Articles'}</TableHead>
              <TableHead>{isRtl ? 'المجموع' : 'Total'}</TableHead>
              <TableHead>{isRtl ? 'الحالة' : 'Statut'}</TableHead>
              <TableHead>{isRtl ? 'تحديث' : 'Modifier'}</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((order: Order) => (
              <TableRow key={order._id}>
                <TableCell className="font-mono text-xs text-muted-foreground">
                  #{order._id.slice(-6).toUpperCase()}
                </TableCell>
                <TableCell className="text-sm">
                  {formatDate(order.createdAt, locale)}
                </TableCell>
                <TableCell className="text-sm">
                  <div>{order.shippingAddress?.fullName ?? '—'}</div>
                  {order.email && (
                    <div className="text-xs text-muted-foreground">
                      {order.email}
                    </div>
                  )}
                </TableCell>
                <TableCell className="text-sm">
                  {order.items.reduce((s, i) => s + i.quantity, 0)}{' '}
                  {isRtl ? 'قطعة' : 'article(s)'}
                </TableCell>
                <TableCell className="font-medium">
                  {formatPrice(order.totalAmount, locale)}
                </TableCell>
                <TableCell>
                  <OrderStatusBadge status={order.status} locale={locale} />
                </TableCell>
                <TableCell>
                  <Select
                    value={order.status}
                    onValueChange={(v) =>
                      updateStatus({
                        id: order._id as Id<'orders'>,
                        status: v as OrderStatus,
                      })
                    }
                  >
                    <SelectTrigger className="w-36">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {statuses.map((s) => (
                        <SelectItem key={s} value={s}>
                          {statusLabels[s]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setSelectedOrder(order)}
                  >
                    {isRtl ? 'تفاصيل' : 'Détails'}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {/* Order Detail Modal */}
      <Dialog
        open={!!selectedOrder}
        onOpenChange={(o) => !o && setSelectedOrder(null)}
      >
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {isRtl ? 'تفاصيل الطلب' : 'Détail de la commande'}{' '}
              <span className="font-mono text-sm text-muted-foreground">
                #{selectedOrder?._id.slice(-6).toUpperCase()}
              </span>
            </DialogTitle>
          </DialogHeader>

          {selectedOrder && (
            <div className="space-y-5 text-sm">
              {/* Status + date */}
              <div className="flex items-center justify-between">
                <OrderStatusBadge
                  status={selectedOrder.status}
                  locale={locale}
                />
                <span className="text-muted-foreground">
                  {formatDate(selectedOrder.createdAt, locale)}
                </span>
              </div>

              {/* Items */}
              <div>
                <p className="mb-2 font-semibold">
                  {isRtl ? 'المنتجات' : 'Articles commandés'}
                </p>
                <div className="divide-y rounded-lg border">
                  {selectedOrder.items.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between px-3 py-2"
                    >
                      <div>
                        <p className="font-medium">
                          {locale === 'ar' ? item.name.ar : item.name.fr}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {isRtl ? 'الكمية' : 'Qté'} : {item.quantity} ×{' '}
                          {formatPrice(item.price, locale)}
                        </p>
                      </div>
                      <p className="font-medium">
                        {formatPrice(item.price * item.quantity, locale)}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mt-2 flex justify-end font-semibold">
                  Total : {formatPrice(selectedOrder.totalAmount, locale)}
                </div>
              </div>

              {/* Shipping address */}
              <div>
                <p className="mb-2 font-semibold">
                  {isRtl ? 'عنوان التوصيل' : 'Adresse de livraison'}
                </p>
                <div className="rounded-lg border px-3 py-2 space-y-0.5 text-muted-foreground">
                  <p className="font-medium text-foreground">
                    {selectedOrder.shippingAddress.fullName}
                  </p>
                  <p>{selectedOrder.shippingAddress.address}</p>
                  <p>
                    {selectedOrder.shippingAddress.postalCode}{' '}
                    {selectedOrder.shippingAddress.city}
                  </p>
                  <p>{selectedOrder.shippingAddress.country}</p>
                  <p>{selectedOrder.shippingAddress.phone}</p>
                </div>
              </div>

              {/* Change status inline */}
              <div>
                <p className="mb-2 font-semibold">
                  {isRtl ? 'تحديث الحالة' : 'Changer le statut'}
                </p>
                <Select
                  value={selectedOrder.status}
                  onValueChange={(v) => {
                    const newStatus = v as OrderStatus;
                    updateStatus({
                      id: selectedOrder._id as Id<'orders'>,
                      status: newStatus,
                    });
                    setSelectedOrder({ ...selectedOrder, status: newStatus });
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {statuses.map((s) => (
                      <SelectItem key={s} value={s}>
                        {statusLabels[s]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
