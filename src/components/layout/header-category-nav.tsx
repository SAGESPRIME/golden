import Link from 'next/link';

interface HeaderCategoryNavProps {
  locale: string;
}

const CATS_FR = [
  { label: 'Tous nos miels', slug: '' },
  { label: 'Bien-Être', slug: 'bien-etre' },
  { label: 'Lavande', slug: 'lavande' },
  { label: 'Forêt', slug: 'foret' },
  { label: 'Fleurs', slug: 'fleurs' },
  { label: 'Rareté', slug: 'rare' },
];

const CATS_AR = [
  { label: 'كل عسلنا', slug: '' },
  { label: 'عناية طبيعية', slug: 'bien-etre' },
  { label: 'لافندر', slug: 'lavande' },
  { label: 'غابة', slug: 'foret' },
  { label: 'أزهار', slug: 'fleurs' },
  { label: 'نادر', slug: 'rare' },
];

export function HeaderCategoryNav({ locale }: HeaderCategoryNavProps) {
  const cats = locale === 'ar' ? CATS_AR : CATS_FR;

  return (
    <nav
      className="hidden md:block bg-card border-b border-border/50"
      aria-label="Categories"
    >
      <div className="container mx-auto px-4">
        <ul className="flex items-center justify-center h-10">
          {cats.map((cat, i) => (
            <li key={cat.slug} className="flex items-center">
              {i > 0 && (
                <span className="text-border/60 px-2 select-none" aria-hidden>
                  |
                </span>
              )}
              <Link
                href={`/${locale}/products${cat.slug ? `?cat=${cat.slug}` : ''}`}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors px-2 py-1"
              >
                {cat.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
