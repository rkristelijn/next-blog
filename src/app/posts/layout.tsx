import type { Metadata } from 'next';
import { getAllPosts } from '@/lib/posts-static';

/**
 * Generate metadata for the posts page
 */
export async function generateMetadata(): Promise<Metadata> {
  const posts = getAllPosts();
  return {
    title: 'Blog Posts',
    description: `Browse all ${posts.length} blog posts with search and sorting options`,
  };
}

export default function PostsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
