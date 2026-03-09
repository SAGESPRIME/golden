import { mutation } from './_generated/server';

export const clearAllAuthData = mutation({
  args: {},
  handler: async (ctx) => {
    const users = await ctx.db.query('users').collect();
    for (const user of users) {
      await ctx.db.delete(user._id);
    }

    const sessions = await ctx.db.query('authSessions').collect();
    for (const session of sessions) {
      await ctx.db.delete(session._id);
    }

    const accounts = await ctx.db.query('authAccounts').collect();
    for (const account of accounts) {
      await ctx.db.delete(account._id);
    }

    const refreshTokens = await ctx.db.query('authRefreshTokens').collect();
    for (const token of refreshTokens) {
      await ctx.db.delete(token._id);
    }

    const verificationCodes = await ctx.db
      .query('authVerificationCodes')
      .collect();
    for (const code of verificationCodes) {
      await ctx.db.delete(code._id);
    }

    const rateLimits = await ctx.db.query('authRateLimits').collect();
    for (const limit of rateLimits) {
      await ctx.db.delete(limit._id);
    }

    return `Cleared: ${users.length} users, ${accounts.length} accounts, ${sessions.length} sessions`;
  },
});
