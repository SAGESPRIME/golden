import { setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { ProductCatalog } from '@/features/products/components/product-catalog';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function ProductsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ProductsContent locale={locale} />;
}

function ProductsContent({ locale }: { locale: string }) {
  const t = useTranslations('products');

  return (
    <main className="container mx-auto px-4 py-8 md:py-12">
      <h1 className="text-3xl font-bold tracking-tight mb-8">{t('title')}</h1>
      <ProductCatalog locale={locale} />
    </main>
  );
}
