'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/hooks/use-cart';
import { UserMenu } from '@/features/auth';

interface HeaderMainBarProps {
  locale: string;
}

export function HeaderMainBar({ locale }: HeaderMainBarProps) {
  const { totalItems } = useCart();
  const isRtl = locale === 'ar';
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className={`sticky top-0 z-50 w-full bg-card border-b transition-all duration-300 ${
        scrolled ? 'shadow-sm' : ''
      }`}
    >
      <div className="container mx-auto flex h-24 items-center gap-4 px-4">
        <Link href={`/${locale}`} className="shrink-0">
          <Image
            src="/images/logo.png"
            alt="Golden Dahlia"
            width={106}
            height={80}
            className="h-20 w-auto object-contain"
            priority
          />
        </Link>

        <div className="flex-1 max-w-md mx-auto hidden md:flex items-center gap-2 rounded-sm border border-border bg-background px-4 py-2.5 cursor-default">
          <Search className="size-4 text-muted-foreground shrink-0" />
          <span className="text-sm text-muted-foreground">
            {isRtl ? 'البحث عن عسل...' : 'Rechercher du miel...'}
          </span>
        </div>

        <div className="flex items-center gap-1 ms-auto">
          <Button variant="ghost" size="icon" asChild>
            <Link href={`/${locale}/cart`} className="relative">
              <ShoppingCart className="size-5" />
              {totalItems > 0 && (
                <Badge className="absolute -top-1.5 -end-1.5 size-5 p-0 text-[10px] flex items-center justify-center rounded-full animate-pulse-glow">
                  {totalItems}
                </Badge>
              )}
              <span className="sr-only">{isRtl ? 'السلة' : 'Panier'}</span>
            </Link>
          </Button>
          <UserMenu locale={locale} />
        </div>
      </div>
    </div>
  );
}
