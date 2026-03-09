import Stripe from 'stripe';

function getStripeClient(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error('Missing STRIPE_SECRET_KEY environment variable');
  }
  return new Stripe(key, { typescript: true });
}

let _stripe: Stripe | undefined;

export function getStripe(): Stripe {
  if (!_stripe) {
    _stripe = getStripeClient();
  }
  return _stripe;
}

export const stripe =
  typeof process.env.STRIPE_SECRET_KEY === 'string'
    ? new Stripe(process.env.STRIPE_SECRET_KEY, { typescript: true })
    : (undefined as unknown as Stripe);
