import { setRequestLocale } from 'next-intl/server';
import { ProductsAdmin } from './products-admin';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function AdminProductsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ProductsAdmin locale={locale} />;
}
