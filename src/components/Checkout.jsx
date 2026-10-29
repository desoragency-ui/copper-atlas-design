'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useCart } from '@/lib/cart';
import { dict } from '@/lib/i18n';
import { money, waLink, SHOP } from '@/lib/shop';
import PayPalButtons from './PayPalButtons';
import { ArrowUpRight, Whatsapp, Check, Minus, Plus } from './Icons';

export default function Checkout({ lang }) {
  const d = dict(lang);
  const { items, subtotal, hasQuoteOnly, setQty, remove, clear } = useCart();
  const [form, setForm] = useState({
    name: '', email: '', phone: '', country: '', city: '', address: '', notes: '',
  });
  const [state, setState] = useState('idle'); // idle | sending | sent | error
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const formRef = useRef(null);

  // PayPal is switched on from the host dashboard, so ask the server at runtime.
  const [pp, setPp] = useState(null);
  const [paid, setPaid] = useState(null); // { ref, status } once PayPal confirms
  const [payErr, setPayErr] = useState(false);
  useEffect(() => {
    let off = false;
    fetch('/api/paypal/config')
      .then((r) => (r.ok ? r.json() : null))
      .then((cfg) => !off && setPp(cfg))
      .catch(() => !off && setPp(null));
    return () => {
      off = true;
    };
  }, []);

  // Pay online only when every line has a price - a quote-only piece has nothing to charge.
  const payMode = Boolean(pp?.enabled && pp.clientId && !hasQuoteOnly && items.length);
  // Display only - /api/paypal/create-order recomputes all of this on the server.
  const shipping = pp ? (subtotal >= pp.freeShippingOver ? 0 : pp.shippingFlat) : null;
  const total = subtotal + (shipping ?? 0);

  const orderText = () => {
    const lines = items
      .map(
        (l) =>
          `• ${l.name} - ${l.finishName}${l.size ? `, ${l.sizeText ?? `${l.size} cm`}` : ''} × ${l.qty}` +
          (l.price == null ? ' (price on request)' : ` - ${money(l.price * l.qty)}`)
      )
      .join('\n');
    return (
      `${lang === 'fr' ? 'NOUVELLE COMMANDE' : 'NEW ORDER'} - ${SHOP.name}\n\n${lines}\n\n` +
      `${d.subtotal}: ${money(subtotal)}${hasQuoteOnly ? ' (+ quote-only items)' : ''}\n\n` +
      `${form.name}\n${form.email}\n${form.phone}\n${form.address}, ${form.city}, ${form.country}\n` +
      (form.notes ? `\n${d.notes}: ${form.notes}` : '')
    );
  };

  const submit = async (e) => {
    e.preventDefault();
    setState('sending');
    try {
      const res = await fetch('/api/order', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ customer: form, items, subtotal, lang }),
      });
      if (!res.ok) throw new Error('bad response');
      setState('sent');
      clear();
    } catch {
      // The WhatsApp fallback below always works, so this is recoverable.
      setState('error');
    }
  };

  if (paid) {
    const pending = paid.status !== 'COMPLETED';
    return (
      <div className="mx-auto max-w-lg px-6 py-32 text-center">
        <span
          className="mx-auto mb-8 grid h-20 w-20 place-items-center rounded-full"
          style={{ background: 'rgba(224,169,109,0.14)', color: 'var(--brass)', border: '1px solid rgba(224,169,109,0.4)' }}
        >
          <Check className="h-8 w-8" />
        </span>
        <h1 className="font-display text-[clamp(34px,5vw,52px)]">{d.paidTitle}</h1>
        <p className="mt-4 text-[15.5px] opacity-65">{pending ? d.paidPendingBody : d.paidBody}</p>
        <p className="mt-6 text-[12px] uppercase tracking-wide2 opacity-50">
          {d.orderRef} · <span className="tabular" style={{ color: 'var(--brass)' }}>{paid.ref}</span>
        </p>
        <Link href={`/${lang}/collections`} className="btn btn-primary group/btn mt-9">
          {d.continueShopping}
          <span className="btn-disc"><ArrowUpRight className="h-4 w-4" /></span>
        </Link>
      </div>
    );
  }

  if (state === 'sent') {
    return (
      <div className="mx-auto max-w-lg px-6 py-32 text-center">
        <span
          className="mx-auto mb-8 grid h-20 w-20 place-items-center rounded-full"
          style={{ background: 'rgba(78,154,134,0.15)', color: 'var(--verdigris)', border: '1px solid rgba(78,154,134,0.35)' }}
        >
          <Check className="h-8 w-8" />
        </span>
        <h1 className="font-display text-[clamp(34px,5vw,52px)]">{d.orderSent}</h1>
        <p className="mt-4 text-[15.5px] opacity-65">{d.orderSentBody}</p>
        <Link href={`/${lang}/collections`} className="btn btn-primary group/btn mt-9">
          {d.continueShopping}
          <span className="btn-disc"><ArrowUpRight className="h-4 w-4" /></span>
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-lg px-6 py-32 text-center">
        <h1 className="font-display text-[clamp(32px,5vw,48px)]">{d.cartEmpty}</h1>
        <Link href={`/${lang}/collections`} className="btn btn-primary group/btn mt-8">
          {d.cartEmptyCta}
          <span className="btn-disc"><ArrowUpRight className="h-4 w-4" /></span>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1320px] px-6 pb-28 pt-10 md:px-10">
      <h1 className="mb-10 font-display text-[clamp(36px,5.4vw,64px)] leading-[1]">{d.checkout}</h1>

      <div className="grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
        {/* form */}
        <form ref={formRef} onSubmit={submit} className="order-2 lg:order-1">
          <p className="eyebrow mb-7">{d.yourDetails}</p>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label={d.name} required value={form.name} onChange={set('name')} autoComplete="name" />
            <Field label={d.email} required type="email" value={form.email} onChange={set('email')} autoComplete="email" />
            <Field label={d.phone} required type="tel" value={form.phone} onChange={set('phone')} autoComplete="tel" />
            {/* PayPal collects the delivery address itself - don't ask for it twice. */}
            {!payMode && (
              <>
                <Field label={d.country} required value={form.country} onChange={set('country')} autoComplete="country-name" />
                <Field label={d.city} required value={form.city} onChange={set('city')} autoComplete="address-level2" />
                <Field label={d.address} required value={form.address} onChange={set('address')} autoComplete="street-address" className="sm:col-span-2" />
              </>
            )}

            <label className="sm:col-span-2">
              <span className="label">{d.notes}</span>
              <textarea
                rows={4}
                value={form.notes}
                onChange={set('notes')}
                placeholder={d.notesPh}
                className="field resize-y"
              />
            </label>
          </div>

          {payMode ? (
            <div className="mt-8">
              <p className="eyebrow mb-4">{d.payTitle}</p>
              <p className="mb-2 text-[13.5px] opacity-65">{d.payIntro}</p>
              <p className="mb-6 text-[13px] opacity-50">{d.payAddressNote}</p>

              {payErr && (
                <p className="mb-4 rounded-2xl px-4 py-3 text-[13px]"
                  style={{ background: 'rgba(200,90,60,0.14)', border: '1px solid rgba(200,90,60,0.4)' }}>
                  {d.payError}
                </p>
              )}

              <div className="max-w-[420px]">
                <PayPalButtons
                  clientId={pp.clientId}
                  lang={lang}
                  items={items}
                  customer={form}
                  validate={() => {
                    setPayErr(false);
                    return formRef.current?.reportValidity() ?? false;
                  }}
                  onPaid={(r) => {
                    setPaid(r);
                    clear();
                  }}
                  onError={() => setPayErr(true)}
                />
              </div>

              <p className="mt-8 text-[13px] opacity-55">
                {d.payAlt}{' '}
                <button type="submit" disabled={state === 'sending'} className="link-underline" style={{ color: 'var(--brass)' }}>
                  {state === 'sending' ? d.sending : d.payAltCta}
                </button>
              </p>
            </div>
          ) : (
            <>
              {pp?.enabled && hasQuoteOnly && (
                <p className="mt-6 rounded-2xl px-4 py-3 text-[13px] opacity-80"
                  style={{ background: 'rgba(224,169,109,0.08)', border: '1px solid rgba(224,169,109,0.25)' }}>
                  {d.payQuoteNote}
                </p>
              )}
              <p className="mt-6 text-[13px] opacity-55">{d.orderVia}</p>
            </>
          )}

          {state === 'error' && (
            <p className="mt-4 rounded-2xl px-4 py-3 text-[13px]"
              style={{ background: 'rgba(200,90,60,0.14)', border: '1px solid rgba(200,90,60,0.4)' }}>
              {lang === 'fr'
                ? 'L’envoi automatique a échoué. Utilisez WhatsApp ci-dessous - la commande y est déjà rédigée.'
                : 'Automatic send failed. Use WhatsApp below - the order is already written out for you.'}
            </p>
          )}

          <div className="mt-7 flex flex-wrap gap-3">
            {!payMode && (
              <button type="submit" disabled={state === 'sending'} className="btn btn-primary group/btn disabled:opacity-60">
                {state === 'sending' ? d.sending : d.placeOrder}
                <span className="btn-disc"><ArrowUpRight className="h-4 w-4" /></span>
              </button>
            )}
            <a href={waLink(orderText())} target="_blank" rel="noopener noreferrer" className="btn btn-ghost group/btn">
              {d.orSendWhatsapp}
              <span className="btn-disc"><Whatsapp className="h-4 w-4" /></span>
            </a>
          </div>
        </form>

        {/* summary */}
        <aside className="order-1 lg:order-2 lg:sticky lg:top-28 lg:self-start">
          <div className="bezel">
            <div className="bezel-core p-7">
              <p className="eyebrow mb-6">{d.orderSummary}</p>

              <ul className="flex flex-col divide-y [&>li]:border-white/10">
                {items.map((l) => (
                  <li key={l.id} className="flex gap-4 py-4 first:pt-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={l.image} alt="" loading="lazy"
                      className="h-[84px] w-[68px] shrink-0 rounded-xl border object-cover edge" />
                    <div className="min-w-0 flex-1">
                      <p className="font-display text-[17px] leading-tight">{l.name}</p>
                      <p className="mt-1 text-[11px] uppercase tracking-wide2 opacity-50">
                        {l.finishName}{l.size ? ` · ${l.sizeText ?? `${l.size} cm`}` : ''}
                      </p>
                      <div className="mt-2.5 flex items-center justify-between gap-3">
                        <span className="flex items-center gap-1 rounded-full border edge">
                          <button type="button" onClick={() => setQty(l.id, l.qty - 1)}
                            className="grid h-7 w-7 place-items-center rounded-full hover:bg-white/10" aria-label="−1">
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="tabular w-4 text-center text-[12px]">{l.qty}</span>
                          <button type="button" onClick={() => setQty(l.id, l.qty + 1)}
                            className="grid h-7 w-7 place-items-center rounded-full hover:bg-white/10" aria-label="+1">
                            <Plus className="h-3 w-3" />
                          </button>
                        </span>
                        <span className="tabular text-[13.5px]" style={{ color: 'var(--brass)' }}>
                          {l.price == null ? d.priceOnRequest : money(l.price * l.qty)}
                        </span>
                      </div>
                      <button type="button" onClick={() => remove(l.id)}
                        className="link-underline mt-1.5 text-[10.5px] uppercase tracking-wide2 opacity-40">
                        {d.remove}
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="rule my-5" />

              {payMode ? (
                <div className="space-y-2.5">
                  <div className="flex items-baseline justify-between text-[13.5px]">
                    <span className="opacity-60">{d.subtotal}</span>
                    <span className="tabular">{money(subtotal)}</span>
                  </div>
                  <div className="flex items-baseline justify-between text-[13.5px]">
                    <span className="opacity-60">{d.shippingLabel}</span>
                    <span className="tabular">{shipping ? money(shipping) : d.shippingFree}</span>
                  </div>
                  <div className="flex items-baseline justify-between pt-2">
                    <span className="text-[12px] uppercase tracking-wide2 opacity-60">{d.totalLabel}</span>
                    <span className="tabular font-display text-2xl" style={{ color: 'var(--brass)' }}>
                      {money(total)}
                    </span>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-baseline justify-between">
                    <span className="text-[12px] uppercase tracking-wide2 opacity-60">{d.subtotal}</span>
                    <span className="tabular font-display text-2xl" style={{ color: 'var(--brass)' }}>
                      {money(subtotal)}
                    </span>
                  </div>
                  <p className="mt-2 text-[11.5px] opacity-45">{d.shippingAtCheckout}</p>
                </>
              )}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Field({ label, required, className = '', ...rest }) {
  return (
    <label className={className}>
      <span className="label">
        {label}
        {required && <span style={{ color: 'var(--brass)' }}> *</span>}
      </span>
      <input required={required} className="field" {...rest} />
    </label>
  );
}
