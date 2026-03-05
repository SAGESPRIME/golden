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
        ? 'Golden Defla — عسل جزائري فاخر'
        : 'Golden Defla — Miel alg\u00E9rien premium',
    description:
      locale === 'ar'
        ? 'اكتشف تشكيلتنا من العسل الجزائري الفاخر، يُحصد بشغف وتقاليد عريقة في جبال الجزائر.'
        : "D\u00E9couvrez notre s\u00E9lection de miels alg\u00E9riens premium, r\u00E9colt\u00E9s avec passion dans les montagnes d'Alg\u00E9rie.",
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
