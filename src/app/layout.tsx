import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Miel France Bio — Miel bio francais certifie',
  description:
    'Miel France Bio, maison francaise de miel biologique. Recolte, certifie, tracable.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
