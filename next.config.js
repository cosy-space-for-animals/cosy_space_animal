/** @type {import('next').NextConfig} */

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const TEST_URL = 'https://jsonplaceholder.typicode.com';
const isDev = Boolean(process.env.NODE_ENV === 'development');

module.exports = {
  compiler: {
    removeConsole: !isDev,
  },
  crossOrigin: 'use-credentials',
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/api/:path*',
          destination: `${API_URL}/:path*`,
        },
        {
          source: '/todos/:path*',
          destination: `${TEST_URL}/todos/:path*`,
        },
      ],
    };
  },
  images: {},
  webpack: (config) => {
    return config;
  },
};
