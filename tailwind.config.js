/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,mdx}'],
  theme: {
    extend: {
      colors: {
        forest: '#0E2B24',
        emerald: '#14483B',
        verdigris: '#4E9A86',
        copper: '#C98A5B',
        brass: '#E0A96D',
        bone: '#F2EADF',
        ink: '#081A16',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'Jost', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        eyebrow: '0.28em',
        wide2: '0.18em',
      },
      transitionTimingFunction: {
        atlas: 'cubic-bezier(0.32, 0.72, 0, 1)',
        swoop: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      // Tailwind's default duration scale stops at 300/500/700/1000. The motion
      // system here is built on slower, heavier easing, so the in-between steps
      // are registered rather than written as arbitrary values everywhere.
      transitionDuration: {
        400: '400ms',
        600: '600ms',
        800: '800ms',
        900: '900ms',
        1100: '1100ms',
        1200: '1200ms',
      },
      spacing: {
        4.5: '1.125rem',
      },
      borderRadius: {
        bezel: '2rem',
        core: 'calc(2rem - 0.375rem)',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-120%)' },
          '100%': { transform: 'translateX(220%)' },
        },
        glow: {
          '0%, 100%': { opacity: '0.55' },
          '50%': { opacity: '1' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        shimmer: 'shimmer 2.4s cubic-bezier(0.32,0.72,0,1) infinite',
        glow: 'glow 4s ease-in-out infinite',
        marquee: 'marquee 38s linear infinite',
      },
    },
  },
  plugins: [],
};
