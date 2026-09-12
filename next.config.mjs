/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // All product photography is pre-optimised to WebP at ingest time,
    // so we serve it unoptimised and stay off Vercel's image-transform quota.
    unoptimized: true,
  },
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
