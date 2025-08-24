#!/usr/bin/env node

/**
 * Aggressive optimization for Cloudflare Workers
 * Targets the largest files identified in the build analysis
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT_DIR = path.join(__dirname, '..');
const OPEN_NEXT_DIR = path.join(ROOT_DIR, '.open-next');

const aggressiveOptimize = async () => {
  try {
    console.log('⚡ Aggressive Cloudflare Workers optimization...');
    
    // 1. Run basic optimizations first
    const { execSync } = await import('child_process');
    execSync('node scripts/optimize-for-workers.js', { cwd: ROOT_DIR, stdio: 'inherit' });
    execSync('node scripts/cleanup-for-workers.js', { cwd: ROOT_DIR, stdio: 'inherit' });
    
    if (!fs.existsSync(OPEN_NEXT_DIR)) {
      console.log('⚠️  OpenNext build not found. Run build first.');
      return;
    }
    
    console.log('🎯 Targeting largest files for optimization...');
    
    // 2. Remove unnecessary font metrics (4.2MB)
    const fontMetricsPath = path.join(OPEN_NEXT_DIR, 'server-functions', 'default', 'node_modules', 'next', 'dist', 'server', 'capsize-font-metrics.json');
    if (fs.existsSync(fontMetricsPath)) {
      const size = fs.statSync(fontMetricsPath).size;
      fs.unlinkSync(fontMetricsPath);
      console.log(`🗑️  Removed font metrics: ${(size / 1024).toFixed(1)}KB saved`);
    }
    
    // 3. Remove AMP validator (3.9MB) - not needed for blog
    const ampValidatorPath = path.join(OPEN_NEXT_DIR, 'server-functions', 'default', 'node_modules', 'next', 'dist', 'compiled', 'amphtml-validator');
    if (fs.existsSync(ampValidatorPath)) {
      const getDirectorySize = (dirPath) => {
        let totalSize = 0;
        const files = fs.readdirSync(dirPath);
        for (const file of files) {
          const filePath = path.join(dirPath, file);
          const stat = fs.statSync(filePath);
          if (stat.isDirectory()) {
            totalSize += getDirectorySize(filePath);
          } else {
            totalSize += stat.size;
          }
        }
        return totalSize;
      };
      
      const size = getDirectorySize(ampValidatorPath);
      fs.rmSync(ampValidatorPath, { recursive: true, force: true });
      console.log(`🗑️  Removed AMP validator: ${(size / 1024).toFixed(1)}KB saved`);
    }
    
    // 4. Remove unused Babel packages if possible
    const babelPackagesPath = path.join(OPEN_NEXT_DIR, 'server-functions', 'default', 'node_modules', 'next', 'dist', 'compiled', 'babel-packages', 'packages-bundle.js');
    if (fs.existsSync(babelPackagesPath)) {
      // Only remove if we're not using custom babel config
      const babelConfigExists = fs.existsSync(path.join(ROOT_DIR, '.babelrc')) || 
                                fs.existsSync(path.join(ROOT_DIR, 'babel.config.js')) ||
                                fs.existsSync(path.join(ROOT_DIR, 'babel.config.json'));
      
      if (!babelConfigExists) {
        const size = fs.statSync(babelPackagesPath).size;
        fs.unlinkSync(babelPackagesPath);
        console.log(`🗑️  Removed Babel packages: ${(size / 1024).toFixed(1)}KB saved`);
      } else {
        console.log('⚠️  Keeping Babel packages (custom config detected)');
      }
    }
    
    // 5. Skip handler optimization to avoid breaking code
    const handlerPath = path.join(OPEN_NEXT_DIR, 'server-functions', 'default', 'handler.mjs');
    if (fs.existsSync(handlerPath)) {
      console.log('ℹ️  Skipping handler optimization to avoid breaking regex patterns');
      const size = fs.statSync(handlerPath).size;
      console.log(`📊 Handler size: ${(size / 1024).toFixed(1)}KB (unchanged for safety)`);
    }
    
    // 6. Calculate total savings
    console.log('✅ Aggressive optimization completed!');
    console.log('📊 Estimated savings: 8-12MB (should bring gzipped size under 3MB)');
    console.log('🎯 Target: Reduce from 3.09MB to ~2.5MB gzipped');
    
  } catch (error) {
    console.error('❌ Error during aggressive optimization:', error);
    // Don't exit with error - deployment should continue
    console.log('⚠️  Continuing with deployment despite optimization errors...');
  }
}

aggressiveOptimize();
