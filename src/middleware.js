import { NextResponse } from 'next/server';

const LANGS = ['en', 'fr'];
const DEFAULT = 'en';

/** www.* goes to the bare domain (the official address in src/lib/shop.js);
 *  then `/` and any unprefixed path go to a locale, preferring the browser's. */
export function middleware(request) {
  const { pathname, hostname } = request.nextUrl;

  if (hostname === 'www.copperatlasdesign.com') {
    const bare = request.nextUrl.clone();
    bare.hostname = 'copperatlasdesign.com';
    bare.port = '';
    return NextResponse.redirect(bare, 308);
  }

  if (LANGS.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`))) {
    return NextResponse.next();
  }

  const header = request.headers.get('accept-language') || '';
  const preferred = header.split(',').map((p) => p.split(';')[0].trim().slice(0, 2).toLowerCase());
  const lang = preferred.find((p) => LANGS.includes(p)) || DEFAULT;

  const url = request.nextUrl.clone();
  url.pathname = `/${lang}${pathname === '/' ? '' : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip Next internals, the API routes and anything with a file extension.
  matcher: ['/((?!api|_next/static|_next/image|products|brand|reviews|favicon|.*\\..*).*)'],
};
