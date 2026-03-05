'use client';

import { ThemeProvider } from 'next-themes';
import { ConvexReactClient } from 'convex/react';
import { ConvexAuthProvider } from '@convex-dev/auth/react';
import { useState } from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
  const [convex] = useState(
    () =>
      new ConvexReactClient(
        process.env.NEXT_PUBLIC_CONVEX_URL ?? 'https://placeholder.convex.cloud'
      )
  );

  return (
    <ConvexAuthProvider client={convex}>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </ConvexAuthProvider>
  );
}
