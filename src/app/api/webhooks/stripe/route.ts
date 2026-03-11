import { NextRequest, NextResponse } from 'next/server';
import { ConvexHttpClient } from 'convex/browser';
import { api } from '../../../../../convex/_generated/api';
import { getStripe } from '@/lib/stripe';
import type Stripe from 'stripe';
import type { Id } from '../../../../../convex/_generated/dataModel';

// markAsPaid est idempotent côté Convex — pas besoin de vérifier getByStripeSession ici
// (évite le TOCTOU entre la vérification et la mise à jour)

function getConvex() {
  const url = process.env.NEXT_PUBLIC_CONVEX_URL;
  if (!url) throw new Error('Missing NEXT_PUBLIC_CONVEX_URL');
  return new ConvexHttpClient(url);
}

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(request: NextRequest) {
  if (!webhookSecret) {
    return NextResponse.json(
      { error: 'Webhook secret not configured' },
      { status: 500 }
    );
  }

  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = getStripe().webhooks.constructEvent(body, signature, webhookSecret);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Invalid signature';
    return NextResponse.json({ error: message }, { status: 400 });
  }

  const convex = getConvex();

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      const orderId = session.metadata?.orderId;

      if (orderId) {
        // markAsPaid est idempotent : safe à appeler plusieurs fois pour le même event
        await convex.mutation(api.orders.markAsPaid, {
          id: orderId as Id<'orders'>,
          stripeSessionId: session.id,
        });
      }
      break;
    }
    default:
      break;
  }

  return NextResponse.json({ received: true });
}
