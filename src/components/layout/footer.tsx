import Link from 'next/link';

interface FooterProps {
  locale: string;
}

export function Footer({ locale }: FooterProps) {
  const isRtl = locale === 'ar';
  const year = new Date().getFullYear();

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
                : 'Recevez nos actualit\u00E9s et offres exclusives'}
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
              Golden Dahlia
            </h3>
            <p className="text-sm text-gold-200/60 leading-relaxed max-w-xs">
              {isRtl
                ? 'عسل فرنسي عضوي فاخر، يُحصد بشغف وتقاليد عريقة من أجمل أراضي فرنسا.'
                : 'Miel bio français premium, récolté avec passion dans les terroirs de France.'}
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold tracking-[0.15em] uppercase text-gold-400">
              {isRtl ? 'منتجاتنا' : 'Nos produits'}
            </h4>
            <nav className="flex flex-col gap-2 text-sm">
              {['mountain', 'forest', 'flower', 'rare', 'organic'].map(
                (cat) => (
                  <Link
                    key={cat}
                    href={`/${locale}/products?cat=${cat}`}
                    className="text-gold-200/60 hover:text-gold-200 transition-colors"
                  >
                    {cat === 'mountain'
                      ? isRtl
                        ? 'عسل الجبال'
                        : 'Miel de montagne'
                      : cat === 'forest'
                        ? isRtl
                          ? 'عسل الغابة'
                          : 'Miel de for\u00EAt'
                        : cat === 'flower'
                          ? isRtl
                            ? 'عسل الأزهار'
                            : 'Miel de fleurs'
                          : cat === 'rare'
                            ? isRtl
                              ? 'عسل نادر'
                              : 'Miel rare'
                            : isRtl
                              ? 'عسل عضوي'
                              : 'Miel bio'}
                  </Link>
                )
              )}
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
              {isRtl ? 'مساعدة' : 'Aide'}
            </h4>
            <nav className="flex flex-col gap-2 text-sm">
              <Link
                href={`/${locale}/cart`}
                className="text-gold-200/60 hover:text-gold-200 transition-colors"
              >
                {isRtl ? 'السلة' : 'Mon panier'}
              </Link>
              <Link
                href={`/${locale}/checkout`}
                className="text-gold-200/60 hover:text-gold-200 transition-colors"
              >
                {isRtl ? 'الدفع' : 'Livraison'}
              </Link>
              <span className="text-gold-200/60">contact@goldendahlia.fr</span>
            </nav>
          </div>
        </div>

        <div className="mt-10 border-t border-gold-900/30 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gold-200/40">
          <p>
            &copy; {year} Golden Dahlia.{' '}
            {isRtl ? 'جميع الحقوق محفوظة.' : 'Tous droits r\u00E9serv\u00E9s.'}
          </p>
          <div className="flex gap-4">
            <span>{isRtl ? 'شروط البيع' : 'CGV'}</span>
            <span>{isRtl ? 'سياسة الخصوصية' : 'Confidentialit\u00E9'}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
