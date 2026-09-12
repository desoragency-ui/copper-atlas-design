import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageShell, { Prose, H2 } from '@/components/PageShell';
import ProductCard from '@/components/ProductCard';
import Reveal from '@/components/Reveal';
import { ArrowLeft } from '@/components/Icons';
import { GUIDES, getGuide } from '@/data/guides';
import { getProduct } from '@/data/products';
import { LANGS, t } from '@/lib/i18n';
import { SHOP } from '@/lib/shop';

export function generateStaticParams() {
  return LANGS.flatMap((lang) => GUIDES.map((g) => ({ lang, slug: g.slug })));
}

export async function generateMetadata({ params }) {
  const { lang, slug } = await params;
  const g = getGuide(slug);
  if (!g) return {};
  return {
    title: t(g.title, lang),
    description: t(g.excerpt, lang),
    keywords: g.keywords,
    alternates: {
      canonical: `${SHOP.url}/${lang}/guides/${slug}`,
      languages: {
        en: `${SHOP.url}/en/guides/${slug}`,
        fr: `${SHOP.url}/fr/guides/${slug}`,
      },
    },
    openGraph: {
      type: 'article',
      title: t(g.title, lang),
      description: t(g.excerpt, lang),
      publishedTime: g.date,
      modifiedTime: g.updated,
      images: [{ url: g.cover }],
    },
  };
}

export default async function GuidePage({ params }) {
  const { lang, slug } = await params;
  const g = getGuide(slug);
  if (!g) notFound();

  const fr = lang === 'fr';
  const sections = g.sections[lang] ?? g.sections.en;
  const rel = g.related.map(getProduct).filter(Boolean);

  const article = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: t(g.title, lang),
    description: t(g.excerpt, lang),
    image: `${SHOP.url}${g.cover}`,
    datePublished: g.date,
    dateModified: g.updated,
    inLanguage: lang,
    author: { '@type': 'Organization', name: SHOP.name, url: SHOP.url },
    publisher: { '@type': 'Organization', name: SHOP.name, url: SHOP.url },
    mainEntityOfPage: `${SHOP.url}/${lang}/guides/${slug}`,
  };

  // Every H2 is written as a question, so the guide doubles as an FAQ entity.
  const faq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: sections.map(([h, p]) => ({
      '@type': 'Question',
      name: h,
      acceptedAnswer: { '@type': 'Answer', text: p },
    })),
  };

  return (
    <PageShell
      eyebrow={new Date(g.date).toLocaleDateString(fr ? 'fr-FR' : 'en-GB', { year: 'numeric', month: 'long' })}
      title={t(g.title, lang)}
      lead={t(g.excerpt, lang)}
      image={g.cover}
    >
      <Link
        href={`/${lang}/guides`}
        className="link-underline mb-10 inline-flex items-center gap-2 text-[12px] uppercase tracking-wide2 opacity-55"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        {fr ? 'Tous les guides' : 'All guides'}
      </Link>

      <Prose>
        {sections.map(([h, p]) => (
          <section key={h}>
            <H2>{h}</H2>
            <p className="mt-4">{p}</p>
          </section>
        ))}
      </Prose>

      {rel.length > 0 && (
        <section className="mt-24">
          <h2 className="mb-9 font-display text-[clamp(26px,3.6vw,42px)] leading-tight">
            {fr ? 'Les pièces concernées' : 'The pieces in this guide'}
          </h2>
          <div className="grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {rel.map((p) => <ProductCard key={p.slug} product={p} lang={lang} />)}
          </div>
        </section>
      )}

      <Reveal className="mt-20">
        <div className="rule mb-8" />
        <p className="text-[13px] opacity-45">
          {fr ? 'Dernière mise à jour : ' : 'Last updated: '}
          <time dateTime={g.updated}>
            {new Date(g.updated).toLocaleDateString(fr ? 'fr-FR' : 'en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}
          </time>
          {' · '}
          {SHOP.name}, {SHOP.city}
        </p>
      </Reveal>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
    </PageShell>
  );
}
