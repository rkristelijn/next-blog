import { notFound } from 'next/navigation';
import { Container, Box } from '@mui/material';
import Header from '@/components/Header';
import PostContent from '@/components/PostContent';
import { getPostBySlug, getPostMetaBySlug, getAllPostSlugs } from '@/lib/posts-static';
import type { PostPageProps } from '@/types';
import type { Metadata } from 'next';

/**
 * Generate static params for all blog posts at build time
 */
export async function generateStaticParams() {
  try {
    const slugs = getAllPostSlugs();
    console.log('Generated static params for slugs:', slugs);
    return slugs.map((slug) => ({
      slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

/**
 * Generate metadata for individual post pages
 */
export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  // Use metadata-only version for performance
  const post = getPostMetaBySlug(slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}

/**
 * Individual blog post page - displays a single blog post
 * 
 * This page follows the C4C principle by using clear, reusable components
 * and proper error handling. It also follows the HIPI principle by hiding
 * data fetching logic behind clean interfaces.
 * 
 * Uses optimized static data to avoid Worker resource limits.
 */
export default async function PostPage({ params }: PostPageProps) {
  try {
    const { slug } = await params;
    console.log('Loading post with slug:', slug);
    
    // Load full post with content
    const post = await getPostBySlug(slug);

    if (!post) {
      console.log('Post not found for slug:', slug);
      notFound();
    }

    const breadcrumbs = [
      { label: 'Home', href: '/' },
      { label: 'Blog Posts', href: '/posts' },
      { label: post.title }
    ];

    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header breadcrumbs={breadcrumbs} />

        <Container maxWidth="md" sx={{ flex: 1, py: 4 }}>
          <PostContent post={post} />
        </Container>
      </Box>
    );
  } catch (error) {
    console.error('Error in PostPage:', error);
    notFound();
  }
} 