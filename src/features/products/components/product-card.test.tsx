import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { ProductCard } from './product-card';
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

const mockProduct: SeedProduct = {
  _id: 'prod_test',
  name: { fr: 'Miel Test', ar: 'عسل تست' },
  description: { fr: 'Description test', ar: 'وصف تست' },
  slug: 'miel-test',
  price: 3500,
  images: ['/images/test.jpg'],
  category: 'mountain',
  weight: 500,
  inStock: true,
  featured: false,
};

const promoProduct: SeedProduct = {
  ...mockProduct,
  _id: 'prod_promo',
  compareAtPrice: 4800,
  slug: 'miel-promo',
};

const outOfStockProduct: SeedProduct = {
  ...mockProduct,
  _id: 'prod_oos',
  inStock: false,
  slug: 'miel-oos',
};

describe('ProductCard', () => {
  it('renders product name for locale FR', () => {
    render(<ProductCard product={mockProduct} locale="fr" />);
    expect(screen.getByText('Miel Test')).toBeInTheDocument();
  });

  it('renders product name for locale AR', () => {
    render(<ProductCard product={mockProduct} locale="ar" />);
    expect(screen.getByText('عسل تست')).toBeInTheDocument();
  });

  it('renders formatted price', () => {
    render(<ProductCard product={mockProduct} locale="fr" />);
    expect(screen.getByText(/35,00/)).toBeInTheDocument();
  });

  it('renders weight', () => {
    render(<ProductCard product={mockProduct} locale="fr" />);
    expect(screen.getByText(/500/)).toBeInTheDocument();
  });

  it('renders category badge', () => {
    render(<ProductCard product={mockProduct} locale="fr" />);
    expect(screen.getByText('mountain')).toBeInTheDocument();
  });

  it('renders promo badge and old price when compareAtPrice exists', () => {
    render(<ProductCard product={promoProduct} locale="fr" />);
    expect(screen.getByText(/48,00/)).toBeInTheDocument();
  });

  it('renders out of stock badge when not in stock', () => {
    render(<ProductCard product={outOfStockProduct} locale="fr" />);
    expect(screen.getByText(/rupture/i)).toBeInTheDocument();
  });

  it('applies opacity class when out of stock', () => {
    const { container } = render(<ProductCard product={outOfStockProduct} locale="fr" />);
    const card = container.firstElementChild;
    expect(card?.className).toContain('opacity');
  });

  it('renders product image', () => {
    render(<ProductCard product={mockProduct} locale="fr" />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('alt', 'Miel Test');
  });

  it('links to product detail page', () => {
    render(<ProductCard product={mockProduct} locale="fr" />);
    const links = screen.getAllByRole('link');
    expect(links[0]).toHaveAttribute('href', '/fr/products/miel-test');
  });

  it('calls onAddToCart when button is clicked', async () => {
    const onAddToCart = vi.fn();
    render(<ProductCard product={mockProduct} locale="fr" onAddToCart={onAddToCart} />);
    const button = screen.getByRole('button');
    await userEvent.click(button);
    expect(onAddToCart).toHaveBeenCalledWith(mockProduct);
  });

  it('disables add to cart button when out of stock', () => {
    render(<ProductCard product={outOfStockProduct} locale="fr" onAddToCart={vi.fn()} />);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });
});
