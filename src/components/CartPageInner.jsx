'use client';

import Link from 'next/link';
import { useCart } from '@/lib/cart';
import { dict } from '@/lib/i18n';
import { money, SHOP } from '@/lib/shop';
import { ArrowUpRight, Minus, Plus } from './Icons';

export default function CartPageInner({ lang }) {
  const d = dict(lang);
  const { items, subtotal, hasQuoteOnly, setQty, remove, ready } = useCart();

  if (!ready) return <div className="min-h-[50vh]" />;

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-lg px-6 py-32 text-center">
        <h1 className="font-display text-[clamp(34px,5vw,52px)]">{d.cartEmpty}</h1>
        <Link href={`/${lang}/collections`} className="btn btn-primary group/btn mt-8">
          {d.cartEmptyCta}
          <span className="btn-disc"><ArrowUpRight className="h-4 w-4" /></span>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1320px] px-6 pb-28 pt-10 md:px-10">
      <h1 className="mb-10 font-display text-[clamp(36px,5.4vw,64px)] leading-[1]">{d.cartTitle}</h1>

      <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        <ul className="flex flex-col divide-y [&>li]:border-white/10">
          {items.map((l) => (
            <li key={l.id} className="flex gap-5 py-6 first:pt-0">
              <Link href={`/${lang}/products/${l.slug}`} className="shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={l.image} alt="" loading="lazy"
                  className="h-[140px] w-[112px] rounded-2xl border object-cover edge" />
              </Link>

              <div className="min-w-0 flex-1">
                <Link href={`/${lang}/products/${l.slug}`} className="link-underline font-display text-[22px] leading-tight">
                  {l.name}
                </Link>
                <p className="mt-1.5 text-[11.5px] uppercase tracking-wide2 opacity-50">
                  {l.finishName}{l.size ? ` · ${l.sizeText ?? `${l.size} cm`}` : ''}
                </p>

                <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-1 rounded-full border px-1 edge">
                    <button onClick={() => setQty(l.id, l.qty - 1)}
                      className="grid h-9 w-9 place-items-center rounded-full hover:bg-white/10" aria-label="−1">
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="tabular w-6 text-center text-[14px]">{l.qty}</span>
                    <button onClick={() => setQty(l.id, l.qty + 1)}
                      className="grid h-9 w-9 place-items-center rounded-full hover:bg-white/10" aria-label="+1">
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <span className="tabular text-[17px]" style={{ color: 'var(--brass)' }}>
                    {l.price == null ? d.priceOnRequest : money(l.price * l.qty)}
                  </span>
                </div>

                <button onClick={() => remove(l.id)}
                  className="link-underline mt-3 text-[11px] uppercase tracking-wide2 opacity-45">
                  {d.remove}
                </button>
              </div>
            </li>
          ))}
        </ul>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="bezel">
            <div className="bezel-core p-7">
              <p className="eyebrow mb-6">{d.orderSummary}</p>
              <div className="flex items-baseline justify-between">
                <span className="text-[13px] opacity-65">{d.subtotal}</span>
                <span className="tabular font-display text-[30px]" style={{ color: 'var(--brass)' }}>
                  {money(subtotal)}
                </span>
              </div>
              <p className="mt-2 text-[12px] opacity-50">
                {d.shippingAtCheckout}
                {hasQuoteOnly && (lang === 'fr' ? ' · pièces sur devis à part' : ' · quote-only items priced separately')}
              </p>

              {subtotal < SHOP.freeShippingOver && !hasQuoteOnly && (
                <p className="mt-4 text-[12.5px]" style={{ color: 'var(--verdigris)' }}>
                  {lang === 'fr'
                    ? `Plus que ${money(SHOP.freeShippingOver - subtotal)} pour la livraison offerte.`
                    : `${money(SHOP.freeShippingOver - subtotal)} away from free shipping.`}
                </p>
              )}

              <Link href={`/${lang}/checkout`} className="btn btn-primary group/btn mt-7 w-full justify-between">
                {d.checkout}
                <span className="btn-disc"><ArrowUpRight className="h-4 w-4" /></span>
              </Link>
              <Link href={`/${lang}/collections`}
                className="link-underline mt-5 block text-center text-[11.5px] uppercase tracking-wide2 opacity-55">
                {d.continueShopping}
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
