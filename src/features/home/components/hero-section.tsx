'use client';

import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { HeroSlide } from './hero-slide';

interface HeroSectionProps {
  locale: string;
}

const SLIDES_FR = [
  {
    badge: 'Miel de Jijel',
    title: 'Le tr\u00E9sor des montagnes alg\u00E9riennes',
    desc: 'Un miel d\u2019exception r\u00E9colt\u00E9 \u00E0 plus de 1 200 m d\u2019altitude, dans les for\u00EAts de pin de J\u00EBl.',
    cta: 'D\u00E9couvrir',
    href: '/products?cat=mountain',
    bg: 'from-gold-100 to-gold-200',
    emoji: '\uD83C\uDFD4\uFE0F',
  },
  {
    badge: 'S\u00E9lection bio',
    title: 'Pure nature, certifi\u00E9 bio',
    desc: 'Nos miels bio r\u00E9colt\u00E9s dans des zones prot\u00E9g\u00E9es, loin de toute agriculture intensive.',
    cta: 'Voir les miels bio',
    href: '/products?cat=organic',
    bg: 'from-green-50 to-gold-50',
    emoji: '\uD83C\uDF3F',
  },
  {
    badge: 'Miel rare',
    title: 'Sidr, le roi des miels',
    desc: 'R\u00E9colt\u00E9 une fois par an sur les fleurs de jujubier, consid\u00E9r\u00E9 comme un v\u00E9ritable tr\u00E9sor.',
    cta: 'D\u00E9couvrir les rarit\u00E9s',
    href: '/products?cat=rare',
    bg: 'from-amber-100 to-gold-300',
    emoji: '\u2728',
  },
];

const SLIDES_AR = [
  {
    badge: 'عسل جيجل',
    title: 'كنز جبال الجزائر',
    desc: 'عسل استثنائي يُحصد على ارتفاع يزيد عن 1200 متر في غابات الصنوبر بجيجل.',
    cta: 'اكتشف',
    href: '/products?cat=mountain',
    bg: 'from-gold-100 to-gold-200',
    emoji: '🏔️',
  },
  {
    badge: 'اختيار عضوي',
    title: 'طبيعة خالصة، معتمد عضوياً',
    desc: 'عسلنا العضوي يُحصد من مناطق محمية بعيدة عن الزراعة المكثفة.',
    cta: 'عسلنا العضوي',
    href: '/products?cat=organic',
    bg: 'from-green-50 to-gold-50',
    emoji: '🌿',
  },
  {
    badge: 'عسل نادر',
    title: 'السدر، ملك العسل',
    desc: 'يُحصد مرة واحدة في السنة من أزهار شجرة النبق، ويُعدّ من أثمن أنواع العسل.',
    cta: 'اكتشف النادر',
    href: '/products?cat=rare',
    bg: 'from-amber-100 to-gold-300',
    emoji: '✨',
  },
];

export function HeroSection({ locale }: HeroSectionProps) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const slides = locale === 'ar' ? SLIDES_AR : SLIDES_FR;

  const next = useCallback(
    () => setCurrent((c) => (c + 1) % slides.length),
    [slides.length]
  );
  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [paused, next]);

  return (
    <section
      className="relative overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative">
        {slides.map((slide, i) => (
          <div
            key={i}
            className={`transition-opacity duration-700 ${i === current ? 'relative opacity-100' : 'absolute inset-0 opacity-0 pointer-events-none'}`}
          >
            <HeroSlide slide={slide} locale={locale} active={i === current} />
          </div>
        ))}
      </div>

      <button
        onClick={prev}
        className="absolute start-4 top-1/2 -translate-y-1/2 size-10 flex items-center justify-center bg-white/80 hover:bg-white rounded-full shadow-md transition-all z-10"
        aria-label={locale === 'ar' ? 'السابق' : 'Slide pr\u00E9c\u00E9dent'}
      >
        <ChevronLeft className="size-5" />
      </button>
      <button
        onClick={next}
        className="absolute end-4 top-1/2 -translate-y-1/2 size-10 flex items-center justify-center bg-white/80 hover:bg-white rounded-full shadow-md transition-all z-10"
        aria-label={locale === 'ar' ? 'التالي' : 'Slide suivant'}
      >
        <ChevronRight className="size-5" />
      </button>

      <div className="absolute bottom-4 inset-x-0 flex justify-center gap-2 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`size-2.5 rounded-full transition-all ${i === current ? 'bg-primary scale-125' : 'bg-primary/30'}`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
