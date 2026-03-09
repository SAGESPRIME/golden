'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Package, ShoppingCart, LayoutDashboard } from 'lucide-react';
import { AuthGuard } from '@/features/auth';
import { cn } from '@/lib/utils';

interface AdminLayoutProps {
  children: React.ReactNode;
  locale: string;
}

const navItems = [
  { key: 'dashboard', icon: LayoutDashboard, path: '' },
  { key: 'products', icon: Package, path: '/products' },
  { key: 'orders', icon: ShoppingCart, path: '/orders' },
];

const labels: Record<string, { fr: string; ar: string }> = {
  dashboard: { fr: 'Tableau de bord', ar: 'لوحة التحكم' },
  products: { fr: 'Produits', ar: 'المنتجات' },
  orders: { fr: 'Commandes', ar: 'الطلبات' },
};

export function AdminLayout({ children, locale }: AdminLayoutProps) {
  const pathname = usePathname();
  const isRtl = locale === 'ar';

  return (
    <AuthGuard locale={locale} requireAdmin>
      <div className="container mx-auto flex flex-col gap-6 px-4 py-8 md:flex-row">
        <aside className="w-full shrink-0 md:w-48">
          <nav className="flex flex-row gap-1 md:flex-col">
            {navItems.map((item) => {
              const href = `/${locale}/admin${item.path}`;
              const isActive = pathname === href;
              const Icon = item.icon;
              const label = isRtl ? labels[item.key].ar : labels[item.key].fr;

              return (
                <Link
                  key={item.key}
                  href={href}
                  className={cn(
                    'flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors',
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-muted'
                  )}
                >
                  <Icon className="size-4" />
                  {label}
                </Link>
              );
            })}
          </nav>
        </aside>
        <main className="flex-1">{children}</main>
      </div>
    </AuthGuard>
  );
}
