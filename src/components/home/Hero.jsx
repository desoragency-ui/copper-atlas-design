'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { dict } from '@/lib/i18n';
import { ArrowUpRight, ArrowRight } from '../Icons';

const SLIDES = [
  { src: '/products/lotus-cluster-pendant/01.webp', pos: '50% 42%' },
  { src: '/products/atlas-verdigris-dome-pendant/01.webp', pos: '50% 48%' },
  { src: '/products/cascade-wall-sconce/01.webp', pos: '50% 45%' },
  { src: '/products/zahra-fluted-basin/01.webp', pos: '50% 55%' },
];

export default function Hero({ lang }) {
  const d = dict(lang);
  const [i, setI] = useState(0);
  const [y, setY] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    const id = setInterval(() => setI((n) => (n + 1) % SLIDES.length), 6200);
    return () => clearInterval(id);
  }, []);

  // Light parallax on the hero only, rAF-throttled, transform-only.
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        setY(Math.min(window.scrollY, 700));
        frame = 0;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const [l1, l2] = d.heroTitle.split('\n');

  return (
    <section className="relative min-h-[92vh] overflow-hidden md:min-h-[100dvh]">
      {/* slideshow */}
      <div className="absolute inset-0" style={{ transform: `translate3d(0,${y * 0.28}px,0)` }}>
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
            className="absolute inset-0 h-[118%] w-full object-cover"
            style={{
              objectPosition: s.pos,
              opacity: n === i ? 1 : 0,
              transform: n === i ? 'scale(1.04)' : 'scale(1.11)',
              transition: 'opacity 1600ms cubic-bezier(0.32,0.72,0,1), transform 7000ms linear',
            }}
          />
        ))}
      </div>

      {/* scrims */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to right, rgba(8,26,22,0.92) 0%, rgba(8,26,22,0.62) 42%, rgba(8,26,22,0.18) 72%, rgba(8,26,22,0.5) 100%)',
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-52"
        style={{ background: 'linear-gradient(to top, var(--forest), transparent)' }}
      />

      {/* content */}
      <div className="relative mx-auto flex min-h-[92vh] max-w-[1320px] flex-col justify-center px-6 pb-28 pt-24 md:min-h-[100dvh] md:px-10">
        <div className="max-w-[760px]">
          <p className="eyebrow mb-8 animate-[glow_5s_ease-in-out_infinite]">{d.heroEyebrow}</p>

          <h1 className="font-display text-[clamp(50px,10.5vw,128px)] leading-[0.92] text-balance">
            <Line delay={120}>{l1}</Line>
            <Line delay={260}>
              <em className="not-italic" style={{ color: 'var(--brass)' }}>{l2}</em>
            </Line>
          </h1>

          <p
            className="mt-8 max-w-[540px] text-[16.5px] leading-relaxed text-pretty opacity-75"
            style={{ animation: 'none' }}
          >
            {d.heroLead}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link href={`/${lang}/collections`} className="btn btn-primary group/btn">
              {d.heroCta}
              <span className="btn-disc"><ArrowUpRight className="h-4 w-4" /></span>
            </Link>
            <Link href={`/${lang}/workshop`} className="btn btn-ghost group/btn">
              {d.heroCta2}
              <span className="btn-disc"><ArrowRight className="h-4 w-4" /></span>
            </Link>
          </div>
        </div>

        {/* slide dots */}
        <div className="absolute bottom-10 right-6 flex items-center gap-2 md:right-10">
          {SLIDES.map((s, n) => (
            <button
              key={s.src}
              onClick={() => setI(n)}
              aria-label={`Slide ${n + 1}`}
              aria-current={n === i}
              className="h-[3px] rounded-full transition-all duration-700 ease-atlas"
              style={{
                width: n === i ? 34 : 14,
                background: n === i ? 'var(--brass)' : 'rgba(242,234,223,0.3)',
              }}
            />
          ))}
        </div>

        {/* scroll cue */}
        <div className="absolute bottom-10 left-6 hidden items-center gap-3 md:left-10 md:flex">
          <span className="text-[10px] uppercase tracking-eyebrow opacity-45">{d.scroll}</span>
          <span className="relative block h-9 w-px overflow-hidden" style={{ background: 'var(--edge-strong)' }}>
            <span
              className="absolute left-0 top-0 block h-3 w-px"
              style={{ background: 'var(--brass)', animation: 'shimmer 2.6s cubic-bezier(0.32,0.72,0,1) infinite', writingMode: 'vertical-lr' }}
            />
          </span>
        </div>
      </div>
    </section>
  );
}

function Line({ children, delay }) {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const id = setTimeout(() => setOn(true), delay);
    return () => clearTimeout(id);
  }, [delay]);
  return (
    <span className="block overflow-hidden">
      <span
        className="block"
        style={{
          transform: on ? 'none' : 'translateY(105%)',
          opacity: on ? 1 : 0,
          transition: 'transform 1100ms cubic-bezier(0.32,0.72,0,1), opacity 900ms ease',
        }}
      >
        {children}
      </span>
    </span>
  );
}
