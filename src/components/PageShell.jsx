import Reveal from './Reveal';

/** Shared editorial shell for the non-commerce pages. */
export default function PageShell({ eyebrow, title, lead, image, children, wide = false }) {
  return (
    <div className="mx-auto max-w-[1320px] px-6 pb-28 pt-12 md:px-10 md:pt-16">
      <Reveal className={`mb-14 ${wide ? '' : 'max-w-3xl'}`}>
        {eyebrow && <p className="eyebrow mb-6">{eyebrow}</p>}
        <h1 className="font-display text-[clamp(40px,6.4vw,80px)] leading-[0.98] text-balance">{title}</h1>
        {lead && <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-pretty opacity-65">{lead}</p>}
      </Reveal>

      {image && (
        <Reveal className="bezel mb-16">
          <div className="bezel-core">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={image} alt="" loading="eager" fetchPriority="high" decoding="async"
              className="aspect-[21/9] w-full object-cover" />
          </div>
        </Reveal>
      )}

      {children}
    </div>
  );
}

export function Prose({ children, className = '' }) {
  return (
    <div className={`max-w-3xl ${className}`}>
      <div className="flex flex-col gap-6 text-[16px] leading-relaxed text-pretty opacity-78">{children}</div>
    </div>
  );
}

export function H2({ children }) {
  return <h2 className="mt-14 font-display text-[clamp(26px,3.4vw,40px)] leading-tight">{children}</h2>;
}
