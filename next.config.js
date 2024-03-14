/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["kangocastle.com", "taran.futuretouch.org"],
    unoptimized: true
  },
};

module.exports = nextConfig;
