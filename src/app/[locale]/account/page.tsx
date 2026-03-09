import { setRequestLocale } from 'next-intl/server';
import { AccountContent } from './account-content';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function AccountPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <AccountContent locale={locale} />;
}
