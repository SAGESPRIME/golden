import Link from 'next/link';

interface StorySectionProps {
  locale: string;
}

const TEXT_FR = {
  tag: 'Notre histoire',
  title:
    'Pureté & Excellence \u2014 Récoltés au c\u0153ur de l\u2019arrière-pays espagnol',
  p1: 'Récoltés au c\u0153ur de l\u2019arrière-pays espagnol, nos miels allient pureté, authenticité et bienfaits naturels. Chaque goutte est le reflet d\u2019un terroir préservé, offrant des saveurs uniques et une richesse nutritionnelle incomparable.',
  p2: 'Dahlia sélectionne et récolte pour vous les meilleurs miels afin que vous profitiez pleinement des bienfaits de ce trésor de la nature. Engagée à offrir des produits de qualité, la marque garantit la traçabilité totale de ses miels, certifie leur origine et contrôle rigoureusement leur pureté.',
  cta: 'DÉCOUVRIR NOS MIELS',
};

const TEXT_AR = {
  tag: 'قصتنا',
  title: 'النقاء والتميز — من قلب الريف الإسباني',
  p1: 'يُحصد في قلب الريف الإسباني، عسلنا يجمع بين النقاء والأصالة والفوائد الطبيعية. كل قطرة تعكس أرضاً محفوظة، تقدم نكهات فريدة وثروة غذائية لا مثيل لها.',
  p2: 'داليا تختار وتحصد لكم أجود الأعسال، ملتزمة بتقديم منتجات عالية الجودة مع ضمان التتبع الكامل لأعسالها، واعتماد أصلها والسيطرة الصارمة على نقائها.',
  cta: 'اكتشف عسلنا',
};

export function StorySection({ locale }: StorySectionProps) {
  const isRtl = locale === 'ar';
  const t = isRtl ? TEXT_AR : TEXT_FR;

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
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 container mx-auto px-4">
        <div className={`max-w-2xl ${isRtl ? 'ms-auto text-end' : ''}`}>
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#fed330] mb-4">
            {t.tag}
          </p>
          <h2 className="font-[var(--font-display)] text-3xl md:text-4xl font-bold leading-tight text-white mb-6">
            {t.title}
          </h2>
          <p className="text-white/85 leading-relaxed mb-4">{t.p1}</p>
          <p className="text-white/85 leading-relaxed mb-8">{t.p2}</p>
          <Link
            href={`/${locale}/products`}
            className="inline-block border-2 border-white text-white font-bold uppercase tracking-widest text-sm px-8 py-3 hover:bg-white hover:text-[#1a1310] transition-colors"
          >
            {t.cta}
          </Link>
        </div>
      </div>
    </section>
  );
}
