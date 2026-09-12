# Copper Atlas Design — storefront

Bilingual (EN/FR) e-commerce storefront for a Marrakech coppersmith workshop.
Next.js 15 App Router, Tailwind, no database, deploys to Vercel as static pages
plus one API route.

```bash
npm install
npm run dev      # http://localhost:3100/en
npm run build    # verifies all static pages
```

## What's in here

| Area | Where |
|---|---|
| Product catalogue, prices, specs | `src/data/products.js` |
| Reviews | `src/data/reviews.js` |
| Buying guides (SEO) | `src/data/guides.js` |
| All UI copy, EN + FR | `src/lib/i18n.js` |
| Shop constants (WhatsApp, email, URL) | `src/lib/shop.js` |
| Product photography | `public/products/<slug>/NN.webp` |
| Order intake | `src/app/api/order/route.js` |

## Before going live — checklist

1. **`src/lib/shop.js`** — set the real `whatsapp` number (digits only, with country
   code, no `+`), `email`, `instagram` and `url`. The placeholder number is
   `212600000000` and every WhatsApp button on the site points at it.
2. **Sink prices.** Sinks, basins and the hammam bowl are `priceOnRequest: true`
   and show a "Request a price" button. When Tarik sends the sink price sheet,
   replace `priceOnRequest: true` with `price: <usd>` (or a `sizes[]` array) in
   `src/data/products.js` and they become normal add-to-cart products.
3. **Order email.** Set `RESEND_API_KEY` + `ORDER_EMAIL_TO` in Vercel. Without
   them orders still submit and are written to the platform logs, and the
   customer's WhatsApp fallback always works — but nothing lands in an inbox.
4. **Reviews.** `REAL_REVIEWS` is empty. See below.
5. **`NEXT_PUBLIC_DEMO_REVIEWS` must be unset in production.**

## Reviews

The review system is complete — rating summary, distribution bars, sort,
verified badges, photo reviews, helpful votes, `aggregateRating` structured data,
empty state. `REAL_REVIEWS` in `src/data/reviews.js` ships empty.

**Fill it with genuine reviews only.** Fabricated testimonials are illegal in
Tarik's main export markets — US (FTC 16 CFR Part 465, penalties per violation),
UK (DMCC Act 2024) and EU (UCPD/Omnibus). The liability falls on the business.
The structured data deliberately refuses to emit `aggregateRating` if any review
in the set is flagged `isSample`.

To see the design before real reviews exist:

```bash
NEXT_PUBLIC_DEMO_REVIEWS=1 npm run dev
```

Sample entries render with a "Sample" chip and an amber warning banner, so the
demo can never be mistaken for the real thing. Getting real reviews fast:
Facebook page comments, WhatsApp messages from past buyers (ask permission, then
quote verbatim and credit by first name + initial), and a follow-up message ~10
days after delivery.

## Payments

Ships with **cart → order form → email + WhatsApp**. No card keys needed, works
today, and shipping is quoted per order — which is right for heavy hand-made
metal going to unpredictable destinations.

Stripe is wired behind a flag. Set `STRIPE_SECRET_KEY` and
`NEXT_PUBLIC_STRIPE_ENABLED=1`, then replace the marked block in
`src/app/api/order/route.js` with a Checkout Session. Line prices are already
recomputed server-side from the catalogue, so the client can't tamper with them.

## SEO

- Static generation for every product and category in both languages
- `hreflang` alternates + `x-default` on every page and in the sitemap
- Structured data: Organization/Store, WebSite + SearchAction, Product with
  AggregateOffer, ItemList on categories, BreadcrumbList, FAQPage, HowTo, Article
- `/sitemap.xml`, `/robots.txt`, and `/llms.txt` for AI answer engines
  (GPTBot, PerplexityBot, ClaudeBot and Google-Extended are explicitly allowed)
- Three buying guides targeting the questions people search before buying;
  each H2 is a question so the guides double as FAQ entities
- Images pre-converted to WebP at ingest, `unoptimized: true` — no Vercel
  image-transform quota consumed

## Deploying to Vercel

Root directory `copper-atlas`, framework preset Next.js, no build overrides.
Add the env vars from `.env.example`.

Note: the Vercel **Hobby** plan prohibits commercial use. A shop selling goods
needs at least the Pro plan, or move it to Cloudflare Pages (also free, and the
free tier permits commercial sites).

## Adding products

1. Drop photos into `public/products/<new-slug>/01.webp`, `02.webp`, …
   (WebP, max 1800px wide — see `scripts/` notes below)
2. Add an entry to `PRODUCTS` in `src/data/products.js`, listing the image
   numbers under each finish
3. Nothing else — listing pages, sitemap, structured data and search all pick
   it up automatically

Images were ingested from the client's originals with a Pillow script:
deduplicate by content hash, resize to 1800px, encode WebP q86.
