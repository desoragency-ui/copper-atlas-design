'use client';

import { useEffect, useState } from 'react';
import { Close, ArrowLeft, ArrowRight } from '../Icons';

export default function Gallery({ images, alt, lang }) {
  const [i, setI] = useState(0);
  const [zoom, setZoom] = useState(false);

  // Reset to the first shot whenever the finish (and so the image set) changes.
  useEffect(() => setI(0), [images]);

  useEffect(() => {
    if (!zoom) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setZoom(false);
      if (e.key === 'ArrowRight') setI((n) => (n + 1) % images.length);
      if (e.key === 'ArrowLeft') setI((n) => (n - 1 + images.length) % images.length);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [zoom, images.length]);

  const go = (dir) => setI((n) => (n + dir + images.length) % images.length);

  return (
    <>
      <div className="flex flex-col gap-4 lg:flex-row-reverse lg:gap-5">
        {/* main */}
        <div className="bezel flex-1">
          <button
            type="button"
            onClick={() => setZoom(true)}
            className="bezel-core block aspect-[4/5] w-full cursor-zoom-in"
            style={{ background: 'var(--ink)' }}
            aria-label={lang === 'fr' ? 'Agrandir l’image' : 'Open image'}
          >
            {images.map((src, n) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={src}
                src={src}
                alt={n === 0 ? alt : ''}
                aria-hidden={n !== i}
                loading={n === 0 ? 'eager' : 'lazy'}
                fetchPriority={n === 0 ? 'high' : 'auto'}
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover transition-opacity duration-600 ease-atlas"
                style={{ opacity: n === i ? 1 : 0 }}
              />
            ))}

            <span
              className="tabular pointer-events-none absolute bottom-4 right-4 rounded-full px-3 py-1.5 text-[11px] backdrop-blur-md"
              style={{ background: 'rgba(8,26,22,0.6)', border: '1px solid var(--edge)' }}
            >
              {i + 1} / {images.length}
            </span>
          </button>
        </div>

        {/* thumbs — row on mobile, column on desktop */}
        <div className="no-scrollbar flex gap-3 overflow-x-auto lg:w-[92px] lg:flex-col lg:overflow-y-auto">
          {images.map((src, n) => (
            <button
              key={src}
              onClick={() => setI(n)}
              aria-label={`${alt} — ${n + 1}`}
              aria-current={n === i}
              className="relative aspect-[4/5] w-[70px] shrink-0 overflow-hidden rounded-xl transition-all duration-500 ease-atlas lg:w-full"
              style={{
                border: `1px solid ${n === i ? 'var(--brass)' : 'var(--edge)'}`,
                opacity: n === i ? 1 : 0.55,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* lightbox */}
      {zoom && (
        <div
          className="fixed inset-0 z-[70] grid place-items-center p-4"
          style={{ background: 'rgba(8,26,22,0.95)', backdropFilter: 'blur(14px)' }}
          role="dialog"
          aria-modal="true"
        >
          <button
            onClick={() => setZoom(false)}
            className="absolute right-5 top-5 grid h-12 w-12 place-items-center rounded-full border transition hover:bg-white/10 edge"
            aria-label="Close"
          >
            <Close className="h-5 w-5" />
          </button>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={images[i]}
            alt={alt}
            className="max-h-[86vh] max-w-full rounded-2xl object-contain"
          />

          {images.length > 1 && (
            <>
              <button
                onClick={() => go(-1)}
                className="absolute left-4 grid h-12 w-12 place-items-center rounded-full border transition hover:bg-white/10 edge md:left-8"
                aria-label="Previous"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => go(1)}
                className="absolute right-4 grid h-12 w-12 place-items-center rounded-full border transition hover:bg-white/10 edge md:right-8"
                aria-label="Next"
              >
                <ArrowRight className="h-5 w-5" />
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
}
