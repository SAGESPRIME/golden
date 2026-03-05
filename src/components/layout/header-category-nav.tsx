import Link from 'next/link';

interface HeaderCategoryNavProps {
  locale: string;
}

const CATS_FR = [
  { label: 'Tous nos miels', slug: '' },
  { label: 'Montagne', slug: 'mountain' },
  { label: 'For\u00eat', slug: 'forest' },
  { label: 'Fleurs', slug: 'flower' },
  { label: 'Rare', slug: 'rare' },
  { label: 'Bio', slug: 'organic' },
];

const CATS_AR = [
  { label: 'كل عسلنا', slug: '' },
  { label: 'الجبال', slug: 'mountain' },
  { label: 'الغابة', slug: 'forest' },
  { label: 'الأزهار', slug: 'flower' },
  { label: 'نادر', slug: 'rare' },
  { label: 'عضوي', slug: 'organic' },
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
