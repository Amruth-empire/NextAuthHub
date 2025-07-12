import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get("token")?.value;

  const publicPaths = ['/', '/login', '/signup', '/verifyemail'];
  const isPublic = publicPaths.includes(path);

  // 1. If user is logged in and tries to visit login or signup → redirect to /
  if (token && (path === '/login' || path === '/signup')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // 2. If user is NOT logged in and tries to visit protected route → redirect to /login
  if (!token && !isPublic) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // 3. Allow access to the route
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',                  // public landing page
    '/login',
    '/signup',
    '/verifyemail',
    '/profile/:path*'     // protect profile and its subroutes
  ]
};
