'use client';

import { dict } from '@/lib/i18n';

/**
 * Fixed to the very top of the viewport, with the header pinned directly
 * beneath it - the two never overlap at any scroll position.
 *
 * The strip is duplicated and the track translates -50%, so the loop has no
 * visible seam. Paused on hover, and stilled entirely under reduced-motion.
 */
export default function Announce({ lang }) {
  const items = dict(lang).announce;

  const strip = (key) => (
    <div key={key} className="flex shrink-0 items-center" aria-hidden={key === 'b'}>
      {items.map((s, i) => (
        <span key={i} className="flex items-center whitespace-nowrap">
          <span className="px-8 text-[10px] uppercase tracking-eyebrow">{s}</span>
          <span
            className="h-[3px] w-[3px] rotate-45"
            style={{ background: 'var(--brass)' }}
          />
        </span>
      ))}
    </div>
  );

  return (
    <div
      className="group fixed inset-x-0 top-0 z-50 overflow-hidden"
      style={{
        height: 'var(--announce-h)',
        background: 'linear-gradient(90deg, var(--ink), #0c2620 50%, var(--ink))',
        borderBottom: '1px solid rgba(224,169,109,0.16)',
        color: 'rgba(242,234,223,0.68)',
      }}
    >
      {/* copper hairline that catches the eye without shouting */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(224,169,109,0.55), transparent)' }}
      />

      <div className="flex h-full w-max animate-marquee items-center group-hover:[animation-play-state:paused]">
        {strip('a')}
        {strip('b')}
      </div>

      {/* feathered edges so text dissolves rather than clipping */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-16"
        style={{ background: 'linear-gradient(90deg, var(--ink), transparent)' }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-16"
        style={{ background: 'linear-gradient(270deg, var(--ink), transparent)' }}
      />
    </div>
  );
}
