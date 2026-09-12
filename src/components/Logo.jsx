/** Copper Atlas monogram — C+A inside the Moorish keyhole arch, per the brand board. */
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
      {/* keyhole arch */}
      <path
        d="M4 54V22a20 20 0 0 1 40 0v32Z"
        fill="none"
        stroke="url(#ca-brass)"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      {/* suspension cord + fitting */}
      <path d="M24 8v9" stroke="url(#ca-brass)" strokeWidth="1.8" strokeLinecap="round" />
      {/* C */}
      <path
        d="M27 25a9.5 9.5 0 1 0 0 15"
        fill="none"
        stroke="url(#ca-brass)"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      {/* A */}
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

/** Full stacked wordmark. */
export function Wordmark({ className = '', compact = false }) {
  return (
    <span className={`flex items-center gap-3 ${className}`}>
      <Monogram className={compact ? 'h-7 w-7' : 'h-9 w-9'} />
      <span className="leading-none">
        <span
          className="block font-display text-[#E0A96D]"
          style={{
            fontSize: compact ? '17px' : '20px',
            letterSpacing: '0.09em',
            lineHeight: 1,
          }}
        >
          COPPER ATLAS
        </span>
        <span
          className="block uppercase"
          style={{
            fontSize: compact ? '7.5px' : '8.5px',
            letterSpacing: '0.46em',
            color: 'rgba(242,234,223,0.6)',
            marginTop: '4px',
          }}
        >
          Design
        </span>
      </span>
    </span>
  );
}
