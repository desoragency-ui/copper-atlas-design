import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

/**
 * Order intake.
 *
 * Today: validates the payload and emails it to the workshop via Resend when
 * RESEND_API_KEY is set, otherwise logs it so nothing is silently lost. The
 * customer always has the WhatsApp fallback in the UI.
 *
 * Later: set STRIPE_SECRET_KEY and NEXT_PUBLIC_STRIPE_ENABLED=1 and swap the
 * marked block for a Stripe Checkout Session - the rest of the flow is unchanged.
 *
 * Prices are recomputed here from the catalogue, never trusted from the client.
 */

import { getProduct, sizesFor } from '@/data/products';

const MAX_ITEMS = 40;
const str = (v, max = 300) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);

function priceLine(line) {
  const p = getProduct(line.slug);
  if (!p) return null;

  const finish = p.finishes.find((f) => f.id === line.finish) ?? p.finishes[0];
  let unit = null;

  if (!p.priceOnRequest) {
    // Resolve the ladder for THIS finish — a finish may override the product's,
    // so the same diameter can legitimately cost more in oil-rubbed than gold.
    const sizes = sizesFor(p, finish.id);
    if (sizes?.length) {
      const size = sizes.find((s) => s.cm === line.size);
      if (!size) return null;
      unit = size.price;
    } else {
      unit = p.price ?? null;
    }
  }

  const qty = Math.max(1, Math.min(99, Number(line.qty) || 1));
  return {
    slug: p.slug,
    sku: p.sku,
    name: p.name.en,
    finish: finish.name.en,
    size: line.size ?? null,
    qty,
    unit,
    total: unit == null ? null : unit * qty,
  };
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const c = body?.customer ?? {};
  const customer = {
    name: str(c.name, 120),
    email: str(c.email, 160),
    phone: str(c.phone, 40),
    country: str(c.country, 80),
    city: str(c.city, 80),
    address: str(c.address, 240),
    notes: str(c.notes, 1200),
  };

  if (!customer.name || !isEmail(customer.email) || !customer.phone) {
    return NextResponse.json({ error: 'Missing or invalid contact details' }, { status: 400 });
  }

  const raw = Array.isArray(body?.items) ? body.items.slice(0, MAX_ITEMS) : [];
  if (raw.length === 0) {
    return NextResponse.json({ error: 'Empty cart' }, { status: 400 });
  }

  const items = raw.map(priceLine).filter(Boolean);
  if (items.length === 0) {
    return NextResponse.json({ error: 'No valid line items' }, { status: 400 });
  }

  // Server-side total - the client's number is ignored.
  const subtotal = items.reduce((n, l) => n + (l.total ?? 0), 0);
  const quoteOnly = items.filter((l) => l.total == null);
  const ref = `CA-${Date.now().toString(36).toUpperCase()}`;

  /* ── STRIPE SWAP POINT ───────────────────────────────────────────────────
   * if (process.env.STRIPE_SECRET_KEY && quoteOnly.length === 0) {
   * const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
   * const session = await stripe.checkout.sessions.create({ ... });
   * return NextResponse.json({ ok: true, url: session.url });
   * }
   * ──────────────────────────────────────────────────────────────────────── */

  const lines = items
    .map((l) => `• ${l.name} - ${l.finish}${l.size ? `, ${l.size}cm` : ''} × ${l.qty} - ${l.total == null ? 'PRICE ON REQUEST' : `$${l.total}`}`)
    .join('\n');

  const text =
    `NEW ORDER ${ref}\n\n${lines}\n\n` +
    `Subtotal: $${subtotal}${quoteOnly.length ? ` (+ ${quoteOnly.length} quote-only item(s))` : ''}\n\n` +
    `${customer.name}\n${customer.email}\n${customer.phone}\n` +
    `${customer.address}, ${customer.city}, ${customer.country}\n` +
    (customer.notes ? `\nNotes: ${customer.notes}\n` : '') +
    `\nLanguage: ${body.lang ?? 'en'}`;

  const to = process.env.ORDER_EMAIL_TO;
  const key = process.env.RESEND_API_KEY;

  if (key && to) {
    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { authorization: `Bearer ${key}`, 'content-type': 'application/json' },
        body: JSON.stringify({
          from: process.env.ORDER_EMAIL_FROM || 'orders@copperatlasdesign.com',
          to: [to],
          reply_to: customer.email,
          subject: `Order ${ref} - ${customer.name} - $${subtotal}`,
          text,
        }),
      });
      if (!res.ok) throw new Error(`Resend ${res.status}`);
    } catch (err) {
      console.error('[order] email failed', ref, err);
      return NextResponse.json({ error: 'Could not send order' }, { status: 502 });
    }
  } else {
    // No mail provider configured yet - keep the order in the platform logs.
    console.log('[order] (no RESEND_API_KEY/ORDER_EMAIL_TO configured)\n', text);
  }

  return NextResponse.json({ ok: true, ref, subtotal, quoteOnly: quoteOnly.length });
}
