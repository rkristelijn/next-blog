import type { NextConfig } from "next";
import createMDX from '@next/mdx';

const withMDX = createMDX({
  // Add markdown plugins here, if needed
  // remarkPlugins: [],
  // rehypePlugins: [],
});

const nextConfig: NextConfig = {
  /* config options here */
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
};

export default withMDX(nextConfig);

// added by create cloudflare to enable calling `getCloudflareContext()` in `next dev`
import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';
initOpenNextCloudflareForDev();
