import { NextResponse } from 'next/server';
import { lineText, newRef, priceCart } from '@/lib/pricing';
import { notifyWorkshop } from '@/lib/notify';

export const runtime = 'nodejs';

/**
 * Order intake for anything PayPal cannot take: quote-only pieces, and the
 * whole checkout whenever PayPal is not connected yet. Validates the payload,
 * reprices every line from the catalogue and emails it to the workshop. The
 * customer always has the WhatsApp fallback in the UI.
 *
 * Paid orders go through /api/paypal/create-order and /api/paypal/capture.
 */

const str = (v, max = 300) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);

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

  if (!Array.isArray(body?.items) || body.items.length === 0) {
    return NextResponse.json({ error: 'Empty cart' }, { status: 400 });
  }

  // Server-side total - the client's number is ignored.
  const { items, subtotal, quoteOnly } = priceCart(body.items);
  if (items.length === 0) {
    return NextResponse.json({ error: 'No valid line items' }, { status: 400 });
  }

  const ref = newRef();
  const text =
    `NEW ORDER ${ref} (not paid - quote / manual follow-up)\n\n${items.map(lineText).join('\n')}\n\n` +
    `Subtotal: $${subtotal}${quoteOnly.length ? ` (+ ${quoteOnly.length} quote-only item(s))` : ''}\n\n` +
    `${customer.name}\n${customer.email}\n${customer.phone}\n` +
    `${customer.address}, ${customer.city}, ${customer.country}\n` +
    (customer.notes ? `\nNotes: ${customer.notes}\n` : '') +
    `\nLanguage: ${body.lang ?? 'en'}`;

  const sent = await notifyWorkshop({
    subject: `Order ${ref} - ${customer.name} - $${subtotal}`,
    text,
    replyTo: customer.email,
  });
  if (!sent) return NextResponse.json({ error: 'Could not send order' }, { status: 502 });

  return NextResponse.json({ ok: true, ref, subtotal, quoteOnly: quoteOnly.length });
}
