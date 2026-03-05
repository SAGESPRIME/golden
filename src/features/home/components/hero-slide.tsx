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
      <div className="container mx-auto px-4 py-8 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center">
          {/* Text — toujours en premier sur mobile */}
          <div
            className={`space-y-4 md:space-y-6 ${isRtl ? 'md:order-2' : ''}`}
          >
            <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase bg-primary/10 text-primary px-3 py-1.5 rounded-sm">
              {slide.badge}
            </span>
            <h1 className="font-[var(--font-display)] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              {slide.title}
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-md leading-relaxed">
              {slide.desc}
            </p>
            <Link
              href={`/${locale}${slide.href}`}
              className="group inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 md:px-8 md:py-4 text-sm font-bold uppercase tracking-widest hover:bg-primary/90 transition-colors"
            >
              {slide.cta}
              {isRtl ? (
                <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
              ) : (
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              )}
            </Link>
          </div>

          {/* Vidéo — en-dessous sur mobile, à droite sur desktop */}
          <div className={`w-full ${isRtl ? 'md:order-1' : ''}`}>
            <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-xl">
              <iframe
                loading="lazy"
                title="Gumlet video player"
                src="https://play.gumlet.io/embed/69aa06bb8b86e9ed048ec5e7?background=false&autoplay=false&loop=true&disable_player_controls=false"
                className="absolute inset-0 w-full h-full border-0"
                referrerPolicy="origin"
                allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
