import PageShell from '@/components/PageShell';
import Accordion from '@/components/pdp/Accordion';
import { LANGS, dict } from '@/lib/i18n';
import { SHOP } from '@/lib/shop';

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return {
    title: dict(lang).faq,
    description:
      lang === 'fr'
        ? 'Tailles, patine, livraison, douane, installation électrique et entretien — les questions qu’on nous pose le plus.'
        : 'Sizing, patina, shipping, customs, wiring and care — the questions we are asked most.',
  };
}

const QA = {
  en: [
    ['Which diameter should I choose?',
      'Over a dining table, pick a shade roughly a third of the table width — a 120 cm table takes a 40 cm shade. Over a kitchen island, two or three 25–30 cm pendants spaced 70–80 cm apart read better than one large one. Hang the bottom edge 75–85 cm above the surface. If you are unsure, send the room measurements on WhatsApp and you will get an answer, not a sales pitch.'],
    ['Will my piece look exactly like the photos?',
      'Close, but not identical, and deliberately so. The hammer marks and the patina line fall differently on every piece. Colour, proportion and finish character will match what you see; the exact pattern of marks will be yours alone.'],
    ['Does the patina keep changing?',
      'Yes, slowly. Verdigris and oil-rubbed finishes are sealed at the right moment but copper keeps reacting for months, usually deepening. Indoors, away from salt air, it then holds. You can slow it by wiping with a dry cloth, or let it run.'],
    ['Are the bulbs included?',
      'No. All lighting takes a standard E27 screw bulb, 110–240 V, so you can buy the exact colour temperature you want locally — we recommend 2200–2700 K warm white, and a dimmable Edison filament for the sconce. Shipping bulbs internationally breaks them and inflates the freight.'],
    ['Can an electrician anywhere install these?',
      'Yes. E27 socket, adjustable black cable, matte black canopy, 110–240 V. It is the same fitting a standard pendant uses in most of the world. Tell us your market on the order and we will note any country-specific requirement.'],
    ['How long does it take and what does shipping cost?',
      'Production is two to three weeks because the piece is started when you order it. Delivery is a further 3–6 working days by DHL or FedEx, tracked and insured. Shipping is quoted on your actual address and weight before you pay anything — it is not hidden in the price.'],
    ['What about customs and import duties?',
      'Duties and local taxes are not included and are paid by you on delivery. Moroccan handicraft often enters at a reduced rate, but the amount depends entirely on your country. We declare the real value on the commercial invoice — we do not under-declare parcels.'],
    ['Can I return it?',
      'Yes, within 14 days, unused and in its original packaging, for a refund minus outbound shipping. Bespoke sizes and custom sink dimensions are not returnable, because they cannot be resold — that is flagged clearly before a bespoke order is confirmed.'],
    ['Can copper sinks be used every day?',
      'They are made for it. Sixteen-gauge solid copper takes heat and impact better than a thin steel sink, and copper is naturally antimicrobial. Avoid bleach, abrasive powders and leaving acidic food sitting in the bowl; rinse and dry and it will outlive the kitchen.'],
    ['Do you make custom pieces?',
      'Regularly. Custom diameters, drops, sink footprints, engraved panels and matched project batches are standard work. Send a drawing or a measurement on WhatsApp.'],
  ],
  fr: [
    ['Quel diamètre choisir ?',
      'Au-dessus d’une table, prenez un abat-jour d’environ un tiers de la largeur de la table — une table de 120 cm appelle un 40 cm. Au-dessus d’un îlot, deux ou trois suspensions de 25–30 cm espacées de 70–80 cm rendent mieux qu’une grande. Suspendez le bord bas à 75–85 cm du plan. Dans le doute, envoyez les mesures sur WhatsApp : vous aurez une réponse, pas un argumentaire.'],
    ['Ma pièce ressemblera-t-elle exactement aux photos ?',
      'De près, mais jamais à l’identique — et c’est volontaire. Les marques de marteau et la ligne de patine tombent différemment sur chaque pièce. Couleur, proportions et caractère de finition correspondront ; le dessin exact des marques sera le vôtre.'],
    ['La patine continue-t-elle d’évoluer ?',
      'Oui, lentement. Les finitions verdigris et patinée sont scellées au bon moment, mais le cuivre continue de réagir des mois, en général en fonçant. À l’intérieur, loin de l’air marin, il se stabilise ensuite. Un chiffon sec ralentit le processus, ou laissez-le courir.'],
    ['Les ampoules sont-elles incluses ?',
      'Non. Tout l’éclairage prend une ampoule E27 standard, 110–240 V : achetez localement la température de couleur exacte que vous voulez — nous conseillons 2200–2700 K, et un filament Edison dimmable pour l’applique. Les ampoules expédiées à l’international cassent et alourdissent le fret.'],
    ['N’importe quel électricien peut-il l’installer ?',
      'Oui. Douille E27, câble noir ajustable, rosace noir mat, 110–240 V. C’est le montage d’une suspension standard dans la plupart des pays. Indiquez votre marché à la commande et nous noterons toute exigence locale.'],
    ['Quels délais et quels frais de port ?',
      'Deux à trois semaines de fabrication, puisque la pièce démarre à votre commande. Puis 3 à 6 jours ouvrés par DHL ou FedEx, suivi et assuré. Le port est chiffré sur votre adresse et votre poids réels avant tout paiement — il n’est pas caché dans le prix.'],
    ['Et la douane ?',
      'Droits et taxes locales ne sont pas inclus et sont réglés par vous à la livraison. L’artisanat marocain bénéficie souvent d’un taux réduit, mais le montant dépend entièrement de votre pays. Nous déclarons la valeur réelle sur la facture commerciale — nous ne sous-déclarons pas les colis.'],
    ['Puis-je retourner la pièce ?',
      'Oui, sous 14 jours, non utilisée et dans son emballage d’origine, remboursée hors frais de port aller. Les tailles sur mesure et dimensions d’évier spécifiques ne sont pas reprises, car invendables — c’est signalé clairement avant confirmation.'],
    ['Un évier en cuivre s’utilise-t-il au quotidien ?',
      'Il est fait pour ça. Le cuivre massif 16 gauge encaisse chaleur et chocs mieux qu’un évier en acier fin, et le cuivre est naturellement antimicrobien. Évitez l’eau de Javel, les poudres abrasives et les aliments acides laissés dans la cuve ; rincez et séchez, il survivra à la cuisine.'],
    ['Faites-vous du sur-mesure ?',
      'Régulièrement. Diamètres, hauteurs, emprises d’évier, panneaux gravés et lots accordés pour un projet sont du travail courant. Envoyez un plan ou une cote sur WhatsApp.'],
  ],
};

export default async function FaqPage({ params }) {
  const { lang } = await params;
  const d = dict(lang);
  const qa = QA[lang] ?? QA.en;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: qa.map(([q, a]) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };

  return (
    <PageShell
      eyebrow={d.faq}
      title={lang === 'fr' ? 'Questions fréquentes' : 'Frequently asked'}
      lead={
        lang === 'fr'
          ? `Pas de réponse ici ? Écrivez à ${SHOP.email} ou sur WhatsApp — c’est l’atelier qui répond.`
          : `Not answered here? Email ${SHOP.email} or message on WhatsApp — the workshop replies, not a bot.`
      }
    >
      <div className="max-w-3xl">
        <Accordion defaultOpen={0} items={qa.map(([q, a]) => ({
          t: q,
          c: <p className="text-[15px] leading-relaxed text-pretty opacity-75">{a}</p>,
        }))} />
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </PageShell>
  );
}
