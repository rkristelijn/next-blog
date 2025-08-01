#!/usr/bin/env node

/**
 * Cloudflare Worker Initialization Script
 * 
 * This script checks if the Cloudflare Worker exists and provides guidance for deployment.
 * For existing projects, workers are created automatically on first deployment.
 */

import { execSync } from 'child_process';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

// Read wrangler config to get worker name
const wranglerConfig = JSON.parse(
  readFileSync(join(projectRoot, 'wrangler.jsonc'), 'utf8')
    .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
    .replace(/\/\/.*$/gm, '') // Remove single line comments
);

const workerName = wranglerConfig.name;

console.log(`🔍 Checking if Cloudflare Worker '${workerName}' exists...`);

try {
  // Check if worker exists by trying a dry-run deployment
  const dryRunOutput = execSync('npx wrangler deploy --dry-run', { 
    encoding: 'utf8',
    cwd: projectRoot,
    stdio: ['pipe', 'pipe', 'pipe']
  });
  
  console.log(`✅ Cloudflare Worker '${workerName}' already exists`);
  console.log('📋 Dry-run deployment successful');
  console.log('💡 You can deploy with: npm run deploy');
  
} catch (error) {
  // If dry-run fails, it might mean the worker doesn't exist
  if (error.message.includes('No deployments found') || 
      error.message.includes('Worker not found') ||
      error.message.includes('not found')) {
    
    console.log(`⚠️ Cloudflare Worker '${workerName}' does not exist`);
    console.log('💡 This is normal for new projects');
    console.log('🚀 The worker will be created automatically on first deployment');
    console.log('');
    console.log('📝 To deploy and create the worker:');
    console.log('   npm run deploy');
    console.log('');
    console.log('📝 Or build and deploy manually:');
    console.log('   npm run ci:build');
    console.log('   npx wrangler deploy');
    
  } else {
    console.error('❌ Error checking Cloudflare Worker:', error.message);
    
    if (error.message.includes('Authentication')) {
      console.log('\n💡 Make sure you are logged in to Cloudflare:');
      console.log('   npx wrangler login');
    } else if (error.message.includes('Account ID')) {
      console.log('\n💡 Make sure your CLOUDFLARE_ACCOUNT_ID is set:');
      console.log('   export CLOUDFLARE_ACCOUNT_ID=your_account_id');
    } else {
      console.log('\n💡 Check your wrangler configuration:');
      console.log('   npx wrangler whoami');
      console.log('   npx wrangler deploy --dry-run');
    }
    
    process.exit(1);
  }
}

console.log('\n🎉 Worker check complete!'); 