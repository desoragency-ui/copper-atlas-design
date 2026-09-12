'use client';

import Link from 'next/link';
import { useRef, useState, useEffect } from 'react';
import ProductCard from '../ProductCard';
import { ArrowLeft, ArrowRight, ArrowUpRight } from '../Icons';

/** Horizontal snap rail with real overflow scrolling — keyboard and touch safe. */
export default function ProductRail({ lang, products, eyebrow, title, lead, href, cta }) {
  const ref = useRef(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  const measure = () => {
    const el = ref.current;
    if (!el) return;
    setEdge({
      start: el.scrollLeft < 12,
      end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 12,
    });
  };

  useEffect(() => {
    measure();
    const el = ref.current;
    if (!el) return;
    el.addEventListener('scroll', measure, { passive: true });
    window.addEventListener('resize', measure);
    return () => {
      el.removeEventListener('scroll', measure);
      window.removeEventListener('resize', measure);
    };
  }, []);

  const nudge = (dir) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.82, 760), behavior: 'smooth' });
  };

  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto mb-12 flex max-w-[1320px] flex-col gap-6 px-6 md:flex-row md:items-end md:justify-between md:px-10">
        <div>
          {eyebrow && <p className="eyebrow mb-6">{eyebrow}</p>}
          <h2 className="max-w-2xl font-display text-[clamp(34px,5.2vw,62px)] leading-[1.02] text-balance">
            {title}
          </h2>
          {lead && <p className="mt-4 max-w-lg text-[15.5px] opacity-60">{lead}</p>}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => nudge(-1)}
            disabled={edge.start}
            aria-label="Previous"
            className="grid h-12 w-12 place-items-center rounded-full border transition-all duration-500 ease-atlas disabled:opacity-25 enabled:hover:bg-white/10 enabled:active:scale-95 edge"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => nudge(1)}
            disabled={edge.end}
            aria-label="Next"
            className="grid h-12 w-12 place-items-center rounded-full border transition-all duration-500 ease-atlas disabled:opacity-25 enabled:hover:bg-white/10 enabled:active:scale-95 edge"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
          {href && (
            <Link href={href} className="btn btn-ghost group/btn ml-2 hidden sm:inline-flex">
              {cta}
              <span className="btn-disc"><ArrowUpRight className="h-4 w-4" /></span>
            </Link>
          )}
        </div>
      </div>

      <div
        ref={ref}
        className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-6 pb-2 md:px-10"
        tabIndex={0}
        role="region"
        aria-label={title}
      >
        {products.map((p, i) => (
          <div
            key={p.slug}
            className="w-[78vw] shrink-0 snap-start sm:w-[46vw] lg:w-[30vw] xl:w-[360px]"
          >
            <ProductCard product={p} lang={lang} priority={i < 2} />
          </div>
        ))}
        <div className="w-2 shrink-0" aria-hidden />
      </div>
    </section>
  );
}
