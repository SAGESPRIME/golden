import { query, mutation } from './_generated/server';
import { v } from 'convex/values';
import { requireAdmin } from './lib/authHelpers';

// Lectures publiques — catalogue visible sans auth
export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query('products').collect();
  },
});

export const listFeatured = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query('products')
      .withIndex('by_featured', (q) => q.eq('featured', true))
      .collect();
  },
});

export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('products')
      .withIndex('by_slug', (q) => q.eq('slug', args.slug))
      .unique();
  },
});

export const getById = query({
  args: { id: v.id('products') },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const listByCategory = query({
  args: { category: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('products')
      .withIndex('by_category', (q) => q.eq('category', args.category))
      .collect();
  },
});

const productFields = {
  name: v.object({ fr: v.string(), ar: v.string() }),
  description: v.object({ fr: v.string(), ar: v.string() }),
  slug: v.string(),
  price: v.number(),
  compareAtPrice: v.optional(v.number()),
  images: v.array(v.string()),
  category: v.string(),
  weight: v.number(),
  inStock: v.boolean(),
  featured: v.boolean(),
};

// Mutations — admin seulement
export const create = mutation({
  args: productFields,
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    return await ctx.db.insert('products', args);
  },
});

export const update = mutation({
  args: { id: v.id('products'), ...productFields },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    const { id, ...fields } = args;
    await ctx.db.replace(id, fields);
  },
});

export const remove = mutation({
  args: { id: v.id('products') },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    await ctx.db.delete(args.id);
  },
});

// Seed/CLI uniquement — admin requis
export const updateImagesBySlug = mutation({
  args: { slug: v.string(), images: v.array(v.string()) },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    const product = await ctx.db
      .query('products')
      .withIndex('by_slug', (q) => q.eq('slug', args.slug))
      .unique();
    if (!product) return `Produit non trouvé: ${args.slug}`;
    await ctx.db.patch(product._id, { images: args.images });
    return `Images mises à jour pour ${args.slug}`;
  },
});
