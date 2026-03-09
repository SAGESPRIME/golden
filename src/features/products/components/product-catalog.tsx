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
  { key: 'bien-etre', label: { fr: 'Bien-Être', ar: 'عناية طبيعية' } },
  { key: 'lavande', label: { fr: 'Lavande', ar: 'لافندر' } },
  { key: 'foret', label: { fr: 'Forêt', ar: 'غابة' } },
  { key: 'fleurs', label: { fr: 'Fleurs', ar: 'أزهار' } },
  { key: 'rare', label: { fr: 'Rareté', ar: 'نادر' } },
];

export function ProductCatalog({ locale }: { locale: string }) {
  const { products } = useProducts();
  const { addItem } = useCart();
  const [activeCategory, setActiveCategory] = useState<CategoryKey | 'all'>(
    'all'
  );

  const handleAddToCart = (product: SeedProduct) => {
    addItem({
      productId: product._id,
      name: product.name,
      price: product.price,
      image: product.images[0],
    });
    toast.success(
      locale === 'ar' ? 'تمت الإضافة إلى السلة' : 'Produit ajoute au panier'
    );
  };

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'all') return products;
    return products.filter((p) => p.category === activeCategory);
  }, [products, activeCategory]);

  const availableCategories = useMemo(() => {
    const productCategories = new Set(products.map((p) => p.category));
    return CATEGORIES.filter(
      (cat) => cat.key === 'all' || productCategories.has(cat.key)
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
      <ProductGrid
        products={filteredProducts}
        locale={locale}
        onAddToCart={handleAddToCart}
      />
    </>
  );
}
