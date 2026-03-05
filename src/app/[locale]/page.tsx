import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { FeaturedProducts } from '@/features/products/components/featured-products';
import {
  HeroSection,
  TrustStats,
  CategoryGrid,
  StorySection,
  TestimonialsSection,
  ServicesStrip,
} from '@/features/home';
import {
  generatePageMetadata,
  generateOrganizationSchema,
} from '@/lib/metadata';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata({
    title:
      locale === 'ar'
        ? 'Golden Defla — عسل فرنسي عضوي فاخر'
        : 'Golden Defla — Miel bio français premium',
    description:
      locale === 'ar'
        ? 'اكتشف تشكيلتنا من العسل الفرنسي العضوي الفاخر، يُحصد بشغف من أجمل أراضي فرنسا.'
        : 'Découvrez notre sélection de miels bio français premium, récoltés avec passion dans les terroirs de France.',
    path: '',
    locale,
  });
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const orgSchema = generateOrganizationSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      <main className="flex flex-col">
        <HeroSection locale={locale} />
        <TrustStats locale={locale} />
        <CategoryGrid locale={locale} />
        <FeaturedProducts locale={locale} />
        <TestimonialsSection locale={locale} />
        <StorySection locale={locale} />
        <ServicesStrip locale={locale} />
      </main>
    </>
  );
}
