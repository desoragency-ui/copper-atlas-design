import Link from 'next/link';
import Reveal from '../Reveal';
import { IconHammer, IconShip, IconReturn, IconChat, ArrowUpRight } from '../Icons';
import { dict } from '@/lib/i18n';

const ICONS = [IconHammer, IconShip, IconReturn, IconChat];

export function Trust({ lang }) {
  const d = dict(lang);
  return (
    <section className="mx-auto max-w-[1320px] px-6 py-20 md:px-10 md:py-28">
      <Reveal className="mb-12">
        <h2 className="max-w-xl font-display text-[clamp(30px,4.4vw,52px)] leading-[1.04] text-balance">
          {d.trustTitle}
        </h2>
      </Reveal>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {d.trustItems.map((it, i) => {
          const Icon = ICONS[i];
          return (
            <Reveal key={it.t} delay={i * 80}>
              <div className="bezel h-full transition-colors duration-600 hover:border-[rgba(224,169,109,0.35)]">
                <div className="bezel-core h-full p-7">
                  <span
                    className="mb-6 grid h-12 w-12 place-items-center rounded-full"
                    style={{ background: 'rgba(224,169,109,0.1)', color: 'var(--brass)', border: '1px solid rgba(224,169,109,0.25)' }}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="font-display text-[22px] leading-tight">{it.t}</h3>
                  <p className="mt-2.5 text-[14px] leading-relaxed opacity-60">{it.d}</p>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

export function Story({ lang }) {
  const d = dict(lang);
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="mx-auto max-w-[1320px] px-6 md:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal className="order-2 lg:order-1">
            <p className="eyebrow mb-7">{lang === 'fr' ? 'L’atelier' : 'The workshop'}</p>
            <h2 className="font-display text-[clamp(32px,4.8vw,58px)] leading-[1.02] text-balance">
              {d.storyTitle}
            </h2>
            <p className="mt-6 max-w-lg text-[16px] leading-relaxed text-pretty opacity-68">{d.storyLead}</p>

            <dl className="mt-10 grid max-w-md grid-cols-3 gap-6">
              {[
                { n: '20+', l: lang === 'fr' ? 'ans au marteau' : 'years at the bench' },
                { n: '100%', l: lang === 'fr' ? 'fait main' : 'made by hand' },
                { n: '1', l: lang === 'fr' ? 'artisan par pièce' : 'artisan per piece' },
              ].map((s) => (
                <div key={s.l}>
                  <dt className="tabular font-display text-[clamp(30px,3.6vw,42px)] leading-none" style={{ color: 'var(--brass)' }}>
                    {s.n}
                  </dt>
                  <dd className="mt-2 text-[12px] uppercase tracking-wide2 opacity-50">{s.l}</dd>
                </div>
              ))}
            </dl>

            <Link href={`/${lang}/workshop`} className="btn btn-ghost group/btn mt-10">
              {d.storyCta}
              <span className="btn-disc"><ArrowUpRight className="h-4 w-4" /></span>
            </Link>
          </Reveal>

          <Reveal delay={120} className="order-1 lg:order-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="bezel">
                <div className="bezel-core">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/products/cascade-wall-sconce/03.webp"
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="aspect-[3/4] w-full object-cover"
                  />
                </div>
              </div>
              <div className="bezel mt-10">
                <div className="bezel-core">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/products/medina-engraved-basin/01.webp"
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="aspect-[3/4] w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
