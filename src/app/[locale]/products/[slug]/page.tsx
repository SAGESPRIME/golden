import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { seedProducts } from '@/features/products/data/seed';
import { ProductDetail } from '@/features/products/components/product-detail';

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return seedProducts.map((product) => ({ slug: product.slug }));
}

export default async function ProductPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const product = seedProducts.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  return (
    <main className="container mx-auto px-4 py-8 md:py-12">
      <ProductDetail product={product} locale={locale} />
    </main>
  );
}
