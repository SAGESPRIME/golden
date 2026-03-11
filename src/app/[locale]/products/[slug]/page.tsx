import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { fetchQuery } from 'convex/nextjs';
import { api } from '../../../../../convex/_generated/api';
import { seedProducts } from '@/features/products/data/seed';
import { ProductDetail } from '@/features/products/components/product-detail';
import { generatePageMetadata, generateProductSchema } from '@/lib/metadata';
import type { SeedProduct } from '@/features/products/types';

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return seedProducts.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;

  let product: SeedProduct | undefined;
  try {
    const convexProduct = await fetchQuery(api.products.getBySlug, { slug });
    if (convexProduct) {
      product = { ...convexProduct, _id: convexProduct._id.toString() };
    }
  } catch {
    product = seedProducts.find((p) => p.slug === slug);
  }

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

  let product: SeedProduct | undefined;
  try {
    const convexProduct = await fetchQuery(api.products.getBySlug, { slug });
    if (convexProduct) {
      product = { ...convexProduct, _id: convexProduct._id.toString() };
    }
  } catch {}

  if (!product) {
    product = seedProducts.find((p) => p.slug === slug);
  }

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
