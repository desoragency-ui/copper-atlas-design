'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { useCart } from '@/lib/cart';
import { dict } from '@/lib/i18n';
import { money, SHOP } from '@/lib/shop';
import { Close, Plus, Minus, ArrowUpRight, Bag } from './Icons';

export default function CartDrawer({ lang }) {
  const d = dict(lang);
  const { items, open, setOpen, setQty, remove, subtotal, hasQuoteOnly, count } = useCart();

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [setOpen]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const remaining = SHOP.freeShippingOver - subtotal;
  const pct = Math.min(100, (subtotal / SHOP.freeShippingOver) * 100);

  return (
    <>
      <div
        onClick={() => setOpen(false)}
        className="fixed inset-0 z-50"
        style={{
          background: 'rgba(8,26,22,0.62)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transition: 'opacity 500ms cubic-bezier(0.32,0.72,0,1)',
        }}
        aria-hidden
      />

      <aside
        className="fixed right-0 top-0 z-50 flex h-[100dvh] w-full max-w-[440px] flex-col"
        style={{
          background: 'var(--forest)',
          borderLeft: '1px solid var(--edge)',
          transform: open ? 'translateX(0)' : 'translateX(102%)',
          transition: 'transform 620ms cubic-bezier(0.32,0.72,0,1)',
          boxShadow: '-40px 0 90px -50px rgba(0,0,0,0.9)',
        }}
        role="dialog"
        aria-modal={open}
        aria-label={d.cartTitle}
      >
        <div className="flex items-center justify-between border-b px-6 py-5 edge">
          <h2 className="font-display text-2xl">
            {d.cartTitle}
            {count > 0 && <span className="tabular ml-2 text-[13px] opacity-50">({count})</span>}
          </h2>
          <button
            onClick={() => setOpen(false)}
            className="grid h-10 w-10 place-items-center rounded-full transition hover:bg-white/10 active:scale-95"
            aria-label={d.close}
          >
            <Close className="h-5 w-5" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-6 px-8 text-center">
            <div className="grid h-20 w-20 place-items-center rounded-full border edge">
              <Bag className="h-7 w-7 opacity-40" />
            </div>
            <p className="text-[15px] opacity-60">{d.cartEmpty}</p>
            <Link href={`/${lang}/collections`} onClick={() => setOpen(false)} className="btn btn-primary group/btn">
              {d.cartEmptyCta}
              <span className="btn-disc"><ArrowUpRight className="h-4 w-4" /></span>
            </Link>
          </div>
        ) : (
          <>
            {!hasQuoteOnly && subtotal < SHOP.freeShippingOver && (
              <div className="border-b px-6 py-4 edge">
                <p className="mb-2 text-[12px] opacity-70">
                  {lang === 'fr'
                    ? `Plus que ${money(remaining)} pour la livraison offerte`
                    : `${money(remaining)} away from free shipping`}
                </p>
                <div className="h-[3px] w-full overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full transition-all duration-700 ease-atlas"
                    style={{ width: `${pct}%`, background: 'linear-gradient(90deg,var(--verdigris),var(--brass))' }}
                  />
                </div>
              </div>
            )}

            <ul className="flex-1 divide-y overflow-y-auto px-6 [&>li]:border-white/10">
              {items.map((l) => (
                <li key={l.id} className="flex gap-4 py-5">
                  <Link
                    href={`/${lang}/products/${l.slug}`}
                    onClick={() => setOpen(false)}
                    className="relative h-[92px] w-[76px] shrink-0 overflow-hidden rounded-xl border edge"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={l.image} alt="" className="h-full w-full object-cover" loading="lazy" />
                  </Link>

                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/${lang}/products/${l.slug}`}
                      onClick={() => setOpen(false)}
                      className="link-underline block font-display text-[17px] leading-tight"
                    >
                      {l.name}
                    </Link>
                    <p className="mt-1 text-[11.5px] uppercase tracking-wide2 opacity-55">
                      {l.finishName}
                      {l.size ? ` · ${l.size} cm` : ''}
                    </p>

                    <div className="mt-3 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-1 rounded-full border edge">
                        <button
                          onClick={() => setQty(l.id, l.qty - 1)}
                          className="grid h-8 w-8 place-items-center rounded-full transition hover:bg-white/10"
                          aria-label="−1"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="tabular w-5 text-center text-[13px]">{l.qty}</span>
                        <button
                          onClick={() => setQty(l.id, l.qty + 1)}
                          className="grid h-8 w-8 place-items-center rounded-full transition hover:bg-white/10"
                          aria-label="+1"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      <span className="tabular text-[14px]" style={{ color: 'var(--brass)' }}>
                        {l.price == null ? d.priceOnRequest : money(l.price * l.qty)}
                      </span>
                    </div>

                    <button
                      onClick={() => remove(l.id)}
                      className="link-underline mt-2 text-[11px] uppercase tracking-wide2 opacity-45 hover:opacity-90"
                    >
                      {d.remove}
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-t px-6 py-5 edge">
              <div className="mb-1 flex items-baseline justify-between">
                <span className="text-[12px] uppercase tracking-wide2 opacity-65">{d.subtotal}</span>
                <span className="tabular font-display text-2xl" style={{ color: 'var(--brass)' }}>
                  {money(subtotal)}
                </span>
              </div>
              <p className="mb-4 text-[11.5px] opacity-50">
                {d.shippingAtCheckout}
                {hasQuoteOnly && (lang === 'fr'
                  ? ' · pièces sur devis chiffrées séparément'
                  : ' · quote-only pieces priced separately')}
              </p>
              <Link
                href={`/${lang}/checkout`}
                onClick={() => setOpen(false)}
                className="btn btn-primary group/btn w-full justify-between"
              >
                {d.checkout}
                <span className="btn-disc"><ArrowUpRight className="h-4 w-4" /></span>
              </Link>
              <button
                onClick={() => setOpen(false)}
                className="link-underline mt-4 w-full text-center text-[11.5px] uppercase tracking-wide2 opacity-55"
              >
                {d.continueShopping}
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
