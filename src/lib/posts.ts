/**
 * Posts data layer - handles all post-related data operations
 * 
 * This module encapsulates all post data logic, making it easier to:
 * - Switch data sources (CMS, file system, API)
 * - Add caching and optimization
 * - Implement proper error handling
 * - Test data operations independently
 * 
 * Uses MDX files from src/content/posts/ for blog content.
 * 
 * MDX files should have the following frontmatter:
 * ---
 * title: "Post Title"
 * date: "YYYY-MM-DD"
 * excerpt: "Brief description"
 * ---
 * 
 * The content follows the frontmatter in standard markdown format.
 */

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { Post } from '@/types';

const POSTS_DIRECTORY = path.join(process.cwd(), 'src/content/posts');

/**
 * Get all blog posts from MDX files
 * @returns Array of all posts with metadata
 */
export const getAllPosts = (): Post[] => {
  try {
    // Get all MDX files from the posts directory
    const fileNames = fs.readdirSync(POSTS_DIRECTORY);
    const mdxFiles = fileNames.filter(fileName => fileName.endsWith('.mdx'));
    
    const posts = mdxFiles.map(fileName => {
      const slug = fileName.replace(/\.mdx$/, '');
      return getPostBySlug(slug);
    }).filter((post): post is Post => post !== undefined);
    
    // Sort posts by date (newest first)
    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error('Error reading posts directory:', error);
    return [];
  }
}

/**
 * Get a specific post by its slug
 * @param slug - The post slug to look up
 * @returns The post if found, undefined otherwise
 */
export const getPostBySlug = (slug: string): Post | undefined => {
  try {
    const fullPath = path.join(POSTS_DIRECTORY, `${slug}.mdx`);
    
    // Check if file exists
    if (!fs.existsSync(fullPath)) {
      return undefined;
    }
    
    // Read the MDX file
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    
    // Parse the frontmatter and content
    const { data, content } = matter(fileContents);
    
    // Validate required fields
    if (!data.title || !data.date || !data.excerpt || !data.author) {
      console.warn(`Missing required frontmatter fields in ${slug}.mdx`);
      return undefined;
    }
    
    return {
      id: slug,
      slug,
      title: data.title,
      date: data.date,
      author: data.author,
      excerpt: data.excerpt,
      content
    };
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return undefined;
  }
}

/**
 * Get all post slugs (useful for static generation)
 * @returns Array of all post slugs
 */
export const getAllPostSlugs = (): string[] => {
  try {
    const fileNames = fs.readdirSync(POSTS_DIRECTORY);
    return fileNames
      .filter(fileName => fileName.endsWith('.mdx'))
      .map(fileName => fileName.replace(/\.mdx$/, ''));
  } catch (error) {
    console.error('Error reading posts directory:', error);
    return [];
  }
}

/**
 * Check if a post exists
 * @param slug - The post slug to check
 * @returns True if the post exists, false otherwise
 */
export const postExists = (slug: string): boolean => {
  const fullPath = path.join(POSTS_DIRECTORY, `${slug}.mdx`);
  return fs.existsSync(fullPath);
} 