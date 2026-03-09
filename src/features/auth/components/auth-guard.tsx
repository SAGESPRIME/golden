'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '@/hooks/use-auth';

interface AuthGuardProps {
  children: React.ReactNode;
  locale: string;
  requireAdmin?: boolean;
}

export function AuthGuard({ children, locale, requireAdmin }: AuthGuardProps) {
  const { isAuthenticated, isLoading, isAdmin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;
    if (!isAuthenticated) {
      router.replace(`/${locale}/auth/login`);
      return;
    }
    if (requireAdmin && !isAdmin) {
      router.replace(`/${locale}`);
    }
  }, [isAuthenticated, isLoading, isAdmin, requireAdmin, locale, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-muted-foreground">
          {locale === 'ar' ? 'جار التحميل...' : 'Chargement...'}
        </p>
      </div>
    );
  }

  if (!isAuthenticated) return null;
  if (requireAdmin && !isAdmin) return null;

  return <>{children}</>;
}
