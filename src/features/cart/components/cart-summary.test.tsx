import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { CartSummary } from './cart-summary';

describe('CartSummary', () => {
  it('renders total price in FR', () => {
    render(<CartSummary totalPrice={7000} totalItems={2} locale="fr" onCheckout={vi.fn()} />);
    expect(screen.getByText(/70,00/)).toBeInTheDocument();
  });

  it('renders total items count', () => {
    render(<CartSummary totalPrice={7000} totalItems={2} locale="fr" onCheckout={vi.fn()} />);
    expect(screen.getByText(/2/)).toBeInTheDocument();
  });

  it('renders checkout button', () => {
    render(<CartSummary totalPrice={7000} totalItems={2} locale="fr" onCheckout={vi.fn()} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('disables checkout when no items', () => {
    render(<CartSummary totalPrice={0} totalItems={0} locale="fr" onCheckout={vi.fn()} />);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('renders AR labels when locale is ar', () => {
    render(<CartSummary totalPrice={7000} totalItems={2} locale="ar" onCheckout={vi.fn()} />);
    expect(screen.getByText(/المجموع/)).toBeInTheDocument();
  });
});
