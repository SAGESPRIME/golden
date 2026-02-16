import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { CheckoutContent } from '@/features/checkout';
import { generatePageMetadata } from '@/lib/metadata';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata({
    title: locale === 'ar' ? 'الدفع' : 'Paiement',
    description:
      locale === 'ar'
        ? 'اتمم عملية الشراء.'
        : 'Finalisez votre commande.',
    path: '/checkout',
    locale,
  });
}

export default async function CheckoutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <CheckoutPageContent locale={locale} />;
}

function CheckoutPageContent({ locale }: { locale: string }) {
  const t = useTranslations('checkout');

  return (
    <main className="container mx-auto px-4 py-8 md:py-12">
      <h1 className="text-3xl font-bold tracking-tight mb-8">{t('title')}</h1>
      <CheckoutContent locale={locale} />
    </main>
  );
}
