import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { CartItemRow } from './cart-item-row';
import type { CartItem } from '@/stores/cart-store';

vi.mock('next/image', () => ({
  default: (props: Record<string, unknown>) => {
    const { fill, priority, ...rest } = props;
    return <img {...rest} data-fill={fill ? 'true' : undefined} />;
  },
}));

const mockItem: CartItem = {
  productId: 'prod_001',
  name: { fr: 'Miel de Jijel', ar: 'عسل جيجل' },
  price: 3500,
  quantity: 2,
  image: '/images/test.jpg',
};

describe('CartItemRow', () => {
  it('renders item name in FR', () => {
    render(
      <CartItemRow item={mockItem} locale="fr" onUpdateQuantity={vi.fn()} onRemove={vi.fn()} />,
    );
    expect(screen.getByText('Miel de Jijel')).toBeInTheDocument();
  });

  it('renders item name in AR', () => {
    render(
      <CartItemRow item={mockItem} locale="ar" onUpdateQuantity={vi.fn()} onRemove={vi.fn()} />,
    );
    expect(screen.getByText('عسل جيجل')).toBeInTheDocument();
  });

  it('renders formatted price', () => {
    render(
      <CartItemRow item={mockItem} locale="fr" onUpdateQuantity={vi.fn()} onRemove={vi.fn()} />,
    );
    expect(screen.getByText(/70,00/)).toBeInTheDocument();
  });

  it('renders quantity', () => {
    render(
      <CartItemRow item={mockItem} locale="fr" onUpdateQuantity={vi.fn()} onRemove={vi.fn()} />,
    );
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('calls onUpdateQuantity when + is clicked', async () => {
    const onUpdate = vi.fn();
    render(
      <CartItemRow item={mockItem} locale="fr" onUpdateQuantity={onUpdate} onRemove={vi.fn()} />,
    );
    const buttons = screen.getAllByRole('button');
    const plusButton = buttons.find((b) => b.textContent === '+');
    await userEvent.click(plusButton!);
    expect(onUpdate).toHaveBeenCalledWith('prod_001', 3);
  });

  it('calls onUpdateQuantity when - is clicked', async () => {
    const onUpdate = vi.fn();
    render(
      <CartItemRow item={mockItem} locale="fr" onUpdateQuantity={onUpdate} onRemove={vi.fn()} />,
    );
    const buttons = screen.getAllByRole('button');
    const minusButton = buttons.find((b) => b.textContent === '-');
    await userEvent.click(minusButton!);
    expect(onUpdate).toHaveBeenCalledWith('prod_001', 1);
  });

  it('calls onRemove when remove button is clicked', async () => {
    const onRemove = vi.fn();
    render(
      <CartItemRow item={mockItem} locale="fr" onUpdateQuantity={vi.fn()} onRemove={onRemove} />,
    );
    const removeButton = screen.getByLabelText(/supprimer|remove/i);
    await userEvent.click(removeButton);
    expect(onRemove).toHaveBeenCalledWith('prod_001');
  });

  it('renders product image', () => {
    render(
      <CartItemRow item={mockItem} locale="fr" onUpdateQuantity={vi.fn()} onRemove={vi.fn()} />,
    );
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('alt', 'Miel de Jijel');
  });
});
