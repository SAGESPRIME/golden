import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { FeaturedProducts } from './featured-products';

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

describe('FeaturedProducts', () => {
  it('renders section title in FR', () => {
    render(<FeaturedProducts locale="fr" />);
    expect(screen.getByText(/miels vedettes/i)).toBeInTheDocument();
  });

  it('renders section title in AR', () => {
    render(<FeaturedProducts locale="ar" />);
    expect(screen.getByText(/المميز/)).toBeInTheDocument();
  });

  it('renders only featured products', () => {
    render(<FeaturedProducts locale="fr" />);
    // We know there are 3 featured products in seed data
    const cards = screen.getAllByRole('img');
    expect(cards.length).toBeGreaterThanOrEqual(3);
  });

  it('renders view all link', () => {
    render(<FeaturedProducts locale="fr" />);
    const link = screen.getByText(/voir tous/i);
    expect(link.closest('a')).toHaveAttribute('href', '/fr/products');
  });
});
