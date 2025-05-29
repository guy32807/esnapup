// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com'],
    unoptimized: process.env.NODE_ENV === 'production',
  },
  // Make sure rewrites or redirects aren't interfering with API routes
};

module.exports = nextConfig;