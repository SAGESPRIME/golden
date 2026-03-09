import { setRequestLocale } from 'next-intl/server';
import { EditProductContent } from './edit-product-content';

type Props = {
  params: Promise<{ locale: string; id: string }>;
};

export default async function EditProductPage({ params }: Props) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  return <EditProductContent locale={locale} productId={id} />;
}
