import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Golden Defla - Miel Premium d\'Algerie',
  description:
    'Decouvrez nos miels d\'exception, recoltes avec soin dans les montagnes d\'Algerie.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
