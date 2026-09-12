import { PRODUCTS, CATEGORIES } from '@/data/products';
import { GUIDES } from '@/data/guides';
import { SHOP } from '@/lib/shop';
import { LANGS } from '@/lib/i18n';

/**
 * Every URL is emitted once per locale with a full hreflang alternates map,
 * so Google serves the right language and never treats EN/FR as duplicates.
 */
const alternates = (path) => ({
  languages: {
    ...Object.fromEntries(LANGS.map((l) => [l, `${SHOP.url}/${l}${path}`])),
    'x-default': `${SHOP.url}/en${path}`,
  },
});

const entry = (path, priority, changeFrequency, lastModified) =>
  LANGS.map((lang) => ({
    url: `${SHOP.url}/${lang}${path}`,
    lastModified: lastModified ?? new Date(),
    changeFrequency,
    priority,
    alternates: alternates(path),
  }));

export default function sitemap() {
  return [
    ...entry('', 1, 'weekly'),
    ...entry('/collections', 0.9, 'weekly'),
    ...CATEGORIES.flatMap((c) => entry(`/collections/${c.slug}`, 0.85, 'weekly')),
    ...PRODUCTS.flatMap((p) => entry(`/products/${p.slug}`, 0.8, 'weekly')),
    ...entry('/guides', 0.7, 'monthly'),
    ...GUIDES.flatMap((g) => entry(`/guides/${g.slug}`, 0.7, 'monthly', new Date(g.updated))),
    ...entry('/workshop', 0.6, 'monthly'),
    ...entry('/trade', 0.6, 'monthly'),
    ...entry('/faq', 0.5, 'monthly'),
    ...entry('/shipping', 0.4, 'yearly'),
    ...entry('/care', 0.5, 'yearly'),
    ...entry('/contact', 0.4, 'yearly'),
  ];
}
