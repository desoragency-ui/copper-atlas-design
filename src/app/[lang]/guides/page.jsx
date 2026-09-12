import Link from 'next/link';
import PageShell from '@/components/PageShell';
import Reveal from '@/components/Reveal';
import { ArrowUpRight } from '@/components/Icons';
import { GUIDES } from '@/data/guides';
import { LANGS, t } from '@/lib/i18n';
import { SHOP } from '@/lib/shop';

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const fr = lang === 'fr';
  return {
    title: fr ? 'Guides d’achat' : 'Buying guides',
    description: fr
      ? 'Guides pratiques : quelle taille de suspension choisir, quelle finition de cuivre, et si un évier en cuivre en vaut la peine.'
      : 'Practical guides: what size pendant light to choose, which copper finish to pick, and whether a copper sink is worth it.',
    alternates: {
      canonical: `${SHOP.url}/${lang}/guides`,
      languages: { en: `${SHOP.url}/en/guides`, fr: `${SHOP.url}/fr/guides` },
    },
  };
}

export default async function GuidesPage({ params }) {
  const { lang } = await params;
  const fr = lang === 'fr';

  return (
    <PageShell
      eyebrow={fr ? 'Guides' : 'Guides'}
      title={fr ? 'Avant d’acheter' : 'Before you buy'}
      lead={
        fr
          ? 'Les questions qu’on nous pose avant chaque commande, répondues en entier - mesures, finitions et compromis réels compris.'
          : 'The questions we get before every order, answered in full - measurements, finishes and the real trade-offs included.'
      }
    >
      <div className="grid gap-5 md:grid-cols-3">
        {GUIDES.map((g, i) => (
          <Reveal key={g.slug} delay={i * 80}>
            <Link href={`/${lang}/guides/${g.slug}`} className="group/card block h-full">
              <div className="bezel h-full transition-colors duration-600 group-hover/card:border-[rgba(224,169,109,0.42)]">
                <div className="bezel-core flex h-full flex-col">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={g.cover}
                    alt=""
                    loading={i === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                    className="aspect-[16/10] w-full object-cover transition-transform duration-[1100ms] ease-atlas group-hover/card:scale-[1.05]"
                  />
                  <div className="flex flex-1 flex-col p-6">
                    <time className="tabular text-[10.5px] uppercase tracking-eyebrow opacity-45" dateTime={g.date}>
                      {new Date(g.date).toLocaleDateString(fr ? 'fr-FR' : 'en-GB', { year: 'numeric', month: 'long' })}
                    </time>
                    <h2 className="mt-3 font-display text-[24px] leading-tight">{t(g.title, lang)}</h2>
                    <p className="mt-2.5 text-[14px] leading-relaxed opacity-60">{t(g.excerpt, lang)}</p>
                    <span className="mt-auto flex items-center gap-2 pt-6 text-[11.5px] uppercase tracking-wide2" style={{ color: 'var(--brass)' }}>
                      {fr ? 'Lire' : 'Read'}
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover/card:translate-x-1 group-hover/card:-translate-y-1" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </PageShell>
  );
}
