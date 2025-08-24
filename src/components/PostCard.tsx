/**
 * PostCard component - displays a single blog post preview
 * 
 * This component encapsulates the logic for displaying a post preview card.
 * It follows the single responsibility principle and can be easily reused
 * across different parts of the application.
 */

'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, Typography, Stack } from '@mui/material';
import type { PostCardProps } from '@/types';

/**
 * PostCard component for displaying post previews
 * 
 * @param post - The post data to display
 */
export default function PostCard({ post }: PostCardProps) {
  const router = useRouter();

  const handleCardClick = (e: React.MouseEvent) => {
    // Prevent navigation if clicking on a link
    if ((e.target as HTMLElement).tagName === 'A') {
      return;
    }
    
    router.push(`/posts/${post.slug}`);
  };

  return (
    <Card 
      onClick={handleCardClick}
      sx={{ 
        transition: 'box-shadow 0.2s ease, transform 0.2s ease',
        cursor: 'pointer',
        '&:hover': {
          boxShadow: 4,
          transform: 'translateY(-2px)'
        }
      }}
    >
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          <Link
            href={`/posts/${post.slug}`}
            style={{ 
              color: 'inherit', 
              textDecoration: 'none'
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.color = 'var(--mui-palette-primary-main)';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.color = 'inherit';
            }}
          >
            {post.title}
          </Link>
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