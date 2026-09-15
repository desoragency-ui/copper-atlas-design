'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Wordmark } from './Logo';
import { Bag, ArrowUpRight } from './Icons';
import { useCart } from '@/lib/cart';
import { dict, t } from '@/lib/i18n';
import { CATEGORIES } from '@/data/products';

export default function Header({ lang }) {
  const d = dict(lang);
  const path = usePathname();
  const { count, setOpen: setCartOpen } = useCart();
  const [menu, setMenu] = useState(false);
  const [lifted, setLifted] = useState(false);
  const sentinel = useRef(null);

  /* Scroll state via IntersectionObserver, not a scroll listener - a listener
     fires on every frame and is the usual cause of a janky sticky header. */
  useEffect(() => {
    const el = sentinel.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(([e]) => setLifted(!e.isIntersecting), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => setMenu(false), [path]);

  useEffect(() => {
    document.body.style.overflow = menu ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menu]);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setMenu(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const swap = (to) => path?.replace(/^\/(en|fr)/, `/${to}`) || `/${to}`;

  const nav = [
    { href: `/${lang}/collections`, label: d.shop },
    { href: `/${lang}/guides`, label: 'Guides' },
    { href: `/${lang}/workshop`, label: d.workshop },
    { href: `/${lang}/trade`, label: d.trade },
    { href: `/${lang}/contact`, label: d.contact },
  ];

  return (
    <>
      {/* watched by the observer above; sits just under the announcement strip */}
      <div ref={sentinel} aria-hidden className="absolute left-0 h-px w-px" style={{ top: 'var(--announce-h)' }} />

      <header
        className="fixed inset-x-0 z-40 px-3 md:px-6"
        style={{ top: 'var(--announce-h)', paddingTop: '10px' }}
      >
        <div
          className="mx-auto flex max-w-[1320px] items-center justify-between gap-4 rounded-full px-3 transition-all duration-700 ease-atlas md:px-4"
          style={{
            height: 'var(--nav-h)',
            background: lifted
              ? 'linear-gradient(180deg, rgba(var(--ink-rgb),0.86), rgba(var(--ink-rgb),0.74))'
              : 'linear-gradient(180deg, rgba(var(--ink-rgb),0.42), rgba(var(--ink-rgb),0.24))',
            backdropFilter: 'blur(26px) saturate(155%)',
            WebkitBackdropFilter: 'blur(26px) saturate(155%)',
            border: `1px solid ${lifted ? 'rgba(224,169,109,0.26)' : 'rgba(242,234,223,0.09)'}`,
            boxShadow: lifted
              ? '0 26px 64px -34px rgba(0,0,0,0.92), inset 0 1px 0 rgba(242,234,223,0.1)'
              : 'inset 0 1px 0 rgba(242,234,223,0.06)',
          }}
        >
          <Link href={`/${lang}`} className="shrink-0 pl-1" aria-label="Copper Atlas Design, home">
            <Wordmark compact />
          </Link>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
            {nav.map((n) => {
              const active = path?.startsWith(n.href);
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  aria-current={active ? 'page' : undefined}
                  className="link-underline text-[11.5px] uppercase tracking-wide2 transition-colors duration-400 ease-atlas"
                  style={{ color: active ? 'var(--brass)' : 'rgba(242,234,223,0.84)' }}
                >
                  {n.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-1.5">
            {/* Both locales shown with the active one lit, so it reads as a state,
                not as an instruction. The previous single-chip version showed the
                language you would switch TO, which read backwards. */}
            <div
              className="hidden items-center rounded-full p-[3px] sm:flex"
              style={{ background: 'rgba(var(--ink-rgb),0.5)', border: '1px solid var(--edge)' }}
              role="group"
              aria-label="Language"
            >
              {['en', 'fr'].map((l) => {
                const on = l === lang;
                return (
                  <Link
                    key={l}
                    href={swap(l)}
                    hrefLang={l}
                    aria-current={on ? 'true' : undefined}
                    className="rounded-full px-3 py-1.5 text-[10.5px] uppercase tracking-wide2 transition-all duration-400 ease-atlas"
                    style={{
                      background: on ? 'var(--brass)' : 'transparent',
                      color: on ? 'var(--ink)' : 'rgba(242,234,223,0.6)',
                      fontWeight: on ? 500 : 400,
                    }}
                  >
                    {l}
                  </Link>
                );
              })}
            </div>

            <button
              onClick={() => setCartOpen(true)}
              className="relative grid h-11 w-11 place-items-center rounded-full transition-all duration-400 hover:bg-white/10 active:scale-95"
              aria-label={`${d.cart}, ${count}`}
            >
              <Bag className="h-[19px] w-[19px]" />
              {count > 0 && (
                <span
                  className="tabular absolute right-0 top-0 grid h-[19px] min-w-[19px] place-items-center rounded-full px-1 text-[10px] font-medium"
                  style={{ background: 'var(--brass)', color: 'var(--ink)' }}
                >
                  {count}
                </span>
              )}
            </button>

            <button
              onClick={() => setMenu((v) => !v)}
              className="relative grid h-11 w-11 place-items-center rounded-full transition-all duration-400 hover:bg-white/10 active:scale-95 lg:hidden"
              aria-label={menu ? d.close : d.menu}
              aria-expanded={menu}
            >
              <span className="relative block h-4 w-5">
                <span
                  className="absolute left-0 block h-[1.5px] w-5 rounded-full bg-current transition-all duration-500 ease-atlas"
                  style={menu ? { top: 7, transform: 'rotate(45deg)' } : { top: 2 }}
                />
                <span
                  className="absolute left-0 top-[7px] block h-[1.5px] w-5 rounded-full bg-current transition-all duration-300"
                  style={{ opacity: menu ? 0 : 1, transform: menu ? 'scaleX(0.2)' : 'none' }}
                />
                <span
                  className="absolute left-0 block h-[1.5px] w-5 rounded-full bg-current transition-all duration-500 ease-atlas"
                  style={menu ? { top: 7, transform: 'rotate(-45deg)' } : { top: 12 }}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* full-screen menu */}
      <div
        className="fixed inset-0 z-30 lg:hidden"
        style={{
          pointerEvents: menu ? 'auto' : 'none',
          opacity: menu ? 1 : 0,
          transition: 'opacity 600ms cubic-bezier(0.32,0.72,0,1)',
          background: 'linear-gradient(160deg, rgba(var(--ink-rgb),0.96), rgba(var(--surface-rgb),0.96))',
          backdropFilter: 'blur(30px)',
          WebkitBackdropFilter: 'blur(30px)',
        }}
        aria-hidden={!menu}
      >
        <div className="flex h-full flex-col justify-between px-6 pb-10 pt-32">
          <nav className="flex flex-col" aria-label="Mobile">
            {nav.map((n, i) => (
              <Link
                key={n.href}
                href={n.href}
                className="group/item flex items-center justify-between border-b py-5 font-display text-[clamp(28px,8vw,38px)] transition-all duration-700 ease-atlas edge"
                style={{
                  opacity: menu ? 1 : 0,
                  transform: menu ? 'none' : 'translateY(28px)',
                  transitionDelay: `${menu ? 90 + i * 55 : 0}ms`,
                }}
              >
                {n.label}
                <ArrowUpRight
                  className="h-6 w-6 transition-transform duration-500 group-hover/item:translate-x-1 group-hover/item:-translate-y-1"
                  style={{ color: 'var(--brass)' }}
                />
              </Link>
            ))}
          </nav>

          <div
            style={{
              opacity: menu ? 1 : 0,
              transform: menu ? 'none' : 'translateY(20px)',
              transition: 'all 700ms cubic-bezier(0.32,0.72,0,1) 380ms',
            }}
          >
            <p className="label mb-4">{d.collections}</p>
            <div className="grid grid-cols-2 gap-x-5 gap-y-2.5">
              {CATEGORIES.map((c) => (
                <Link
                  key={c.slug}
                  href={`/${lang}/collections/${c.slug}`}
                  className="link-underline text-[13px]"
                  style={{ color: 'rgba(242,234,223,0.74)' }}
                >
                  {t(c.name, lang)}
                </Link>
              ))}
            </div>

            <div className="mt-8 flex items-center gap-2">
              {['en', 'fr'].map((l) => (
                <Link
                  key={l}
                  href={swap(l)}
                  hrefLang={l}
                  className="rounded-full px-4 py-2 text-[11px] uppercase tracking-wide2"
                  style={{
                    background: l === lang ? 'var(--brass)' : 'rgba(242,234,223,0.06)',
                    color: l === lang ? 'var(--ink)' : 'rgba(242,234,223,0.7)',
                    border: '1px solid var(--edge)',
                  }}
                >
                  {l === 'en' ? 'English' : 'Français'}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
