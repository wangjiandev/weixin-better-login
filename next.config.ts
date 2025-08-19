import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: 'github.githubassets.com',
      },
    ],
  },
};

export default nextConfig;
