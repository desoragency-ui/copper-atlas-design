'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import Gallery from './Gallery';
import Accordion from './Accordion';
import { useCart } from '@/lib/cart';
import { dict, t } from '@/lib/i18n';
import { money, SHOP, waLink } from '@/lib/shop';
import { ratingFor } from '@/data/reviews';
import { sizeLabel, sizeShort, sizesFor } from '@/data/products';
import {
  ArrowUpRight, Check, Minus, Plus, Star, Whatsapp,
  IconHammer, IconShip, IconShield, IconReturn,
} from '../Icons';

export default function ProductDetail({ product: p, lang }) {
  const d = dict(lang);
  const { add } = useCart();

  const [finishId, setFinishId] = useState(p.finishes[0].id);
  const [sizeIdx, setSizeIdx] = useState(sizesFor(p, p.finishes[0].id) ? 1 : null); // default 30 cm - the volume seller
  const [qty, setQty] = useState(1);
  const [done, setDone] = useState(false);
  const buyRef = useRef(null);

  const finish = useMemo(
    () => p.finishes.find((f) => f.id === finishId) ?? p.finishes[0],
    [p.finishes, finishId]
  );

  // A finish can carry its own ladder, so the sizes are resolved per finish.
  // Both ladders share the same diameters, so the index stays valid on switch.
  const sizes = sizesFor(p, finish.id);
  const size = sizes ? sizes[Math.min(sizeIdx ?? 0, sizes.length - 1)] : null;
  const rating = ratingFor(p.slug);

  const unit = p.priceOnRequest ? null : size ? size.price : p.price ?? null;

  useEffect(() => {
    if (!done) return;
    const id = setTimeout(() => setDone(false), 2200);
    return () => clearTimeout(id);
  }, [done]);

  const onAdd = () => {
    add({
      slug: p.slug,
      name: t(p.name, lang),
      image: finish.images[0],
      finish: finish.id,
      finishName: t(finish.name, lang),
      size: size?.cm ?? null,
      sizeText: size ? sizeLabel(size, lang) : null,
      price: unit,
      qty,
    });
    setDone(true);
  };

  const quoteText =
    lang === 'fr'
      ? `Bonjour Copper Atlas - je souhaite un prix pour : ${t(p.name, lang)} (${t(finish.name, lang)}${size ? `, ${sizeLabel(size, lang)}` : ''}), quantité ${qty}.`
      : `Hello Copper Atlas - I'd like a price for: ${t(p.name, lang)} (${t(finish.name, lang)}${size ? `, ${sizeLabel(size, lang)}` : ''}), quantity ${qty}.`;

  return (
    <>
      <div className="grid gap-10 lg:grid-cols-[1.06fr_0.94fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Gallery images={finish.images} alt={t(p.name, lang)} lang={lang} />
        </div>

        {/* ── buy box ─────────────────────────────────────────────────── */}
        <div>
          {p.badge && <p className="eyebrow mb-5">{t(p.badge, lang)}</p>}

          <h1 className="font-display text-[clamp(36px,5.2vw,62px)] leading-[0.98] text-balance">
            {t(p.name, lang)}
          </h1>
          <p className="mt-3 text-[16.5px] text-pretty opacity-62">{t(p.tagline, lang)}</p>

          {rating && (
            <a href="#reviews" className="mt-4 inline-flex items-center gap-2 text-[13px]">
              <span className="flex gap-0.5" style={{ color: 'var(--brass)' }} aria-hidden>
                {[1, 2, 3, 4, 5].map((n) => (
                  <Star key={n} filled={n <= Math.round(rating.average)} className="h-3.5 w-3.5" />
                ))}
              </span>
              <span className="tabular link-underline opacity-72">
                {rating.average} · {rating.count} {d.reviewCount}
              </span>
            </a>
          )}

          {/* price */}
          <div className="mt-7 flex flex-wrap items-baseline gap-3">
            {unit == null ? (
              <span className="font-display text-[34px]" style={{ color: 'var(--brass)' }}>
                {d.priceOnRequest}
              </span>
            ) : (
              <>
                <span className="tabular font-display text-[42px] leading-none" style={{ color: 'var(--brass)' }}>
                  {money(unit)}
                </span>
                {qty > 1 && (
                  <span className="tabular text-[14px] opacity-50">
                    {money(unit * qty)} {lang === 'fr' ? `pour ${qty}` : `for ${qty}`}
                  </span>
                )}
              </>
            )}
          </div>
          <p className="mt-2 flex items-center gap-2 text-[13px] opacity-58">
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: 'var(--verdigris)' }} aria-hidden />
            {d.inStock}
          </p>

          <div className="rule my-8" />

          {/* finish */}
          <fieldset className="mb-8">
            <legend className="label">
              {d.finish} - <span style={{ color: 'var(--brass)' }}>{t(finish.name, lang)}</span>
            </legend>
            <div className="flex flex-wrap gap-2.5">
              {p.finishes.map((f) => {
                const on = f.id === finish.id;
                return (
                  <button
                    key={f.id}
                    onClick={() => setFinishId(f.id)}
                    aria-pressed={on}
                    className="group/f flex items-center gap-3 rounded-full py-2 pl-2 pr-4 transition-all duration-500 ease-atlas active:scale-[0.98]"
                    style={{
                      background: on ? 'rgba(224,169,109,0.12)' : 'rgba(242,234,223,0.04)',
                      border: `1px solid ${on ? 'var(--brass)' : 'var(--edge)'}`,
                    }}
                  >
                    <span
                      className="h-7 w-7 rounded-full ring-1 ring-white/25"
                      style={{ background: `linear-gradient(135deg, ${f.swatch2}, ${f.swatch})` }}
                      aria-hidden
                    />
                    <span className="text-left">
                      <span className="block text-[13px] leading-tight">{t(f.name, lang)}</span>
                      <span className="block text-[10.5px] uppercase tracking-wide2 opacity-45">
                        {t(f.hint, lang)}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </fieldset>

          {/* size */}
          {sizes && (
            <fieldset className="mb-8">
              <legend className="label flex items-center justify-between">
                <span>{sizes[0].label ? d.sizeDims : d.size}</span>
                <span className="tabular" style={{ color: 'var(--brass)' }}>
                  {sizeLabel(size, lang)} · {size.in}
                </span>
              </legend>
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
                {sizes.map((s, n) => {
                  const on = n === sizeIdx;
                  return (
                    <button
                      key={s.cm}
                      onClick={() => setSizeIdx(n)}
                      aria-pressed={on}
                      className="tabular flex flex-col items-center gap-0.5 rounded-2xl py-3 transition-all duration-400 ease-atlas active:scale-95"
                      style={{
                        background: on ? 'var(--brass)' : 'rgba(242,234,223,0.04)',
                        color: on ? 'var(--ink)' : 'inherit',
                        border: `1px solid ${on ? 'var(--brass)' : 'var(--edge)'}`,
                      }}
                    >
                      <span className="text-[15px] leading-none">{sizeShort(s)}</span>
                      <span className="text-[9.5px] uppercase tracking-wide2 opacity-65">
                        {money(s.price)}
                      </span>
                    </button>
                  );
                })}
              </div>
              <p className="mt-3 text-[12.5px] opacity-50">
                {sizes[0].label
                  ? lang === 'fr'
                    ? 'Dimensions extérieures, largeur × profondeur. Toute autre dimension peut être réalisée sur mesure.'
                    : 'Outside dimensions, width × depth. Any other size can be made to order.'
                  : lang === 'fr'
                    ? 'Le diamètre est celui de l’abat-jour. Comptez 2,5 à 3 fois le diamètre en espace libre autour.'
                    : 'Diameter is measured across the shade. Allow 2.5-3× the diameter of clear space around it.'}
              </p>
            </fieldset>
          )}

          {/* qty + add */}
          <div ref={buyRef} className="flex flex-wrap items-stretch gap-3">
            <div className="flex items-center gap-1 rounded-full border px-1 edge">
              <button
                onClick={() => setQty((n) => Math.max(1, n - 1))}
                className="grid h-11 w-11 place-items-center rounded-full transition hover:bg-white/10 active:scale-90"
                aria-label="−1"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="tabular w-7 text-center text-[15px]" aria-live="polite">{qty}</span>
              <button
                onClick={() => setQty((n) => Math.min(99, n + 1))}
                className="grid h-11 w-11 place-items-center rounded-full transition hover:bg-white/10 active:scale-90"
                aria-label="+1"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            {p.priceOnRequest ? (
              <a
                href={waLink(quoteText)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary group/btn flex-1 justify-between"
              >
                {d.requestPrice}
                <span className="btn-disc"><Whatsapp className="h-4 w-4" /></span>
              </a>
            ) : (
              <button onClick={onAdd} className="btn btn-primary group/btn flex-1 justify-between">
                {done ? d.added : d.addToCart}
                <span className="btn-disc">
                  {done ? <Check className="h-4 w-4" /> : <ArrowUpRight className="h-4 w-4" />}
                </span>
              </button>
            )}
          </div>

          {!p.priceOnRequest && (
            <a
              href={waLink(quoteText)}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline mt-4 inline-flex items-center gap-2 text-[12.5px] opacity-60"
            >
              <Whatsapp className="h-4 w-4" />
              {d.askCta}
            </a>
          )}

          {/* reassurance row */}
          <ul className="mt-8 grid grid-cols-2 gap-x-5 gap-y-4">
            {[
              [IconHammer, lang === 'fr' ? 'Martelé main' : 'Hammered by hand'],
              [IconShip, lang === 'fr' ? 'Livraison suivie' : 'Tracked shipping'],
              [IconShield, lang === 'fr' ? 'Laiton / cuivre massif' : 'Solid brass / copper'],
              [IconReturn, lang === 'fr' ? 'Retours 14 jours' : '14-day returns'],
            ].map(([Icon, label]) => (
              <li key={label} className="flex items-center gap-3 text-[13px] opacity-70">
                <Icon className="h-[18px] w-[18px] shrink-0" style={{ color: 'var(--brass)' }} />
                {label}
              </li>
            ))}
          </ul>

          {/* details */}
          <div className="mt-10">
            <Accordion
              items={[
                {
                  t: d.specifications,
                  c: (
                    <dl className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
                      {p.specs.map((s) => (
                        <div key={t(s.k, lang)} className="flex justify-between gap-4 border-b pb-2 edge sm:block sm:border-0 sm:pb-0">
                          <dt className="text-[11px] uppercase tracking-wide2 opacity-45">{t(s.k, lang)}</dt>
                          <dd className="text-[14px] sm:mt-1">{t(s.v, lang)}</dd>
                        </div>
                      ))}
                      <div className="flex justify-between gap-4 border-b pb-2 edge sm:block sm:border-0 sm:pb-0">
                        <dt className="text-[11px] uppercase tracking-wide2 opacity-45">SKU</dt>
                        <dd className="tabular text-[14px] sm:mt-1">
                          {p.sku}-{finish.id.toUpperCase().slice(0, 3)}{size ? `-${size.cm}` : ''}
                        </dd>
                      </div>
                    </dl>
                  ),
                },
                {
                  t: d.included,
                  c: (
                    <ul className="flex flex-col gap-2.5">
                      {d.includedItems.map((x) => (
                        <li key={x} className="flex items-start gap-3 text-[14px] opacity-75">
                          <Check className="mt-[3px] h-4 w-4 shrink-0" style={{ color: 'var(--brass)' }} />
                          {x}
                        </li>
                      ))}
                    </ul>
                  ),
                },
                { t: d.shippingTitle, c: <p className="text-[14px] leading-relaxed opacity-72">{d.shippingBody}</p> },
                { t: d.careTitle, c: <p className="text-[14px] leading-relaxed opacity-72">{d.careBody}</p> },
              ]}
            />
          </div>

          {/* ask the maker */}
          <div className="bezel mt-8">
            <div className="bezel-core p-6">
              <h3 className="font-display text-[22px]">{d.askTitle}</h3>
              <p className="mt-2 text-[14px] opacity-62">{d.askBody}</p>
              <div className="mt-5 flex flex-wrap gap-2.5">
                <a href={waLink(quoteText)} target="_blank" rel="noopener noreferrer" className="btn btn-ghost group/btn">
                  WhatsApp
                  <span className="btn-disc"><Whatsapp className="h-4 w-4" /></span>
                </a>
                <Link href={`/${lang}/contact`} className="btn btn-ghost group/btn">
                  {d.contact}
                  <span className="btn-disc"><ArrowUpRight className="h-4 w-4" /></span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <StickyBar
        lang={lang}
        name={t(p.name, lang)}
        price={unit}
        onAdd={onAdd}
        quoteHref={waLink(quoteText)}
        quoteOnly={!!p.priceOnRequest}
        done={done}
        watchRef={buyRef}
      />
    </>
  );
}

/** Mobile sticky add-to-cart: appears once the buy box has scrolled away. */
function StickyBar({ lang, name, price, onAdd, quoteHref, quoteOnly, done, watchRef }) {
  const d = dict(lang);
  const [show, setShow] = useState(false);

  /* Driven by an IntersectionObserver on the real buy box rather than a scroll
     listener, so it stays correct at any viewport height and costs no frames. */
  useEffect(() => {
    const el = watchRef?.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(([e]) => setShow(!e.isIntersecting), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, [watchRef]);

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-30 border-t px-4 py-3 edge lg:hidden"
      style={{
        background: 'rgba(var(--ink-rgb),0.92)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        transform: show ? 'translateY(0)' : 'translateY(102%)',
        transition: 'transform 560ms cubic-bezier(0.32,0.72,0,1)',
        paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom))',
      }}
    >
      <div className="flex items-center gap-3">
        <div className="min-w-0 flex-1">
          <p className="truncate text-[13px] leading-tight">{name}</p>
          <p className="tabular text-[15px]" style={{ color: 'var(--brass)' }}>
            {price == null ? d.priceOnRequest : money(price)}
          </p>
        </div>
        {quoteOnly ? (
          <a href={quoteHref} target="_blank" rel="noopener noreferrer" className="btn btn-primary group/btn">
            {d.requestPrice}
            <span className="btn-disc"><Whatsapp className="h-4 w-4" /></span>
          </a>
        ) : (
          <button onClick={onAdd} className="btn btn-primary group/btn">
            {done ? d.added : d.addToCart}
            <span className="btn-disc">
              {done ? <Check className="h-4 w-4" /> : <ArrowUpRight className="h-4 w-4" />}
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
