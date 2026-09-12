'use client';

import Link from 'next/link';
import { useCallback, useRef, useState } from 'react';
import Reveal from '../Reveal';
import { ArrowUpRight } from '../Icons';
import { dict } from '@/lib/i18n';

const GOLD = '/products/atlas-verdigris-dome-pendant/01.webp';
const OIL = '/products/atlas-verdigris-dome-pendant/07.webp';

/**
 * Drag-to-compare the two finishes. Pointer events + keyboard arrows,
 * and it only ever animates clip-path/transform.
 */
export default function FinishCompare({ lang }) {
  const d = dict(lang);
  const box = useRef(null);
  const [pct, setPct] = useState(52);
  const [dragging, setDragging] = useState(false);

  const setFromClientX = useCallback((clientX) => {
    const el = box.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPct(Math.max(3, Math.min(97, ((clientX - r.left) / r.width) * 100)));
  }, []);

  const onDown = (e) => {
    setDragging(true);
    e.currentTarget.setPointerCapture?.(e.pointerId);
    setFromClientX(e.clientX);
  };
  const onMove = (e) => dragging && setFromClientX(e.clientX);
  const onUp = () => setDragging(false);

  const onKey = (e) => {
    if (e.key === 'ArrowLeft') setPct((p) => Math.max(3, p - 4));
    if (e.key === 'ArrowRight') setPct((p) => Math.min(97, p + 4));
  };

  return (
    <section className="mx-auto max-w-[1320px] px-6 py-24 md:px-10 md:py-32">
      <Reveal className="mb-12 max-w-2xl">
        <h2 className="font-display text-[clamp(34px,5.2vw,62px)] leading-[1.02] text-balance">
          {d.finishTitle}
        </h2>
        <p className="mt-4 text-[15.5px] text-pretty opacity-60">{d.finishLead}</p>
      </Reveal>

      <Reveal className="bezel">
        <div
          ref={box}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
          className="bezel-core aspect-[16/11] cursor-ew-resize touch-none select-none md:aspect-[16/8]"
          style={{ background: 'var(--ink)' }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={OIL}
            alt={lang === 'fr' ? 'Finition Cuivre Patiné' : 'Oil-Rubbed Copper finish'}
            loading="lazy"
            decoding="async"
            draggable={false}
            className="absolute inset-0 h-full w-full object-cover"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={GOLD}
            alt={lang === 'fr' ? 'Finition Cuivre Doré' : 'Gold Copper finish'}
            loading="lazy"
            decoding="async"
            draggable={false}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ clipPath: `inset(0 ${100 - pct}% 0 0)` }}
          />

          {/* handle */}
          <div
            className="absolute inset-y-0 w-px"
            style={{ left: `${pct}%`, background: 'rgba(242,234,223,0.85)' }}
            aria-hidden
          />
          <button
            type="button"
            onKeyDown={onKey}
            aria-label={lang === 'fr' ? 'Comparer les finitions' : 'Compare finishes'}
            aria-valuenow={Math.round(pct)}
            aria-valuemin={0}
            aria-valuemax={100}
            role="slider"
            className="absolute top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full backdrop-blur-md transition-transform duration-300 active:scale-95"
            style={{
              left: `${pct}%`,
              background: 'rgba(8,26,22,0.55)',
              border: '1px solid rgba(242,234,223,0.4)',
            }}
          >
            <span className="flex items-center gap-1 text-[--bone]">
              <span className="block h-3 w-[1.5px] rounded bg-current opacity-70" />
              <span className="block h-5 w-[1.5px] rounded bg-current" />
              <span className="block h-3 w-[1.5px] rounded bg-current opacity-70" />
            </span>
          </button>

          {/* labels */}
          <span className="pointer-events-none absolute bottom-5 left-5 rounded-full px-3.5 py-1.5 text-[10px] uppercase tracking-eyebrow backdrop-blur-md"
            style={{ background: 'rgba(8,26,22,0.6)', color: '#F0D9A8', border: '1px solid rgba(242,234,223,0.18)' }}>
            {lang === 'fr' ? 'Cuivre Doré' : 'Gold Copper'}
          </span>
          <span className="pointer-events-none absolute bottom-5 right-5 rounded-full px-3.5 py-1.5 text-[10px] uppercase tracking-eyebrow backdrop-blur-md"
            style={{ background: 'rgba(8,26,22,0.6)', color: '#C9956F', border: '1px solid rgba(242,234,223,0.18)' }}>
            {lang === 'fr' ? 'Cuivre Patiné' : 'Oil-Rubbed Copper'}
          </span>
        </div>
      </Reveal>

      <Reveal delay={120} className="mt-8 flex flex-wrap items-center gap-3">
        <Link href={`/${lang}/products/atlas-verdigris-dome-pendant`} className="btn btn-primary group/btn">
          {lang === 'fr' ? 'Voir cette pièce' : 'See this piece'}
          <span className="btn-disc"><ArrowUpRight className="h-4 w-4" /></span>
        </Link>
        <p className="text-[13px] opacity-50">
          {lang === 'fr'
            ? 'Même prix, quelle que soit la finition.'
            : 'Same price, whichever finish you choose.'}
        </p>
      </Reveal>
    </section>
  );
}
