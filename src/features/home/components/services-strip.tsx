import { Truck, Shield, Clock, Headphones, Store, Zap } from 'lucide-react';

interface ServicesStripProps {
  locale: string;
}

const SERVICES_FR = [
  {
    icon: Truck,
    title: 'Livraison soign\u00E9e',
    desc: 'Colis prot\u00E9g\u00E9',
  },
  {
    icon: Shield,
    title: 'Paiement s\u00E9curis\u00E9',
    desc: 'Stripe certifi\u00E9',
  },
  { icon: Clock, title: 'Livraison 48h\u201372h', desc: 'Partout en France' },
  {
    icon: Headphones,
    title: 'Service client',
    desc: '\u00C0 votre \u00E9coute',
  },
  { icon: Store, title: 'Retrait boutique', desc: 'Gratuit et rapide' },
  { icon: Zap, title: 'Exp\u00E9dition rapide', desc: 'Commande avant 14h' },
];

const SERVICES_AR = [
  { icon: Truck, title: 'توصيل مُعتنى به', desc: 'طرد محمي' },
  { icon: Shield, title: 'دفع آمن', desc: 'Stripe معتمد' },
  { icon: Clock, title: 'توصيل 48h–72h', desc: 'في كل أنحاء الجزائر' },
  { icon: Headphones, title: 'خدمة العملاء', desc: 'في خدمتكم' },
  { icon: Store, title: 'الاستلام من المتجر', desc: 'مجاني وسريع' },
  { icon: Zap, title: 'شحن سريع', desc: 'الطلب قبل الساعة 14:00' },
];

export function ServicesStrip({ locale }: ServicesStripProps) {
  const services = locale === 'ar' ? SERVICES_AR : SERVICES_FR;

  return (
    <section className="bg-muted border-y border-border/50 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {services.map((service) => (
            <div
              key={service.title}
              className="flex flex-col items-center text-center gap-2"
            >
              <div className="flex size-10 items-center justify-center rounded-full bg-gold-100 text-honey">
                <service.icon className="size-5" />
              </div>
              <p className="text-sm font-semibold leading-tight">
                {service.title}
              </p>
              <p className="text-xs text-muted-foreground">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
