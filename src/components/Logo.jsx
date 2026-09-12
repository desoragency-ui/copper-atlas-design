/** Copper Atlas monogram: C+A inside the Moorish keyhole arch, per the brand board. */
export function Monogram({ className = 'h-9 w-9', title }) {
  return (
    <svg viewBox="0 0 48 56" className={className} role={title ? 'img' : 'presentation'} aria-label={title}>
      {title ? <title>{title}</title> : null}
      <defs>
        <linearGradient id="ca-brass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F0D9A8" />
          <stop offset="48%" stopColor="#E0A96D" />
          <stop offset="100%" stopColor="#B5764A" />
        </linearGradient>
      </defs>
      <path
        d="M4 54V22a20 20 0 0 1 40 0v32Z"
        fill="none"
        stroke="url(#ca-brass)"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <path d="M24 8v9" stroke="url(#ca-brass)" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M27 25a9.5 9.5 0 1 0 0 15" fill="none" stroke="url(#ca-brass)" strokeWidth="2.6" strokeLinecap="round" />
      <path
        d="m26 42 6.5-16.5L39 42M28.6 36.4h7.8"
        fill="none"
        stroke="url(#ca-brass)"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Wordmark set to match the identity board: a high-contrast serif for
 * COPPER ATLAS with open tracking, and DESIGN beneath it in widely tracked
 * caps at roughly a third of the size. The two lines are optically centred
 * on each other rather than left-aligned, which is how the board sets it.
 */
export function Wordmark({ className = '', compact = false }) {
  return (
    <span className={`flex items-center gap-3 ${className}`}>
      <Monogram className={compact ? 'h-8 w-8' : 'h-10 w-10'} />
      <span className="flex flex-col items-center leading-none">
        <span
          className="foil block font-display"
          style={{
            fontSize: compact ? '19px' : '23px',
            fontWeight: 500,
            letterSpacing: '0.13em',
            lineHeight: 1,
            paddingRight: '0.13em',
          }}
        >
          COPPER ATLAS
        </span>
        <span
          className="block uppercase"
          style={{
            fontSize: compact ? '7px' : '8px',
            letterSpacing: '0.62em',
            color: 'rgba(242,234,223,0.58)',
            marginTop: compact ? '5px' : '6px',
            paddingLeft: '0.62em',
          }}
        >
          Design
        </span>
      </span>
    </span>
  );
}
