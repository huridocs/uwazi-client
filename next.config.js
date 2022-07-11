/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    NODE_ENV: process.env.NODE_ENV,
    API_HOST: process.env.API_HOST || 'localhost',
  },
  experimental: {
    newNextLinkBehavior: true,
  },
};

module.exports = nextConfig;
