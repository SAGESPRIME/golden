import { mutation, query } from './_generated/server';
import { v } from 'convex/values';

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

export const listByUser = query({
  args: { userId: v.id('users') },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('orders')
      .withIndex('by_user', (q) => q.eq('userId', args.userId))
      .order('desc')
      .collect();
  },
});

export const getById = query({
  args: { id: v.id('orders') },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const listAll = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query('orders').order('desc').collect();
  },
});

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
    await ctx.db.patch(args.id, { status: args.status });
  },
});
