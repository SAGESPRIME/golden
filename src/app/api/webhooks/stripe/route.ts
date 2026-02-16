import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import type Stripe from 'stripe';

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(request: NextRequest) {
  if (!webhookSecret) {
    return NextResponse.json(
      { error: 'Webhook secret not configured' },
      { status: 500 },
    );
  }

  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Invalid signature';
    return NextResponse.json({ error: message }, { status: 400 });
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      // TODO: Create order in Convex when backend is connected
      // const shippingAddress = JSON.parse(session.metadata?.shippingAddress ?? '{}');
      // await convex.mutation(api.orders.create, { ... });
      void session;
      break;
    }
    default:
      break;
  }

  return NextResponse.json({ received: true });
}
