import Listing from '@/components/Listing';
import Reveal from '@/components/Reveal';
import { PRODUCTS } from '@/data/products';
import { dict, LANGS } from '@/lib/i18n';
import { SHOP } from '@/lib/shop';

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return {
    title: lang === 'fr' ? 'Toutes les pièces' : 'All pieces',
    description:
      lang === 'fr'
        ? 'Le catalogue complet Copper Atlas Design : suspensions, plafonniers, appliques, vasques, éviers et pièces de hammam en cuivre et laiton martelés main.'
        : 'The full Copper Atlas Design catalogue: pendants, ceiling lights, sconces, vessel basins, farmhouse sinks and hammam pieces in hand-hammered copper and brass.',
    alternates: {
      canonical: `${SHOP.url}/${lang}/collections`,
      languages: {
        en: `${SHOP.url}/en/collections`,
        fr: `${SHOP.url}/fr/collections`,
        'x-default': `${SHOP.url}/en/collections`,
      },
    },
  };
}

export default async function CollectionsPage({ params }) {
  const { lang } = await params;
  const d = dict(lang);

  return (
    <div className="mx-auto max-w-[1320px] px-6 pb-24 pt-14 md:px-10 md:pt-20">
      <Reveal className="mb-12 max-w-2xl">
        <p className="eyebrow mb-6">{d.collections}</p>
        <h1 className="font-display text-[clamp(40px,6.4vw,80px)] leading-[0.98] text-balance">
          {d.allProducts}
        </h1>
        <p className="mt-5 text-[16px] text-pretty opacity-62">
          {lang === 'fr'
            ? 'Chaque pièce est façonnée à la commande dans l’atelier de Marrakech. Filtrez par finition ou par catégorie.'
            : 'Every piece is made to order in the Marrakech workshop. Filter by finish or by category.'}
        </p>
      </Reveal>

      <Listing lang={lang} products={PRODUCTS} />
    </div>
  );
}
