import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface TestimonialsSectionProps {
  locale: string;
}

const BENEFITS_FR = [
  {
    slug: 'mountain',
    emoji: '🏔️',
    label: 'Miel de montagne',
    desc: 'R\u00E9colt\u00E9 en altitude, riche en min\u00E9raux et au go\u00FBt puissant et caract\u00E9ris\u00E9.',
  },
  {
    slug: 'forest',
    emoji: '🌲',
    label: 'Miel de for\u00EAt',
    desc: 'Aux notes bois\u00E9es et r\u00E9sineuses, id\u00E9al pour accompagner fromages et desserts.',
  },
  {
    slug: 'flower',
    emoji: '🌸',
    label: 'Miel de fleurs',
    desc: 'Doux et parfum\u00E9, poly floral, parfait pour le quotidien.',
  },
  {
    slug: 'rare',
    emoji: '💎',
    label: 'Miel rare',
    desc: 'Châtaignier, sarrasin... des miels exceptionnels aux saveurs intenses et uniques.',
  },
  {
    slug: 'organic',
    emoji: '🌿',
    label: 'Miel bio',
    desc: 'Certifi\u00E9 sans pesticides, issu de zones naturelles prot\u00E9g\u00E9es.',
  },
];

const BENEFITS_AR = [
  {
    slug: 'mountain',
    emoji: '🏔️',
    label: 'عسل الجبال',
    desc: 'يُحصد على ارتفاع شاهق، غني بالمعادن وذو طعم قوي ومميز.',
  },
  {
    slug: 'forest',
    emoji: '🌲',
    label: 'عسل الغابة',
    desc: 'بنكهات خشبية وراتنجية، مثالي مع الجبن والحلويات.',
  },
  {
    slug: 'flower',
    emoji: '🌸',
    label: 'عسل الأزهار',
    desc: 'ناعم ومعطر، متعدد الزهور، مثالي للاستخدام اليومي.',
  },
  {
    slug: 'rare',
    emoji: '💎',
    label: 'عسل نادر',
    desc: 'الكستناء، الحنطة السوداء... عسل استثنائي بنكهات قوية وفريدة.',
  },
  {
    slug: 'organic',
    emoji: '🌿',
    label: 'عسل عضوي',
    desc: 'معتمد خالٍ من المبيدات، من مناطق طبيعية محمية.',
  },
];

export function TestimonialsSection({ locale }: TestimonialsSectionProps) {
  const isRtl = locale === 'ar';
  const benefits = isRtl ? BENEFITS_AR : BENEFITS_FR;

  return (
    <section className="py-12 md:py-16 bg-section-alt overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="font-[var(--font-display)] text-2xl md:text-3xl font-bold text-center mb-8">
          {isRtl
            ? 'فوائد العسل الفرنسي البيو'
            : 'Les bienfaits du miel français bio'}
        </h2>

        <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
          {benefits.map((item) => (
            <Link
              key={item.slug}
              href={`/${locale}/products?cat=${item.slug}`}
              className="snap-start shrink-0 w-56 md:w-64 bg-card border border-border/50 p-5 space-y-3 hover:border-primary/40 hover:shadow-md transition-all group"
            >
              <div className="text-4xl">{item.emoji}</div>
              <h3 className="font-semibold group-hover:text-primary transition-colors">
                {item.label}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.desc}
              </p>
              <span className="flex items-center gap-1 text-xs text-primary font-semibold">
                {isRtl ? 'اكتشف' : 'D\u00E9couvrir'}{' '}
                <ChevronRight className="size-3" />
              </span>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href={`/${locale}/products`}
            className="inline-block border-2 border-primary text-primary font-bold uppercase tracking-widest text-sm px-8 py-3 hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            {isRtl ? 'عرض كل أنواع عسلنا' : 'VOIR TOUS NOS MIELS'}
          </Link>
        </div>
      </div>
    </section>
  );
}
