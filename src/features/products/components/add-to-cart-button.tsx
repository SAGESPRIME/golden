'use client';

import { ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/use-cart';
import type { SeedProduct } from '../types';

export interface AddToCartButtonProps {
  product: SeedProduct;
  locale: string;
  size?: 'sm' | 'default' | 'lg';
}

export function AddToCartButton({ product, locale, size = 'default' }: AddToCartButtonProps) {
  const { addItem } = useCart();
  const isRtl = locale === 'ar';

  const handleAddToCart = () => {
    addItem({
      productId: product._id,
      name: product.name,
      price: product.price,
      image: product.images[0],
    });
    toast.success(isRtl ? 'تمت الإضافة إلى السلة' : 'Produit ajoute au panier');
  };

  if (!product.inStock) {
    return (
      <Button size={size} disabled className="w-full">
        {isRtl ? 'نفذ من المخزون' : 'Rupture de stock'}
      </Button>
    );
  }

  return (
    <Button size={size} onClick={handleAddToCart} className="w-full">
      <ShoppingCart className="size-4" />
      {isRtl ? 'أضف إلى السلة' : 'Ajouter au panier'}
    </Button>
  );
}
