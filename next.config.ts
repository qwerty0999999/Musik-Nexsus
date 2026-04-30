import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
      },
      {
        protocol: 'https',
        hostname: 'images.jamendo.com',
      },
      {
        protocol: 'https',
        hostname: 'a-v2.sndcdn.com',
      },
    ],
  },
};

export default nextConfig;
