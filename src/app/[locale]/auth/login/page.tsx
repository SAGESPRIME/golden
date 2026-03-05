import { setRequestLocale } from 'next-intl/server';
import { LoginForm } from '@/features/auth';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function LoginPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isRtl = locale === 'ar';

  return (
    <div className="container mx-auto flex min-h-[60vh] max-w-md flex-col justify-center px-4 py-16">
      <h1 className="mb-8 text-center text-2xl font-bold">
        {isRtl ? 'تسجيل الدخول' : 'Connexion'}
      </h1>
      <LoginForm locale={locale} />
    </div>
  );
}
