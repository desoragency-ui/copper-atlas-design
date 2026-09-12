'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { dict } from '@/lib/i18n';
import { ArrowUpRight, ArrowRight } from '../Icons';

const SLIDES = [
  { src: '/products/lotus-cluster-pendant/01.webp', pos: '52% 40%' },
  { src: '/products/atlas-verdigris-dome-pendant/01.webp', pos: '50% 46%' },
  { src: '/products/cascade-wall-sconce/03.webp', pos: '55% 44%' },
  { src: '/products/zahra-fluted-basin/01.webp', pos: '50% 52%' },
];

export default function Hero({ lang }) {
  const d = dict(lang);
  const [i, setI] = useState(0);
  const [on, setOn] = useState(false);

  // Kick the entry sequence after mount so the mask reveal is always seen.
  useEffect(() => {
    const id = requestAnimationFrame(() => setOn(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(() => setI((n) => (n + 1) % SLIDES.length), 6400);
    return () => clearInterval(id);
  }, []);

  const [l1, l2] = d.heroTitle.split('\n');

  return (
    <section
      className="relative isolate overflow-hidden"
      style={{
        // Chrome height is the announcement strip plus the nav and its offset.
        minHeight: 'min(calc(100svh - 128px), 760px)',
      }}
    >
      {/* slideshow: slow Ken Burns drift, cross-faded */}
      <div className="absolute inset-0 -z-10">
        {SLIDES.map((s, n) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={s.src}
            src={s.src}
            alt=""
            aria-hidden={n !== i}
            loading={n === 0 ? 'eager' : 'lazy'}
            fetchPriority={n === 0 ? 'high' : 'low'}
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
            style={{
              objectPosition: s.pos,
              opacity: n === i ? 1 : 0,
              transform: n === i ? 'scale(1.06)' : 'scale(1.13)',
              transition: 'opacity 1700ms cubic-bezier(0.32,0.72,0,1), transform 9000ms linear',
            }}
          />
        ))}
      </div>

      {/* scrims: a directional wash plus a copper bloom behind the type */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            'linear-gradient(100deg, rgba(8,26,22,0.95) 0%, rgba(14,43,36,0.72) 40%, rgba(20,72,59,0.24) 70%, rgba(8,26,22,0.55) 100%)',
        }}
      />
      <div
        className="pointer-events-none absolute -left-40 top-1/4 -z-10 h-[560px] w-[560px] glow-warm opacity-70"
        aria-hidden
      />
      <div
        className="absolute inset-x-0 bottom-0 -z-10 h-40"
        style={{ background: 'linear-gradient(to top, var(--bg), transparent)' }}
      />

      <div
        className="mx-auto flex max-w-[1320px] flex-col justify-center px-6 pb-16 pt-16 md:px-10 md:pb-20"
        style={{ minHeight: 'min(calc(100svh - 128px), 760px)' }}
      >
        <div className="max-w-[720px]">
          <Tag on={on}>{d.heroEyebrow}</Tag>

          <h1 className="mt-7 font-display text-[clamp(44px,7.4vw,94px)] leading-[0.96] text-balance">
            <span className={`mask-line ${on ? 'is-in' : ''}`} style={{ transitionDelay: '120ms' }}>
              <span style={{ transitionDelay: '120ms' }}>{l1}</span>
            </span>
            <span className={`mask-line ${on ? 'is-in' : ''}`}>
              <span className="foil" style={{ transitionDelay: '260ms' }}>{l2}</span>
            </span>
          </h1>

          <p
            className="mt-6 max-w-[500px] text-[16px] leading-relaxed text-pretty"
            style={{
              color: 'rgba(242,234,223,0.78)',
              opacity: on ? 1 : 0,
              transform: on ? 'none' : 'translateY(14px)',
              transition: 'opacity 900ms ease 520ms, transform 900ms cubic-bezier(0.32,0.72,0,1) 520ms',
            }}
          >
            {d.heroLead}
          </p>

          <div
            className="mt-9 flex flex-wrap items-center gap-3"
            style={{
              opacity: on ? 1 : 0,
              transform: on ? 'none' : 'translateY(14px)',
              transition: 'opacity 900ms ease 660ms, transform 900ms cubic-bezier(0.32,0.72,0,1) 660ms',
            }}
          >
            <Link href={`/${lang}/collections`} className="btn btn-primary">
              {d.heroCta}
              <span className="btn-disc"><ArrowUpRight className="h-4 w-4" /></span>
            </Link>
            <Link href={`/${lang}/workshop`} className="btn btn-ghost">
              {d.heroCta2}
              <span className="btn-disc"><ArrowRight className="h-4 w-4" /></span>
            </Link>
          </div>
        </div>

        {/* slide index: thin copper bars, doubling as controls */}
        <div
          className="absolute bottom-8 right-6 flex items-center gap-2 md:right-10"
          style={{ opacity: on ? 1 : 0, transition: 'opacity 900ms ease 900ms' }}
        >
          {SLIDES.map((s, n) => (
            <button
              key={s.src}
              onClick={() => setI(n)}
              aria-label={`View ${n + 1}`}
              aria-current={n === i}
              className="group/bar grid h-8 place-items-center"
            >
              <span
                className="block h-[2px] rounded-full transition-all duration-700 ease-atlas group-hover/bar:bg-[--brass]"
                style={{
                  width: n === i ? 38 : 16,
                  background: n === i ? 'var(--brass)' : 'rgba(242,234,223,0.32)',
                }}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function Tag({ children, on }) {
  return (
    <span
      className="eyebrow"
      style={{
        opacity: on ? 1 : 0,
        transform: on ? 'none' : 'translateY(10px)',
        transition: 'opacity 800ms ease 60ms, transform 800ms cubic-bezier(0.32,0.72,0,1) 60ms',
      }}
    >
      {children}
    </span>
  );
}
