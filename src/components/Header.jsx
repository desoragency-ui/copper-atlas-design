'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Wordmark } from './Logo';
import { Bag, Globe, ArrowUpRight } from './Icons';
import { useCart } from '@/lib/cart';
import { dict, t } from '@/lib/i18n';
import { CATEGORIES } from '@/data/products';

export default function Header({ lang }) {
  const d = dict(lang);
  const path = usePathname();
  const { count, setOpen: setCartOpen } = useCart();
  const [menu, setMenu] = useState(false);
  const [lifted, setLifted] = useState(false);

  // rAF-throttled so we never read layout on every scroll event
  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        setLifted(window.scrollY > 28);
        frame = 0;
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
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

  const other = lang === 'en' ? 'fr' : 'en';
  const otherHref = path?.replace(/^\/(en|fr)/, `/${other}`) || `/${other}`;

  const nav = [
    { href: `/${lang}/collections`, label: d.shop },
    { href: `/${lang}/guides`, label: lang === 'fr' ? 'Guides' : 'Guides' },
    { href: `/${lang}/workshop`, label: d.workshop },
    { href: `/${lang}/trade`, label: d.trade },
    { href: `/${lang}/contact`, label: d.contact },
  ];

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 px-3 pt-3 md:px-6 md:pt-5">
        <div
          className="mx-auto flex max-w-[1320px] items-center justify-between gap-4 rounded-full px-3 py-2 transition-all duration-700 ease-atlas md:px-4"
          style={{
            background: lifted ? 'rgba(8,26,22,0.72)' : 'rgba(8,26,22,0.28)',
            backdropFilter: 'blur(22px) saturate(150%)',
            WebkitBackdropFilter: 'blur(22px) saturate(150%)',
            border: `1px solid ${lifted ? 'rgba(242,234,223,0.14)' : 'rgba(242,234,223,0.07)'}`,
            boxShadow: lifted ? '0 24px 60px -32px rgba(0,0,0,0.9)' : 'none',
          }}
        >
          <Link href={`/${lang}`} className="shrink-0 pl-1" aria-label="Copper Atlas Design — home">
            <Wordmark compact />
          </Link>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
            {nav.map((n) => {
              const active = path?.startsWith(n.href);
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  className="link-underline text-[12px] uppercase tracking-wide2 transition-colors duration-400 ease-atlas"
                  style={{ color: active ? 'var(--brass)' : 'rgba(242,234,223,0.82)' }}
                >
                  {n.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-1.5">
            <Link
              href={otherHref}
              hrefLang={other}
              className="hidden items-center gap-1.5 rounded-full px-3 py-2 text-[11px] uppercase tracking-wide2 transition-colors duration-400 hover:bg-white/10 sm:flex"
              style={{ color: 'rgba(242,234,223,0.72)' }}
              aria-label={other === 'fr' ? 'Passer en français' : 'Switch to English'}
            >
              <Globe className="h-4 w-4" />
              {other.toUpperCase()}
            </Link>

            <button
              onClick={() => setCartOpen(true)}
              className="relative grid h-11 w-11 place-items-center rounded-full transition-all duration-400 hover:bg-white/10 active:scale-95"
              aria-label={`${d.cart} (${count})`}
            >
              <Bag className="h-[19px] w-[19px]" />
              {count > 0 && (
                <span
                  className="tabular absolute -right-0 -top-0 grid h-[19px] min-w-[19px] place-items-center rounded-full px-1 text-[10px] font-medium"
                  style={{ background: 'var(--brass)', color: 'var(--ink)' }}
                >
                  {count}
                </span>
              )}
            </button>

            {/* hamburger → X morph */}
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
          background: 'rgba(8,26,22,0.93)',
          backdropFilter: 'blur(30px)',
          WebkitBackdropFilter: 'blur(30px)',
        }}
        aria-hidden={!menu}
      >
        <div className="flex h-full flex-col justify-between px-6 pb-10 pt-32">
          <nav className="flex flex-col gap-1" aria-label="Mobile">
            {[...nav, { href: `/${lang}/faq`, label: d.faq }].map((n, i) => (
              <Link
                key={n.href}
                href={n.href}
                className="group/btn flex items-center justify-between border-b py-5 font-display text-[34px] transition-all duration-700 ease-atlas edge"
                style={{
                  opacity: menu ? 1 : 0,
                  transform: menu ? 'none' : 'translateY(28px)',
                  transitionDelay: `${menu ? 90 + i * 55 : 0}ms`,
                }}
              >
                {n.label}
                <ArrowUpRight className="h-6 w-6 text-[--brass] transition-transform duration-500 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
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
                  style={{ color: 'rgba(242,234,223,0.72)' }}
                >
                  {t(c.name, lang)}
                </Link>
              ))}
            </div>
            <Link
              href={otherHref}
              hrefLang={other}
              className="mt-8 inline-flex items-center gap-2 text-[11px] uppercase tracking-wide2"
              style={{ color: 'var(--brass)' }}
            >
              <Globe className="h-4 w-4" />
              {other === 'fr' ? 'Français' : 'English'}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
