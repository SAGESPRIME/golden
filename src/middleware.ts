import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { type NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ✅ Protection admin : redirection si pas de token de session Convex
  if (pathname.match(/\/[a-z]{2}\/admin/)) {
    const convexToken =
      request.cookies.get('__convexAuthJWT') ??
      request.cookies.get('__convexAuthSessionId');

    if (!convexToken) {
      const locale = pathname.split('/')[1] ?? 'fr';
      const loginUrl = new URL(`/${locale}/auth/login`, request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
};
