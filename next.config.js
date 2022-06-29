/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    NODE_ENV: process.env.NODE_ENV,
  },
  experimental: {
    newNextLinkBehavior: true,
  },
};

module.exports = nextConfig;
