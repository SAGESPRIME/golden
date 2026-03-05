'use client';

import Link from 'next/link';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';

interface SuccessContentProps {
  locale: string;
}

export function SuccessContent({ locale }: SuccessContentProps) {
  const { isAuthenticated } = useAuth();
  const isRtl = locale === 'ar';

  return (
    <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-4 py-16 text-center">
      <CheckCircle className="mb-4 size-16 text-green-500" />
      <h1 className="mb-2 text-2xl font-bold">
        {isRtl ? 'تم تأكيد الطلب!' : 'Commande confirmee !'}
      </h1>
      <p className="mb-8 text-muted-foreground">
        {isRtl
          ? 'شكرا لطلبك. ستتلقى رسالة تأكيد عبر البريد الإلكتروني.'
          : 'Merci pour votre commande. Vous recevrez un email de confirmation.'}
      </p>
      <div className="flex gap-4">
        <Button asChild>
          <Link href={`/${locale}/products`}>
            {isRtl ? 'متابعة التسوق' : 'Continuer vos achats'}
          </Link>
        </Button>
        {isAuthenticated && (
          <Button variant="outline" asChild>
            <Link href={`/${locale}/account`}>
              {isRtl ? 'عرض طلباتي' : 'Voir mes commandes'}
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
}
