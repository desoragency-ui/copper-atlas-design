import Link from 'next/link';
import PageShell, { Prose, H2 } from '@/components/PageShell';
import Reveal from '@/components/Reveal';
import { ArrowUpRight } from '@/components/Icons';
import { LANGS, dict } from '@/lib/i18n';

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return {
    title: dict(lang).workshop,
    description:
      lang === 'fr'
        ? 'L’atelier Copper Atlas Design à Marrakech : vingt ans de dinanderie, une pièce à la fois.'
        : 'Inside the Copper Atlas Design workshop in Marrakech: twenty years of coppersmithing, one piece at a time.',
  };
}

const COPY = {
  en: {
    lead: 'Copper Atlas Design is one workshop in Marrakech, not a factory with a showroom attached. Tarik El Ouirgani has been raising copper and brass by hand for over twenty years. When you message the shop, he is the one who replies.',
    body: [
      ['Why hand-raising still matters',
        'A spinning lathe can produce a smooth dome in ninety seconds. It will be perfect, and it will be identical to the last ten thousand. Hand-raising takes hours: the metal is worked from the centre outward with a hammer and stake, and it thickens, stretches and marks as it goes. Those marks are how the light behaves once the piece is lit — a machine-smooth dome reflects a flat disc of light, a hammered one scatters it into hundreds of small highlights.'],
      ['Solid metal, no plating',
        'Everything leaving this bench is solid copper or solid brass. Nothing is plated steel. Plating is cheaper and it is also why most decorative metalwork blisters within two years in a bathroom or a kitchen. Solid metal does the opposite — it patinates, and the patina protects the metal underneath.'],
      ['On patina',
        'The verdigris and oil-rubbed finishes are chemical reactions, not paint. They are stopped at the right moment and sealed, but copper keeps moving slowly for months afterwards. Two pieces from the same batch will not match exactly. That is not a defect and it is not something we can promise to reproduce — it is the reason the piece looks like an object and not a product.'],
      ['Made to order',
        'Nothing is held in stock. Your order starts a piece: cut, raised, finished, wired, tested and packed, usually within two to three weeks. Bespoke sizes, custom sink dimensions and hospitality quantities are all normal here — send the measurements.'],
    ],
  },
  fr: {
    lead: 'Copper Atlas Design, c’est un atelier à Marrakech, pas une usine avec un showroom. Tarik El Ouirgani travaille le cuivre et le laiton à la main depuis plus de vingt ans. Quand vous écrivez à la boutique, c’est lui qui répond.',
    body: [
      ['Pourquoi le martelage à la main compte encore',
        'Un tour à repousser sort un dôme lisse en quatre-vingt-dix secondes. Il sera parfait, et identique aux dix mille précédents. Le martelage à la main prend des heures : le métal est travaillé du centre vers l’extérieur au marteau et au tas, il s’épaissit, s’étire et se marque. Ces marques décident du comportement de la lumière : un dôme lisse renvoie un disque plat, un dôme martelé l’éclate en centaines de petits éclats.'],
      ['Métal massif, aucun placage',
        'Tout ce qui sort de cet établi est en cuivre ou en laiton massif. Jamais d’acier plaqué. Le placage coûte moins cher — et c’est pour cela que la plupart des pièces décoratives cloquent en deux ans dans une salle de bain ou une cuisine. Le métal massif fait l’inverse : il se patine, et la patine protège le métal en dessous.'],
      ['À propos de la patine',
        'Les finitions verdigris et patinée sont des réactions chimiques, pas de la peinture. On les arrête au bon moment et on les scelle, mais le cuivre continue d’évoluer lentement pendant des mois. Deux pièces d’un même lot ne seront pas identiques. Ce n’est pas un défaut, et nous ne pouvons pas promettre de le reproduire à l’identique — c’est justement pour cela que la pièce ressemble à un objet et non à un produit.'],
      ['Fabriqué à la commande',
        'Rien n’est stocké. Votre commande lance une pièce : découpe, levée, finition, câblage, test et emballage, généralement en deux à trois semaines. Tailles sur mesure, dimensions d’évier spécifiques et quantités pour l’hôtellerie sont la norme ici — envoyez les mesures.'],
    ],
  },
};

export default async function WorkshopPage({ params }) {
  const { lang } = await params;
  const d = dict(lang);
  const c = COPY[lang] ?? COPY.en;

  return (
    <PageShell
      eyebrow={lang === 'fr' ? 'Marrakech, Maroc' : 'Marrakech, Morocco'}
      title={d.storyTitle}
      lead={c.lead}
      image="/products/lotus-cluster-pendant/12.webp"
    >
      <Prose>
        {c.body.map(([h, p]) => (
          <section key={h}>
            <H2>{h}</H2>
            <p className="mt-4">{p}</p>
          </section>
        ))}
      </Prose>

      <Reveal className="mt-20 grid gap-4 sm:grid-cols-3">
        {[
          '/products/cascade-wall-sconce/01.webp',
          '/products/zahra-fluted-basin/03.webp',
          '/products/medallion-farmhouse-sink-copper/01.webp',
        ].map((src, i) => (
          <div key={src} className="bezel" style={{ marginTop: i === 1 ? '2.5rem' : 0 }}>
            <div className="bezel-core">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" loading="lazy" decoding="async" className="aspect-[4/5] w-full object-cover" />
            </div>
          </div>
        ))}
      </Reveal>

      <Reveal className="mt-16 flex flex-wrap gap-3">
        <Link href={`/${lang}/collections`} className="btn btn-primary group/btn">
          {d.heroCta}
          <span className="btn-disc"><ArrowUpRight className="h-4 w-4" /></span>
        </Link>
        <Link href={`/${lang}/trade`} className="btn btn-ghost group/btn">
          {d.trade}
          <span className="btn-disc"><ArrowUpRight className="h-4 w-4" /></span>
        </Link>
      </Reveal>
    </PageShell>
  );
}
