import { z } from 'zod/v4';

export const shippingAddressSchema = z.object({
  fullName: z.string().min(2, 'Nom requis').max(100),
  address: z.string().min(5, 'Adresse requise').max(200),
  city: z.string().min(2, 'Ville requise').max(100),
  postalCode: z.string().min(4, 'Code postal requis').max(10),
  country: z.string().min(2, 'Pays requis').max(100),
  phone: z.string().min(8, 'Telephone requis').max(20),
});

export type ShippingAddressFormData = z.infer<typeof shippingAddressSchema>;
