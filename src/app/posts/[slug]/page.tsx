import { notFound } from 'next/navigation';
import { Container, Box } from '@mui/material';
import Navigation from '@/components/Navigation';
import PostContent from '@/components/PostContent';
import { getPostBySlug } from '@/lib/posts';
import type { PostPageProps } from '@/types';

/**
 * Individual blog post page - displays a single blog post
 * 
 * This page follows the C4C principle by using clear, reusable components
 * and proper error handling. It also follows the HIPI principle by hiding
 * data fetching logic behind clean interfaces.
 */
export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navigation title={post.title} showHome={true} showBack={true} />

      <Container maxWidth="md" sx={{ flex: 1, py: 4 }}>
        <PostContent post={post} />
      </Container>
    </Box>
  );
} 