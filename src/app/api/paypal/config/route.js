import { NextResponse } from 'next/server';
import { paypalConfig } from '@/lib/paypal';
import { shippingFlat } from '@/lib/pricing';
import { SHOP } from '@/lib/shop';

export const runtime = 'nodejs';
// Read at request time: the owner changes these in the host dashboard, and a
// value baked in at build time would ignore that until the next deploy.
export const dynamic = 'force-dynamic';

/** What the checkout needs to draw the PayPal buttons. Nothing secret here. */
export function GET() {
  const { enabled, clientId, env } = paypalConfig();
  return NextResponse.json(
    {
      enabled,
      clientId: enabled ? clientId : null,
      env,
      currency: SHOP.currency,
      freeShippingOver: SHOP.freeShippingOver,
      shippingFlat: shippingFlat() ?? 0,
    },
    { headers: { 'cache-control': 'no-store' } }
  );
}
