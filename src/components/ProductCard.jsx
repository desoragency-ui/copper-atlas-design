'use client';

import Link from 'next/link';
import { useState } from 'react';
import { dict, t } from '@/lib/i18n';
import { money } from '@/lib/shop';
import { fromPrice } from '@/data/products';
import { ratingFor } from '@/data/reviews';
import { ArrowUpRight, Star } from './Icons';

export default function ProductCard({ product: p, lang, priority = false }) {
  const d = dict(lang);
  const [hover, setHover] = useState(false);

  const imgs = p.finishes[0].images;
  const price = fromPrice(p);
  const rating = ratingFor(p.slug);

  return (
    <Link
      href={`/${lang}/products/${p.slug}`}
      className="group/card block"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="bezel transition-all duration-700 ease-atlas group-hover/card:border-[rgba(224,169,109,0.4)]">
        <div className="bezel-core aspect-[4/5]" style={{ background: 'var(--ink)' }}>
          {/* base image */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imgs[0]}
            alt={t(p.name, lang)}
            loading={priority ? 'eager' : 'lazy'}
            fetchPriority={priority ? 'high' : 'auto'}
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1100ms] ease-atlas group-hover/card:scale-[1.06]"
          />
          {/* hover image */}
          {imgs[1] && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imgs[1]}
              alt=""
              loading="lazy"
              decoding="async"
              aria-hidden
              className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-atlas"
              style={{ opacity: hover ? 1 : 0 }}
            />
          )}

          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5"
            style={{ background: 'linear-gradient(to top, rgba(var(--ink-rgb),0.86), transparent)' }}
          />

          {p.badge && (
            <span
              className="absolute left-4 top-4 rounded-full px-3 py-1.5 text-[9.5px] uppercase tracking-eyebrow backdrop-blur-md"
              style={{ background: 'rgba(var(--ink-rgb),0.62)', color: 'var(--brass)', border: '1px solid rgba(224,169,109,0.3)' }}
            >
              {t(p.badge, lang)}
            </span>
          )}

          {/* quick view disc */}
          <span
            className="absolute bottom-4 right-4 grid h-11 w-11 place-items-center rounded-full transition-all duration-600 ease-atlas"
            style={{
              background: 'var(--brass)',
              color: 'var(--ink)',
              opacity: hover ? 1 : 0,
              transform: hover ? 'translateY(0) scale(1)' : 'translateY(10px) scale(0.85)',
            }}
            aria-hidden
          >
            <ArrowUpRight className="h-4.5 w-4.5" />
          </span>
        </div>
      </div>

      <div className="px-1 pt-4">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-display text-[21px] leading-tight">{t(p.name, lang)}</h3>
          <span className="tabular shrink-0 pt-1 text-[13.5px]" style={{ color: 'var(--brass)' }}>
            {price == null ? d.priceOnRequest : `${d.from} ${money(price)}`}
          </span>
        </div>

        <p className="mt-1.5 text-[13.5px] leading-snug opacity-55">{t(p.tagline, lang)}</p>

        <div className="mt-3 flex items-center gap-3">
          {/* finish swatches */}
          <span className="flex items-center gap-1.5" aria-hidden>
            {p.finishes.map((f) => (
              <span
                key={f.id}
                className="h-3 w-3 rounded-full ring-1 ring-white/25"
                style={{ background: `linear-gradient(135deg, ${f.swatch2}, ${f.swatch})` }}
                title={t(f.name, lang)}
              />
            ))}
          </span>
          <span className="text-[11px] uppercase tracking-wide2 opacity-40">
            {p.finishes.length} {lang === 'fr' ? 'finitions' : 'finishes'}
          </span>

          {rating && (
            <span className="ml-auto flex items-center gap-1 text-[11.5px] opacity-65">
              <Star className="h-3 w-3" style={{ color: 'var(--brass)' }} />
              <span className="tabular">{rating.average}</span>
              <span className="opacity-60">({rating.count})</span>
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
