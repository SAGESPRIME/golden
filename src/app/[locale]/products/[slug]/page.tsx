import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { seedProducts } from '@/features/products/data/seed';
import { ProductDetail } from '@/features/products/components/product-detail';
import { generatePageMetadata, generateProductSchema } from '@/lib/metadata';

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return seedProducts.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const product = seedProducts.find((p) => p.slug === slug);
  if (!product) return {};

  const name = locale === 'ar' ? product.name.ar : product.name.fr;
  const description =
    locale === 'ar' ? product.description.ar : product.description.fr;

  return generatePageMetadata({
    title: name,
    description,
    path: `/products/${slug}`,
    locale,
  });
}

export default async function ProductPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const product = seedProducts.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  const productSchema = generateProductSchema(product, locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <main className="container mx-auto px-4 py-8 md:py-12">
        <ProductDetail product={product} locale={locale} />
      </main>
    </>
  );
}
