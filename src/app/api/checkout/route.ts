import { NextRequest, NextResponse } from 'next/server';
import { ConvexHttpClient } from 'convex/browser';
import { api } from '../../../../convex/_generated/api';
import { getStripe } from '@/lib/stripe';
import { shippingAddressSchema } from '@/lib/validators';
import type { CartItem } from '@/stores/cart-store';

function getConvex() {
  const url = process.env.NEXT_PUBLIC_CONVEX_URL;
  if (!url) throw new Error('Missing NEXT_PUBLIC_CONVEX_URL');
  return new ConvexHttpClient(url);
}

interface CheckoutRequestBody {
  items: CartItem[];
  shippingAddress: Record<string, string>;
  locale: string;
  email?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as CheckoutRequestBody;
    const { items, shippingAddress, locale, email } = body;

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
    }

    const addressResult = shippingAddressSchema.safeParse(shippingAddress);
    if (!addressResult.success) {
      return NextResponse.json(
        { error: 'Invalid shipping address' },
        { status: 400 }
      );
    }

    const totalAmount = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const convex = getConvex();

    const orderId = await convex.mutation(api.orders.create, {
      items: items.map((item) => ({
        productId: item.productId,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
      })),
      totalAmount,
      status: 'pending',
      shippingAddress: addressResult.data,
      email: email ?? addressResult.data.fullName,
    });

    const lineItems = items.map((item) => ({
      price_data: {
        currency: 'eur',
        product_data: {
          name: locale === 'ar' ? item.name.ar : item.name.fr,
        },
        unit_amount: item.price,
      },
      quantity: item.quantity,
    }));

    const origin = request.headers.get('origin') ?? 'http://localhost:3000';

    const session = await getStripe().checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${origin}/${locale}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/${locale}/cart`,
      metadata: {
        orderId: orderId,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
