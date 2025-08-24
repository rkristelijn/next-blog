#!/usr/bin/env node

/**
 * Advanced optimization for Cloudflare Workers
 * Reduces bundle size by removing unnecessary dependencies and optimizing the build
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT_DIR = path.join(__dirname, '..');
const OPEN_NEXT_DIR = path.join(ROOT_DIR, '.open-next');

const optimize = async () => {
  try {
    console.log('🚀 Advanced Cloudflare Workers optimization...');
    
    // 1. Run basic optimization first
    console.log('📦 Running basic posts optimization...');
    const { execSync } = await import('child_process');
    execSync('node scripts/optimize-for-workers.js', { cwd: ROOT_DIR, stdio: 'inherit' });
    
    // 2. Clean up large files
    console.log('🧹 Running cleanup...');
    execSync('node scripts/cleanup-for-workers.js', { cwd: ROOT_DIR, stdio: 'inherit' });
    
    // 3. Check if OpenNext build exists
    if (fs.existsSync(OPEN_NEXT_DIR)) {
      console.log('🔧 Optimizing OpenNext build...');
      
      // Find large files in the build
      const findLargeFiles = (dir, threshold = 100 * 1024) => { // 100KB threshold
        const largeFiles = [];
        
        const scanDir = (currentDir) => {
          try {
            const items = fs.readdirSync(currentDir);
            for (const item of items) {
              const fullPath = path.join(currentDir, item);
              const stat = fs.statSync(fullPath);
              
              if (stat.isDirectory()) {
                scanDir(fullPath);
              } else if (stat.size > threshold) {
                largeFiles.push({
                  path: fullPath,
                  size: stat.size,
                  relativePath: path.relative(ROOT_DIR, fullPath)
                });
              }
            }
          } catch (error) {
            // Skip directories we can't read
          }
        };
        
        scanDir(dir);
        return largeFiles.sort((a, b) => b.size - a.size);
      };
      
      const largeFiles = findLargeFiles(OPEN_NEXT_DIR);
      
      console.log('📊 Large files in OpenNext build:');
      largeFiles.slice(0, 10).forEach(file => {
        console.log(`  - ${file.relativePath}: ${(file.size / 1024).toFixed(1)}KB`);
      });
      
      // 4. Try to optimize specific files
      const handlerPath = path.join(OPEN_NEXT_DIR, 'server-functions', 'default', 'handler.mjs');
      if (fs.existsSync(handlerPath)) {
        console.log('🔧 Analyzing main handler...');
        const handlerContent = fs.readFileSync(handlerPath, 'utf8');
        
        // Check for potential optimizations
        const lines = handlerContent.split('\n').length;
        const size = fs.statSync(handlerPath).size;
        console.log(`  - Handler: ${lines} lines, ${(size / 1024).toFixed(1)}KB`);
        
        // Look for large imports or unused code
        const imports = handlerContent.match(/import .+ from .+/g) || [];
        console.log(`  - Imports: ${imports.length}`);
        
        if (imports.length > 50) {
          console.log('⚠️  Large number of imports detected. Consider code splitting.');
        }
      }
    }
    
    console.log('✅ Advanced optimization completed!');
    console.log('💡 If the bundle is still too large, consider:');
    console.log('   1. Upgrading to Cloudflare Workers paid plan (10MB limit)');
    console.log('   2. Using Cloudflare Pages instead of Workers');
    console.log('   3. Reducing dependencies in package.json');
    console.log('   4. Using dynamic imports for large components');
    
  } catch (error) {
    console.error('❌ Error during advanced optimization:', error);
    process.exit(1);
  }
}

optimize();
