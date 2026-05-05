import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const ROOT_HOST = 'ameriuse.com';
const WWW_HOST = 'www.ameriuse.com';
const SMART_DEALER_HOST = 'smartdealer.ameriuse.com';

export function middleware(request: NextRequest) {
  const host = request.headers.get('host')?.split(':')[0].toLowerCase();
  const { pathname } = request.nextUrl;

  if (host === WWW_HOST) {
    const url = request.nextUrl.clone();
    url.hostname = ROOT_HOST;
    url.protocol = 'https:';
    return NextResponse.redirect(url, 308);
  }

  if (host === ROOT_HOST && isOldSmartDealerPath(pathname)) {
    const url = request.nextUrl.clone();
    url.hostname = SMART_DEALER_HOST;
    url.protocol = 'https:';
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

function isOldSmartDealerPath(pathname: string) {
  return (
    pathname === '/login' ||
    pathname === '/inventory' ||
    pathname.startsWith('/inventory/') ||
    pathname === '/d' ||
    pathname.startsWith('/d/')
  );
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};
