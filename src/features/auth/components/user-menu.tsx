'use client';

import { useAuthActions } from '@convex-dev/auth/react';
import { User, LogOut, ShieldCheck, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { useAuth } from '@/hooks/use-auth';

interface UserMenuProps {
  locale: string;
}

export function UserMenu({ locale }: UserMenuProps) {
  const { isAuthenticated, isLoading, user, isAdmin } = useAuth();
  const { signOut } = useAuthActions();
  const isRtl = locale === 'ar';

  if (isLoading) return null;

  if (!isAuthenticated) {
    return (
      <Button variant="ghost" size="sm" asChild>
        <Link href={`/${locale}/auth/login`}>
          {isRtl ? 'تسجيل الدخول' : 'Connexion'}
        </Link>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <User className="size-5" />
          <span className="sr-only">
            {isRtl ? 'قائمة المستخدم' : 'Menu utilisateur'}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={isRtl ? 'start' : 'end'}>
        <div className="px-2 py-1.5 text-sm font-medium">
          {user?.name ?? user?.email ?? ''}
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={`/${locale}/account`}>
            <Package className="me-2 size-4" />
            {isRtl ? 'طلباتي' : 'Mes commandes'}
          </Link>
        </DropdownMenuItem>
        {isAdmin && (
          <DropdownMenuItem asChild>
            <Link href={`/${locale}/admin`}>
              <ShieldCheck className="me-2 size-4" />
              {isRtl ? 'الإدارة' : 'Administration'}
            </Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()}>
          <LogOut className="me-2 size-4" />
          {isRtl ? 'تسجيل الخروج' : 'Deconnexion'}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
