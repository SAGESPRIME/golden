import { setRequestLocale } from 'next-intl/server';
import { SuccessContent } from './success-content';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function CheckoutSuccessPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <SuccessContent locale={locale} />;
}
