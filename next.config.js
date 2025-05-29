// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com'],
    unoptimized: true, // Required for static export
  },
  basePath: '',
  trailingSlash: true, // Recommended for static site generation
};

module.exports = nextConfig;