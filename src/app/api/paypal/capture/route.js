import { NextResponse } from 'next/server';
import { paypalConfig, paypalFetch, unseal } from '@/lib/paypal';
import { notifyWorkshop } from '@/lib/notify';
import { SHOP } from '@/lib/shop';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const str = (v, max = 300) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

/**
 * Takes the money for an order the buyer approved in the PayPal window, then
 * emails the workshop. Refuses any order this server did not create (see the
 * seal in lib/paypal.js) and never emails twice for the same order.
 */
export async function POST(request) {
  if (!paypalConfig().enabled) {
    return NextResponse.json({ error: 'not_configured' }, { status: 503 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'bad_json' }, { status: 400 });
  }

  const orderId = str(body?.orderId, 40);
  if (!/^[A-Z0-9]{8,40}$/.test(orderId)) {
    return NextResponse.json({ error: 'bad_order_id' }, { status: 400 });
  }

  try {
    // 1. Look before touching: is this one of ours, and for the amount we set?
    const got = await paypalFetch(`/v2/checkout/orders/${orderId}`);
    if (!got.ok) return NextResponse.json({ error: 'order_not_found' }, { status: 404 });

    const pu = got.json.purchase_units?.[0];
    const amount = pu?.amount;
    const ref = amount?.currency_code === SHOP.currency ? await unseal(pu?.custom_id, amount.value) : null;
    if (!ref) {
      console.warn('[paypal] refused unsealed order', orderId);
      return NextResponse.json({ error: 'not_our_order' }, { status: 400 });
    }

    // Already captured (a retry after a dropped connection): report, don't re-email.
    if (got.json.status === 'COMPLETED') {
      return NextResponse.json({ ok: true, ref, status: 'COMPLETED', repeat: true });
    }
    if (got.json.status !== 'APPROVED') {
      return NextResponse.json({ error: 'not_approved', status: got.json.status }, { status: 409 });
    }

    // 2. Capture. The request id makes a double-submit replay, not double-charge.
    const cap = await paypalFetch(`/v2/checkout/orders/${orderId}/capture`, {
      method: 'POST',
      requestId: `cap-${orderId}`,
    });

    if (!cap.ok) {
      const issue = cap.json?.details?.[0]?.issue;
      // Card refused: the buyer can pick another funding source in the same window.
      if (issue === 'INSTRUMENT_DECLINED') {
        return NextResponse.json({ error: 'declined', restart: true }, { status: 402 });
      }
      console.error('[paypal] capture failed', orderId, cap.status, JSON.stringify(cap.json).slice(0, 800));
      return NextResponse.json({ error: 'capture_failed' }, { status: 502 });
    }

    const capPu = cap.json.purchase_units?.[0] ?? {};
    const capture = capPu.payments?.captures?.[0] ?? {};
    // COMPLETED = money is in. PENDING = PayPal is holding it for review - the
    // workshop must wait for PayPal's email before making the piece.
    const status = capture.status || cap.json.status;

    // 3. Tell the workshop.
    const c = body?.customer ?? {};
    const ship = capPu.shipping ?? {};
    const addr = ship.address ?? {};
    const payer = cap.json.payer ?? {};
    const lines = (pu.items ?? [])
      .map((i) => `• ${i.name} × ${i.quantity} - $${(Number(i.unit_amount?.value) * Number(i.quantity)).toFixed(2)}`)
      .join('\n');
    const bd = amount.breakdown ?? {};

    const text =
      `PAID ORDER ${ref} via PayPal - payment ${status}\n` +
      (status !== 'COMPLETED' ? `\n!! PayPal is holding this payment. Do not start work until PayPal confirms it. !!\n` : '') +
      `\n${lines}\n\n` +
      `Items:    $${bd.item_total?.value ?? '?'}\n` +
      `Shipping: $${bd.shipping?.value ?? '0.00'}\n` +
      `TOTAL:    $${amount.value}\n\n` +
      `Ship to:\n${ship.name?.full_name ?? ''}\n` +
      [addr.address_line_1, addr.address_line_2, addr.admin_area_2, addr.admin_area_1, addr.postal_code, addr.country_code]
        .filter(Boolean)
        .join(', ') +
      `\n\nBuyer: ${str(c.name, 120) || [payer.name?.given_name, payer.name?.surname].filter(Boolean).join(' ')}\n` +
      `Email: ${str(c.email, 160) || payer.email_address || ''}\n` +
      `Phone: ${str(c.phone, 40)}\n` +
      (str(c.notes, 1200) ? `\nNotes: ${str(c.notes, 1200)}\n` : '') +
      `\nPayPal order: ${orderId}\nPayPal capture: ${capture.id ?? '?'}\nLanguage: ${body?.lang ?? 'en'}`;

    // The money is taken either way - a failed email must not show the buyer an error.
    await notifyWorkshop({
      subject: `PAID ${ref} - $${amount.value} - ${status}`,
      text,
      replyTo: str(c.email, 160) || payer.email_address,
    });

    return NextResponse.json({ ok: true, ref, status });
  } catch (err) {
    console.error('[paypal] capture threw', orderId, err?.code || err?.message);
    return NextResponse.json({ error: 'paypal_unreachable' }, { status: 502 });
  }
}
