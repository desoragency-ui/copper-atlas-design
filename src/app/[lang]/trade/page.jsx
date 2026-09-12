import PageShell, { Prose, H2 } from '@/components/PageShell';
import Reveal from '@/components/Reveal';
import { ArrowUpRight, Whatsapp, IconHammer, IconShip, IconShield } from '@/components/Icons';
import { LANGS, dict } from '@/lib/i18n';
import { waLink } from '@/lib/shop';

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return {
    title: dict(lang).trade,
    description:
      lang === 'fr'
        ? 'Tarifs professionnels, commandes en volume et pièces sur mesure pour architectes d’intérieur, riads, hôtels et restaurants.'
        : 'Trade pricing, volume orders and bespoke pieces for interior designers, riads, hotels and restaurants.',
  };
}

const COPY = {
  en: {
    lead: 'Designers, riads, hotels and restaurants order differently from a household: repeat runs of one piece, matched finishes across a whole floor, sizes that are not on the size chart, and a delivery date that has to hold. All of that is normal work here.',
    perks: [
      [IconHammer, 'Bespoke sizes', 'Any diameter, any drop, any sink footprint. Send a drawing or a cabinet measurement.'],
      [IconShield, 'Matched batches', 'Pieces for one project are finished together so the patina and tone actually match.'],
      [IconShip, 'Project logistics', 'Consolidated shipping, staged deliveries and commercial invoicing for customs.'],
    ],
    blocks: [
      ['Trade pricing',
        'Tiered from six units on a single reference, with a further tier at twenty. Tell us the project, the pieces and the quantities and you get a written quote with shipping included - no account application, no minimum spend to open one.'],
      ['Samples',
        'Finish samples - a hammered disc in each finish - are available before you specify. They cost the shipping only, and the cost is credited against the first project order.'],
      ['Lead times',
        'Two to three weeks for a single piece. Project quantities are quoted with a real production date, not an estimate, and we will tell you when a date is not achievable rather than agree to it and slip.'],
      ['Electrical',
        'All lighting is E27, 110-240 V, with an adjustable black cable and a matte black canopy. UL or CE-marked drivers and country-specific fittings can be specified - say which market on the enquiry.'],
    ],
  },
  fr: {
    lead: 'Les architectes d’intérieur, riads, hôtels et restaurants ne commandent pas comme un particulier : séries répétées d’une même pièce, finitions accordées sur tout un étage, dimensions absentes du guide des tailles, et une date de livraison qui doit tenir. C’est le travail courant ici.',
    perks: [
      [IconHammer, 'Sur mesure', 'Tout diamètre, toute hauteur, toute emprise d’évier. Envoyez un plan ou une cote de meuble.'],
      [IconShield, 'Lots accordés', 'Les pièces d’un même projet sont finies ensemble pour que patine et teinte correspondent vraiment.'],
      [IconShip, 'Logistique projet', 'Expédition groupée, livraisons échelonnées et facture commerciale pour la douane.'],
    ],
    blocks: [
      ['Tarifs professionnels',
        'Dégressifs à partir de six unités sur une même référence, puis à vingt. Indiquez le projet, les pièces et les quantités : vous recevez un devis écrit, transport inclus - sans dossier d’ouverture de compte ni minimum d’achat.'],
      ['Échantillons',
        'Des échantillons de finition - un disque martelé par finition - sont disponibles avant prescription. Seuls les frais de port sont dus, et ils sont déduits de la première commande projet.'],
      ['Délais',
        'Deux à trois semaines pour une pièce seule. Les quantités projet sont chiffrées avec une vraie date de production, pas une estimation. Si une date n’est pas tenable, nous le disons plutôt que de l’accepter et de glisser.'],
      ['Électricité',
        'Tout l’éclairage est en E27, 110-240 V, câble noir ajustable et rosace noir mat. Drivers UL ou CE et douilles spécifiques par pays sur demande - précisez le marché dans la demande.'],
    ],
  },
};

export default async function TradePage({ params }) {
  const { lang } = await params;
  const d = dict(lang);
  const c = COPY[lang] ?? COPY.en;
  const fr = lang === 'fr';

  return (
    <PageShell
      eyebrow={fr ? 'Professionnels' : 'Trade'}
      title={fr ? 'Projets, hôtellerie et sur mesure' : 'Projects, hospitality & bespoke'}
      lead={c.lead}
      image="/products/lotus-cluster-pendant/04.webp"
    >
      <div className="mb-16 grid gap-4 md:grid-cols-3">
        {c.perks.map(([Icon, h, p], i) => (
          <Reveal key={h} delay={i * 80}>
            <div className="bezel h-full">
              <div className="bezel-core h-full p-7">
                <span className="mb-5 grid h-11 w-11 place-items-center rounded-full"
                  style={{ background: 'rgba(224,169,109,0.1)', color: 'var(--brass)', border: '1px solid rgba(224,169,109,0.25)' }}>
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="font-display text-[22px] leading-tight">{h}</h3>
                <p className="mt-2.5 text-[14px] leading-relaxed opacity-62">{p}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Prose>
        {c.blocks.map(([h, p]) => (
          <section key={h}>
            <H2>{h}</H2>
            <p className="mt-4">{p}</p>
          </section>
        ))}
      </Prose>

      <Reveal className="bezel mt-16">
        <div className="bezel-core flex flex-col items-start gap-6 p-8 md:flex-row md:items-center md:justify-between md:p-10">
          <div>
            <h2 className="font-display text-[clamp(26px,3.4vw,38px)] leading-tight">
              {fr ? 'Envoyez le projet' : 'Send us the project'}
            </h2>
            <p className="mt-2 max-w-md text-[15px] opacity-62">
              {fr
                ? 'Plans, moodboard ou simple liste de pièces - un devis écrit suit.'
                : 'Drawings, a moodboard or just a list of pieces - a written quote follows.'}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={waLink(fr ? 'Bonjour - demande professionnelle :' : 'Hello - trade enquiry:')}
              target="_blank" rel="noopener noreferrer" className="btn btn-primary group/btn">
              WhatsApp
              <span className="btn-disc"><Whatsapp className="h-4 w-4" /></span>
            </a>
            <a href={`/${lang}/contact`} className="btn btn-ghost group/btn">
              {d.contact}
              <span className="btn-disc"><ArrowUpRight className="h-4 w-4" /></span>
            </a>
          </div>
        </div>
      </Reveal>
    </PageShell>
  );
}
