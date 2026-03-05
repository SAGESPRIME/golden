import { z } from 'zod/v4';

export const productFormSchema = z.object({
  nameFr: z.string().min(2, 'Nom FR requis'),
  nameAr: z.string().min(2, 'Nom AR requis'),
  descriptionFr: z.string().min(10, 'Description FR requise'),
  descriptionAr: z.string().min(10, 'Description AR requise'),
  slug: z
    .string()
    .min(2, 'Slug requis')
    .regex(/^[a-z0-9-]+$/, 'Slug invalide'),
  price: z.number().int().positive('Prix requis'),
  compareAtPrice: z.number().int().positive().optional(),
  images: z.string().min(1, 'Au moins une image requise'),
  category: z.string().min(1, 'Categorie requise'),
  weight: z.number().int().positive('Poids requis'),
  inStock: z.boolean(),
  featured: z.boolean(),
});

export type ProductFormData = z.infer<typeof productFormSchema>;
