import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  cleanDistDir: false,
};

export default nextConfig;