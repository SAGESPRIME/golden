'use client';

import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { HeroSlide } from './hero-slide';

interface HeroSectionProps {
  locale: string;
}

const SLIDES_FR = [
  {
    badge: 'Sélection Bien-Être',
    title: 'Prenez soin de vous naturellement',
    desc: 'Découvrez notre sélection de miels bien-être soigneusement choisis pour leurs vertus exceptionnelles. Le meilleur de l\u2019apithérapie pour enrichir votre quotidien.',
    cta: 'Découvrir',
    href: '/products?cat=bien-etre',
    bg: 'from-green-50 to-gold-50',
    emoji: '🌿',
  },
  {
    badge: 'Lavande Sauvage',
    title: 'Le trésor de l\u2019arrière-pays espagnol',
    desc: 'Récoltés au c\u0153ur de l\u2019arrière-pays espagnol, nos miels allient pureté, authenticité et bienfaits naturels. Chaque goutte est le reflet d\u2019un terroir préservé.',
    cta: 'Voir la lavande',
    href: '/products?cat=lavande',
    bg: 'from-gold-100 to-gold-200',
    emoji: '💜',
  },
  {
    badge: 'Essence de Ruche',
    title: 'Miels traditionnels, douceur incomparable',
    desc: 'Principalement cultivés en Espagne, nos miels de forêt et de fleurs proviennent de terroirs soigneusement sélectionnés. Bois, crémeux et d\u2019une douceur incomparable.',
    cta: 'Explorer les raretés',
    href: '/products?cat=rare',
    bg: 'from-amber-100 to-gold-300',
    emoji: '✨',
  },
];

const SLIDES_AR = [
  {
    badge: 'تشكيلة العناية',
    title: 'اعتنِ بنفسك بشكل طبيعي',
    desc: 'اكتشف تشكيلة أعسال العناية المختارة بعناية لفضائلها الاستثنائية. أفضل ما تقدمه العلاجات النحلية لإثراء يومك.',
    cta: 'اكتشف',
    href: '/products?cat=bien-etre',
    bg: 'from-green-50 to-gold-50',
    emoji: '🌿',
  },
  {
    badge: 'لافندر بري',
    title: 'كنز الريف الإسباني',
    desc: 'يُحصد في قلب الريف الإسباني، عسلنا يجمع بين النقاء والأصالة والفوائد الطبيعية. كل قطرة تعكس أرضاً محفوظة.',
    cta: 'عسل اللافندر',
    href: '/products?cat=lavande',
    bg: 'from-gold-100 to-gold-200',
    emoji: '💜',
  },
  {
    badge: 'جوهر الخلية',
    title: 'أعسال تقليدية بحلاوة لا مثيل',
    desc: 'مزروعة أساساً في إسبانيا، أعسال غاباتنا وأزهارنا تأتي من أراضٍ منتقاة بعناية. كريمية وبحلاوة لا تُضاهى.',
    cta: 'استكشف النادر',
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
        aria-label={locale === 'ar' ? 'السابق' : 'Slide précédent'}
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
