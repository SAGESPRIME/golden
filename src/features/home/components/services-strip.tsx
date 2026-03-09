'use client';

import { Leaf, Award, Bug, BadgeCheck, Star, Package } from 'lucide-react';

interface ServicesStripProps {
  locale: string;
}

const ITEMS_FR = [
  {
    icon: Leaf,
    title: 'Miel français bio',
    desc: 'Récolté dans les terroirs de France',
  },
  {
    icon: Award,
    title: 'Qualité artisanale',
    desc: 'Sans additif, sans traitement',
  },
  {
    icon: Bug,
    title: 'Respect des abeilles',
    desc: 'Apiculture traditionnelle préservée',
  },
  {
    icon: BadgeCheck,
    title: '100% naturel & bio',
    desc: 'Origine unique et traçable',
  },
  {
    icon: Star,
    title: 'Avis clients vérifiés',
    desc: '+500 commandes livrées',
  },
  {
    icon: Package,
    title: 'Livraison soignée',
    desc: 'Colis protégé, expédié sous 48h',
  },
];

const ITEMS_AR = [
  {
    icon: Leaf,
    title: 'عسل فرنسي عضوي',
    desc: 'يُحصد من أراضي فرنسا',
  },
  {
    icon: Award,
    title: 'جودة حرفية',
    desc: 'بدون إضافات ولا معالجة',
  },
  {
    icon: Bug,
    title: 'احترام النحل',
    desc: 'تربية تقليدية محافظ عليها',
  },
  {
    icon: BadgeCheck,
    title: '100% طبيعي وعضوي',
    desc: 'مصدر موحد وقابل للتتبع',
  },
  {
    icon: Star,
    title: 'تقييمات موثقة',
    desc: '+500 طلب تم توصيله',
  },
  {
    icon: Package,
    title: 'توصيل عناية',
    desc: 'طرد محمي، شحن خلال 48 ساعة',
  },
];

export function ServicesStrip({ locale }: ServicesStripProps) {
  const isRtl = locale === 'ar';
  const items = isRtl ? ITEMS_AR : ITEMS_FR;
  const doubled = [...items, ...items];

  return (
    <section className="relative overflow-hidden bg-[#1a1310] py-0 border-y border-[#fed330]/20">
      {/* Fade edges */}
      <div className="pointer-events-none absolute start-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-[#1a1310] to-transparent" />
      <div className="pointer-events-none absolute end-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-[#1a1310] to-transparent" />

      <div
        className={`flex items-stretch ${isRtl ? 'animate-marquee-rtl' : 'animate-marquee'}`}
        style={{ width: 'max-content' }}
      >
        {doubled.map((item, i) => {
          const Icon = item.icon;
          return (
            <div
              key={i}
              className="flex items-center gap-3 px-8 py-5 border-e border-[#fed330]/10 shrink-0"
            >
              <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#fed330]/10 text-[#fed330]">
                <Icon className="size-4" />
              </div>
              <div>
                <p className="text-sm font-bold text-white leading-tight whitespace-nowrap">
                  {item.title}
                </p>
                <p className="text-[11px] text-white/50 leading-tight whitespace-nowrap mt-0.5">
                  {item.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
