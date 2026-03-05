'use client';

import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { HeroSlide } from './hero-slide';

interface HeroSectionProps {
  locale: string;
}

const SLIDES_FR = [
  {
    badge: 'Miel de Provence',
    title: 'Le trésor des terroirs français',
    desc: "Un miel d'exception récolté dans les garrigues provençales, parfumé à la lavande et au romarin.",
    cta: 'Découvrir',
    href: '/products?cat=flower',
    bg: 'from-gold-100 to-gold-200',
    emoji: '🏔️',
  },
  {
    badge: 'Sélection bio',
    title: 'Pure nature, certifié bio',
    desc: 'Nos miels bio récoltés dans des zones protégées françaises, loin de toute agriculture intensive.',
    cta: 'Voir les miels bio',
    href: '/products?cat=organic',
    bg: 'from-green-50 to-gold-50',
    emoji: '🌿',
  },
  {
    badge: 'Miel rare',
    title: 'Châtaignier des Cévennes',
    desc: 'Récolté une fois par an dans les forêts de châtaigniers des Cévennes, au goût boisé et intense.',
    cta: 'Découvrir les raretés',
    href: '/products?cat=rare',
    bg: 'from-amber-100 to-gold-300',
    emoji: '✨',
  },
];

const SLIDES_AR = [
  {
    badge: 'عسل بروفانس',
    title: 'كنز أراضي فرنسا',
    desc: 'عسل استثنائي يُحصد من أراضي بروفانس المعطرة باللافندر والروزماري.',
    cta: 'اكتشف',
    href: '/products?cat=flower',
    bg: 'from-gold-100 to-gold-200',
    emoji: '🏔️',
  },
  {
    badge: 'اختيار عضوي',
    title: 'طبيعة خالصة، معتمد عضوياً',
    desc: 'عسلنا العضوي يُحصد من مناطق محمية فرنسية بعيدة عن الزراعة المكثفة.',
    cta: 'عسلنا العضوي',
    href: '/products?cat=organic',
    bg: 'from-green-50 to-gold-50',
    emoji: '🌿',
  },
  {
    badge: 'عسل نادر',
    title: 'كستناء سيفين، ملك العسل',
    desc: 'يُحصد مرة واحدة في السنة من غابات كستناء سيفين، بنكهة خشبية غنية وعميقة.',
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
