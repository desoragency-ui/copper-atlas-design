import Link from 'next/link';
import { notFound } from 'next/navigation';
import Listing from '@/components/Listing';
import Reveal from '@/components/Reveal';
import { ArrowLeft } from '@/components/Icons';
import { CATEGORIES, byCategory, getCategory, fromPrice } from '@/data/products';
import { dict, t, LANGS } from '@/lib/i18n';
import { SHOP } from '@/lib/shop';

export function generateStaticParams() {
  return LANGS.flatMap((lang) => CATEGORIES.map((c) => ({ lang, slug: c.slug })));
}

export async function generateMetadata({ params }) {
  const { lang, slug } = await params;
  const c = getCategory(slug);
  if (!c) return {};
  return {
    title: t(c.name, lang),
    description: t(c.blurb, lang),
    openGraph: { images: [c.cover] },
  };
}

export default async function CategoryPage({ params }) {
  const { lang, slug } = await params;
  const c = getCategory(slug);
  if (!c) notFound();

  const d = dict(lang);
  const products = byCategory(slug);

  // ItemList tells Google this is a real product listing, which is what
  // surfaces the category in shopping-style results rather than plain blue links.
  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: t(c.name, lang),
    description: t(c.blurb, lang),
    numberOfItems: products.length,
    itemListElement: products.map((p, i) => {
      const price = fromPrice(p);
      return {
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'Product',
          name: t(p.name, lang),
          url: `${SHOP.url}/${lang}/products/${p.slug}`,
          image: `${SHOP.url}${p.finishes[0].images[0]}`,
          sku: p.sku,
          brand: { '@type': 'Brand', name: SHOP.name },
          ...(price
            ? { offers: { '@type': 'Offer', price, priceCurrency: SHOP.currency, availability: 'https://schema.org/MadeToOrder' } }
            : {}),
        },
      };
    }),
  };

  const crumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SHOP.url}/${lang}` },
      { '@type': 'ListItem', position: 2, name: d.collections, item: `${SHOP.url}/${lang}/collections` },
      { '@type': 'ListItem', position: 3, name: t(c.name, lang) },
    ],
  };

  return (
    <div className="mx-auto max-w-[1320px] px-6 pb-24 pt-8 md:px-10 md:pt-12">
      <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-[12px] uppercase tracking-wide2 opacity-50">
        <Link href={`/${lang}`} className="link-underline">Home</Link>
        <span aria-hidden>/</span>
        <Link href={`/${lang}/collections`} className="link-underline">{d.collections}</Link>
        <span aria-hidden>/</span>
        <span style={{ color: 'var(--brass)' }}>{t(c.name, lang)}</span>
      </nav>

      <Reveal className="mb-12 grid gap-8 md:grid-cols-[1.15fr_0.85fr] md:items-end">
        <div>
          <p className="eyebrow mb-6">{products.length} {d.results}</p>
          <h1 className="font-display text-[clamp(40px,6.2vw,78px)] leading-[0.98] text-balance">
            {t(c.name, lang)}
          </h1>
          <p className="mt-5 max-w-lg text-[16px] text-pretty opacity-62">{t(c.blurb, lang)}</p>
          <Link
            href={`/${lang}/collections`}
            className="link-underline mt-6 inline-flex items-center gap-2 text-[12px] uppercase tracking-wide2 opacity-60"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            {d.backTo} {d.allProducts}
          </Link>
        </div>

        <div className="bezel">
          <div className="bezel-core">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={c.cover}
              alt=""
              className="aspect-[16/10] w-full object-cover"
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
          </div>
        </div>
      </Reveal>

      <Listing lang={lang} products={products} showCategoryFilter={false} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }} />
    </div>
  );
}
