import Reveal from '../Reveal';
import { dict } from '@/lib/i18n';

export default function Craft({ lang }) {
  const d = dict(lang);

  return (
    <section className="relative overflow-hidden py-24 md:py-36" style={{ background: 'var(--ink)' }}>
      <div className="pointer-events-none absolute -left-40 top-0 h-[520px] w-[520px] glow-warm opacity-50" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-[520px] w-[520px] glow-verdigris opacity-50" />

      <div className="relative mx-auto max-w-[1320px] px-6 md:px-10">
        <div className="grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
          {/* left: the pitch */}
          <Reveal className="lg:sticky lg:top-32 lg:self-start">
            <p className="eyebrow mb-7">{lang === 'fr' ? 'Le métier' : 'The craft'}</p>
            <h2 className="font-display text-[clamp(34px,5.4vw,66px)] leading-[1.0] text-balance">
              {d.craftTitle}
            </h2>
            <p className="mt-6 max-w-md text-[16px] leading-relaxed text-pretty opacity-65">
              {d.craftLead}
            </p>

            <div className="bezel mt-10 max-w-sm">
              <div className="bezel-core p-1">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/products/lotus-cluster-pendant/12.webp"
                  alt={lang === 'fr' ? 'Détail du martelage' : 'Close-up of the hammered surface'}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/3] w-full rounded-[calc(2rem-0.5rem)] object-cover"
                />
              </div>
            </div>
          </Reveal>

          {/* right: the four steps */}
          <ol className="flex flex-col">
            {d.craftSteps.map((s, i) => (
              <Reveal
                as="li"
                key={s.n}
                delay={i * 90}
                className="group/step border-t py-9 transition-colors duration-500 edge last:border-b"
              >
                <div className="flex items-start gap-6 md:gap-10">
                  <span
                    className="tabular shrink-0 font-display text-[clamp(34px,4vw,54px)] leading-none transition-colors duration-500"
                    style={{ color: 'rgba(224,169,109,0.35)' }}
                  >
                    {s.n}
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-display text-[clamp(22px,2.6vw,30px)] leading-tight">{s.t}</h3>
                    <p className="mt-2.5 max-w-lg text-[15px] leading-relaxed text-pretty opacity-60">{s.d}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
