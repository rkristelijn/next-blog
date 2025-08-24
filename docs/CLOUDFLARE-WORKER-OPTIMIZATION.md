# Cloudflare Worker Resource Optimization

## Problem: Error 1102 - Worker exceeded resource limits

**Error Details:**
- Error 1102 Ray ID: 97444d3e0ece590c
- "Worker exceeded resource limits"
- Occurred due to large bundle size and memory usage

## Root Cause Analysis

### Original Issue
- `posts.json` file was **226KB** containing full content for all blog posts
- This large file was loaded into memory on every Worker request
- Exceeded Cloudflare Worker resource limits:
  - **CPU Time**: 10ms (free) / 50ms (paid)
  - **Memory Usage**: 128MB limit
  - **Bundle Size**: Affects startup time and memory

### Memory Usage Pattern
```
Original: 226KB posts.json loaded on every request
├── 19 blog posts with full content
├── Mermaid diagrams and code blocks
└── All loaded into Worker memory simultaneously
```

## Solution: Lazy Loading Architecture

### 1. **Data Separation Strategy**
Split posts data into two parts:
- **Metadata** (10.9KB): titles, excerpts, dates, slugs
- **Content** (individual files): full post content loaded on-demand

### 2. **Implementation**

#### Build Process Optimization
```bash
# New build pipeline
npm run prebuild
├── generate-posts-data.js    # Creates posts.json (226KB)
└── optimize-for-workers.js   # Splits into metadata + content files
    ├── posts-metadata.json   # 10.9KB (95.2% reduction)
    └── content/
        ├── post-slug-1.json
        ├── post-slug-2.json
        └── ... (19 individual files)
```

#### Memory Usage Optimization
```typescript
// Before: Load all content immediately
import postsData from '@/data/posts.json'; // 226KB

// After: Load metadata only, content on-demand
import postsMetadata from '@/data/posts-metadata.json'; // 10.9KB

// Content loaded only when needed
const content = await import(`@/data/content/${slug}.json`);
```

### 3. **Performance Benefits**

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| Initial Bundle | 226KB | 10.9KB | **95.2% reduction** |
| Memory Usage | All posts loaded | Only requested post | **~95% reduction** |
| Startup Time | High (large bundle) | Fast (small bundle) | **Significantly faster** |
| Worker Limits | Exceeded | Within limits | **✅ Resolved** |

### 4. **Code Changes**

#### Updated Posts API
```typescript
// Metadata only (fast, low memory)
export function getAllPosts(): Omit<Post, 'content'>[]

// Full post with content (on-demand)
export async function getPostBySlug(slug: string): Promise<Post | undefined>

// Metadata only for performance
export function getPostMetaBySlug(slug: string): Omit<Post, 'content'> | undefined
```

#### Page Optimizations
```typescript
// Posts listing: metadata only
const posts = getAllPosts(); // No content loaded

// Post detail: content loaded on-demand
const post = await getPostBySlug(slug); // Content loaded when needed
```

## Implementation Details

### 1. **Scripts**
- `scripts/generate-posts-data.js`: Creates full posts.json
- `scripts/optimize-for-workers.js`: Splits data for Workers
- Integrated into build pipeline via `prebuild` script

### 2. **Caching Strategy**
```typescript
const contentCache = new Map<string, string>();

async function loadPostContent(slug: string): Promise<string> {
  if (contentCache.has(slug)) {
    return contentCache.get(slug)!; // Return cached content
  }
  
  const content = await import(`@/data/content/${slug}.json`);
  contentCache.set(slug, content); // Cache for future requests
  return content;
}
```

### 3. **Type Safety**
```typescript
// Flexible post types
interface PostCardProps {
  post: Omit<Post, 'content'> | Post; // Supports both metadata and full posts
}
```

## Results

### ✅ **Deployment Success**
- Worker deployment completed successfully
- No more Error 1102 resource limit errors
- Site accessible at: https://next-blog.rkristelijn.workers.dev

### ✅ **Performance Improvements**
- **95.2% reduction** in initial bundle size
- **Faster startup times** for Workers
- **Lower memory usage** per request
- **On-demand content loading** only when needed

### ✅ **Scalability**
- Can handle many more blog posts without hitting limits
- Memory usage scales with individual post size, not total content
- Efficient for large blogs with hundreds of posts

## Best Practices for Cloudflare Workers

### 1. **Bundle Size Optimization**
- Keep initial bundles small (<50KB recommended)
- Use dynamic imports for large content
- Split data into metadata + content

### 2. **Memory Management**
- Load data on-demand, not upfront
- Implement caching for frequently accessed content
- Monitor Worker memory usage

### 3. **Resource Monitoring**
```bash
# Check bundle sizes
npm run build # Shows route sizes

# Monitor Worker performance
wrangler tail # Real-time logs

# Test resource usage
npm run preview # Local testing
```

## Troubleshooting

### If Error 1102 Returns
1. **Check bundle sizes**: Look for large imports
2. **Monitor memory usage**: Use `wrangler tail` for logs
3. **Profile content loading**: Identify heavy operations
4. **Consider pagination**: For very large datasets

### Performance Monitoring
```typescript
// Add timing logs in development
console.time('content-load');
const content = await loadPostContent(slug);
console.timeEnd('content-load');
```

## Future Optimizations

1. **Content Compression**: Gzip content files
2. **CDN Caching**: Cache content files at edge
3. **Incremental Loading**: Load content sections on scroll
4. **Service Worker**: Client-side caching for repeat visits

This optimization ensures your Next.js blog runs efficiently within Cloudflare Worker resource limits while maintaining excellent performance and user experience.
