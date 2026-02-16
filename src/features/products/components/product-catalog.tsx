'use client';

import { useState, useMemo } from 'react';
import { toast } from 'sonner';
import { CategoryFilter } from './category-filter';
import { ProductGrid } from './product-grid';
import { useProducts } from '../hooks/use-products';
import { useCart } from '@/hooks/use-cart';
import type { Category, CategoryKey, SeedProduct } from '../types';

const CATEGORIES: Category[] = [
  { key: 'all', label: { fr: 'Tous', ar: 'الكل' } },
  { key: 'mountain', label: { fr: 'Miel de montagne', ar: 'عسل الجبال' } },
  { key: 'forest', label: { fr: 'Miel de foret', ar: 'عسل الغابة' } },
  { key: 'flower', label: { fr: 'Miel de fleurs', ar: 'عسل الأزهار' } },
  { key: 'rare', label: { fr: 'Miel rare', ar: 'عسل نادر' } },
  { key: 'organic', label: { fr: 'Miel bio', ar: 'عسل عضوي' } },
];

export function ProductCatalog({ locale }: { locale: string }) {
  const { products } = useProducts();
  const { addItem } = useCart();
  const [activeCategory, setActiveCategory] = useState<CategoryKey | 'all'>('all');

  const handleAddToCart = (product: SeedProduct) => {
    addItem({
      productId: product._id,
      name: product.name,
      price: product.price,
      image: product.images[0],
    });
    toast.success(locale === 'ar' ? 'تمت الإضافة إلى السلة' : 'Produit ajoute au panier');
  };

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'all') return products;
    return products.filter((p) => p.category === activeCategory);
  }, [products, activeCategory]);

  const availableCategories = useMemo(() => {
    const productCategories = new Set(products.map((p) => p.category));
    return CATEGORIES.filter(
      (cat) => cat.key === 'all' || productCategories.has(cat.key),
    );
  }, [products]);

  return (
    <>
      <CategoryFilter
        categories={availableCategories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        locale={locale}
      />
      <ProductGrid products={filteredProducts} locale={locale} onAddToCart={handleAddToCart} />
    </>
  );
}
