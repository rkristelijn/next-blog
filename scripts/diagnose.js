#!/usr/bin/env node

/**
 * Diagnostic script for Next.js Blog Template
 * Checks common issues that prevent GitHub Actions from working
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const REQUIRED_FILES = [
  '.github/workflows/deploy.yml',
  'src/content/posts',
  'scripts/generate-posts-data.js',
  'package.json',
  'wrangler.jsonc'
];

const REQUIRED_SECRETS = [
  'CLOUDFLARE_API_TOKEN',
  'CLOUDFLARE_ACCOUNT_ID'
];

console.log('🔍 Next.js Blog Template Diagnostic Tool\n');

let issues = 0;
let warnings = 0;

const checkFile = (filePath) => {
  const fullPath = path.join(process.cwd(), filePath);
  if (fs.existsSync(fullPath)) {
    console.log(`✅ ${filePath} - Found`);
    return true;
  } else {
    console.log(`❌ ${filePath} - Missing`);
    issues++;
    return false;
  }
}

const checkDirectory = (dirPath) => {
  const fullPath = path.join(process.cwd(), dirPath);
  if (fs.existsSync(fullPath) && fs.statSync(fullPath).isDirectory()) {
    const files = fs.readdirSync(fullPath);
    const mdxFiles = files.filter(f => f.endsWith('.mdx'));
    console.log(`✅ ${dirPath} - Found (${mdxFiles.length} posts)`);
    return mdxFiles.length;
  } else {
    console.log(`❌ ${dirPath} - Missing or not a directory`);
    issues++;
    return 0;
  }
}

const checkGitBranch = () => {
  try {
    const branch = execSync('git branch --show-current', { encoding: 'utf8' }).trim();
    if (branch === 'main') {
      console.log(`✅ Git branch - ${branch}`);
    } else {
      console.log(`⚠️  Git branch - ${branch} (should be 'main' for auto-deployment)`);
      warnings++;
    }
    return branch;
  } catch (error) {
    console.log(`❌ Git branch - Unable to determine (${error.message})`);
    issues++;
    return null;
  }
}

const checkPostsContent = () => {
  const postsDir = path.join(process.cwd(), 'src/content/posts');
  if (!fs.existsSync(postsDir)) {
    return;
  }

  const files = fs.readdirSync(postsDir);
  const mdxFiles = files.filter(f => f.endsWith('.mdx'));
  
  let validPosts = 0;
  let invalidPosts = 0;

  mdxFiles.forEach(fileName => {
    const filePath = path.join(postsDir, fileName);
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Check for required frontmatter
    const hasFrontmatter = content.startsWith('---');
    const hasTitle = content.includes('title:');
    const hasDate = content.includes('date:');
    const hasExcerpt = content.includes('excerpt:');
    
    if (hasFrontmatter && hasTitle && hasDate && hasExcerpt) {
      validPosts++;
    } else {
      console.log(`⚠️  ${fileName} - Missing required frontmatter (title, date, or excerpt)`);
      invalidPosts++;
      warnings++;
    }
  });

  if (validPosts > 0) {
    console.log(`✅ Posts validation - ${validPosts} valid posts`);
  }
  if (invalidPosts > 0) {
    console.log(`⚠️  Posts validation - ${invalidPosts} posts need fixing`);
  }
}

const checkPackageJson = () => {
  try {
    const packagePath = path.join(process.cwd(), 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
    
    const requiredScripts = ['ci:build', 'prebuild'];
    const missingScripts = requiredScripts.filter(script => !packageJson.scripts[script]);
    
    if (missingScripts.length === 0) {
      console.log(`✅ Package.json scripts - All required scripts present`);
    } else {
      console.log(`❌ Package.json scripts - Missing: ${missingScripts.join(', ')}`);
      issues++;
    }
  } catch (error) {
    console.log(`❌ Package.json - Unable to read or parse`);
    issues++;
  }
}

const testPostsGeneration = () => {
  try {
    console.log('\n🧪 Testing posts data generation...');
    execSync('node scripts/generate-posts-data.js', { stdio: 'pipe' });
    
    const dataPath = path.join(process.cwd(), 'src/data/posts.json');
    if (fs.existsSync(dataPath)) {
      const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
      console.log(`✅ Posts generation - Generated ${data.posts.length} posts`);
    } else {
      console.log(`❌ Posts generation - posts.json not created`);
      issues++;
    }
  } catch (error) {
    console.log(`❌ Posts generation - Failed: ${error.message}`);
    issues++;
  }
}

const checkNodeVersion = () => {
  const version = process.version;
  const majorVersion = parseInt(version.slice(1).split('.')[0]);
  
  if (majorVersion >= 18) {
    console.log(`✅ Node.js version - ${version}`);
  } else {
    console.log(`⚠️  Node.js version - ${version} (recommend Node.js 18+)`);
    warnings++;
  }
}

// Run diagnostics
console.log('📁 Checking required files...');
REQUIRED_FILES.forEach(file => {
  if (file === 'src/content/posts') {
    checkDirectory(file);
  } else {
    checkFile(file);
  }
});

console.log('\n🔧 Checking configuration...');
checkNodeVersion();
checkGitBranch();
checkPackageJson();

console.log('\n📝 Checking posts content...');
checkPostsContent();

console.log('\n🧪 Running tests...');
testPostsGeneration();

console.log('\n💡 GitHub Secrets Check...');
console.log('⚠️  Cannot check GitHub secrets from local environment.');
console.log('   Please verify in your GitHub repository settings:');
REQUIRED_SECRETS.forEach(secret => {
  console.log(`   - ${secret}`);
});

// Summary
console.log('\n📊 Diagnostic Summary');
console.log('='.repeat(50));

if (issues === 0 && warnings === 0) {
  console.log('🎉 All checks passed! Your setup looks good.');
  console.log('   If GitHub Actions still fails, check:');
  console.log('   1. GitHub repository secrets');
  console.log('   2. Cloudflare account status');
  console.log('   3. Recent workflow runs in GitHub Actions tab');
} else {
  if (issues > 0) {
    console.log(`❌ Found ${issues} critical issue(s) that need fixing`);
  }
  if (warnings > 0) {
    console.log(`⚠️  Found ${warnings} warning(s) that should be addressed`);
  }
  
  console.log('\n🔧 Next steps:');
  console.log('1. Fix the issues listed above');
  console.log('2. Run this diagnostic again');
  console.log('3. Check the troubleshooting guide: docs/troubleshooting-github-actions.md');
}

console.log('\n📚 For more help:');
console.log('- Troubleshooting guide: docs/troubleshooting-github-actions.md');
console.log('- Original repository: https://github.com/rkristelijn/next-blog');
console.log('- Create an issue: https://github.com/rkristelijn/next-blog/issues');

process.exit(issues > 0 ? 1 : 0);
