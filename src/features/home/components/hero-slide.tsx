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
      className={`min-w-full bg-gradient-to-br ${slide.bg} transition-opacity duration-700 ${active ? 'opacity-100' : 'opacity-0'}`}
      aria-hidden={!active}
    >
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className={`space-y-6 ${isRtl ? 'md:order-2' : ''}`}>
            <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase bg-primary/10 text-primary px-3 py-1.5 rounded-sm">
              {slide.badge}
            </span>
            <h1 className="font-[var(--font-display)] text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              {slide.title}
            </h1>
            <p className="text-lg text-muted-foreground max-w-md leading-relaxed">
              {slide.desc}
            </p>
            <Link
              href={`/${locale}${slide.href}`}
              className="group inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-primary/90 transition-colors"
            >
              {slide.cta}
              {isRtl ? (
                <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
              ) : (
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              )}
            </Link>
          </div>
          <div
            className={`flex items-center justify-center ${isRtl ? 'md:order-1' : ''}`}
          >
            <div className="text-[120px] md:text-[160px] lg:text-[200px] select-none animate-float">
              {slide.emoji}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
