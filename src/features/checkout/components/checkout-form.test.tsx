import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { CheckoutForm } from './checkout-form';

describe('CheckoutForm', () => {
  it('renders all shipping fields', () => {
    render(<CheckoutForm locale="fr" onSubmit={vi.fn()} isSubmitting={false} />);
    expect(screen.getByLabelText(/nom/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/adresse/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/ville/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/code postal/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/pays/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/telephone/i)).toBeInTheDocument();
  });

  it('renders AR labels when locale is ar', () => {
    render(<CheckoutForm locale="ar" onSubmit={vi.fn()} isSubmitting={false} />);
    expect(screen.getByLabelText(/الاسم/)).toBeInTheDocument();
  });

  it('renders submit button', () => {
    render(<CheckoutForm locale="fr" onSubmit={vi.fn()} isSubmitting={false} />);
    expect(screen.getByRole('button', { name: /commande/i })).toBeInTheDocument();
  });

  it('disables submit button when submitting', () => {
    render(<CheckoutForm locale="fr" onSubmit={vi.fn()} isSubmitting={true} />);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('calls onSubmit with form data', async () => {
    const onSubmit = vi.fn();
    render(<CheckoutForm locale="fr" onSubmit={onSubmit} isSubmitting={false} />);

    await userEvent.type(screen.getByLabelText(/nom/i), 'Jean Dupont');
    await userEvent.type(screen.getByLabelText(/adresse/i), '12 Rue de la Paix');
    await userEvent.type(screen.getByLabelText(/ville/i), 'Paris');
    await userEvent.type(screen.getByLabelText(/code postal/i), '75001');
    await userEvent.type(screen.getByLabelText(/pays/i), 'France');
    await userEvent.type(screen.getByLabelText(/telephone/i), '0612345678');

    await userEvent.click(screen.getByRole('button', { name: /commande/i }));

    expect(onSubmit).toHaveBeenCalled();
    const callArgs = onSubmit.mock.calls[0][0];
    expect(callArgs).toEqual({
      fullName: 'Jean Dupont',
      address: '12 Rue de la Paix',
      city: 'Paris',
      postalCode: '75001',
      country: 'France',
      phone: '0612345678',
    });
  });
});
