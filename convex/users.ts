import { query, mutation } from './_generated/server';
import { v } from 'convex/values';

export const currentUser = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;

    const user = await ctx.db
      .query('users')
      .withIndex('email', (q) => q.eq('email', identity.email))
      .unique();

    return user;
  },
});

export const getById = query({
  args: { id: v.id('users') },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const updateRole = mutation({
  args: {
    userId: v.id('users'),
    role: v.union(v.literal('customer'), v.literal('admin')),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.userId, { role: args.role });
  },
});
