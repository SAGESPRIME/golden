import { mutation, query } from './_generated/server';
import { v } from 'convex/values';
import { requireAuth, requireAdmin } from './lib/authHelpers';

// orders.create : appelé côté serveur uniquement via /api/checkout (ConvexHttpClient)
export const create = mutation({
  args: {
    userId: v.optional(v.id('users')),
    email: v.optional(v.string()),
    items: v.array(
      v.object({
        productId: v.string(),
        name: v.object({ fr: v.string(), ar: v.string() }),
        price: v.number(),
        quantity: v.number(),
        image: v.string(),
      })
    ),
    totalAmount: v.number(),
    status: v.union(
      v.literal('pending'),
      v.literal('paid'),
      v.literal('shipped'),
      v.literal('delivered'),
      v.literal('cancelled')
    ),
    stripeSessionId: v.optional(v.string()),
    shippingAddress: v.object({
      fullName: v.string(),
      address: v.string(),
      city: v.string(),
      postalCode: v.string(),
      country: v.string(),
      phone: v.string(),
    }),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert('orders', {
      ...args,
      createdAt: Date.now(),
    });
  },
});

// Accessible depuis le webhook Stripe (server-side) et admin
export const getByStripeSession = query({
  args: { stripeSessionId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('orders')
      .withIndex('by_stripe_session', (q) =>
        q.eq('stripeSessionId', args.stripeSessionId)
      )
      .unique();
  },
});

// L'utilisateur ne voit que ses propres commandes
export const listByUser = query({
  args: {},
  handler: async (ctx) => {
    const userId = await requireAuth(ctx);
    return await ctx.db
      .query('orders')
      .withIndex('by_user', (q) => q.eq('userId', userId))
      .order('desc')
      .collect();
  },
});

// L'utilisateur ne peut voir que sa propre commande
export const getById = query({
  args: { id: v.id('orders') },
  handler: async (ctx, args) => {
    const userId = await requireAuth(ctx);
    const order = await ctx.db.get(args.id);
    if (!order) return null;
    const user = await ctx.db.get(userId);
    if (order.userId !== userId && user?.role !== 'admin') {
      throw new Error('Forbidden');
    }
    return order;
  },
});

// Admin seulement
export const listAll = query({
  args: {},
  handler: async (ctx) => {
    await requireAdmin(ctx);
    return await ctx.db.query('orders').order('desc').collect();
  },
});

// Admin seulement
export const updateStatus = mutation({
  args: {
    id: v.id('orders'),
    status: v.union(
      v.literal('pending'),
      v.literal('paid'),
      v.literal('shipped'),
      v.literal('delivered'),
      v.literal('cancelled')
    ),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    await ctx.db.patch(args.id, { status: args.status });
  },
});

// Appelé depuis le webhook Stripe (server-side sans token user)
// Idempotent : si la commande est déjà 'paid' avec ce stripeSessionId, ne fait rien.
export const markAsPaid = mutation({
  args: {
    id: v.id('orders'),
    stripeSessionId: v.string(),
  },
  handler: async (ctx, args) => {
    const order = await ctx.db.get(args.id);
    if (!order) throw new Error(`Order not found: ${args.id}`);
    // Déduplication atomique : déjà traité pour cette session Stripe
    if (
      order.status === 'paid' &&
      order.stripeSessionId === args.stripeSessionId
    ) {
      return;
    }
    await ctx.db.patch(args.id, {
      status: 'paid',
      stripeSessionId: args.stripeSessionId,
    });
  },
});
