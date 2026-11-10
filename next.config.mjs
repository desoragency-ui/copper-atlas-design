/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // A stray lockfile in a parent folder makes Next infer the wrong workspace
  // root, which mis-traces the server bundle.
  outputFileTracingRoot: import.meta.dirname,
  images: {
    // All product photography is pre-optimised to WebP at ingest time,
    // so we serve it as-is and need no image-transform service.
    unoptimized: true,
  },
  eslint: { ignoreDuringBuilds: true },
  // Security headers for pages. Cloudflare serves static files without running
  // this app, so public/_headers covers those instead.
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
