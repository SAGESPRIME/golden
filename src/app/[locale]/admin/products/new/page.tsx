import { setRequestLocale } from 'next-intl/server';
import { NewProductContent } from './new-product-content';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function NewProductPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <NewProductContent locale={locale} />;
}
