/* Ultra-light line icons, 1.4 stroke, drawn to match the brand icon set. */

const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.4,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  viewBox: '0 0 24 24',
  'aria-hidden': true,
};

export const ArrowUpRight = (p) => (
  <svg {...base} {...p}><path d="M7 17 17 7M8 7h9v9" /></svg>
);
export const ArrowRight = (p) => (
  <svg {...base} {...p}><path d="M4 12h16M14 6l6 6-6 6" /></svg>
);
export const ArrowLeft = (p) => (
  <svg {...base} {...p}><path d="M20 12H4M10 6l-6 6 6 6" /></svg>
);
export const ChevronDown = (p) => (
  <svg {...base} {...p}><path d="m6 9 6 6 6-6" /></svg>
);
export const Close = (p) => (
  <svg {...base} {...p}><path d="M6 6l12 12M18 6 6 18" /></svg>
);
export const Bag = (p) => (
  <svg {...base} {...p}>
    <path d="M5.5 8h13l-1 11.5a1.5 1.5 0 0 1-1.5 1.4H8a1.5 1.5 0 0 1-1.5-1.4Z" />
    <path d="M9 8V6.2A3 3 0 0 1 12 3a3 3 0 0 1 3 3.2V8" />
  </svg>
);
export const Plus = (p) => <svg {...base} {...p}><path d="M12 5v14M5 12h14" /></svg>;
export const Minus = (p) => <svg {...base} {...p}><path d="M5 12h14" /></svg>;
export const Check = (p) => <svg {...base} {...p}><path d="m4 12.5 5 5L20 6.5" /></svg>;
export const Globe = (p) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c2.5 2.6 3.8 5.7 3.8 9S14.5 18.4 12 21c-2.5-2.6-3.8-5.7-3.8-9S9.5 5.6 12 3Z" />
  </svg>
);
export const Whatsapp = (p) => (
  <svg {...base} {...p}>
    <path d="M3.5 20.5 5 16.6a8 8 0 1 1 3.1 3Z" />
    <path d="M9 9.5c0 3 2.5 5.5 5.5 5.5.6 0 1-.4 1-.9l-.2-1-1.8-.6-.9 1a5.6 5.6 0 0 1-2.1-2.1l1-.9-.6-1.8-1-.2c-.5 0-.9.4-.9 1Z" />
  </svg>
);
export const Star = ({ filled = true, ...p }) => (
  <svg viewBox="0 0 24 24" aria-hidden {...p}
    fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round">
    <path d="m12 3.6 2.6 5.4 5.9.8-4.3 4.1 1 5.9-5.2-2.8-5.2 2.8 1-5.9L3.5 9.8l5.9-.8Z" />
  </svg>
);

/* Product-family icons, lifted from the brand identity board. */
export const IconPendant = (p) => (
  <svg {...base} {...p}>
    <path d="M12 2v4" /><path d="M4.5 14a7.5 7.5 0 0 1 15 0Z" /><circle cx="12" cy="17" r="1.6" />
  </svg>
);
export const IconLantern = (p) => (
  <svg {...base} {...p}>
    <path d="M12 2v2.5" /><path d="M6 8.5h12l-1.2 7.6H7.2Z" />
    <path d="M6 8.5c2-2 10-2 12 0M7.2 16.1c1.8 1.6 7.8 1.6 9.6 0" /><path d="M12 16.1V20" />
  </svg>
);
export const IconSconce = (p) => (
  <svg {...base} {...p}>
    <path d="M7 3v13a3 3 0 0 0 3 3h7" /><path d="M13 13v3" /><circle cx="13" cy="11" r="2" />
  </svg>
);
export const IconBasin = (p) => (
  <svg {...base} {...p}>
    <path d="M3.5 10h17c0 4.4-3.8 8-8.5 8s-8.5-3.6-8.5-8Z" /><path d="M8 10c0 3 1.8 5.5 4 5.5s4-2.5 4-5.5" />
  </svg>
);
export const IconSink = (p) => (
  <svg {...base} {...p}>
    <path d="M3.5 8.5h17v9a1.5 1.5 0 0 1-1.5 1.5H5a1.5 1.5 0 0 1-1.5-1.5Z" /><path d="M3.5 12.5h17" />
  </svg>
);
export const IconHammer = (p) => (
  <svg {...base} {...p}>
    <path d="M4 20 13 11" /><path d="M11.5 8.5 15 5l1.5 1.5L20 3l1 1-3.5 3.5L19 9l-3.5 3.5Z" />
  </svg>
);
export const IconDrop = (p) => (
  <svg {...base} {...p}><path d="M12 3.5c3 4 5 6.6 5 9a5 5 0 0 1-10 0c0-2.4 2-5 5-9Z" /></svg>
);
export const IconMountain = (p) => (
  <svg {...base} {...p}><path d="m2 19 6-9 3.5 4.5L15 9l7 10Z" /></svg>
);
export const IconShip = (p) => (
  <svg {...base} {...p}>
    <path d="M2.5 10.5h11v7h-11Z" /><path d="M13.5 13h4l3 3v1.5h-7Z" />
    <circle cx="6.5" cy="19" r="1.6" /><circle cx="17" cy="19" r="1.6" />
  </svg>
);
export const IconShield = (p) => (
  <svg {...base} {...p}><path d="M12 3 20 6v6c0 4.6-3.3 7.7-8 9-4.7-1.3-8-4.4-8-9V6Z" /><path d="m9 12 2 2 4-4" /></svg>
);
export const IconReturn = (p) => (
  <svg {...base} {...p}><path d="M4 10h11a5 5 0 0 1 0 10H9" /><path d="M8 6 4 10l4 4" /></svg>
);
export const IconChat = (p) => (
  <svg {...base} {...p}><path d="M20.5 12c0 4-3.8 7.2-8.5 7.2a10 10 0 0 1-2.7-.4L4 20.5l1.4-3.7A6.9 6.9 0 0 1 3.5 12C3.5 8 7.3 4.8 12 4.8s8.5 3.2 8.5 7.2Z" /></svg>
);
