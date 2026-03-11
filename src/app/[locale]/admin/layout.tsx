'use client';

import { use, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';

interface AdminLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

// Layout client — vérification du rôle admin côté React
// La première barrière est dans src/middleware.ts (cookie de session)
export default function AdminRootLayout({
  children,
  params,
}: AdminLayoutProps) {
  const { locale } = use(params);
  const { isAuthenticated, isLoading, isAdmin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;
    if (!isAuthenticated) {
      router.replace(`/${locale}/auth/login`);
      return;
    }
    if (!isAdmin) {
      router.replace(`/${locale}`);
    }
  }, [isAuthenticated, isLoading, isAdmin, locale, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Vérification des droits...</p>
      </div>
    );
  }

  if (!isAuthenticated || !isAdmin) return null;

  return <>{children}</>;
}
