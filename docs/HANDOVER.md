# Handover: Copper Atlas Design storefront

For the next developer (or the owner's own technical contact). Written 2026-11-10.
No secret is stored in this repository or in this file.

## What it is

Bilingual (EN/FR) shop for a Marrakech coppersmith, prices in USD.
Next.js 15 (App Router) + React 19 + Tailwind 3. No database.
Every page is prebuilt; a few server routes handle PayPal and order intake.
Live: https://copperatlasdesign.com (www redirects to the bare domain).

## Where things live

| To change | Edit |
|---|---|
| A price, size, finish, product text | `src/data/products.js` |
| Give a "price on request" piece a price | replace `priceOnRequest: true` with `price:` or `sizes:` in `src/data/products.js` |
| Product photos | `public/products/<slug>/NN.webp` (WebP, max 1800 px wide) |
| WhatsApp number, email, Instagram, free-shipping amount | `src/lib/shop.js` |
| All interface text (EN + FR) | `src/lib/i18n.js` |
| Buying guides | `src/data/guides.js` |
| Reviews (real ones only) | `src/data/reviews.js` (`REAL_REVIEWS`) |
| Shipping, returns, FAQ wording | `src/app/[lang]/shipping`, `faq`, `trade`, `workshop` |
| PayPal and order logic | `src/lib/paypal.js`, `src/lib/pricing.js`, `src/app/api/*` |

If you change the free-shipping amount, also search the text for `400`
(`src/lib/i18n.js`, `src/app/[lang]/shipping/page.jsx`): the number is written
out in the copy as well as in `SHOP.freeShippingOver`.
The shop promises 2-3 weeks production, tracked insured DHL/FedEx, and 14-day
returns in several files; keep them consistent if the policy changes.

## Run it

```bash
npm install
cp .env.example .env.local     # optional, for PayPal tests (sandbox keys)
npm run dev                    # http://localhost:3100/en
npm run build                  # checks every page
```

## Hosting: Cloudflare Workers (OpenNext)

Config: `wrangler.jsonc` (Worker `copper-atlas`, custom domains for the bare
domain and `www`), `open-next.config.ts`, `public/_headers`.

```bash
npm run cf:preview     # build + run on Cloudflare's runtime locally
npm run cf:deploy      # build + publish (uses wrangler login or CLOUDFLARE_API_TOKEN)
```

Things that will bite you:

- OpenNext copies any `.env`, `.env.local`, `.env.production*` file into the
  Worker bundle, where it overrides the variables set on Cloudflare.
  `scripts/cf-guard.mjs` refuses to build while one exists. Keep local keys in
  `.dev.vars` (never bundled, git-ignored).
- `wrangler deploy` deletes text variables set in the dashboard unless
  `--keep-vars` is passed. `cf:deploy` already passes it.
- OpenNext prints a warning on Windows; use WSL if the build misbehaves.
- The custom domains need the DNS zone on the same Cloudflare account.

## Variables (names only)

Set in Cloudflare: Workers & Pages > copper-atlas > Settings > Variables and
secrets (or `wrangler secret bulk file.json`). Use only one method per name.

| Name | Purpose |
|---|---|
| `PAYPAL_CLIENT_ID` | PayPal app Client ID |
| `PAYPAL_CLIENT_SECRET` | PayPal app Secret (also the key of the order seal) |
| `PAYPAL_ENV` | `sandbox` (fake money) or `live` (real money) |
| `SHIPPING_FLAT_USD` | Flat shipping under the free-shipping amount; unset = 0 |
| `RESEND_API_KEY`, `ORDER_EMAIL_TO`, `ORDER_EMAIL_FROM` | Order emails (optional) |
| `SETUP_PASSWORD` | Optional override of the owner page password |

PayPal turns on by itself when the first three are present. One shop talks to
one PayPal mode at a time: to move from sandbox to live, replace those three
values and redeploy. Check `/api/paypal/config` (`enabled`, `env`).

How a payment is protected: the server re-prices every cart from the catalogue,
each order carries an HMAC seal, capture is idempotent, and a `PENDING` capture
is flagged so the workshop does not start before PayPal releases the money.
Details in `README.md`.

## Known open items (as of 2026-11-10)

1. WhatsApp number in `src/lib/shop.js` is a placeholder (`212600000000`).
2. Order emails are not configured, and `hello@copperatlasdesign.com` has no MX
   record yet (Cloudflare Email Routing would forward it for free).
3. Ten pieces are `priceOnRequest` (sinks, basins, Kasbah pendant, hammam bowl,
   tumbler holder) until the owner sends prices.
4. `REAL_REVIEWS` is empty. Never publish invented reviews (FTC, DMCC, UCPD).
5. `SHIPPING_FLAT_USD` is unset, so shipping under the free amount is $0.
6. `www.copperatlasdesign.com`: two leftover `www` NS records in the DNS zone
   point to the registrar's parking name servers. Delete them for `www` to work.
7. The registrar shows contact-verification warnings on the domain. Confirm the
   verification email to avoid suspension.
8. Rotate the PayPal Secret after handover (create a new one in the PayPal
   developer dashboard, replace it in Cloudflare).
9. The GitHub repository is public; make it private if the code should not be.

## Do not commit

`.dev.vars`, any `.env*` file, any `*.secrets.json`, `.open-next/`, `.wrangler/`.
They are already in `.gitignore`.
