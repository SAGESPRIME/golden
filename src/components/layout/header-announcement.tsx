import { Truck } from 'lucide-react';

interface HeaderAnnouncementProps {
  locale: string;
}

export function HeaderAnnouncement({ locale }: HeaderAnnouncementProps) {
  const isRtl = locale === 'ar';

  return (
    <div className="bg-black text-white text-xs py-2 text-center">
      <div className="container mx-auto px-4 flex items-center justify-center gap-2">
        <Truck className="size-3.5 shrink-0" />
        <span>
          {isRtl
            ? 'توصيل مجاني للطلبات فوق 45€ — شحن خلال 48 ساعة في كل أنحاء الجزائر'
            : "Livraison offerte des 45\u20AC d'achats \u2014 Exp\u00E9dition 48h partout en Alg\u00E9rie"}
        </span>
      </div>
    </div>
  );
}
