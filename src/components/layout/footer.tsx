import Link from 'next/link';

interface FooterProps {
  locale: string;
}

const CATS_FR = [
  { slug: 'bien-etre', label: 'Bien-Être' },
  { slug: 'lavande', label: 'Lavande' },
  { slug: 'foret', label: 'Forêt' },
  { slug: 'fleurs', label: 'Fleurs' },
  { slug: 'rare', label: 'Rareté' },
];

const CATS_AR = [
  { slug: 'bien-etre', label: 'عناية طبيعية' },
  { slug: 'lavande', label: 'لافندر' },
  { slug: 'foret', label: 'غابة' },
  { slug: 'fleurs', label: 'أزهار' },
  { slug: 'rare', label: 'نادر' },
];

export function Footer({ locale }: FooterProps) {
  const isRtl = locale === 'ar';
  const year = new Date().getFullYear();
  const cats = isRtl ? CATS_AR : CATS_FR;

  return (
    <footer className="bg-warm-brown text-gold-100">
      {/* Newsletter */}
      <div className="border-b border-gold-900/30 py-8">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-bold text-gold-300 text-lg">
              {isRtl ? 'ابقَ على تواصل' : 'Restons en contact'}
            </p>
            <p className="text-sm text-gold-200/60 mt-1">
              {isRtl
                ? 'تلقَّ أحدث أخبارنا وعروضنا'
                : 'Recevez nos actualités et offres exclusives'}
            </p>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <input
              type="email"
              placeholder={isRtl ? 'بريدك الإلكتروني' : 'Votre email'}
              className="flex-1 md:w-64 bg-gold-900/30 border border-gold-800/40 text-gold-100 placeholder:text-gold-400/50 px-4 py-2.5 text-sm outline-none focus:border-gold-500"
            />
            <button className="bg-primary text-primary-foreground px-6 py-2.5 text-sm font-bold uppercase tracking-wider hover:bg-primary/80 transition-colors shrink-0">
              {isRtl ? 'اشترك' : "S'inscrire"}
            </button>
          </div>
        </div>
      </div>

      {/* Columns */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1 space-y-3">
            <h3 className="font-[var(--font-display)] text-xl font-bold text-gold-300">
              DAHLIA
            </h3>
            <p className="text-xs text-gold-400/70 uppercase tracking-widest">
              {isRtl ? 'الطبيعة والعناية' : 'Nature & Bien-Être'}
            </p>
            <p className="text-sm text-gold-200/60 leading-relaxed max-w-xs">
              {isRtl
                ? 'عسل استثنائي يُحصد في الريف الإسباني. نقاء وأصالة وفوائد طبيعية.'
                : "Miels d'exception récoltés en Espagne. Pureté, authenticité et bienfaits naturels."}
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold tracking-[0.15em] uppercase text-gold-400">
              {isRtl ? 'تشكيلاتنا' : 'Nos sélections'}
            </h4>
            <nav className="flex flex-col gap-2 text-sm">
              {cats.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/${locale}/products?cat=${cat.slug}`}
                  className="text-gold-200/60 hover:text-gold-200 transition-colors"
                >
                  {cat.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold tracking-[0.15em] uppercase text-gold-400">
              {isRtl ? 'المتجر' : 'La maison'}
            </h4>
            <nav className="flex flex-col gap-2 text-sm">
              <Link
                href={`/${locale}`}
                className="text-gold-200/60 hover:text-gold-200 transition-colors"
              >
                {isRtl ? 'الصفحة الرئيسية' : 'Accueil'}
              </Link>
              <Link
                href={`/${locale}/products`}
                className="text-gold-200/60 hover:text-gold-200 transition-colors"
              >
                {isRtl ? 'كل أنواع العسل' : 'Tous nos miels'}
              </Link>
              <Link
                href={`/${locale}/account`}
                className="text-gold-200/60 hover:text-gold-200 transition-colors"
              >
                {isRtl ? 'حسابي' : 'Mon compte'}
              </Link>
            </nav>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold tracking-[0.15em] uppercase text-gold-400">
              {isRtl ? 'تواصل معنا' : 'Contact'}
            </h4>
            <nav className="flex flex-col gap-2 text-sm">
              <span className="text-gold-200/60">www.dahlia.fr</span>
              <span className="text-gold-200/60">+33 7 67 65 77 19</span>
              <span className="text-gold-200/60">
                7 rue Edgar Degas – 93600
              </span>
            </nav>
          </div>
        </div>

        <div className="mt-10 border-t border-gold-900/30 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gold-200/40">
          <p>
            &copy; {year} DAHLIA Nature & Bien-Être.{' '}
            {isRtl ? 'جميع الحقوق محفوظة.' : 'Tous droits réservés.'}
          </p>
          <div className="flex gap-4">
            <span>{isRtl ? 'شروط البيع' : 'CGV'}</span>
            <span>{isRtl ? 'سياسة الخصوصية' : 'Confidentialité'}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
