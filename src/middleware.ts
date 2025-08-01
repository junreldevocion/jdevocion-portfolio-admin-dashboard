import { NextRequest, NextResponse } from 'next/server';
import { Cookie } from './lib/constants/Cookie';

export default async function middleware(request: NextRequest) {
  const hasAccessToken = request.cookies.get(Cookie.ACCESS_TOKEN);
  const isLoginPage = request.nextUrl.pathname.startsWith('/auth/');
  const isDashboardPage = request.nextUrl.pathname.startsWith('/dashboard');

  if (!hasAccessToken && isDashboardPage) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  if (hasAccessToken && isLoginPage) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/auth/:path*'],
};