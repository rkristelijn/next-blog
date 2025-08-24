'use client';

import { useState, useCallback, useMemo } from 'react';
import { Container, Typography, Box } from '@mui/material';
import Header from '@/components/Header';
import PostCard from '@/components/PostCard';
import PostsFilter from '@/components/PostsFilter';
import { getAllPosts } from '@/lib/posts-static';
import type { Post } from '@/types';

/**
 * Posts listing page - displays all available blog posts with filtering and sorting
 * 
 * This page follows the C4C principle by using clear, reusable components
 * and the HIPI principle by hiding implementation details behind clean interfaces.
 * 
 * Uses static data to avoid runtime file system operations.
 */
export default function PostsPage() {
  // Memoize posts to prevent infinite loops
  const allPosts = useMemo(() => getAllPosts(), []);
  
  // Initialize with all posts
  const [filteredPosts, setFilteredPosts] = useState<Omit<Post, 'content'>[]>(allPosts);

  // Stabilize the callback to prevent unnecessary re-renders
  const handleFilteredPostsChange = useCallback((posts: Omit<Post, 'content'>[]) => {
    setFilteredPosts(posts);
  }, []);

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Blog Posts' }
  ];

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header breadcrumbs={breadcrumbs} />

      <Container maxWidth="md" sx={{ flex: 1, py: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ mb: 4 }}>
          Blog Posts
        </Typography>
        
        {/* Filter and Sort Controls */}
        <PostsFilter 
          posts={allPosts}
          onFilteredPostsChange={handleFilteredPostsChange}
        />
        
        {/* Posts List */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))
          ) : (
            <Box sx={{ 
              textAlign: 'center', 
              py: 8,
              color: 'text.secondary'
            }}>
              <Typography variant="h6" gutterBottom>
                No posts found
              </Typography>
              <Typography variant="body2">
                Try a different search term or change the sort option.
              </Typography>
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
} 