import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ProductGrid } from './product-grid';
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

const mockProducts: SeedProduct[] = [
  {
    _id: 'prod_1',
    name: { fr: 'Miel A', ar: 'عسل أ' },
    description: { fr: 'Desc A', ar: 'وصف أ' },
    slug: 'miel-a',
    price: 3000,
    images: ['/images/a.jpg'],
    category: 'mountain',
    weight: 500,
    inStock: true,
    featured: false,
  },
  {
    _id: 'prod_2',
    name: { fr: 'Miel B', ar: 'عسل ب' },
    description: { fr: 'Desc B', ar: 'وصف ب' },
    slug: 'miel-b',
    price: 4000,
    images: ['/images/b.jpg'],
    category: 'forest',
    weight: 250,
    inStock: true,
    featured: false,
  },
];

describe('ProductGrid', () => {
  it('renders all products', () => {
    render(<ProductGrid products={mockProducts} locale="fr" />);
    expect(screen.getByText('Miel A')).toBeInTheDocument();
    expect(screen.getByText('Miel B')).toBeInTheDocument();
  });

  it('renders correct number of cards', () => {
    render(<ProductGrid products={mockProducts} locale="fr" />);
    const cards = screen.getAllByText(/Miel/);
    expect(cards).toHaveLength(2);
  });

  it('has responsive grid classes', () => {
    const { container } = render(<ProductGrid products={mockProducts} locale="fr" />);
    const grid = container.firstElementChild;
    expect(grid?.className).toContain('grid');
  });

  it('renders empty state when no products', () => {
    render(<ProductGrid products={[]} locale="fr" />);
    expect(screen.getByText(/aucun/i)).toBeInTheDocument();
  });
});
