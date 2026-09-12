'use client';

import { useRef, useState } from 'react';
import { Plus } from '../Icons';

export default function Accordion({ items, defaultOpen = 0 }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-t edge">
      {items.map((it, i) => (
        <Row key={it.t} item={it} isOpen={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
      ))}
    </div>
  );
}

function Row({ item, isOpen, onToggle }) {
  const inner = useRef(null);

  return (
    <div className="border-b edge">
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors duration-400"
      >
        <span className="text-[12px] uppercase tracking-wide2" style={{ color: isOpen ? 'var(--brass)' : 'inherit' }}>
          {item.t}
        </span>
        <span
          className="grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-all duration-500 ease-atlas edge"
          style={{ transform: isOpen ? 'rotate(135deg)' : 'none', color: isOpen ? 'var(--brass)' : 'inherit' }}
          aria-hidden
        >
          <Plus className="h-3.5 w-3.5" />
        </span>
      </button>

      <div
        className="overflow-hidden transition-[height,opacity] duration-600 ease-atlas"
        style={{
          height: isOpen ? (inner.current?.scrollHeight ?? 0) : 0,
          opacity: isOpen ? 1 : 0,
        }}
      >
        <div ref={inner} className="pb-6">{item.c}</div>
      </div>
    </div>
  );
}
