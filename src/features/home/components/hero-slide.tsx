import Link from 'next/link';
import { ArrowRight, ArrowLeft } from 'lucide-react';

interface Slide {
  badge: string;
  title: string;
  desc: string;
  cta: string;
  href: string;
  bg: string;
  emoji: string;
}

interface HeroSlideProps {
  slide: Slide;
  locale: string;
  active: boolean;
}

export function HeroSlide({ slide, locale, active }: HeroSlideProps) {
  const isRtl = locale === 'ar';

  return (
    <div
      className={`min-w-full relative min-h-[420px] md:min-h-[540px] flex items-center transition-opacity duration-700 ${active ? 'opacity-100' : 'opacity-0'}`}
      aria-hidden={!active}
      style={{
        backgroundImage: 'url(/images/hero.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
      }}
    >
      {/* Overlay directionnel : sombre à gauche pour le texte, transparent à droite */}
      <div
        className="absolute inset-0"
        style={{
          background: isRtl
            ? 'linear-gradient(to left, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.35) 50%, transparent 100%)'
            : 'linear-gradient(to right, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.35) 50%, transparent 100%)',
        }}
      />

      <div className="relative w-full container mx-auto px-6 md:px-12 py-16 md:py-24">
        <div
          className={`max-w-xl space-y-5 ${isRtl ? 'ms-auto text-end' : ''}`}
        >
          <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase bg-primary text-primary-foreground px-3 py-1.5">
            {slide.badge}
          </span>
          <h1 className="font-[var(--font-display)] text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight drop-shadow-lg">
            {slide.title}
          </h1>
          <p className="text-base md:text-lg text-white/85 leading-relaxed max-w-md drop-shadow">
            {slide.desc}
          </p>
          <Link
            href={`/${locale}${slide.href}`}
            className="group inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-4 text-sm font-bold uppercase tracking-widest hover:bg-primary/90 transition-colors"
          >
            {slide.cta}
            {isRtl ? (
              <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
            ) : (
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            )}
          </Link>
        </div>
      </div>
    </div>
  );
}
