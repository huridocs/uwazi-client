/** @type {import('next').NextConfig} */

const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: "default-src 'self'; font-src 'self'; img-src 'self'; script-src 'self'",
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin',
  },
  {
    key: 'Permissions-Policy',
    value: "camera=(); battery=(); geolocation=(); microphone=('')",
  },
];

const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    NODE_ENV: process.env.NODE_ENV,
  },
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        // source: '/pages',
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};

module.exports = nextConfig;
