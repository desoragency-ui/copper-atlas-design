/**
 * Copper Atlas Design — customer reviews.
 *
 * ── REAL REVIEWS ────────────────────────────────────────────────────────────
 * Add genuine reviews to REAL_REVIEWS below. One object per review:
 *
 *   {
 *     product: 'zahra-fluted-basin',   // product slug
 *     name: 'Claire D.',               // as the buyer wants to be shown
 *     country: 'FR',                   // ISO-2, renders a flag + country
 *     rating: 5,                       // 1–5
 *     date: '2026-02-14',              // ISO date
 *     title: 'Better than the photos',
 *     body: 'The engraving is much deeper in person…',
 *     verified: true,                  // true only if you can match an order
 *     finish: 'gold',                  // optional
 *     size: 40,                        // optional, cm
 *     photos: ['/reviews/zahra-01.webp'], // optional, put files in /public/reviews
 *     helpful: 0,
 *   }
 *
 * Where to get them, fastest first:
 *   1. Facebook page reviews + comments on Creation-el ouirgani tarik design
 *   2. WhatsApp / Telegram messages from past buyers — ask permission, then
 *      paste the wording verbatim and credit by first name + initial
 *   3. Etsy / marketplace feedback, if the shop has any
 *   4. The follow-up email in /docs/review-request.md, sent 10 days after delivery
 *
 * ── DEMO DATA ───────────────────────────────────────────────────────────────
 * DEMO_REVIEWS exists so the review interface can be presented before real
 * reviews exist. Every entry is deliberately marked as a sample and the UI
 * prints a warning banner over the block. It is OFF unless
 * NEXT_PUBLIC_DEMO_REVIEWS=1 is set, and it must never be enabled on the
 * live shop — publishing invented testimonials is illegal in the US
 * (FTC 16 CFR Part 465), the UK (DMCC Act 2024) and the EU (UCPD/Omnibus),
 * and the penalty lands on the business, not on whoever wrote them.
 * ────────────────────────────────────────────────────────────────────────────
 */

export const REAL_REVIEWS = [
  // ← paste genuine reviews here
];

const sample = (product, rating, len) => ({
  product,
  rating,
  name: 'Sample reviewer',
  country: 'XX',
  date: '2026-01-01',
  verified: false,
  isSample: true,
  helpful: 0,
  title: 'Sample review title',
  body: {
    short: 'SAMPLE TEXT — replace with a real customer review before launch.',
    medium:
      'SAMPLE TEXT — this block shows how a medium-length review sits in the layout. Replace every sample entry with a genuine review before this store goes live.',
    long: 'SAMPLE TEXT — this longer block exists only to show line-wrapping, the read-more control and how a review with a photo attached behaves in the grid. It carries no meaning and must be deleted before launch. Replace it with a real customer’s own words, used with their permission.',
  }[len],
});

export const DEMO_REVIEWS = [
  sample('lotus-cluster-pendant', 5, 'long'),
  sample('lotus-cluster-pendant', 5, 'short'),
  sample('lotus-cluster-pendant', 4, 'medium'),
  sample('atlas-verdigris-dome-pendant', 5, 'medium'),
  sample('atlas-verdigris-dome-pendant', 5, 'short'),
  sample('zahra-fluted-basin', 5, 'long'),
  sample('zahra-fluted-basin', 4, 'short'),
  sample('cascade-wall-sconce', 5, 'medium'),
  sample('medallion-farmhouse-sink-copper', 5, 'long'),
];

export const DEMO_ON =
  process.env.NEXT_PUBLIC_DEMO_REVIEWS === '1' ||
  process.env.NEXT_PUBLIC_DEMO_REVIEWS === 'true';

export const ALL_REVIEWS = DEMO_ON ? [...REAL_REVIEWS, ...DEMO_REVIEWS] : REAL_REVIEWS;

export const reviewsFor = (slug) =>
  ALL_REVIEWS.filter((r) => r.product === slug).sort((a, b) => (a.date < b.date ? 1 : -1));

/** Aggregate rating — returns null when there is nothing genuine to aggregate. */
export function ratingFor(slug) {
  const rs = reviewsFor(slug);
  if (!rs.length) return null;
  const sum = rs.reduce((n, r) => n + r.rating, 0);
  const dist = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: rs.filter((r) => r.rating === star).length,
  }));
  return {
    average: Math.round((sum / rs.length) * 10) / 10,
    count: rs.length,
    dist,
    /** Only emit review schema for real reviews — never for demo data. */
    schemaSafe: rs.every((r) => !r.isSample),
  };
}
