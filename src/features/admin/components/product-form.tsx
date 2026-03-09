'use client';

import { useState, useTransition } from 'react';
import { useMutation } from 'convex/react';
import { useRouter } from 'next/navigation';
import { api } from '../../../../convex/_generated/api';
import type { Id } from '../../../../convex/_generated/dataModel';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface ProductFormProps {
  locale: string;
  initialData?: {
    _id: string;
    name: { fr: string; ar: string };
    description: { fr: string; ar: string };
    slug: string;
    price: number;
    compareAtPrice?: number;
    images: string[];
    category: string;
    weight: number;
    inStock: boolean;
    featured: boolean;
  };
}

const categories = ['bien-etre', 'lavande', 'foret', 'fleurs', 'rare'];

export function ProductForm({ locale, initialData }: ProductFormProps) {
  const router = useRouter();
  const createProduct = useMutation(api.products.create);
  const updateProduct = useMutation(api.products.update);
  const isRtl = locale === 'ar';
  const isEditing = !!initialData;

  const [form, setForm] = useState({
    nameFr: initialData?.name.fr ?? '',
    nameAr: initialData?.name.ar ?? '',
    descFr: initialData?.description.fr ?? '',
    descAr: initialData?.description.ar ?? '',
    slug: initialData?.slug ?? '',
    price: initialData?.price?.toString() ?? '',
    compareAtPrice: initialData?.compareAtPrice?.toString() ?? '',
    images: initialData?.images.join('\n') ?? '',
    category: initialData?.category ?? 'bien-etre',
    weight: initialData?.weight?.toString() ?? '',
    inStock: initialData?.inStock ?? true,
    featured: initialData?.featured ?? false,
  });

  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      name: { fr: form.nameFr, ar: form.nameAr },
      description: { fr: form.descFr, ar: form.descAr },
      slug: form.slug,
      price: parseInt(form.price),
      compareAtPrice: form.compareAtPrice
        ? parseInt(form.compareAtPrice)
        : undefined,
      images: form.images.split('\n').filter(Boolean),
      category: form.category,
      weight: parseInt(form.weight),
      inStock: form.inStock,
      featured: form.featured,
    };

    startTransition(async () => {
      if (isEditing && initialData) {
        await updateProduct({ id: initialData._id as Id<'products'>, ...data });
      } else {
        await createProduct(data);
      }
      router.push(`/${locale}/admin/products`);
    });
  };

  const set = (key: string, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>{isRtl ? 'الاسم (FR)' : 'Nom (FR)'}</Label>
          <Input
            value={form.nameFr}
            onChange={(e) => set('nameFr', e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label>{isRtl ? 'الاسم (AR)' : 'Nom (AR)'}</Label>
          <Input
            value={form.nameAr}
            onChange={(e) => set('nameAr', e.target.value)}
            required
            dir="rtl"
          />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>{isRtl ? 'الوصف (FR)' : 'Description (FR)'}</Label>
          <Textarea
            value={form.descFr}
            onChange={(e) => set('descFr', e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label>{isRtl ? 'الوصف (AR)' : 'Description (AR)'}</Label>
          <Textarea
            value={form.descAr}
            onChange={(e) => set('descAr', e.target.value)}
            required
            dir="rtl"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label>Slug</Label>
        <Input
          value={form.slug}
          onChange={(e) => set('slug', e.target.value)}
          required
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <Label>{isRtl ? 'السعر (سنتيم)' : 'Prix (centimes)'}</Label>
          <Input
            type="number"
            value={form.price}
            onChange={(e) => set('price', e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label>{isRtl ? 'السعر المشطوب' : 'Prix barre'}</Label>
          <Input
            type="number"
            value={form.compareAtPrice}
            onChange={(e) => set('compareAtPrice', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label>{isRtl ? 'الوزن (غ)' : 'Poids (g)'}</Label>
          <Input
            type="number"
            value={form.weight}
            onChange={(e) => set('weight', e.target.value)}
            required
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label>{isRtl ? 'الفئة' : 'Categorie'}</Label>
        <Select value={form.category} onValueChange={(v) => set('category', v)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label>
          {isRtl ? 'الصور (رابط في كل سطر)' : 'Images (URL par ligne)'}
        </Label>
        <Textarea
          value={form.images}
          onChange={(e) => set('images', e.target.value)}
          required
        />
      </div>
      <div className="flex gap-6">
        <label className="flex items-center gap-2">
          <Checkbox
            checked={form.inStock}
            onCheckedChange={(v) => set('inStock', !!v)}
          />
          <span className="text-sm">{isRtl ? 'متوفر' : 'En stock'}</span>
        </label>
        <label className="flex items-center gap-2">
          <Checkbox
            checked={form.featured}
            onCheckedChange={(v) => set('featured', !!v)}
          />
          <span className="text-sm">{isRtl ? 'مميز' : 'Vedette'}</span>
        </label>
      </div>
      <Button type="submit" disabled={isPending}>
        {isPending
          ? isRtl
            ? 'جار الحفظ...'
            : 'Enregistrement...'
          : isRtl
            ? 'حفظ'
            : 'Enregistrer'}
      </Button>
    </form>
  );
}
