import { Home, Award, Heart, Leaf, Star } from 'lucide-react';

interface TrustStatsProps {
  locale: string;
}

const BADGES_FR = [
  {
    icon: Home,
    title: 'Miel alg\u00E9rien authentique',
    desc: 'R\u00E9colt\u00E9 dans les montagnes d\u2019Alg\u00E9rie',
  },
  {
    icon: Award,
    title: 'Qualit\u00E9 artisanale',
    desc: 'Sans additif, sans traitement',
  },
  {
    icon: Heart,
    title: 'Respect des abeilles',
    desc: 'Apiculture traditionnelle pr\u00E9serv\u00E9e',
  },
  {
    icon: Leaf,
    title: '100% naturel',
    desc: 'Origine unique et tra\u00E7able',
  },
  {
    icon: Star,
    title: 'Avis clients v\u00E9rifi\u00E9s',
    desc: '+500 commandes livr\u00E9es',
  },
];

const BADGES_AR = [
  { icon: Home, title: 'عسل جزائري أصيل', desc: 'يُحصد في جبال الجزائر' },
  { icon: Award, title: 'جودة حرفية', desc: 'بدون إضافات أو معالجة' },
  { icon: Heart, title: 'احترام النحل', desc: 'تربية نحل تقليدية محفوظة' },
  { icon: Leaf, title: '100% طبيعي', desc: 'مصدر فريد وقابل للتتبع' },
  { icon: Star, title: 'آراء موثقة', desc: '+500 طلب تم توصيله' },
];

export function TrustStats({ locale }: TrustStatsProps) {
  const badges = locale === 'ar' ? BADGES_AR : BADGES_FR;

  return (
    <section className="border-y border-border/50 bg-card py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center divide-y sm:divide-y-0 sm:divide-x divide-border/40">
          {badges.map((badge) => (
            <div
              key={badge.title}
              className="flex items-center gap-3 px-4 py-3 sm:py-2 sm:flex-1 sm:justify-center"
            >
              <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-gold-100 text-honey">
                <badge.icon className="size-4" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold leading-tight">
                  {badge.title}
                </p>
                <p className="text-xs text-muted-foreground">{badge.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
