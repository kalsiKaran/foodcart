/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["taran.futuretouch.org"],
    unoptimized: true
  },
};

module.exports = nextConfig;
