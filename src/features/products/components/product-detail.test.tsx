import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ProductDetail } from './product-detail';
import type { SeedProduct } from '../types';

vi.mock('next/image', () => ({
  default: (props: Record<string, unknown>) => {
    const { fill, priority, ...rest } = props;
    return <img {...rest} data-fill={fill ? 'true' : undefined} />;
  },
}));

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string } & Record<string, unknown>) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

vi.mock('@/hooks/use-cart', () => ({
  useCart: () => ({
    addItem: vi.fn(),
    items: [],
    removeItem: vi.fn(),
    updateQuantity: vi.fn(),
    clearCart: vi.fn(),
    totalItems: 0,
    totalPrice: 0,
  }),
}));

vi.mock('sonner', () => ({
  toast: { success: vi.fn() },
}));

const mockProduct: SeedProduct = {
  _id: 'prod_test',
  name: { fr: 'Miel de Jijel', ar: 'عسل جيجل' },
  description: { fr: 'Miel de montagne exceptionnel', ar: 'عسل جبلي استثنائي' },
  slug: 'miel-de-jijel',
  price: 3500,
  images: ['/images/jijel-1.jpg', '/images/jijel-2.jpg'],
  category: 'mountain',
  weight: 500,
  inStock: true,
  featured: true,
};

const promoProduct: SeedProduct = {
  ...mockProduct,
  _id: 'prod_promo',
  compareAtPrice: 4500,
};

const outOfStockProduct: SeedProduct = {
  ...mockProduct,
  _id: 'prod_oos',
  inStock: false,
};

describe('ProductDetail', () => {
  it('renders product name in FR', () => {
    render(<ProductDetail product={mockProduct} locale="fr" />);
    expect(screen.getByText('Miel de Jijel')).toBeInTheDocument();
  });

  it('renders product name in AR', () => {
    render(<ProductDetail product={mockProduct} locale="ar" />);
    expect(screen.getByText('عسل جيجل')).toBeInTheDocument();
  });

  it('renders description', () => {
    render(<ProductDetail product={mockProduct} locale="fr" />);
    expect(screen.getByText('Miel de montagne exceptionnel')).toBeInTheDocument();
  });

  it('renders price', () => {
    render(<ProductDetail product={mockProduct} locale="fr" />);
    expect(screen.getByText(/35,00/)).toBeInTheDocument();
  });

  it('renders weight', () => {
    render(<ProductDetail product={mockProduct} locale="fr" />);
    expect(screen.getByText(/500/)).toBeInTheDocument();
  });

  it('renders old price and discount when promo', () => {
    render(<ProductDetail product={promoProduct} locale="fr" />);
    expect(screen.getByText(/45,00/)).toBeInTheDocument();
    expect(screen.getByText(/-22%/)).toBeInTheDocument();
  });

  it('shows out of stock message', () => {
    render(<ProductDetail product={outOfStockProduct} locale="fr" />);
    const matches = screen.getAllByText(/rupture/i);
    expect(matches.length).toBeGreaterThanOrEqual(1);
  });

  it('renders back to catalog link', () => {
    render(<ProductDetail product={mockProduct} locale="fr" />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/fr/products');
  });

  it('renders image gallery', () => {
    render(<ProductDetail product={mockProduct} locale="fr" />);
    const imgs = screen.getAllByRole('img');
    expect(imgs.length).toBeGreaterThanOrEqual(1);
  });
});
