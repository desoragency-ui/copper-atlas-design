import { NextResponse } from 'next/server';

const LANGS = ['en', 'fr'];
const DEFAULT = 'en';

const SITE = 'copperatlasdesign.com';

/** On the real domain, www.* and plain http:// both go to https://copperatlasdesign.com
 *  (the official address in src/lib/shop.js); localhost and workers.dev are left alone.
 *  Then `/` and any unprefixed path go to a locale, preferring the browser's. */
export function middleware(request) {
  const { pathname, hostname, protocol } = request.nextUrl;

  if (hostname === `www.${SITE}` || (hostname === SITE && protocol === 'http:')) {
    const canonical = request.nextUrl.clone();
    canonical.protocol = 'https:';
    canonical.hostname = SITE;
    canonical.port = '';
    return NextResponse.redirect(canonical, 308);
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
