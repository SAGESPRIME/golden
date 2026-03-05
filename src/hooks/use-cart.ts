'use client';

import { useEffect, useState } from 'react';
import { useCartStore } from '@/stores/cart-store';

export function useCart() {
  const [hydrated, setHydrated] = useState(false);
  const items = useCartStore((state) => state.items);
  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const clearCart = useCartStore((state) => state.clearCart);
  const getTotalItems = useCartStore((state) => state.getTotalItems);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return {
      items: [],
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      totalItems: 0,
      totalPrice: 0,
    };
  }

  return {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    totalItems: getTotalItems(),
    totalPrice: getTotalPrice(),
  };
}
