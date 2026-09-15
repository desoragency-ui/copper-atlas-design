'use client';

import { useMemo, useState } from 'react';
import { Star, ArrowUpRight, Check, Whatsapp } from '../Icons';
import { dict } from '@/lib/i18n';
import { reviewsFor, ratingFor, DEMO_ON } from '@/data/reviews';
import { waLink } from '@/lib/shop';

const PAGE = 6;

export default function Reviews({ slug, productName, lang }) {
  const d = dict(lang);
  const all = reviewsFor(slug);
  const agg = ratingFor(slug);

  const [sort, setSort] = useState('recent');
  const [shown, setShown] = useState(PAGE);
  const [helpful, setHelpful] = useState({});

  const list = useMemo(() => {
    const out = [...all];
    if (sort === 'high') out.sort((a, b) => b.rating - a.rating);
    if (sort === 'low') out.sort((a, b) => a.rating - b.rating);
    if (sort === 'helpful') out.sort((a, b) => (b.helpful ?? 0) - (a.helpful ?? 0));
    return out;
  }, [all, sort]);

  const askText =
    lang === 'fr'
      ? `Bonjour - j’ai acheté « ${productName} » et j’aimerais laisser un avis.`
      : `Hello - I bought the ${productName} and I'd like to leave a review.`;

  return (
    <section id="reviews" className="scroll-mt-28 border-t py-20 edge md:py-28">
      <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow mb-5">{d.reviews}</p>
          <h2 className="font-display text-[clamp(30px,4.4vw,52px)] leading-[1.03]">{d.reviewsTitle}</h2>
        </div>
        <a href={waLink(askText)} target="_blank" rel="noopener noreferrer" className="btn btn-ghost group/btn shrink-0">
          {d.writeReview}
          <span className="btn-disc"><ArrowUpRight className="h-4 w-4" /></span>
        </a>
      </div>

      {DEMO_ON && all.some((r) => r.isSample) && (
        <div
          className="mb-8 rounded-2xl px-5 py-4 text-[13px]"
          style={{ background: 'rgba(224,169,109,0.1)', border: '1px solid rgba(224,169,109,0.4)', color: 'var(--brass)' }}
          role="status"
        >
          <strong className="uppercase tracking-wide2">Demo data</strong> - sample reviews are switched on via
          <code className="mx-1 rounded bg-black/25 px-1.5 py-0.5">NEXT_PUBLIC_DEMO_REVIEWS</code>
          for layout preview only. Remove the flag before this store goes live.
        </div>
      )}

      {!agg ? (
        <EmptyState d={d} askHref={waLink(askText)} lang={lang} />
      ) : (
        <div className="grid gap-12 lg:grid-cols-[300px_1fr] lg:gap-16">
          {/* summary rail */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="bezel">
              <div className="bezel-core p-7 text-center">
                <p className="tabular font-display text-[58px] leading-none" style={{ color: 'var(--brass)' }}>
                  {agg.average}
                </p>
                <div className="mt-3 flex justify-center gap-1" style={{ color: 'var(--brass)' }} aria-hidden>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <Star key={n} filled={n <= Math.round(agg.average)} className="h-4 w-4" />
                  ))}
                </div>
                <p className="mt-3 text-[12.5px] opacity-55">
                  {d.basedOn} {agg.count} {d.reviewCount}
                </p>

                <div className="mt-7 flex flex-col gap-2" aria-label={d.ratingBreakdown}>
                  {agg.dist.map((row) => {
                    const pct = agg.count ? (row.count / agg.count) * 100 : 0;
                    return (
                      <div key={row.star} className="flex items-center gap-3">
                        <span className="tabular w-3 text-[11px] opacity-55">{row.star}</span>
                        <Star className="h-3 w-3 opacity-40" />
                        <span className="h-[5px] flex-1 overflow-hidden rounded-full bg-white/10">
                          <span
                            className="block h-full rounded-full transition-[width] duration-800 ease-atlas"
                            style={{ width: `${pct}%`, background: 'var(--brass)' }}
                          />
                        </span>
                        <span className="tabular w-5 text-right text-[11px] opacity-45">{row.count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* list */}
          <div>
            <div className="mb-6 flex items-center justify-between gap-4">
              <span className="tabular text-[12.5px] opacity-50">
                {list.length} {d.reviewCount}
              </span>
              <label className="flex items-center gap-2">
                <span className="sr-only">{d.sortReviews}</span>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="rounded-full px-4 py-2 text-[12px] uppercase tracking-wide2"
                  style={{ background: 'rgba(242,234,223,0.05)', border: '1px solid var(--edge)', color: 'inherit' }}
                >
                  {[
                    ['recent', d.mostRecent],
                    ['high', d.highestRated],
                    ['low', d.lowestRated],
                    ['helpful', d.mostHelpful],
                  ].map(([v, l]) => (
                    <option key={v} value={v} style={{ background: '#1f1a14' }}>{l}</option>
                  ))}
                </select>
              </label>
            </div>

            <ul className="flex flex-col">
              {list.slice(0, shown).map((r, i) => (
                <li key={`${r.name}-${r.date}-${i}`} className="border-t py-7 first:border-0 first:pt-0 edge">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="flex gap-0.5" style={{ color: 'var(--brass)' }} aria-label={`${r.rating}/5`}>
                      {[1, 2, 3, 4, 5].map((n) => (
                        <Star key={n} filled={n <= r.rating} className="h-3.5 w-3.5" />
                      ))}
                    </span>
                    {r.verified && (
                      <span
                        className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[9.5px] uppercase tracking-wide2"
                        style={{ background: 'rgba(78,154,134,0.14)', color: 'var(--verdigris)', border: '1px solid rgba(78,154,134,0.3)' }}
                      >
                        <Check className="h-3 w-3" />
                        {d.verified}
                      </span>
                    )}
                    {r.isSample && (
                      <span className="rounded-full px-2.5 py-1 text-[9.5px] uppercase tracking-wide2"
                        style={{ background: 'rgba(224,169,109,0.14)', color: 'var(--brass)' }}>
                        Sample
                      </span>
                    )}
                    <time className="tabular ml-auto text-[11.5px] opacity-40" dateTime={r.date}>
                      {new Date(r.date).toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-GB', {
                        year: 'numeric', month: 'short', day: 'numeric',
                      })}
                    </time>
                  </div>

                  {r.title && <h3 className="mt-3 font-display text-[21px] leading-tight">{r.title}</h3>}
                  <p className="mt-2 text-[14.5px] leading-relaxed text-pretty opacity-75">{r.body}</p>

                  {r.photos?.length > 0 && (
                    <div className="mt-4 flex gap-2">
                      {r.photos.map((src) => (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img key={src} src={src} alt="" loading="lazy"
                          className="h-20 w-20 rounded-xl border object-cover edge" />
                      ))}
                    </div>
                  )}

                  <div className="mt-4 flex flex-wrap items-center gap-4 text-[12px] opacity-55">
                    <span>
                      {r.name}
                      {r.country && r.country !== 'XX' ? ` · ${r.country}` : ''}
                    </span>
                    {(r.finish || r.size) && (
                      <span className="opacity-70">
                        {[r.finish, r.size ? `${r.size} cm` : null].filter(Boolean).join(' · ')}
                      </span>
                    )}
                    <button
                      onClick={() => setHelpful((h) => ({ ...h, [i]: !h[i] }))}
                      className="link-underline ml-auto"
                      aria-pressed={!!helpful[i]}
                    >
                      {d.helpful} ({(r.helpful ?? 0) + (helpful[i] ? 1 : 0)})
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            {shown < list.length && (
              <button onClick={() => setShown((n) => n + PAGE)} className="btn btn-ghost group/btn mt-8 w-full justify-center">
                {d.showMore}
              </button>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

function EmptyState({ d, askHref, lang }) {
  return (
    <div className="bezel">
      <div className="bezel-core flex flex-col items-center gap-5 px-8 py-16 text-center">
        <span className="flex gap-1 opacity-25" aria-hidden>
          {[1, 2, 3, 4, 5].map((n) => <Star key={n} filled={false} className="h-6 w-6" />)}
        </span>
        <p className="text-[16px] opacity-70">{d.noReviews}</p>
        <p className="max-w-md text-[14px] opacity-50">
          {lang === 'fr'
            ? 'Chaque pièce est faite à la commande. Si vous en avez reçu une, votre avis aide les prochains acheteurs.'
            : 'Every piece is made to order. If you have received one, your review helps the next buyer decide.'}
        </p>
        <a href={askHref} target="_blank" rel="noopener noreferrer" className="btn btn-primary group/btn mt-2">
          {d.beFirst}
          <span className="btn-disc"><Whatsapp className="h-4 w-4" /></span>
        </a>
      </div>
    </div>
  );
}
