#!/usr/bin/env node

/**
 * Cleanup script for Cloudflare Workers deployment
 * Removes large files that are not needed after optimization
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, '..', 'src', 'data');
const POSTS_FILE = path.join(DATA_DIR, 'posts.json');
const METADATA_FILE = path.join(DATA_DIR, 'posts-metadata.json');

const cleanup = async () => {
  try {
    console.log('🧹 Cleaning up for Cloudflare Workers deployment...');
    
    // Check if metadata file exists (optimization should have run)
    if (!fs.existsSync(METADATA_FILE)) {
      console.error('❌ posts-metadata.json not found. Run optimization first.');
      process.exit(1);
    }
    
    // Check if large posts.json exists
    if (fs.existsSync(POSTS_FILE)) {
      const originalSize = fs.statSync(POSTS_FILE).size;
      const metadataSize = fs.statSync(METADATA_FILE).size;
      
      console.log(`📦 Original posts.json: ${(originalSize / 1024).toFixed(1)}KB`);
      console.log(`📦 Optimized metadata: ${(metadataSize / 1024).toFixed(1)}KB`);
      
      // Remove the large file
      fs.unlinkSync(POSTS_FILE);
      console.log('🗑️  Removed large posts.json file');
      
      const savings = ((originalSize - metadataSize) / 1024).toFixed(1);
      console.log(`💾 Bundle size reduced by ${savings}KB`);
    } else {
      console.log('✅ posts.json already removed or not found');
    }
    
    console.log('✅ Cleanup completed successfully!');
    
  } catch (error) {
    console.error('❌ Error during cleanup:', error);
    process.exit(1);
  }
}

cleanup();
