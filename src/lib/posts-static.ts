/**
 * Static posts data layer - optimized for Cloudflare Workers
 * 
 * This module reads posts metadata from a lightweight JSON file and loads
 * content on-demand to reduce memory usage and avoid Worker resource limits.
 */

import type { Post } from '@/types';

// Import the lightweight metadata (this will be bundled at build time)
import postsMetadata from '@/data/posts-metadata.json';

// Define the metadata post type
interface PostMetadata {
  id: string;
  slug: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  originalFilename: string;
}

// Cache for loaded content to avoid re-loading
const contentCache = new Map<string, string>();

/**
 * Load content for a specific post on-demand
 * @param slug - The post slug
 * @returns The post content
 */
const loadPostContent = async (slug: string): Promise<string> => {
  // Check cache first
  if (contentCache.has(slug)) {
    return contentCache.get(slug)!;
  }

  try {
    // Import content dynamically
    const contentModule = await import(`@/data/content/${slug}.json`);
    const content = contentModule.content || contentModule.default?.content || '';
    
    // Cache the content
    contentCache.set(slug, content);
    return content;
  } catch (error) {
    console.error(`Error loading content for ${slug}:`, error);
    
    // Return empty content instead of throwing
    // This allows the page to render without content rather than crashing
    const fallbackContent = `# ${slug}\n\nContent could not be loaded. Please try refreshing the page.`;
    contentCache.set(slug, fallbackContent);
    return fallbackContent;
  }
}

/**
 * Get all blog posts from static data (metadata only for performance)
 * @returns Array of all posts with metadata (content excluded), sorted by date (newest first)
 */
export const getAllPosts = (): Omit<Post, 'content'>[] => {
  return (postsMetadata.posts as PostMetadata[])
    .map(post => ({
      id: post.id,
      slug: post.slug,
      title: post.title,
      date: post.date,
      author: post.author,
      excerpt: post.excerpt,
    }))
    .sort((a, b) => {
      // Sort by date, newest first
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB.getTime() - dateA.getTime();
    });
}

/**
 * Get a specific post by its slug (with content loaded on-demand)
 * @param slug - The post slug to look up
 * @returns The post if found, undefined otherwise
 */
export const getPostBySlug = async (slug: string): Promise<Post | undefined> => {
  const postMeta = (postsMetadata.posts as PostMetadata[]).find(post => post.slug === slug);
  
  if (!postMeta) {
    return undefined;
  }

  // Load content on-demand
  const content = await loadPostContent(slug);

  return {
    id: postMeta.id,
    slug: postMeta.slug,
    title: postMeta.title,
    date: postMeta.date,
    author: postMeta.author,
    excerpt: postMeta.excerpt,
    content,
  };
}

/**
 * Get a specific post metadata by its slug (synchronous, no content)
 * Use this for metadata operations and when content is not needed
 * @param slug - The post slug to look up
 * @returns The post metadata if found, undefined otherwise
 */
export const getPostMetaBySlug = (slug: string): Omit<Post, 'content'> | undefined => {
  const postMeta = (postsMetadata.posts as PostMetadata[]).find(post => post.slug === slug);
  
  if (!postMeta) {
    return undefined;
  }

  return {
    id: postMeta.id,
    slug: postMeta.slug,
    title: postMeta.title,
    date: postMeta.date,
    author: postMeta.author,
    excerpt: postMeta.excerpt,
  };
}

/**
 * Get all post slugs (useful for static generation)
 * @returns Array of all post slugs
 */
export const getAllPostSlugs = (): string[] => {
  return postsMetadata.slugs;
}

/**
 * Check if a post exists
 * @param slug - The post slug to check
 * @returns True if the post exists, false otherwise
 */
export const postExists = (slug: string): boolean => {
  return postsMetadata.slugs.includes(slug);
} 