import type { NextConfig } from "next";

/**
 * Next.js configuration optimized for Cloudflare Pages deployment
 */
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true
  },
};

export default nextConfig;