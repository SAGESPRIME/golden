import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const securityHeaders = [
  // Empêche le clickjacking
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  // Empêche le MIME sniffing
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  // Désactive la détection XSS des anciens navigateurs (remplacé par CSP)
  { key: 'X-XSS-Protection', value: '1; mode=block' },
  // Force HTTPS pendant 1 an (activer seulement en production)
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains',
  },
  // Contrôle les infos de référence envoyées
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  // Restreint les APIs navigateur accessibles
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), payment=(self)',
  },
  // Content Security Policy
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      // Scripts : next.js inline + vercel analytics
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://vercel.live",
      // Styles : tailwind inline + google fonts
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      // Fonts
      "font-src 'self' https://fonts.gstatic.com",
      // Images : self + Convex storage + placeholder
      "img-src 'self' data: blob: https://*.convex.cloud https://placehold.co",
      // Connexions réseau : Convex + Stripe + OpenRouter
      [
        "connect-src 'self'",
        process.env.NEXT_PUBLIC_CONVEX_URL ?? '',
        'https://*.convex.cloud',
        'https://api.stripe.com',
        'https://openrouter.ai',
        'wss://*.convex.cloud',
      ]
        .filter(Boolean)
        .join(' '),
      // Frames : Stripe Checkout + Gumlet video player
      'frame-src https://js.stripe.com https://hooks.stripe.com https://play.gumlet.io',
      // Scripts externes : Stripe
      "script-src-elem 'self' 'unsafe-inline' https://js.stripe.com https://vercel.live",
    ].join('; '),
  },
];

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
