import { setRequestLocale } from 'next-intl/server';
import { OrdersAdmin } from './orders-admin';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function AdminOrdersPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <OrdersAdmin locale={locale} />;
}
