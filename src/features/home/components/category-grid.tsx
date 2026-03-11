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
    <section className="py-16 md:py-24 bg-[#1a1310]">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 space-y-3">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#fed330]">
            {isRtl ? 'تشكيلاتنا' : 'Nos sélections'}
          </p>
          <h2 className="font-[var(--font-display)] text-3xl md:text-4xl font-bold text-white">
            {isRtl ? 'عسلنا حسب التشكيلة' : 'Nos miels par sélection'}
          </h2>
        </div>

        {/* Categories grid */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3 md:gap-4">
          {cats.map((cat) => (
            <Link
              key={cat.slug}
              href={`/${locale}/products?cat=${cat.slug}`}
              className="group flex flex-col items-center gap-3 text-center p-4 border border-[#fed330]/15 hover:border-[#fed330]/60 hover:bg-[#fed330]/5 transition-all duration-300"
            >
              <div className="flex size-14 md:size-16 items-center justify-center rounded-full bg-[#fed330]/10 text-2xl md:text-3xl transition-all duration-300 group-hover:bg-[#fed330]/20 group-hover:scale-110">
                {cat.emoji}
              </div>
              <span className="text-xs md:text-sm font-bold uppercase tracking-wider text-white/70 group-hover:text-[#fed330] transition-colors">
                {cat.label}
              </span>
            </Link>
          ))}

          {/* Voir tout */}
          <Link
            href={`/${locale}/products`}
            className="group flex flex-col items-center gap-3 text-center p-4 border border-[#fed330]/40 hover:border-[#fed330] hover:bg-[#fed330]/10 transition-all duration-300"
          >
            <div className="flex size-14 md:size-16 items-center justify-center rounded-full bg-[#fed330]/20 text-2xl md:text-3xl transition-all duration-300 group-hover:bg-[#fed330]/30 group-hover:scale-110">
              🍯
            </div>
            <span className="text-xs md:text-sm font-bold uppercase tracking-wider text-[#fed330] group-hover:text-[#fed330]">
              {isRtl ? 'الكل' : 'Voir tout'}
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
