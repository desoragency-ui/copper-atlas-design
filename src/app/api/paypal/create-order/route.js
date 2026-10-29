import { NextResponse } from 'next/server';
import { newRef, priceCart, shippingFor } from '@/lib/pricing';
import { paypalConfig, paypalFetch, seal, usd } from '@/lib/paypal';
import { SHOP } from '@/lib/shop';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Creates a PayPal order from the cart. The amount is computed here from the
 * catalogue; the browser only says which pieces, finishes, sizes and how many.
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

  const { items, subtotal, quoteOnly } = priceCart(body?.items);
  if (items.length === 0) return NextResponse.json({ error: 'empty' }, { status: 400 });
  // Nothing to charge for a piece that has no price yet - those stay on the
  // quote flow, and the checkout UI hides PayPal when the cart holds one.
  if (quoteOnly.length) return NextResponse.json({ error: 'quote_only' }, { status: 400 });

  const shipping = shippingFor(subtotal);
  const total = usd(subtotal + shipping);
  const ref = newRef();

  const order = {
    intent: 'CAPTURE',
    purchase_units: [
      {
        reference_id: ref,
        invoice_id: ref,
        custom_id: await seal(ref, total),
        description: `${SHOP.name} - order ${ref}`.slice(0, 127),
        amount: {
          currency_code: SHOP.currency,
          value: total,
          breakdown: {
            item_total: { currency_code: SHOP.currency, value: usd(subtotal) },
            shipping: { currency_code: SHOP.currency, value: usd(shipping) },
          },
        },
        items: items.map((l) => ({
          name: `${l.name} - ${l.finish}${l.sizeText ? `, ${l.sizeText}` : ''}`.slice(0, 127),
          sku: l.sku.slice(0, 127),
          quantity: String(l.qty),
          unit_amount: { currency_code: SHOP.currency, value: usd(l.unit) },
          category: 'PHYSICAL_GOODS',
        })),
      },
    ],
    application_context: {
      brand_name: SHOP.name,
      locale: body?.lang === 'fr' ? 'fr-FR' : 'en-US',
      // PayPal asks the buyer for the delivery address and hands it back on capture.
      shipping_preference: 'GET_FROM_FILE',
      user_action: 'PAY_NOW',
    },
  };

  try {
    const res = await paypalFetch('/v2/checkout/orders', { method: 'POST', body: order, requestId: ref });
    if (!res.ok || !res.json.id) {
      console.error('[paypal] create failed', res.status, JSON.stringify(res.json).slice(0, 800));
      return NextResponse.json({ error: 'paypal_error' }, { status: 502 });
    }
    return NextResponse.json({ id: res.json.id, ref });
  } catch (err) {
    console.error('[paypal] create threw', err?.code || err?.message);
    return NextResponse.json({ error: 'paypal_unreachable' }, { status: 502 });
  }
}
