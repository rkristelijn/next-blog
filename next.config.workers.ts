import type { NextConfig } from "next";

/**
 * Next.js configuration optimized for Cloudflare deployment
 * 
 * This configuration follows the RTFM principle by using
 * Next.js conventions and the KISS principle by keeping
 * configuration simple and focused.
 */
const nextConfig: NextConfig = {
  trailingSlash: true,
  images: {
    unoptimized: true
  },
};

export default nextConfig;

// added by create cloudflare to enable calling `getCloudflareContext()` in `next dev`
import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';
initOpenNextCloudflareForDev();
