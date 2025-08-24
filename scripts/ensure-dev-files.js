#!/usr/bin/env node

/**
 * Ensure development files exist to prevent HMR issues
 * This script makes sure both posts.json and posts-metadata.json exist
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, '..', 'src', 'data');
const POSTS_FILE = path.join(DATA_DIR, 'posts.json');
const METADATA_FILE = path.join(DATA_DIR, 'posts-metadata.json');

const ensureDevFiles = () => {
  try {
    console.log('🔧 Ensuring development files exist...');
    
    // Check if posts.json exists
    if (!fs.existsSync(POSTS_FILE)) {
      console.log('📝 posts.json missing, regenerating...');
      // Run the generate script
      const { execSync } = require('child_process');
      execSync('node scripts/generate-posts-data.js', { cwd: path.join(__dirname, '..'), stdio: 'inherit' });
    } else {
      console.log('✅ posts.json exists');
    }
    
    // Check if posts-metadata.json exists
    if (!fs.existsSync(METADATA_FILE)) {
      console.log('📝 posts-metadata.json missing, running optimization...');
      const { execSync } = require('child_process');
      execSync('node scripts/optimize-for-workers.js', { cwd: path.join(__dirname, '..'), stdio: 'inherit' });
    } else {
      console.log('✅ posts-metadata.json exists');
    }
    
    console.log('✅ All development files are ready!');
    
  } catch (error) {
    console.error('❌ Error ensuring development files:', error);
    process.exit(1);
  }
}

ensureDevFiles();
