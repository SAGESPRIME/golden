import Link from 'next/link';

interface StorySectionProps {
  locale: string;
}

export function StorySection({ locale }: StorySectionProps) {
  const isRtl = locale === 'ar';

  return (
    <section
      id="story"
      className="relative py-20 md:py-32 overflow-hidden"
      style={{
        backgroundImage: 'url(/images/histoire-bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay sombre pour lisibilité */}
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 container mx-auto px-4">
        <div className={`max-w-2xl ${isRtl ? 'ms-auto text-end' : ''}`}>
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#fed330] mb-4">
            {isRtl ? 'قصتنا' : 'Notre histoire'}
          </p>
          <h2 className="font-[var(--font-display)] text-3xl md:text-4xl font-bold leading-tight text-white mb-6">
            {isRtl
              ? 'العسل الفرنسي البيو، كنز من الطبيعة'
              : 'Le miel bio français, un trésor de la ruche'}
          </h2>
          <p className="text-white/85 leading-relaxed mb-4">
            {isRtl
              ? 'يعمل شركاؤنا من المربين في أجمل مناطق فرنسا على الحفاظ على الممارسات التقليدية التي توارثوها عن أجدادهم. كل وعاء عسل يحكي قصة أرض، موسم، ونحلة.'
              : "Nos apiculteurs partenaires à travers la France perpétuent des pratiques ancestrales transmises de génération en génération. Chaque pot de miel raconte l'histoire d'un terroir, d'une saison, d'une abeille."}
          </p>
          <p className="text-white/85 leading-relaxed mb-8">
            {isRtl
              ? 'من المنحلة إلى مائدتك، نضمن الشفافية الكاملة: الأصل، المنطقة، طريقة الحصاد.'
              : 'Du rucher à votre table, nous garantissons une traçabilité complète\u00A0: l\u2019origine, la région, la méthode de récolte.'}
          </p>
          <Link
            href={`/${locale}/products`}
            className="inline-block border-2 border-white text-white font-bold uppercase tracking-widest text-sm px-8 py-3 hover:bg-white hover:text-[#1a1310] transition-colors"
          >
            {isRtl ? 'من نحن؟' : 'QUI SOMMES-NOUS\u00A0?'}
          </Link>
        </div>
      </div>
    </section>
  );
}
