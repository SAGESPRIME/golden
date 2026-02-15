'use client';

import { ThemeProvider } from 'next-themes';
import { ConvexReactClient } from 'convex/react';
import { ConvexProvider } from 'convex/react';
import { useState } from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
  const [convex] = useState(
    () =>
      new ConvexReactClient(
        process.env.NEXT_PUBLIC_CONVEX_URL ?? 'https://placeholder.convex.cloud'
      )
  );

  return (
    <ConvexProvider client={convex}>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </ConvexProvider>
  );
}
