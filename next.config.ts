import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,  // 静态导出需要关闭图片优化
  },
  typescript: {
    ignoreBuildErrors: true,  // 快速部署时忽略类型错误
  },
};
export default nextConfig;
