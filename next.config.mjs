/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // A stray lockfile in the user's home directory makes Next infer the wrong
  // workspace root, which mis-traces the server bundle on Netlify.
  outputFileTracingRoot: import.meta.dirname,
  images: {
    // All product photography is pre-optimised to WebP at ingest time,
    // so we serve it unoptimised and stay off Vercel's image-transform quota.
    unoptimized: true,
  },
  eslint: { ignoreDuringBuilds: true },
  // The same four headers netlify.toml sends. Cloudflare serves static files
  // without running this app, so public/_headers covers those instead.
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Permissions-Policy', value: 'geolocation=(), microphone=(), camera=(), interest-cohort=()' },
        ],
      },
    ];
  },
};

export default nextConfig;
