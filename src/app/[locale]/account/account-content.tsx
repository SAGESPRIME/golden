'use client';

import { AuthGuard } from '@/features/auth';
import { ProfileCard, OrderList } from '@/features/account';
import { useAuth } from '@/hooks/use-auth';
import type { User } from '@/types';

interface AccountContentProps {
  locale: string;
}

export function AccountContent({ locale }: AccountContentProps) {
  const isRtl = locale === 'ar';

  return (
    <AuthGuard locale={locale}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-2xl font-bold">
          {isRtl ? 'حسابي' : 'Mon Compte'}
        </h1>
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <AccountProfile locale={locale} />
          </div>
          <div className="lg:col-span-2">
            <h2 className="mb-4 text-xl font-semibold">
              {isRtl ? 'طلباتي' : 'Mes commandes'}
            </h2>
            <OrderList locale={locale} />
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}

function AccountProfile({ locale }: { locale: string }) {
  const { user } = useAuth();
  if (!user) return null;
  return <ProfileCard user={user as unknown as User} locale={locale} />;
}
