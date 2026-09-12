import PageShell from '@/components/PageShell';
import Reveal from '@/components/Reveal';
import { Whatsapp, ArrowUpRight, IconChat } from '@/components/Icons';
import { LANGS, dict } from '@/lib/i18n';
import { SHOP, waLink } from '@/lib/shop';

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return {
    title: dict(lang).contact,
    description:
      lang === 'fr'
        ? 'Écrivez directement à l’atelier Copper Atlas Design à Marrakech — WhatsApp, e-mail ou formulaire.'
        : 'Message the Copper Atlas Design workshop in Marrakech directly — WhatsApp, email or the form.',
  };
}

export default async function ContactPage({ params }) {
  const { lang } = await params;
  const d = dict(lang);
  const fr = lang === 'fr';

  return (
    <PageShell
      eyebrow={SHOP.city}
      title={fr ? 'Parler à l’atelier' : 'Talk to the workshop'}
      lead={
        fr
          ? 'Questions de dimensions, finitions, délais, quantités pour l’hôtellerie ou demandes sur mesure — tout arrive directement chez Tarik. Réponse en général le jour même.'
          : 'Sizing, finishes, lead times, hospitality quantities or a fully bespoke piece — everything reaches Tarik directly. Usually answered the same day.'
      }
    >
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <Reveal className="flex flex-col gap-4">
          <a href={waLink(fr ? 'Bonjour Copper Atlas —' : 'Hello Copper Atlas —')}
            target="_blank" rel="noopener noreferrer" className="group/card block">
            <div className="bezel transition-colors duration-600 group-hover/card:border-[rgba(224,169,109,0.45)]">
              <div className="bezel-core flex items-center gap-5 p-6">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full"
                  style={{ background: 'rgba(78,154,134,0.14)', color: 'var(--verdigris)' }}>
                  <Whatsapp className="h-5 w-5" />
                </span>
                <span>
                  <span className="block font-display text-[22px] leading-tight">WhatsApp</span>
                  <span className="block text-[13px] opacity-55">
                    {fr ? 'Le plus rapide — photos et mesures bienvenues' : 'Fastest — send photos and measurements'}
                  </span>
                </span>
                <ArrowUpRight className="ml-auto h-5 w-5 shrink-0 opacity-40 transition-transform duration-500 group-hover/card:translate-x-1 group-hover/card:-translate-y-1" />
              </div>
            </div>
          </a>

          <a href={`mailto:${SHOP.email}`} className="group/card block">
            <div className="bezel transition-colors duration-600 group-hover/card:border-[rgba(224,169,109,0.45)]">
              <div className="bezel-core flex items-center gap-5 p-6">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full"
                  style={{ background: 'rgba(224,169,109,0.12)', color: 'var(--brass)' }}>
                  <IconChat className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span className="block font-display text-[22px] leading-tight">Email</span>
                  <span className="block truncate text-[13px] opacity-55">{SHOP.email}</span>
                </span>
                <ArrowUpRight className="ml-auto h-5 w-5 shrink-0 opacity-40 transition-transform duration-500 group-hover/card:translate-x-1 group-hover/card:-translate-y-1" />
              </div>
            </div>
          </a>

          <div className="bezel">
            <div className="bezel-core p-6">
              <p className="label mb-3">{fr ? 'Atelier' : 'Workshop'}</p>
              <p className="text-[15px] leading-relaxed opacity-72">
                {SHOP.city}, {SHOP.country}
                <br />
                {fr ? 'Visites sur rendez-vous' : 'Visits by appointment'}
              </p>
              <p className="mt-4 text-[13px] opacity-50">
                {fr ? 'Lun–Sam · 9h–18h (GMT+1)' : 'Mon–Sat · 9am–6pm (GMT+1)'}
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <form className="bezel" action={`mailto:${SHOP.email}`} method="post" encType="text/plain">
            <div className="bezel-core grid gap-5 p-7 sm:grid-cols-2">
              <label>
                <span className="label">{d.name} <span style={{ color: 'var(--brass)' }}>*</span></span>
                <input name="name" required autoComplete="name" className="field" />
              </label>
              <label>
                <span className="label">{d.email} <span style={{ color: 'var(--brass)' }}>*</span></span>
                <input name="email" type="email" required autoComplete="email" className="field" />
              </label>
              <label className="sm:col-span-2">
                <span className="label">{fr ? 'Sujet' : 'Subject'}</span>
                <input name="subject" className="field" />
              </label>
              <label className="sm:col-span-2">
                <span className="label">{fr ? 'Votre message' : 'Your message'} <span style={{ color: 'var(--brass)' }}>*</span></span>
                <textarea name="message" rows={7} required className="field resize-y"
                  placeholder={fr
                    ? 'Dites-nous la pièce, la taille et la hauteur sous plafond…'
                    : 'Tell us the piece, the size and your ceiling height…'} />
              </label>
              <div className="sm:col-span-2">
                <button type="submit" className="btn btn-primary group/btn w-full justify-between sm:w-auto">
                  {fr ? 'Envoyer' : 'Send message'}
                  <span className="btn-disc"><ArrowUpRight className="h-4 w-4" /></span>
                </button>
              </div>
            </div>
          </form>
        </Reveal>
      </div>
    </PageShell>
  );
}
