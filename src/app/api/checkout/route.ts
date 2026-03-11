import { NextRequest, NextResponse } from 'next/server';
import { ConvexHttpClient } from 'convex/browser';
import { api } from '../../../../convex/_generated/api';
import { getStripe } from '@/lib/stripe';
import { shippingAddressSchema } from '@/lib/validators';
import { checkRateLimit, getClientIp } from '@/lib/rate-limit';
import type { CartItem } from '@/stores/cart-store';
import type { Id } from '../../../../convex/_generated/dataModel';

// 10 tentatives de checkout / 10 minutes par IP
const CHECKOUT_RATE_LIMIT = 10;
const CHECKOUT_WINDOW_MS = 10 * 60_000;

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
  const ip = getClientIp(request.headers);
  if (
    !checkRateLimit(`checkout:${ip}`, CHECKOUT_RATE_LIMIT, CHECKOUT_WINDOW_MS)
  ) {
    return NextResponse.json(
      { error: 'Trop de tentatives. Réessayez dans 10 minutes.' },
      { status: 429, headers: { 'Retry-After': '600' } }
    );
  }

  try {
    const body = (await request.json()) as CheckoutRequestBody;
    const { items, shippingAddress, locale, email } = body;

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
    }

    if (items.length > 50) {
      return NextResponse.json({ error: 'Too many items' }, { status: 400 });
    }

    const addressResult = shippingAddressSchema.safeParse(shippingAddress);
    if (!addressResult.success) {
      return NextResponse.json(
        { error: 'Invalid shipping address' },
        { status: 400 }
      );
    }

    const convex = getConvex();

    // ✅ Vérification des prix côté serveur — ignore les prix du client
    const verifiedItems = await Promise.all(
      items.map(async (item) => {
        if (
          item.quantity < 1 ||
          item.quantity > 99 ||
          !Number.isInteger(item.quantity)
        ) {
          throw new Error(`Invalid quantity for item: ${item.productId}`);
        }
        const product = await convex.query(api.products.getById, {
          id: item.productId as Id<'products'>,
        });
        if (!product) throw new Error(`Product not found: ${item.productId}`);
        if (!product.inStock)
          throw new Error(`Product out of stock: ${item.productId}`);
        // Prix autoritatif depuis la base de données
        return { ...item, price: product.price, name: product.name };
      })
    );

    const totalAmount = verifiedItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const orderId = await convex.mutation(api.orders.create, {
      items: verifiedItems.map((item) => ({
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

    const lineItems = verifiedItems.map((item) => ({
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
