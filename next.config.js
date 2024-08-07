/** @type {import('next').NextConfig} */

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const TEST_URL = 'https://jsonplaceholder.typicode.com'

module.exports = {
  crossOrigin: 'use-credentials',
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/api/:path*',
          destination: `${API_URL}/api/:path*`,
        },
        {
          source: '/todos/:path*',
          destination: `${TEST_URL}/todos/:path*`,
        }
      ],
    }
  },
  images: {
  },
  webpack: (config) => {

    return config
  },
}
