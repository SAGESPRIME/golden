import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AddToCartButton } from './add-to-cart-button';
import type { SeedProduct } from '../types';

vi.mock('@/hooks/use-cart', () => ({
  useCart: () => ({
    addItem: mockAddItem,
    items: [],
    removeItem: vi.fn(),
    updateQuantity: vi.fn(),
    clearCart: vi.fn(),
    totalItems: 0,
    totalPrice: 0,
  }),
}));

vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
  },
}));

const mockAddItem = vi.fn();

const mockProduct: SeedProduct = {
  _id: 'prod_test',
  name: { fr: 'Miel Test', ar: 'عسل تست' },
  description: { fr: 'Desc', ar: 'وصف' },
  slug: 'miel-test',
  price: 3500,
  images: ['/images/test.jpg'],
  category: 'mountain',
  weight: 500,
  inStock: true,
  featured: false,
};

const outOfStockProduct: SeedProduct = {
  ...mockProduct,
  inStock: false,
};

describe('AddToCartButton', () => {
  beforeEach(() => {
    mockAddItem.mockClear();
  });

  it('renders add to cart text in FR', () => {
    render(<AddToCartButton product={mockProduct} locale="fr" />);
    expect(screen.getByText(/ajouter au panier/i)).toBeInTheDocument();
  });

  it('renders add to cart text in AR', () => {
    render(<AddToCartButton product={mockProduct} locale="ar" />);
    expect(screen.getByText(/أضف إلى السلة/)).toBeInTheDocument();
  });

  it('calls addItem when clicked', async () => {
    render(<AddToCartButton product={mockProduct} locale="fr" />);
    await userEvent.click(screen.getByRole('button'));
    expect(mockAddItem).toHaveBeenCalledWith({
      productId: 'prod_test',
      name: mockProduct.name,
      price: 3500,
      image: '/images/test.jpg',
    });
  });

  it('is disabled when product is out of stock', () => {
    render(<AddToCartButton product={outOfStockProduct} locale="fr" />);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('shows out of stock text when disabled', () => {
    render(<AddToCartButton product={outOfStockProduct} locale="fr" />);
    expect(screen.getByText(/rupture/i)).toBeInTheDocument();
  });
});
