import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';
import { authTables } from '@convex-dev/auth/server';

export default defineSchema({
  ...authTables,

  users: defineTable({
    name: v.optional(v.string()),
    email: v.optional(v.string()),
    emailVerificationTime: v.optional(v.float64()),
    image: v.optional(v.string()),
    isAnonymous: v.optional(v.boolean()),
    role: v.optional(v.union(v.literal('customer'), v.literal('admin'))),
  })
    .index('email', ['email'])
    .index('by_role', ['role']),

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

  orders: defineTable({
    userId: v.optional(v.id('users')),
    email: v.optional(v.string()),
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
    .index('by_email', ['email'])
    .index('by_status', ['status'])
    .index('by_stripe_session', ['stripeSessionId']),
});
