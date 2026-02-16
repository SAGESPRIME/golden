'use client';

import Link from 'next/link';

interface FooterProps {
  locale: string;
}

export function Footer({ locale }: FooterProps) {
  const isRtl = locale === 'ar';
  const year = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/40">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-primary">Golden Defla</h3>
            <p className="text-sm text-muted-foreground">
              {isRtl
                ? 'عسل فاخر من الجزائر، يُجمع بشغف وتقاليد عريقة.'
                : "Miel premium d'Algerie, recolte avec passion et tradition."}
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold">
              {isRtl ? 'روابط سريعة' : 'Liens rapides'}
            </h4>
            <nav className="flex flex-col gap-2 text-sm">
              <Link href={`/${locale}`} className="text-muted-foreground hover:text-foreground">
                {isRtl ? 'الرئيسية' : 'Accueil'}
              </Link>
              <Link href={`/${locale}/products`} className="text-muted-foreground hover:text-foreground">
                {isRtl ? 'عسلنا' : 'Nos Miels'}
              </Link>
              <Link href={`/${locale}/cart`} className="text-muted-foreground hover:text-foreground">
                {isRtl ? 'السلة' : 'Panier'}
              </Link>
            </nav>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold">
              {isRtl ? 'اتصل بنا' : 'Contact'}
            </h4>
            <p className="text-sm text-muted-foreground">contact@goldendefla.com</p>
          </div>
        </div>

        <div className="mt-8 border-t pt-6 text-center text-sm text-muted-foreground">
          &copy; {year} Golden Defla. {isRtl ? 'جميع الحقوق محفوظة.' : 'Tous droits reserves.'}
        </div>
      </div>
    </footer>
  );
}
