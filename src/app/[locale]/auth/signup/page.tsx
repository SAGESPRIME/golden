import { setRequestLocale } from 'next-intl/server';
import { SignupForm } from '@/features/auth';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function SignupPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isRtl = locale === 'ar';

  return (
    <div className="container mx-auto flex min-h-[60vh] max-w-md flex-col justify-center px-4 py-16">
      <h1 className="mb-8 text-center text-2xl font-bold">
        {isRtl ? 'إنشاء حساب' : 'Creer un compte'}
      </h1>
      <SignupForm locale={locale} />
    </div>
  );
}
