import Link from 'next/link';
import { notFound } from 'next/navigation';
import ProductDetail from '@/components/pdp/ProductDetail';
import Reviews from '@/components/pdp/Reviews';
import Story from '@/components/pdp/Story';
import ProductCard from '@/components/ProductCard';
import Reveal from '@/components/Reveal';
import { PRODUCTS, getProduct, getCategory, related, fromPrice, heroImage } from '@/data/products';
import { ratingFor } from '@/data/reviews';
import { story } from '@/data/stories';
import { dict, t, LANGS } from '@/lib/i18n';
import { SHOP } from '@/lib/shop';

export function generateStaticParams() {
  return LANGS.flatMap((lang) => PRODUCTS.map((p) => ({ lang, slug: p.slug })));
}

export async function generateMetadata({ params }) {
  const { lang, slug } = await params;
  const p = getProduct(slug);
  if (!p) return {};
  const price = fromPrice(p);
  const st = story(slug);
  const longBody = st ? t(st.body, lang)[0] : t(p.description, lang);
  return {
    title: st ? t(st.seoTitle, lang) : t(p.name, lang),
    description: `${t(p.tagline, lang)} - ${longBody.slice(0, 150)}…`,
    alternates: {
      canonical: `${SHOP.url}/${lang}/products/${slug}`,
      languages: {
        en: `${SHOP.url}/en/products/${slug}`,
        fr: `${SHOP.url}/fr/products/${slug}`,
      },
    },
    openGraph: {
      type: 'website',
      title: `${t(p.name, lang)} · ${SHOP.name}`,
      description: t(p.tagline, lang),
      images: [{ url: heroImage(p) }],
    },
    other: price ? { 'product:price:amount': String(price) } : undefined,
  };
}

export default async function ProductPage({ params }) {
  const { lang, slug } = await params;
  const p = getProduct(slug);
  if (!p) notFound();

  const d = dict(lang);
  const cat = getCategory(p.category);
  const rel = related(p);
  const price = fromPrice(p);
  const agg = ratingFor(slug);
  const st = story(slug);

  // Product schema. Reviews are only emitted when every review is genuine - 
  // never publish aggregateRating built from demo data.
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: t(p.name, lang),
    description: st ? t(st.body, lang).join(' ') : t(p.description, lang),
    image: p.finishes.flatMap((f) => f.images.map((i) => `${SHOP.url}${i}`)).slice(0, 6),
    sku: p.sku,
    brand: { '@type': 'Brand', name: SHOP.name },
    material: t(p.specs[0]?.v, lang),
    ...(price
      ? {
          offers: {
            '@type': 'AggregateOffer',
            priceCurrency: SHOP.currency,
            lowPrice: price,
            highPrice: p.sizes ? Math.max(...p.sizes.map((s) => s.price)) : price,
            offerCount: p.sizes?.length ?? 1,
            availability: 'https://schema.org/MadeToOrder',
          },
        }
      : {}),
    ...(agg?.schemaSafe
      ? {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: agg.average,
            reviewCount: agg.count,
          },
        }
      : {}),
  };

  const crumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SHOP.url}/${lang}` },
      { '@type': 'ListItem', position: 2, name: t(cat.name, lang), item: `${SHOP.url}/${lang}/collections/${cat.slug}` },
      { '@type': 'ListItem', position: 3, name: t(p.name, lang) },
    ],
  };

  return (
    <div className="mx-auto max-w-[1320px] px-6 pb-32 pt-6 md:px-10 md:pt-10">
      <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-2 text-[12px] uppercase tracking-wide2 opacity-50">
        <Link href={`/${lang}`} className="link-underline">Home</Link>
        <span aria-hidden>/</span>
        <Link href={`/${lang}/collections/${cat.slug}`} className="link-underline">{t(cat.name, lang)}</Link>
        <span aria-hidden>/</span>
        <span style={{ color: 'var(--brass)' }}>{t(p.name, lang)}</span>
      </nav>

      <ProductDetail product={p} lang={lang} />

      {/* the full listing - falls back to the short blurb when there is none */}
      {st ? (
        <Story product={p} lang={lang} />
      ) : (
        <Reveal className="mx-auto mt-24 max-w-3xl text-center md:mt-32">
          <p className="eyebrow mb-7">{lang === 'fr' ? 'La pièce' : 'The piece'}</p>
          <p className="font-display text-[clamp(22px,2.9vw,34px)] leading-[1.32] text-balance">
            {t(p.description, lang)}
          </p>
        </Reveal>
      )}

      <Reviews slug={p.slug} productName={t(p.name, lang)} lang={lang} />

      <section className="pt-4">
        <div className="mb-10 flex items-end justify-between gap-6">
          <h2 className="font-display text-[clamp(28px,4vw,46px)] leading-tight">{d.youMayLike}</h2>
          <Link href={`/${lang}/collections`} className="link-underline shrink-0 text-[12px] uppercase tracking-wide2 opacity-60">
            {d.viewAll}
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {rel.map((r) => <ProductCard key={r.slug} product={r} lang={lang} />)}
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }} />
    </div>
  );
}
