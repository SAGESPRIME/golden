import Link from 'next/link';

interface CategoryGridProps {
  locale: string;
}

const CATS_FR = [
  { slug: 'bien-etre', label: 'Bien-Être', emoji: '🌿' },
  { slug: 'lavande', label: 'Lavande', emoji: '💜' },
  { slug: 'foret', label: 'Forêt', emoji: '🌲' },
  { slug: 'fleurs', label: 'Fleurs', emoji: '🌸' },
  { slug: 'rare', label: 'Rareté', emoji: '💎' },
];

const CATS_AR = [
  { slug: 'bien-etre', label: 'عناية طبيعية', emoji: '🌿' },
  { slug: 'lavande', label: 'لافندر', emoji: '💜' },
  { slug: 'foret', label: 'غابة', emoji: '🌲' },
  { slug: 'fleurs', label: 'أزهار', emoji: '🌸' },
  { slug: 'rare', label: 'نادر', emoji: '💎' },
];

export function CategoryGrid({ locale }: CategoryGridProps) {
  const isRtl = locale === 'ar';
  const cats = isRtl ? CATS_AR : CATS_FR;

  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 space-y-2">
          <h2 className="font-[var(--font-display)] text-2xl md:text-3xl font-bold">
            {isRtl ? 'عسلنا حسب التشكيلة' : 'Nos miels par sélection'}
          </h2>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-5 gap-4 md:gap-6">
          {cats.map((cat) => (
            <Link
              key={cat.slug}
              href={`/${locale}/products?cat=${cat.slug}`}
              className="group flex flex-col items-center gap-3 text-center"
            >
              <div className="flex size-16 md:size-24 items-center justify-center rounded-full bg-gold-100 text-3xl md:text-5xl transition-all duration-300 group-hover:bg-primary/10 group-hover:scale-110 group-hover:shadow-md group-hover:shadow-primary/10 border-2 border-transparent group-hover:border-primary/30">
                {cat.emoji}
              </div>
              <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                {cat.label}
              </span>
            </Link>
          ))}
          <Link
            href={`/${locale}/products`}
            className="group flex flex-col items-center gap-3 text-center"
          >
            <div className="flex size-16 md:size-24 items-center justify-center rounded-full bg-primary/10 text-3xl md:text-5xl transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-110 border-2 border-primary/20">
              🍯
            </div>
            <span className="text-sm font-semibold text-primary">
              {isRtl ? 'الكل' : 'Voir tout'}
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
