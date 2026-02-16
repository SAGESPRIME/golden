'use client';

import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/hooks/use-cart';

interface HeaderProps {
  locale: string;
}

export function Header({ locale }: HeaderProps) {
  const { totalItems } = useCart();
  const isRtl = locale === 'ar';

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <Link href={`/${locale}`} className="text-xl font-bold text-primary">
          Golden Defla
        </Link>

        <nav className="flex items-center gap-4">
          <Link
            href={`/${locale}/products`}
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            {isRtl ? 'عسلنا' : 'Nos Miels'}
          </Link>

          <Button variant="ghost" size="icon" asChild>
            <Link href={`/${locale}/cart`} className="relative">
              <ShoppingCart className="size-5" />
              {totalItems > 0 && (
                <Badge className="absolute -top-1 -end-1 size-5 p-0 text-[10px] flex items-center justify-center">
                  {totalItems}
                </Badge>
              )}
              <span className="sr-only">{isRtl ? 'السلة' : 'Panier'}</span>
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
