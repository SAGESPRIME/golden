import { query, mutation } from './_generated/server';
import { v } from 'convex/values';
import { Id } from './_generated/dataModel';
import { requireAuth, requireAdmin } from './lib/authHelpers';

export const currentUser = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;
    const userId = identity.subject.split('|')[0] as Id<'users'>;
    return await ctx.db.get(userId);
  },
});

// Soi-même OU admin
export const getById = query({
  args: { id: v.id('users') },
  handler: async (ctx, args) => {
    const callerId = await requireAuth(ctx);
    const caller = await ctx.db.get(callerId);
    if (callerId !== args.id && caller?.role !== 'admin') {
      throw new Error('Forbidden');
    }
    return await ctx.db.get(args.id);
  },
});

// Admin seulement
export const updateRole = mutation({
  args: {
    userId: v.id('users'),
    role: v.union(v.literal('customer'), v.literal('admin')),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    await ctx.db.patch(args.userId, { role: args.role });
  },
});

// CLI Convex uniquement — ne pas appeler depuis le frontend
export const makeAdmin = mutation({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query('users')
      .withIndex('email', (q) => q.eq('email', args.email))
      .unique();
    if (!user) return `User not found: ${args.email}`;
    await ctx.db.patch(user._id, { role: 'admin' });
    return `${args.email} is now admin`;
  },
});
