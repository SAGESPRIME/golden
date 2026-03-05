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
                ? 'العسل الجزائري، كنز من الطبيعة'
                : 'Le miel alg\u00E9rien, un tr\u00E9sor de la ruche'}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {isRtl
                ? 'يعمل شركاؤنا من المربين في جبال الجزائر على الحفاظ على الممارسات التقليدية التي توارثوها عن أجدادهم. كل وعاء عسل يحكي قصة أرض، موسم، ونحلة.'
                : 'Nos apiculteurs partenaires en Alg\u00E9rie perp\u00E9tuent des pratiques ancestrales transmises de g\u00E9n\u00E9ration en g\u00E9n\u00E9ration. Chaque pot de miel raconte l\u2019histoire d\u2019un terroir, d\u2019une saison, d\u2019une abeille.'}
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

          <div
            className={`flex items-center justify-center ${isRtl ? 'md:order-1' : ''}`}
          >
            <div className="relative w-full max-w-sm aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-gold-200 to-gold-400 flex items-center justify-center shadow-xl">
              <span className="text-[100px] md:text-[140px] select-none">
                🍯
              </span>
              <div className="absolute inset-0 bg-gradient-to-t from-warm-brown/20 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
