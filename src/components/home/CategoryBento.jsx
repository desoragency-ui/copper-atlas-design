import Link from 'next/link';
import Reveal from '../Reveal';
import { ArrowUpRight } from '../Icons';
import { CATEGORIES, byCategory } from '@/data/products';
import { dict, t } from '@/lib/i18n';

/* Asymmetric bento - collapses to a single column below md. */
const SPAN = [
  'md:col-span-7 md:row-span-2',
  'md:col-span-5',
  'md:col-span-5',
  'md:col-span-4',
  'md:col-span-4',
  'md:col-span-4',
];

export default function CategoryBento({ lang }) {
  const d = dict(lang);

  return (
    <section className="band-patina band-edge">
      <div className="mx-auto max-w-[1320px] px-6 py-24 md:px-10 md:py-32">
      <Reveal className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="max-w-xl font-display text-[clamp(34px,5.2vw,62px)] leading-[1.02] text-balance">
            {d.shopByRoom}
          </h2>
          <p className="mt-4 max-w-md text-[15.5px] opacity-60">{d.categoriesLead}</p>
        </div>
        <Link href={`/${lang}/collections`} className="btn btn-ghost group/btn shrink-0">
          {d.viewAll}
          <span className="btn-disc"><ArrowUpRight className="h-4 w-4" /></span>
        </Link>
      </Reveal>

      <div className="grid grid-cols-1 gap-4 md:auto-rows-[236px] md:grid-cols-12">
        {CATEGORIES.map((c, i) => {
          const n = byCategory(c.slug).length;
          const tall = i === 0;
          return (
            <Reveal key={c.slug} delay={i * 70} className={`col-span-1 ${SPAN[i]}`}>
              <Link href={`/${lang}/collections/${c.slug}`} className="group/tile block h-full">
                <div className="bezel h-full transition-all duration-700 ease-atlas group-hover/tile:border-[rgba(224,169,109,0.42)]">
                  <div
                    className={`bezel-core h-full ${tall ? 'aspect-[4/5] md:aspect-auto' : 'aspect-[16/10] md:aspect-auto'}`}
                    style={{ background: 'var(--ink)' }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={c.cover}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-atlas group-hover/tile:scale-[1.07]"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          'linear-gradient(to top, rgba(8,26,22,0.93) 4%, rgba(8,26,22,0.35) 46%, rgba(8,26,22,0.08) 100%)',
                      }}
                    />

                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 md:p-7">
                      <div>
                        <span className="text-[10px] uppercase tracking-eyebrow opacity-55">
                          {n} {d.results}
                        </span>
                        <h3
                          className={`mt-2 font-display leading-[1.04] ${tall ? 'text-[clamp(30px,4.4vw,48px)]' : 'text-[26px]'}`}
                        >
                          {t(c.name, lang)}
                        </h3>
                        {tall && (
                          <p className="mt-3 max-w-sm text-[14.5px] leading-snug opacity-65">
                            {t(c.blurb, lang)}
                          </p>
                        )}
                      </div>

                      <span
                        className="grid h-11 w-11 shrink-0 place-items-center rounded-full transition-all duration-600 ease-atlas group-hover/tile:translate-x-1 group-hover/tile:-translate-y-1"
                        style={{ background: 'rgba(242,234,223,0.1)', border: '1px solid var(--edge-strong)' }}
                        aria-hidden
                      >
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </Reveal>
          );
        })}
        </div>
      </div>
    </section>
  );
}
