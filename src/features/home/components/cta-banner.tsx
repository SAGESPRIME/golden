'use client';

import Link from 'next/link';
import { ArrowRight, ArrowLeft, Gift } from 'lucide-react';

interface CtaBannerProps {
  locale: string;
}

export function CtaBanner({ locale }: CtaBannerProps) {
  const isRtl = locale === 'ar';

  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-3xl bg-warm-brown p-10 md:p-16 text-center space-y-6">
          <div className="absolute top-0 start-0 w-64 h-64 rounded-full bg-gold-500 opacity-10 blur-[100px]" />
          <div className="absolute bottom-0 end-0 w-48 h-48 rounded-full bg-gold-400 opacity-10 blur-[80px]" />

          <div className="relative z-10 space-y-6">
            <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-gold-500/20">
              <Gift className="size-7 text-gold-300" />
            </div>
            <h2 className="font-[var(--font-display)] text-3xl md:text-4xl font-bold text-gold-100">
              {isRtl ? 'أهدِ فرنسا في وعاء' : 'Offrez la France en pot'}
            </h2>
            <p className="text-gold-200/70 text-lg max-w-xl mx-auto leading-relaxed">
              {isRtl
                ? 'اكتشف تشكيلتنا من العسل الفرنسي العضوي الفاخر. هدية أصيلة تفرح محبي المنتجات الطبيعية.'
                : 'Decouvrez nos coffrets Miel France Bio prets a offrir, pour surprendre les amateurs de bons produits.'}
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-2">
              <Link
                href={`/${locale}/products`}
                className="group inline-flex items-center gap-2 rounded-full bg-gold-500 px-8 py-4 text-sm font-semibold text-warm-brown shadow-lg transition-all hover:bg-gold-400 hover:scale-[1.02]"
              >
                {isRtl ? 'تسوق الآن' : 'Decouvrir la collection'}
                {isRtl ? (
                  <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
                ) : (
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                )}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
