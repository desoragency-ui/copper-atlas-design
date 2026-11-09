/**
 * PayPal Orders v2, server side only.
 *
 * The keys come from environment variables the owner pastes into the host's
 * dashboard once (the /setup page walks him through it). They are never stored
 * by the site itself: a secret that a web form can write is a secret a leaked
 * password can overwrite, and whoever controls it receives every payment.
 *
 *   PAYPAL_CLIENT_ID      public - also sent to the browser to draw the buttons
 *   PAYPAL_CLIENT_SECRET  private - never leaves the server
 *   PAYPAL_ENV            "sandbox" for test money, "live" for real money
 *
 * Uses fetch + Web Crypto only (no node:crypto), so the same file runs on
 * Cloudflare Workers and on Node hosts.
 */

const BASES = {
  sandbox: 'https://api-m.sandbox.paypal.com',
  live: 'https://api-m.paypal.com',
};

/** What the server is configured with right now. */
export function paypalConfig() {
  const clientId = (process.env.PAYPAL_CLIENT_ID || '').trim();
  const secret = (process.env.PAYPAL_CLIENT_SECRET || '').trim();
  const env = process.env.PAYPAL_ENV === 'live' ? 'live' : 'sandbox';
  return { clientId, secret, env, base: BASES[env], enabled: Boolean(clientId && secret) };
}

/**
 * Trade a Client ID + Secret for an access token. Also the cheapest way to
 * prove a pair of keys is real, which is what /setup uses it for.
 */
export async function accessToken({ clientId, secret, env }) {
  const res = await fetch(`${BASES[env === 'live' ? 'live' : 'sandbox']}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      authorization: `Basic ${btoa(`${clientId}:${secret}`)}`,
      'content-type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
    cache: 'no-store',
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok || !json.access_token) {
    const err = new Error(json.error_description || json.error || `PayPal ${res.status}`);
    err.code = json.error || 'token_failed';
    throw err;
  }
  return { token: json.access_token, appId: json.app_id ?? null };
}

/** Authenticated call to the configured PayPal account. */
export async function paypalFetch(path, { method = 'GET', body, requestId } = {}) {
  const cfg = paypalConfig();
  if (!cfg.enabled) throw Object.assign(new Error('PayPal is not connected'), { code: 'not_configured' });

  const { token } = await accessToken(cfg);
  const res = await fetch(`${cfg.base}${path}`, {
    method,
    headers: {
      authorization: `Bearer ${token}`,
      'content-type': 'application/json',
      // Same id → PayPal replays the first result instead of acting twice,
      // so a double-click or a network retry can never charge twice.
      ...(requestId ? { 'PayPal-Request-Id': requestId } : {}),
      prefer: 'return=representation',
    },
    body: body ? JSON.stringify(body) : undefined,
    cache: 'no-store',
  });
  const json = await res.json().catch(() => ({}));
  return { ok: res.ok, status: res.status, json };
}

/* ── tamper seal ────────────────────────────────────────────────────────────
 * The Client ID is public, so anyone could create their own $1 PayPal order
 * with it and hand that order id to /api/paypal/capture. Every order this
 * server creates carries a seal - an HMAC of its reference and total, keyed
 * with the secret - and capture refuses any order whose seal does not match.
 * ────────────────────────────────────────────────────────────────────────── */

const enc = new TextEncoder();

async function hmac(message) {
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(`seal:${paypalConfig().secret}`),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const sig = new Uint8Array(await crypto.subtle.sign('HMAC', key, enc.encode(message)));
  return btoa(String.fromCharCode(...sig)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

/** `CA-XXXX.<seal>` - fits PayPal's 127-character custom_id. */
export async function seal(ref, total) {
  return `${ref}.${(await hmac(`${ref}|${total}`)).slice(0, 43)}`;
}

/** The order reference if the seal matches this total, otherwise null. */
export async function unseal(customId, total) {
  if (typeof customId !== 'string' || !customId.includes('.')) return null;
  const ref = customId.slice(0, customId.lastIndexOf('.'));
  return (await safeEqual(customId, await seal(ref, total))) ? ref : null;
}

/**
 * Constant-time string comparison. Both sides are hashed first so the loop
 * length never depends on the secret, then compared byte by byte.
 */
export async function safeEqual(a, b) {
  const [x, y] = await Promise.all(
    [a, b].map(async (s) => new Uint8Array(await crypto.subtle.digest('SHA-256', enc.encode(String(s)))))
  );
  let diff = 0;
  for (let i = 0; i < x.length; i++) diff |= x[i] ^ y[i];
  return diff === 0;
}

/** Dollars as PayPal wants them: a string with exactly two decimals. */
export const usd = (n) => (Math.round(n * 100) / 100).toFixed(2);
