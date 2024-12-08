import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
      },
      {
        protocol: "https",
        hostname: "wendisworminghallwhimsies.uk",
      },
      {
        protocol: "https",
        hostname: "www.wendisworminghallwhimsies.uk",
      },
      {
        protocol: "https",
        hostname: "81bcff27c295c7518b15018f5a69faaf.r2.cloudflarestorage.com",
        pathname: "/**",
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
};

export default nextConfig;
