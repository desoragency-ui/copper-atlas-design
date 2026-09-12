import PageShell, { Prose, H2 } from '@/components/PageShell';
import { LANGS, dict } from '@/lib/i18n';
import { SHOP } from '@/lib/shop';

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return {
    title: dict(lang).care,
    description:
      lang === 'fr'
        ? 'Comment entretenir le cuivre et le laiton martelés : nettoyage, patine, éviers en cuivre, taches d’eau calcaire et ce qu’il ne faut jamais utiliser.'
        : 'How to care for hand-hammered copper and brass: cleaning, patina, copper sinks, hard-water marks and what never to use.',
  };
}

const COPY = {
  en: [
    ['Day to day',
      'A dry soft cloth. That is the whole routine for lighting. For basins and sinks, rinse and wipe dry after use - standing water is the only thing that marks copper quickly, and drying takes five seconds.'],
    ['Never use',
      'Bleach, oven cleaner, abrasive powder, steel wool, or anything sold as a "metal polish" with grit in it. They strip the patina in one pass and leave the bare metal to spot unevenly for months afterwards. Acidic cleaners - vinegar, descaler, lemon - will also lift a patina and should stay away from a patinated finish.'],
    ['If you want it brighter',
      'On a polished or Gold Copper finish, a small amount of proper brass polish on a soft cloth brings it back, worked in circles and buffed off completely. Do this once or twice a year, not monthly - every polish removes a thin layer of the metal.'],
    ['If you want it darker',
      'Do nothing. Copper and brass darken on their own, and the deep colour on an oil-rubbed piece is where an untouched polished piece eventually arrives anyway. Handling speeds it up; the oils in skin are part of how the patina forms.'],
    ['Verdigris finishes',
      'The turquoise is a sealed chemical patina, not paint. Dust it, and leave it alone. It will keep shifting for several months after it arrives and then largely settle. Do not wax it, do not lacquer it, and do not scrub it - the texture is the finish.'],
    ['Copper sinks',
      'Rinse after use and dry with a cloth. Avoid leaving acidic food - tomato, citrus, wine - sitting in the bowl, and never leave bleach in it overnight. Marks from hot pans and water fade back into the patina within days; that self-healing is a property of living copper and one of the reasons to have one.'],
    ['Hard water',
      'In a hard-water area, white limescale marks will appear on basins. Wipe them off while fresh with a damp cloth and dry. If scale has built up, warm soapy water and a soft cloth will lift it - descaler will not, because it will take the patina with it.'],
    ['Outdoors',
      'The Cascade sconce can live outdoors under cover. In direct rain and especially in salt air it will keep oxidising fast and unevenly, which some people want and some do not. Under a porch or a covered entry it behaves like an indoor piece.'],
  ],
  fr: [
    ['Au quotidien',
      'Un chiffon doux et sec. C’est toute la routine pour les luminaires. Pour les vasques et éviers, rincez et essuyez après usage - l’eau stagnante est la seule chose qui marque vite le cuivre, et sécher prend cinq secondes.'],
    ['À ne jamais utiliser',
      'Eau de Javel, décapant four, poudre abrasive, paille de fer, ou tout « polish métal » contenant un abrasif. Ils enlèvent la patine en un passage et laissent le métal nu se tacher irrégulièrement des mois durant. Les nettoyants acides - vinaigre, anticalcaire, citron - soulèvent aussi la patine : tenez-les à l’écart des finitions patinées.'],
    ['Pour l’éclaircir',
      'Sur une finition polie ou Cuivre Doré, un peu de vrai polish à laiton sur chiffon doux la ramène : travaillez en cercles, puis lustrez à fond. Une à deux fois par an, pas tous les mois - chaque polissage retire une fine couche de métal.'],
    ['Pour l’assombrir',
      'Ne faites rien. Le cuivre et le laiton foncent seuls, et la couleur profonde d’une pièce patinée est le point où une pièce polie laissée tranquille finit par arriver. La manipulation accélère le phénomène ; les corps gras de la peau participent à la formation de la patine.'],
    ['Finitions verdigris',
      'Le turquoise est une patine chimique scellée, pas une peinture. Dépoussiérez, et laissez-la tranquille. Elle évoluera encore plusieurs mois après réception puis se stabilisera largement. Ne la cirez pas, ne la vernissez pas, ne la frottez pas - la texture est la finition.'],
    ['Éviers en cuivre',
      'Rincez après usage et séchez au chiffon. Évitez de laisser des aliments acides - tomate, agrumes, vin - dans la cuve, et jamais d’eau de Javel pendant la nuit. Les marques de casseroles chaudes et d’eau se fondent dans la patine en quelques jours ; cette auto-cicatrisation est une propriété du cuivre vivant, et l’une des raisons d’en avoir un.'],
    ['Eau calcaire',
      'En région calcaire, des traces blanches apparaîtront sur les vasques. Essuyez-les tant qu’elles sont fraîches, chiffon humide puis sec. Si le tartre s’est installé, eau tiède savonneuse et chiffon doux le décollent - pas l’anticalcaire, qui emporterait la patine avec lui.'],
    ['En extérieur',
      'L’applique Cascade peut vivre dehors, à l’abri. Sous la pluie directe et surtout en air marin, elle continuera de s’oxyder vite et de façon irrégulière - ce que certains recherchent et d’autres non. Sous un porche ou une entrée couverte, elle se comporte comme une pièce d’intérieur.'],
  ],
};

export default async function CarePage({ params }) {
  const { lang } = await params;
  const d = dict(lang);
  const c = COPY[lang] ?? COPY.en;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: lang === 'fr' ? 'Entretenir le cuivre et le laiton martelés' : 'How to care for hand-hammered copper and brass',
    step: c.map(([h, p]) => ({ '@type': 'HowToStep', name: h, text: p })),
    tool: [{ '@type': 'HowToTool', name: lang === 'fr' ? 'Chiffon doux et sec' : 'Soft dry cloth' }],
    publisher: { '@type': 'Organization', name: SHOP.name },
  };

  return (
    <PageShell
      eyebrow={lang === 'fr' ? 'Entretien' : 'Care'}
      title={d.careTitle}
      lead={
        lang === 'fr'
          ? 'Le cuivre n’est pas une surface figée. Voici ce qu’il fait, ce qu’il faut faire, et surtout ce qu’il ne faut jamais faire.'
          : 'Copper is not a fixed surface. Here is what it does, what to do about it, and what never to do.'
      }
      image="/products/atlas-verdigris-dome-pendant/01.webp"
    >
      <Prose>
        {c.map(([h, p]) => (
          <section key={h}>
            <H2>{h}</H2>
            <p className="mt-4">{p}</p>
          </section>
        ))}
      </Prose>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </PageShell>
  );
}
