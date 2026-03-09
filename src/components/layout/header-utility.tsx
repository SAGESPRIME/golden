import Link from 'next/link';

interface HeaderUtilityProps {
  locale: string;
}

export function HeaderUtility({ locale }: HeaderUtilityProps) {
  const isRtl = locale === 'ar';
  const otherLocale = locale === 'fr' ? 'ar' : 'fr';

  return (
    <div className="bg-muted border-b border-border/40 text-xs py-1.5 hidden md:block">
      <div className="container mx-auto px-4 flex items-center justify-end gap-3">
        <Link
          href={`/${locale}/products`}
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          {isRtl ? 'عسلنا' : 'Nos Miels'}
        </Link>
        <span className="text-border" aria-hidden>
          |
        </span>
        <Link
          href={`/${locale}/account`}
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          {isRtl ? 'حسابي' : 'Mon compte'}
        </Link>
        <span className="text-border" aria-hidden>
          |
        </span>
        <Link
          href={`/${otherLocale}`}
          className="font-semibold text-primary hover:text-primary/80 transition-colors"
        >
          {isRtl ? 'FR' : 'AR'}
        </Link>
      </div>
    </div>
  );
}
