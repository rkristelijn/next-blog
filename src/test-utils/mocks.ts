/**
 * Mock data for testing
 */

import type { Post } from '../types';

export const mockPost: Post = {
  id: 'test-post',
  slug: 'test-post-slug',
  title: 'Test Blog Post',
  excerpt: 'This is a test excerpt for the blog post.',
  content: '# Test Content\n\nThis is test content for the blog post.',
  date: '2024-08-24',
  author: 'Test Author',
  originalFilename: 'test-post.mdx',
};

export const mockPosts: Post[] = [
  mockPost,
  {
    id: 'second-post',
    slug: 'second-post-slug',
    title: 'Second Test Post',
    excerpt: 'This is the second test post excerpt.',
    content: '# Second Post\n\nContent for the second post.',
    date: '2024-08-23',
    author: 'Another Author',
    originalFilename: 'second-post.mdx',
  },
  {
    id: 'third-post',
    slug: 'third-post-slug',
    title: 'Third Test Post',
    excerpt: 'This is the third test post excerpt.',
    content: '# Third Post\n\nContent for the third post.',
    date: '2024-08-22',
    originalFilename: 'third-post.mdx',
  },
];

export const mockMermaidChart = `
graph TD
    A[Start] --> B{Decision}
    B -->|Yes| C[Success]
    B -->|No| D[Failure]
`;

export const mockFeatures = [
  {
    icon: '🚀',
    title: 'Fast',
    description: 'Built with Next.js for optimal performance'
  },
  {
    icon: '📝',
    title: 'Markdown',
    description: 'Write content in Markdown with MDX support and Mermaid diagrams'
  },
  {
    icon: '☁️',
    title: 'Cloudflare',
    description: 'Deployed globally on Cloudflare Workers'
  }
];
