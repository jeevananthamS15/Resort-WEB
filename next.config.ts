import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Curated stock photography for marketing pages (landing hero,
      // fallback room imagery when a room has no uploaded photos yet).
      { protocol: "https", hostname: "images.unsplash.com" },
      // Real room photos served by the backend's dev storage stub
      // (shared/storage/localStorageProvider.ts) — swaps to a real S3/CDN
      // pattern automatically once AWS_S3_BUCKET is set on the backend.
      { protocol: "http", hostname: "localhost", port: "3000", pathname: "/dev-uploads/**" },
    ],
  },
};

export default nextConfig;
