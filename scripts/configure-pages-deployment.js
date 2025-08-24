#!/usr/bin/env node

/**
 * Configure deployment for Cloudflare Pages (fallback if Workers are too large)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT_DIR = path.join(__dirname, '..');

const configurePagesDeployment = () => {
  console.log('📄 Configuring Cloudflare Pages deployment...');
  
  // Create pages deployment workflow
  const pagesWorkflow = `name: Deploy to Cloudflare Pages

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Generate and optimize posts data
        run: |
          echo "🔄 Generating posts data..."
          node scripts/generate-posts-data.js
          node scripts/optimize-for-workers.js
          node scripts/cleanup-for-workers.js
          echo "✅ Posts optimization completed!"

      - name: Build for static export
        run: |
          echo "🏗️ Building for static export..."
          npm run build
          echo "✅ Build completed!"

      - name: Deploy to Cloudflare Pages
        uses: cloudflare/pages-action@v1
        with:
          apiToken: \${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: \${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          projectName: next-blog
          directory: out
          gitHubToken: \${{ secrets.GITHUB_TOKEN }}
`;

  // Update next.config.ts for static export
  const nextConfig = `import type { NextConfig } from "next";

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

export default nextConfig;`;

  // Write files
  fs.writeFileSync(path.join(ROOT_DIR, '.github', 'workflows', 'deploy-pages.yml'), pagesWorkflow);
  fs.writeFileSync(path.join(ROOT_DIR, 'next.config.pages.ts'), nextConfig);
  
  console.log('✅ Cloudflare Pages configuration created!');
  console.log('📝 Files created:');
  console.log('   - .github/workflows/deploy-pages.yml');
  console.log('   - next.config.pages.ts');
  console.log('');
  console.log('🔧 To switch to Pages deployment:');
  console.log('   1. Rename next.config.ts to next.config.workers.ts');
  console.log('   2. Rename next.config.pages.ts to next.config.ts');
  console.log('   3. Rename deploy.yml to deploy-workers.yml');
  console.log('   4. Rename deploy-pages.yml to deploy.yml');
  console.log('');
  console.log('💡 Cloudflare Pages benefits:');
  console.log('   - No 3MB size limit');
  console.log('   - Better for static sites');
  console.log('   - Automatic preview deployments');
  console.log('   - Built-in analytics');
};

configurePagesDeployment();
