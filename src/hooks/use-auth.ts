'use client';

import { useConvexAuth, useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';

export function useAuth() {
  const { isAuthenticated, isLoading: authLoading } = useConvexAuth();
  const user = useQuery(api.users.currentUser, isAuthenticated ? {} : 'skip');
  const isLoading = authLoading || (isAuthenticated && user === undefined);

  return {
    isAuthenticated,
    isLoading,
    user: user ?? null,
    isAdmin: user?.role === 'admin',
  };
}
