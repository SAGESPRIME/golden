import type { Metadata } from 'next';
import type { SeedProduct } from '@/features/products/types';

const SITE_NAME = 'Golden Defla';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://goldendefla.com';

interface PageMetadataOptions {
  title: string;
  description: string;
  path: string;
  locale?: string;
}

export function generatePageMetadata({
  title,
  description,
  path,
  locale = 'fr',
}: PageMetadataOptions): Metadata {
  const fullTitle = `${title} | ${SITE_NAME}`;
  const url = `${SITE_URL}/${locale}${path}`;

  return {
    title: fullTitle,
    description,
    alternates: {
      canonical: url,
      languages: {
        fr: `${SITE_URL}/fr${path}`,
        ar: `${SITE_URL}/ar${path}`,
      },
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      locale: locale === 'ar' ? 'ar_DZ' : 'fr_FR',
      type: 'website',
    },
  };
}

export function generateProductSchema(product: SeedProduct, locale: string) {
  const name = locale === 'ar' ? product.name.ar : product.name.fr;
  const description = locale === 'ar' ? product.description.ar : product.description.fr;

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    image: product.images[0],
    offers: {
      '@type': 'Offer',
      price: (product.price / 100).toFixed(2),
      priceCurrency: 'EUR',
      availability: product.inStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
    },
    weight: {
      '@type': 'QuantitativeValue',
      value: product.weight,
      unitCode: 'GRM',
    },
  };
}

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    description: "Miel premium d'Algerie, recolte avec passion et tradition.",
  };
}
