/**
 * Server-side pricing. Every number that reaches a payment provider or the
 * workshop's inbox is computed here from the catalogue - a price sent by the
 * browser is never trusted, because anyone can edit it before it is posted.
 *
 * Plain JS with no Node-only imports, so it runs on Cloudflare Workers and on
 * Cloudflare Workers alike.
 */
import { getProduct, sizeLabel, sizesFor } from '@/data/products';
import { SHOP } from '@/lib/shop';

export const MAX_ITEMS = 40;

/** One cart line → a priced line, or null when it no longer exists. */
export function priceLine(line) {
  const p = getProduct(line?.slug);
  if (!p) return null;

  const finish = p.finishes.find((f) => f.id === line.finish) ?? p.finishes[0];
  let unit = null;
  let sizeRow = null;

  if (!p.priceOnRequest) {
    // Resolve the ladder for THIS finish - a finish may override the product's,
    // so the same diameter can legitimately cost more in oil-rubbed than gold.
    const sizes = sizesFor(p, finish.id);
    if (sizes?.length) {
      sizeRow = sizes.find((s) => s.cm === line.size) ?? null;
      if (!sizeRow) return null;
      unit = sizeRow.price;
    } else {
      unit = p.price ?? null;
    }
  }

  const qty = Math.max(1, Math.min(99, Number(line.qty) || 1));
  return {
    slug: p.slug,
    sku: `${p.sku}-${finish.id.slice(0, 3).toUpperCase()}${line.size ? `-${line.size}` : ''}`,
    name: p.name.en,
    finish: finish.name.en,
    size: line.size ?? null,
    sizeText: sizeRow ? sizeLabel(sizeRow, 'en') : null,
    qty,
    unit,
    total: unit == null ? null : unit * qty,
  };
}

/** A whole cart, priced. `quoteOnly` lists the lines that have no price yet. */
export function priceCart(rawItems) {
  const raw = Array.isArray(rawItems) ? rawItems.slice(0, MAX_ITEMS) : [];
  const items = raw.map(priceLine).filter(Boolean);
  const subtotal = items.reduce((n, l) => n + (l.total ?? 0), 0);
  const quoteOnly = items.filter((l) => l.total == null);
  return { items, subtotal, quoteOnly };
}

/**
 * Shipping for a paid order. Free above SHOP.freeShippingOver - the promise in
 * the site's top banner - otherwise the flat fee the owner sets on the host as
 * SHIPPING_FLAT_USD. Unset means 0, and the owner's /setup page warns about it.
 */
export function shippingFor(subtotal) {
  if (subtotal >= SHOP.freeShippingOver) return 0;
  return shippingFlat() ?? 0;
}

/** The configured flat fee, or null when the owner has not set one yet. */
export function shippingFlat() {
  const raw = process.env.SHIPPING_FLAT_USD;
  if (raw == null || raw === '') return null;
  const n = Number(raw);
  return Number.isFinite(n) && n >= 0 ? Math.round(n * 100) / 100 : null;
}

/** A short human order reference, unique enough to be a PayPal invoice id. */
export const newRef = () =>
  `CA-${Date.now().toString(36).toUpperCase()}${Math.random().toString(36).slice(2, 5).toUpperCase()}`;

/** "• Lotus Cluster Pendant - Gold Copper, 30 cm × 1 - $160" */
export const lineText = (l) =>
  `• ${l.name} - ${l.finish}${l.sizeText ? `, ${l.sizeText}` : ''} × ${l.qty} - ${
    l.total == null ? 'PRICE ON REQUEST' : `$${l.total}`
  }`;
