import Link from 'next/link';

interface StorySectionProps {
  locale: string;
}

export function StorySection({ locale }: StorySectionProps) {
  const isRtl = locale === 'ar';

  return (
    <section id="story" className="py-16 md:py-24 bg-section-alt">
      <div className="container mx-auto px-4">
        <div
          className={`grid md:grid-cols-2 gap-12 items-center ${isRtl ? '' : ''}`}
        >
          <div className={`space-y-6 ${isRtl ? 'md:order-2' : ''}`}>
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-honey">
              {isRtl ? 'قصتنا' : 'Notre histoire'}
            </p>
            <h2 className="font-[var(--font-display)] text-3xl md:text-4xl font-bold leading-tight">
              {isRtl
                ? 'العسل الفرنسي البيو، كنز من الطبيعة'
                : 'Le miel bio français, un trésor de la ruche'}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {isRtl
                ? 'يعمل شركاؤنا من المربين في أجمل مناطق فرنسا على الحفاظ على الممارسات التقليدية التي توارثوها عن أجدادهم. كل وعاء عسل يحكي قصة أرض، موسم، ونحلة.'
                : "Nos apiculteurs partenaires à travers la France perpétuent des pratiques ancestrales transmises de génération en génération. Chaque pot de miel raconte l'histoire d'un terroir, d'une saison, d'une abeille."}
            </p>
            <p className="text-muted-foreground leading-relaxed">
              {isRtl
                ? 'من المنحلة إلى مائدتك، نضمن الشفافية الكاملة: الأصل، المنطقة، طريقة الحصاد.'
                : 'Du rucher \u00E0 votre table, nous garantissons une tra\u00E7abilit\u00E9 compl\u00E8te\u00A0: l\u2019origine, la r\u00E9gion, la m\u00E9thode de r\u00E9colte.'}
            </p>
            <Link
              href={`/${locale}/products`}
              className="inline-block border-2 border-foreground text-foreground font-bold uppercase tracking-widest text-sm px-8 py-3 hover:bg-foreground hover:text-background transition-colors"
            >
              {isRtl ? 'من نحن؟' : 'QUI SOMMES-NOUS\u00A0?'}
            </Link>
          </div>

          <div className={`w-full ${isRtl ? 'md:order-1' : ''}`}>
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl">
              <iframe
                loading="lazy"
                title="Gumlet video player"
                src="https://play.gumlet.io/embed/69963cb53151985919afa2a5?background=false&autoplay=false&loop=true&disable_player_controls=false"
                className="absolute inset-0 w-full h-full border-0"
                referrerPolicy="origin"
                allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
