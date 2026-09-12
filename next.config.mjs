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
};

export default nextConfig;
