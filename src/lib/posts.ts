/**
 * Posts data layer - handles all post-related data operations
 * 
 * This module encapsulates all post data logic, making it easier to:
 * - Switch data sources (CMS, file system, API)
 * - Add caching and optimization
 * - Implement proper error handling
 * - Test data operations independently
 */

import type { Post } from '@/types';

/**
 * Sample blog posts data
 * In a real application, this would come from a CMS, database, or file system
 */
const POSTS_DATA: Record<string, Post> = {
  'hello-world': {
    id: 'hello-world',
    title: 'Hello World',
    content: `# Hello World

Welcome to my first blog post! This is a simple introduction to my blog.

## What to expect

I'll be writing about:
- Web development
- Next.js tips and tricks
- Personal projects
- And much more!

Stay tuned for more content!`,
    date: '2024-01-15',
    excerpt: 'Welcome to my first blog post!',
    slug: 'hello-world'
  },
  'getting-started': {
    id: 'getting-started',
    title: 'Getting Started with Next.js',
    content: `# Getting Started with Next.js

Next.js is a powerful React framework that makes building full-stack web applications simple and efficient.

## Why Next.js?

- **Server-side rendering** for better SEO
- **File-based routing** for intuitive navigation
- **API routes** for backend functionality
- **Built-in optimizations** for performance

## Getting Started

1. Create a new project: \`npx create-next-app@latest\`
2. Navigate to your project: \`cd your-project\`
3. Start the development server: \`npm run dev\`

That's it! You're ready to build amazing web applications.`,
    date: '2024-01-20',
    excerpt: 'Learn how to build modern web applications with Next.js.',
    slug: 'getting-started'
  }
};

/**
 * Get all blog posts
 * @returns Array of all posts
 */
export function getAllPosts(): Post[] {
  return Object.values(POSTS_DATA);
}

/**
 * Get a specific post by its slug
 * @param slug - The post slug to look up
 * @returns The post if found, undefined otherwise
 */
export function getPostBySlug(slug: string): Post | undefined {
  return POSTS_DATA[slug];
}

/**
 * Get all post slugs (useful for static generation)
 * @returns Array of all post slugs
 */
export function getAllPostSlugs(): string[] {
  return Object.keys(POSTS_DATA);
}

/**
 * Check if a post exists
 * @param slug - The post slug to check
 * @returns True if the post exists, false otherwise
 */
export function postExists(slug: string): boolean {
  return slug in POSTS_DATA;
} 