import Hero from '@/components/home/Hero';
import CategoryBento from '@/components/home/CategoryBento';
import ProductRail from '@/components/home/ProductRail';
import Craft from '@/components/home/Craft';
import FinishCompare from '@/components/home/FinishCompare';
import { Trust, Story } from '@/components/home/Trust';
import { PRODUCTS, byCategory } from '@/data/products';
import { dict } from '@/lib/i18n';

export default async function HomePage({ params }) {
  const { lang } = await params;
  const d = dict(lang);

  const signature = PRODUCTS.filter((p) => p.signature);
  const lighting = [
    ...byCategory('pendant-lights'),
    ...byCategory('ceiling-lights'),
    ...byCategory('wall-sconces'),
  ];

  return (
    <>
      <Hero lang={lang} />

      <ProductRail
        lang={lang}
        products={signature}
        eyebrow={lang === 'fr' ? 'Les plus demandées' : 'Most requested'}
        title={d.signature}
        lead={d.signatureLead}
        href={`/${lang}/collections`}
        cta={d.viewAll}
      />

      <CategoryBento lang={lang} />

      <Craft lang={lang} />

      <FinishCompare lang={lang} />

      <ProductRail
        lang={lang}
        products={lighting}
        eyebrow={lang === 'fr' ? 'Éclairage' : 'Lighting'}
        title={lang === 'fr' ? 'Toute la lumière' : 'Every light we make'}
        lead={
          lang === 'fr'
            ? 'Suspensions, plafonniers et appliques - six tailles, de 25 à 50 cm.'
            : 'Pendants, ceiling lights and sconces - six diameters, 25 to 50 cm.'
        }
        href={`/${lang}/collections/pendant-lights`}
        cta={d.viewAll}
      />

      <Trust lang={lang} />
      <Story lang={lang} />
    </>
  );
}
