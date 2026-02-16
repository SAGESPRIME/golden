import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { CartContent } from '@/features/cart';
import { generatePageMetadata } from '@/lib/metadata';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata({
    title: locale === 'ar' ? 'سلة التسوق' : 'Panier',
    description:
      locale === 'ar'
        ? 'استعرض سلة التسوق الخاصة بك.'
        : 'Consultez votre panier d\'achat.',
    path: '/cart',
    locale,
  });
}

export default async function CartPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <CartPageContent locale={locale} />;
}

function CartPageContent({ locale }: { locale: string }) {
  const t = useTranslations('cart');

  return (
    <main className="container mx-auto px-4 py-8 md:py-12">
      <h1 className="text-3xl font-bold tracking-tight mb-8">{t('title')}</h1>
      <CartContent locale={locale} />
    </main>
  );
}
