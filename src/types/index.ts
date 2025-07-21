/**
 * Type definitions for the Next.js Blog application
 */

export interface Post {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  slug: string;
  content: string;
}

export interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export type PostsPageProps = Record<string, never>;

export interface PostCardProps {
  post: Post;
}

export interface PostContentProps {
  post: Post;
}

export interface NavigationProps {
  title?: string;
  showHome?: boolean;
  showBack?: boolean;
} 