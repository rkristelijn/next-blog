#!/usr/bin/env node

/**
 * Optimize posts data specifically for Cloudflare Workers
 * Creates separate files for metadata and content to reduce memory usage
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, '..', 'src', 'data');
const POSTS_FILE = path.join(DATA_DIR, 'posts.json');
const METADATA_FILE = path.join(DATA_DIR, 'posts-metadata.json');
const CONTENT_DIR = path.join(DATA_DIR, 'content');

async function optimizeForWorkers() {
  try {
    console.log('🔧 Optimizing for Cloudflare Workers...');
    
    // Read current posts data
    const postsData = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
    
    // Create content directory
    if (!fs.existsSync(CONTENT_DIR)) {
      fs.mkdirSync(CONTENT_DIR, { recursive: true });
    }
    
    // Separate metadata and content
    const metadata = {
      posts: [],
      slugs: postsData.slugs,
      generatedAt: postsData.generatedAt
    };
    
    for (const post of postsData.posts) {
      // Save metadata only
      metadata.posts.push({
        id: post.id,
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        date: post.date,
        author: post.author,
        originalFilename: post.originalFilename
      });
      
      // Save content separately
      const contentFile = path.join(CONTENT_DIR, `${post.slug}.json`);
      fs.writeFileSync(contentFile, JSON.stringify({ content: post.content }));
    }
    
    // Write metadata file
    fs.writeFileSync(METADATA_FILE, JSON.stringify(metadata, null, 2));
    
    // Get file sizes
    const originalSize = fs.statSync(POSTS_FILE).size;
    const metadataSize = fs.statSync(METADATA_FILE).size;
    const savings = ((originalSize - metadataSize) / originalSize * 100).toFixed(1);
    
    console.log(`✅ Optimization complete!`);
    console.log(`📦 Original size: ${(originalSize / 1024).toFixed(1)}KB`);
    console.log(`📦 Metadata size: ${(metadataSize / 1024).toFixed(1)}KB`);
    console.log(`💾 Memory saved: ${savings}% (${((originalSize - metadataSize) / 1024).toFixed(1)}KB)`);
    console.log(`📁 Content files: ${postsData.posts.length} files in ${CONTENT_DIR}`);
    
  } catch (error) {
    console.error('❌ Error optimizing for Workers:', error);
    process.exit(1);
  }
}

optimizeForWorkers();
