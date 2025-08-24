#!/usr/bin/env node

/**
 * Optimize posts data for Cloudflare Workers
 * Removes full content to reduce bundle size and memory usage
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, '..', 'src', 'data');
const POSTS_FILE = path.join(DATA_DIR, 'posts.json');
const OPTIMIZED_FILE = path.join(DATA_DIR, 'posts-optimized.json');

const optimizePostsData = async () => {
  try {
    console.log('📊 Optimizing posts data for Cloudflare Workers...');
    
    // Read current posts data
    const postsData = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
    
    // Create optimized version without full content
    const optimizedPosts = {
      ...postsData,
      posts: postsData.posts.map(post => ({
        id: post.id,
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        date: post.date,
        author: post.author,
        // Remove content field to reduce size
        // Content will be loaded dynamically when needed
      }))
    };
    
    // Write optimized version
    fs.writeFileSync(OPTIMIZED_FILE, JSON.stringify(optimizedPosts, null, 2));
    
    // Get file sizes
    const originalSize = fs.statSync(POSTS_FILE).size;
    const optimizedSize = fs.statSync(OPTIMIZED_FILE).size;
    const savings = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1);
    
    console.log(`✅ Optimization complete!`);
    console.log(`📦 Original size: ${(originalSize / 1024).toFixed(1)}KB`);
    console.log(`📦 Optimized size: ${(optimizedSize / 1024).toFixed(1)}KB`);
    console.log(`💾 Space saved: ${savings}% (${((originalSize - optimizedSize) / 1024).toFixed(1)}KB)`);
    
    // Replace original with optimized version
    fs.copyFileSync(OPTIMIZED_FILE, POSTS_FILE);
    fs.unlinkSync(OPTIMIZED_FILE);
    
    console.log(`🔄 Replaced posts.json with optimized version`);
    
  } catch (error) {
    console.error('❌ Error optimizing posts data:', error);
    process.exit(1);
  }
}

optimizePostsData();
