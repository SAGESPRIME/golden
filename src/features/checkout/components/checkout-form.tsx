'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { shippingAddressSchema, type ShippingAddressFormData } from '@/lib/validators';

interface CheckoutFormProps {
  locale: string;
  onSubmit: (data: ShippingAddressFormData) => void;
  isSubmitting: boolean;
}

const FIELDS = [
  { name: 'fullName' as const, fr: 'Nom complet', ar: 'الاسم الكامل' },
  { name: 'address' as const, fr: 'Adresse', ar: 'العنوان' },
  { name: 'city' as const, fr: 'Ville', ar: 'المدينة' },
  { name: 'postalCode' as const, fr: 'Code postal', ar: 'الرمز البريدي' },
  { name: 'country' as const, fr: 'Pays', ar: 'البلد' },
  { name: 'phone' as const, fr: 'Telephone', ar: 'الهاتف' },
] as const;

export function CheckoutForm({ locale, onSubmit, isSubmitting }: CheckoutFormProps) {
  const isRtl = locale === 'ar';
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShippingAddressFormData>({
    resolver: zodResolver(shippingAddressSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {FIELDS.map((field) => {
        const label = isRtl ? field.ar : field.fr;
        return (
          <div key={field.name} className="space-y-1">
            <Label htmlFor={field.name}>{label}</Label>
            <Input
              id={field.name}
              {...register(field.name)}
              aria-label={label}
              aria-invalid={!!errors[field.name]}
            />
            {errors[field.name] && (
              <p className="text-sm text-destructive">{errors[field.name]?.message}</p>
            )}
          </div>
        );
      })}
      <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
        {isSubmitting
          ? (isRtl ? 'جار المعالجة...' : 'Traitement...')
          : (isRtl ? 'تأكيد الطلب' : 'Passer la commande')}
      </Button>
    </form>
  );
}
