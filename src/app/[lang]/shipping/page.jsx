import PageShell, { Prose, H2 } from '@/components/PageShell';
import { LANGS, dict } from '@/lib/i18n';

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return {
    title: dict(lang).shippingReturns,
    description:
      lang === 'fr'
        ? 'Délais de fabrication, expédition mondiale DHL/FedEx, droits de douane, assurance et politique de retour 14 jours de Copper Atlas Design.'
        : 'Production times, worldwide DHL/FedEx shipping, customs duties, insurance and the 14-day return policy at Copper Atlas Design.',
  };
}

const COPY = {
  en: [
    ['Production time',
      'Two to three weeks. Nothing is held in stock - your order starts a piece at the bench. Sinks with engraved aprons and project quantities take four to six weeks; you are given a real date, not a range, once the order is confirmed.'],
    ['Shipping',
      'Worldwide by DHL Express or FedEx, tracked and insured to full value. Delivery is typically 3-6 working days after dispatch to Europe and North America, 5-9 elsewhere. Every parcel is double-boxed with moulded protection; lighting ships with the shade cradled separately from the canopy.'],
    ['Shipping cost',
      'Quoted on your real address and the real weight before you pay anything. Copper is heavy and we would rather show you the number than bury it in the product price. Orders over $400 ship free to most destinations.'],
    ['Customs & duties',
      'Import duties, VAT and local handling are not included and are payable by you on delivery. Moroccan handicraft frequently qualifies for a reduced rate under trade agreements with the EU and the US, but the final amount depends on your country and we cannot quote it. We declare the true value on every commercial invoice.'],
    ['Damage in transit',
      'Photograph the box before you open it if it arrives damaged, then photograph the piece. Send both within 48 hours and a replacement is made and shipped at our cost. This is rare and it is covered by the insurance on every parcel.'],
    ['Returns',
      'Fourteen days from delivery. The piece must be unused and in its original packaging. Refund is issued to the original payment method minus the outbound shipping cost. Return shipping is paid by you unless the piece was faulty or wrongly sent.'],
    ['What cannot be returned',
      'Bespoke sizes, custom sink dimensions, engraved-to-order panels and matched project batches - they cannot be resold. This is stated clearly in writing before a bespoke order is confirmed, never buried in the small print.'],
  ],
  fr: [
    ['Délai de fabrication',
      'Deux à trois semaines. Rien n’est stocké - votre commande lance une pièce à l’établi. Les éviers à tablier gravé et les quantités projet demandent quatre à six semaines ; une vraie date vous est donnée à la confirmation, pas une fourchette.'],
    ['Expédition',
      'Dans le monde entier par DHL Express ou FedEx, suivi et assuré à la valeur totale. Livraison typique de 3 à 6 jours ouvrés après expédition vers l’Europe et l’Amérique du Nord, 5 à 9 ailleurs. Chaque colis est en double carton avec calage moulé ; les luminaires partent abat-jour calé séparément de la rosace.'],
    ['Frais de port',
      'Chiffrés sur votre adresse et le poids réels avant tout paiement. Le cuivre est lourd, et nous préférons vous montrer le chiffre plutôt que de le noyer dans le prix. Livraison offerte dès 400 $ vers la plupart des destinations.'],
    ['Douane & droits',
      'Droits d’importation, TVA et frais de dossier locaux ne sont pas inclus et sont réglés par vous à la livraison. L’artisanat marocain bénéficie souvent d’un taux réduit au titre des accords commerciaux avec l’UE et les États-Unis, mais le montant final dépend de votre pays et nous ne pouvons pas le chiffrer. Nous déclarons la valeur réelle sur chaque facture commerciale.'],
    ['Dommage au transport',
      'Si le colis arrive abîmé, photographiez-le avant ouverture, puis photographiez la pièce. Envoyez les deux sous 48 h : une pièce de remplacement est refaite et expédiée à nos frais. C’est rare, et c’est couvert par l’assurance de chaque colis.'],
    ['Retours',
      'Quatorze jours après livraison. La pièce doit être non utilisée et dans son emballage d’origine. Remboursement sur le moyen de paiement initial, hors frais de port aller. Le retour est à votre charge, sauf pièce défectueuse ou erreur d’expédition.'],
    ['Ce qui n’est pas repris',
      'Tailles sur mesure, dimensions d’évier spécifiques, panneaux gravés à la commande et lots accordés pour un projet - invendables. C’est indiqué noir sur blanc avant confirmation, jamais en petits caractères.'],
  ],
};

export default async function ShippingPage({ params }) {
  const { lang } = await params;
  const d = dict(lang);
  const c = COPY[lang] ?? COPY.en;

  return (
    <PageShell
      eyebrow={lang === 'fr' ? 'Logistique' : 'Logistics'}
      title={d.shippingReturns}
      lead={
        lang === 'fr'
          ? 'Tout ce qu’il faut savoir avant d’acheter une pièce lourde faite main à l’autre bout du monde - écrit sans détour.'
          : 'Everything worth knowing before you buy a heavy handmade object from the other side of the world - written plainly.'
      }
    >
      <Prose>
        {c.map(([h, p]) => (
          <section key={h}>
            <H2>{h}</H2>
            <p className="mt-4">{p}</p>
          </section>
        ))}
      </Prose>
    </PageShell>
  );
}
