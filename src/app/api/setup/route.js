import { NextResponse } from 'next/server';
import { accessToken, paypalConfig, safeEqual } from '@/lib/paypal';
import { shippingFlat } from '@/lib/pricing';
import { SHOP } from '@/lib/shop';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Backs the owner's /setup page. Locked unless SETUP_PASSWORD is set (12+
 * characters) in the host dashboard. It can report what is connected and test
 * a pair of PayPal keys - it never stores anything. The keys only become live
 * when the owner pastes them into the host's environment variables, which sit
 * behind his host login rather than behind this password.
 */

const MIN_LEN = 12;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const str = (v, max) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

export async function POST(request) {
  const expected = process.env.SETUP_PASSWORD || '';
  if (expected.length < MIN_LEN) {
    return NextResponse.json({ error: 'locked' }, { status: 503 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'bad_json' }, { status: 400 });
  }

  if (!(await safeEqual(str(body?.password, 200), expected))) {
    // Slow every wrong guess down so the password cannot be brute-forced.
    await sleep(1200);
    return NextResponse.json({ error: 'wrong_password' }, { status: 401 });
  }

  /* What is live on the server right now. */
  if (body.action === 'status') {
    const cfg = paypalConfig();
    let tokenOk = false;
    if (cfg.enabled) {
      try {
        await accessToken(cfg);
        tokenOk = true;
      } catch {
        tokenOk = false;
      }
    }
    return NextResponse.json({
      connected: cfg.enabled,
      working: tokenOk,
      env: cfg.env,
      clientIdTail: cfg.enabled ? cfg.clientId.slice(-6) : null,
      shippingFlat: shippingFlat(),
      freeShippingOver: SHOP.freeShippingOver,
      email: Boolean(process.env.RESEND_API_KEY && process.env.ORDER_EMAIL_TO),
    });
  }

  /* Prove a pair of keys works before the owner pastes them anywhere. */
  if (body.action === 'check') {
    const clientId = str(body.clientId, 200);
    const secret = str(body.secret, 200);
    const env = body.env === 'live' ? 'live' : 'sandbox';
    if (!clientId || !secret) return NextResponse.json({ ok: false, reason: 'missing' });

    try {
      await accessToken({ clientId, secret, env });
      return NextResponse.json({ ok: true, env });
    } catch (err) {
      // invalid_client almost always means the keys belong to the other mode.
      return NextResponse.json({ ok: false, reason: err.code === 'invalid_client' ? 'invalid_client' : 'unreachable' });
    }
  }

  return NextResponse.json({ error: 'bad_action' }, { status: 400 });
}
