#!/usr/bin/env node

/**
 * Minimal optimization for Cloudflare Workers
 * Only does the safest optimizations to avoid breaking anything
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT_DIR = path.join(__dirname, '..');

const minimalOptimize = async () => {
  try {
    console.log('🔧 Minimal Cloudflare Workers optimization...');
    
    // 1. Run basic posts optimization only
    const { execSync } = await import('child_process');
    console.log('📦 Optimizing posts data...');
    execSync('node scripts/optimize-for-workers.js', { cwd: ROOT_DIR, stdio: 'inherit' });
    
    console.log('🧹 Cleaning up large posts.json...');
    execSync('node scripts/cleanup-for-workers.js', { cwd: ROOT_DIR, stdio: 'inherit' });
    
    console.log('✅ Minimal optimization completed!');
    console.log('💡 This approach focuses only on posts data optimization');
    console.log('📊 Expected savings: ~246KB (should help with bundle size)');
    
  } catch (error) {
    console.error('❌ Error during minimal optimization:', error);
    // Don't exit with error - deployment should continue
    console.log('⚠️  Continuing with deployment despite optimization errors...');
  }
}

minimalOptimize();
