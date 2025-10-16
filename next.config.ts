import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    loader: "custom",
    loaderFile: "/components/imageLoader.ts",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
      },
      {
        protocol: "https",
        hostname: "cdnimg.melon.co.kr",
      },
    ],
    unoptimized: true,
  }
};

export default nextConfig;
