/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["kangocastle.com"],
    unoptimized: true
  },
};

module.exports = nextConfig;
