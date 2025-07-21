/**
 * PostCard component - displays a single blog post preview
 * 
 * This component encapsulates the logic for displaying a post preview card.
 * It follows the single responsibility principle and can be easily reused
 * across different parts of the application.
 */

import Link from 'next/link';
import { Card, CardContent, Typography, Box, Stack } from '@mui/material';
import type { PostCardProps } from '@/types';

/**
 * PostCard component for displaying post previews
 * 
 * @param post - The post data to display
 */
export default function PostCard({ post }: PostCardProps) {
  return (
    <Card sx={{ 
      transition: 'box-shadow 0.2s ease',
      '&:hover': {
        boxShadow: 4
      }
    }}>
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          <Box
            component={Link}
            href={`/posts/${post.slug}`}
            sx={{ 
              color: 'inherit', 
              textDecoration: 'none',
              '&:hover': {
                color: 'primary.main'
              }
            }}
          >
            {post.title}
          </Box>
        </Typography>
        <Typography color="text.secondary" paragraph>
          {post.excerpt}
        </Typography>
        <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
          <Typography variant="body2" color="text.secondary">
            {post.date} by {post.author}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
} 