import { Home, Award, Heart, Leaf, Star } from 'lucide-react';

interface TrustStatsProps {
  locale: string;
}

const BADGES_FR = [
  {
    icon: Home,
    title: 'Miel français bio',
    desc: 'Récolté dans les terroirs de France',
  },
  {
    icon: Award,
    title: 'Qualité artisanale',
    desc: 'Sans additif, sans traitement',
  },
  {
    icon: Heart,
    title: 'Respect des abeilles',
    desc: 'Apiculture traditionnelle préservée',
  },
  {
    icon: Leaf,
    title: '100% naturel & bio',
    desc: 'Origine unique et traçable',
  },
  {
    icon: Star,
    title: 'Avis clients vérifiés',
    desc: '+500 commandes livrées',
  },
];

const BADGES_AR = [
  { icon: Home, title: 'عسل فرنسي عضوي', desc: 'يُحصد من أراضي فرنسا' },
  { icon: Award, title: 'جودة حرفية', desc: 'بدون إضافات أو معالجة' },
  { icon: Heart, title: 'احترام النحل', desc: 'تربية نحل تقليدية محفوظة' },
  { icon: Leaf, title: '100% طبيعي وعضوي', desc: 'مصدر فريد وقابل للتتبع' },
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
