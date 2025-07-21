/**
 * Static posts data layer - reads from pre-generated JSON file
 * 
 * This module reads posts from a static JSON file generated at build time,
 * avoiding any runtime file system operations that aren't supported in
 * Cloudflare Workers environment.
 */

import type { Post } from '@/types';

// Import the static data (this will be bundled at build time)
import postsData from '@/data/posts.json';

/**
 * Get all blog posts from static data
 * @returns Array of all posts with metadata
 */
export function getAllPosts(): Post[] {
  return postsData.posts;
}

/**
 * Get a specific post by its slug
 * @param slug - The post slug to look up
 * @returns The post if found, undefined otherwise
 */
export function getPostBySlug(slug: string): Post | undefined {
  return postsData.posts.find((post: Post) => post.slug === slug);
}

/**
 * Get all post slugs (useful for static generation)
 * @returns Array of all post slugs
 */
export function getAllPostSlugs(): string[] {
  return postsData.slugs;
}

/**
 * Check if a post exists
 * @param slug - The post slug to check
 * @returns True if the post exists, false otherwise
 */
export function postExists(slug: string): boolean {
  return postsData.slugs.includes(slug);
} 