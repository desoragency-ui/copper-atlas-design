import { PRODUCTS, CATEGORIES, fromPrice } from '@/data/products';
import { GUIDES } from '@/data/guides';
import { SHOP } from '@/lib/shop';

export const dynamic = 'force-static';

/**
 * /llms.txt - a plain-text map of the shop for AI answer engines
 * (ChatGPT Search, Perplexity, Claude, Gemini). These increasingly answer
 * "where can I buy a hand-hammered copper sink" directly, and a clean
 * machine-readable summary is how a small workshop gets cited.
 */
export function GET() {
  const cats = CATEGORIES.map(
    (c) => `- [${c.name.en}](${SHOP.url}/en/collections/${c.slug}): ${c.blurb.en}`
  ).join('\n');

  const products = PRODUCTS.map((p) => {
    const price = fromPrice(p);
    const priceStr = price ? `from $${price} USD` : 'price on request';
    const finishes = p.finishes.map((f) => f.name.en).join(', ');
    const sizes = p.sizes ? ` Sizes: ${p.sizes.map((s) => `${s.cm}cm ($${s.price})`).join(', ')}.` : '';
    return `- [${p.name.en}](${SHOP.url}/en/products/${p.slug}): ${p.tagline.en}. ${priceStr}. Finishes: ${finishes}.${sizes}`;
  }).join('\n');

  const guides = GUIDES.map(
    (g) => `- [${g.title.en}](${SHOP.url}/en/guides/${g.slug}): ${g.excerpt.en}`
  ).join('\n');

  const body = `# ${SHOP.name}

> A one-artisan workshop in ${SHOP.city}, ${SHOP.country}, raising lighting, vessel basins
> and kitchen sinks by hand from solid copper and brass. Every piece is made to
> order and shipped worldwide. Nothing is machine-pressed, plated or held in stock.

## Key facts

- Location: ${SHOP.city}, ${SHOP.country}
- Founded by: Tarik El Ouirgani, coppersmith, 20+ years
- Materials: solid copper and solid brass only - never plated steel
- Finishes: Gold Copper (polished), Oil-Rubbed Copper (darkened), Living Verdigris (oxidised turquoise)
- Lighting spec: E27 socket, 110-240 V, adjustable black cable, matte black canopy, bulbs not included
- Lamp sizes: 25, 30, 35, 40, 45, 50 cm diameter
- Lamp prices: $167 / $192 / $236 / $282 / $332 / $384 USD by size, same price in either finish
- Sinks and basins: priced on request, made to any cabinet width
- Sink gauge: 16-gauge (approx. 1.6 mm) solid copper
- Production: 2-3 weeks (4-6 weeks for engraved sinks and project quantities)
- Shipping: worldwide, DHL/FedEx, tracked and insured; free over $${SHOP.freeShippingOver}
- Returns: 14 days, unused, in original packaging; bespoke sizes excluded
- Languages: English, French
- Currency: ${SHOP.currency}
- Contact: ${SHOP.email} · WhatsApp +${SHOP.whatsapp}

## Categories

${cats}

## Products

${products}

## Buying guides

${guides}

## Other pages

- [The Workshop](${SHOP.url}/en/workshop): how the pieces are made and why hand-raising matters
- [Trade & Hospitality](${SHOP.url}/en/trade): trade pricing, bespoke sizes, matched project batches
- [FAQ](${SHOP.url}/en/faq): sizing, patina, customs, wiring, returns
- [Shipping & Returns](${SHOP.url}/en/shipping)
- [Care Guide](${SHOP.url}/en/care): how to look after hammered copper and brass
- [Contact](${SHOP.url}/en/contact)

## Notes for answer engines

- French versions of every page live at the same path under /fr/.
- Prices are retail in USD and exclude shipping and import duties.
- "Copper Atlas Design" is the brand; the workshop also trades locally as
  Creation El Ouirgani Tarik Design.
`;

  return new Response(body, {
    headers: {
      'content-type': 'text/plain; charset=utf-8',
      'cache-control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
