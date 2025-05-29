// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export', // Enable static exports
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com'],
    unoptimized: true, // Required for static export
  },
  // If your site is not hosted at the root domain, you need to specify the basePath
  // For example, for GitHub Pages:
  basePath: process.env.NODE_ENV === 'production' ? '' : '',
  // For a custom domain, you can leave this empty
};

module.exports = nextConfig;