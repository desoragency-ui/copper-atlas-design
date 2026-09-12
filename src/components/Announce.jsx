'use client';

import { dict } from '@/lib/i18n';

/**
 * Seamless marquee: the strip is duplicated and the track translates -50%,
 * so the loop has no visible seam. Paused on hover and under reduced-motion.
 */
export default function Announce({ lang }) {
  const items = dict(lang).announce;
  const strip = (key) => (
    <div key={key} className="flex shrink-0 items-center" aria-hidden={key === 'b'}>
      {items.map((s, i) => (
        <span key={i} className="flex items-center whitespace-nowrap">
          <span className="px-7 text-[10.5px] uppercase tracking-eyebrow">{s}</span>
          <span className="h-[3px] w-[3px] rounded-full" style={{ background: 'var(--brass)' }} />
        </span>
      ))}
    </div>
  );

  return (
    <div
      className="group relative overflow-hidden border-b edge"
      style={{ background: 'var(--ink)', color: 'rgba(242,234,223,0.62)' }}
    >
      <div className="flex w-max animate-marquee py-2.5 group-hover:[animation-play-state:paused]">
        {strip('a')}
        {strip('b')}
      </div>
    </div>
  );
}
