import { Container, Typography, Box } from '@mui/material';
import Navigation from '@/components/Navigation';
import PostCard from '@/components/PostCard';
import { getAllPosts } from '@/lib/posts';
import type { Metadata } from 'next';

/**
 * Generate metadata for the posts page
 */
export async function generateMetadata(): Promise<Metadata> {
  const posts = getAllPosts();
  return {
    title: 'Blog Posts',
    description: `Browse all ${posts.length} blog posts`,
  };
}

/**
 * Posts listing page - displays all available blog posts
 * 
 * This page follows the C4C principle by using clear, reusable components
 * and the HIPI principle by hiding implementation details behind clean interfaces.
 * 
 * Uses static generation to pre-render all posts at build time.
 */
export default async function PostsPage() {
  // Fetch posts at build time, not runtime
  const posts = getAllPosts();

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navigation title="Blog Posts" showHome={true} showBack={false} />

      <Container maxWidth="md" sx={{ flex: 1, py: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ mb: 4 }}>
          Blog Posts
        </Typography>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </Box>
      </Container>
    </Box>
  );
} 