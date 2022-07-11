/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    NODE_ENV: process.env.NODE_ENV,
    HOST: process.env.HOST || 'localhost',
  },
  experimental: {
    newNextLinkBehavior: true,
  },
};

module.exports = nextConfig;
