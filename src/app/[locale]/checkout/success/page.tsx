import { setRequestLocale } from 'next-intl/server';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function CheckoutSuccessPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const isRtl = locale === 'ar';

  return (
    <main className="container mx-auto px-4 py-20">
      <div className="flex flex-col items-center justify-center space-y-6 text-center">
        <CheckCircle className="size-20 text-green-500" />
        <h1 className="text-3xl font-bold">
          {isRtl ? 'تم تأكيد طلبك!' : 'Commande confirmee !'}
        </h1>
        <p className="text-muted-foreground max-w-md">
          {isRtl
            ? 'شكرا لطلبك. ستتلقى رسالة تأكيد بالبريد الإلكتروني قريبا.'
            : 'Merci pour votre commande. Vous recevrez un email de confirmation prochainement.'}
        </p>
        <div className="flex gap-4">
          <Button asChild>
            <Link href={`/${locale}/products`}>
              {isRtl ? 'متابعة التسوق' : 'Continuer vos achats'}
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href={`/${locale}`}>
              {isRtl ? 'الرئيسية' : 'Accueil'}
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
