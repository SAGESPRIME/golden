import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  products: defineTable({
    name: v.object({
      fr: v.string(),
      ar: v.string(),
    }),
    description: v.object({
      fr: v.string(),
      ar: v.string(),
    }),
    slug: v.string(),
    price: v.number(),
    compareAtPrice: v.optional(v.number()),
    images: v.array(v.string()),
    category: v.string(),
    weight: v.number(),
    inStock: v.boolean(),
    featured: v.boolean(),
  })
    .index('by_slug', ['slug'])
    .index('by_category', ['category'])
    .index('by_featured', ['featured']),

  users: defineTable({
    name: v.string(),
    email: v.string(),
    role: v.union(v.literal('customer'), v.literal('admin')),
    tokenIdentifier: v.optional(v.string()),
  }).index('by_token', ['tokenIdentifier']),

  orders: defineTable({
    userId: v.id('users'),
    items: v.array(
      v.object({
        productId: v.string(),
        name: v.object({
          fr: v.string(),
          ar: v.string(),
        }),
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
    createdAt: v.number(),
  })
    .index('by_user', ['userId'])
    .index('by_status', ['status'])
    .index('by_stripe_session', ['stripeSessionId']),
});
