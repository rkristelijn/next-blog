/**
 * Header component - displays the main navigation header
 * 
 * This component encapsulates the header logic and provides a consistent
 * interface for different pages. It follows the HIPI principle by hiding
 * implementation details behind a clean interface.
 */

import Link from 'next/link';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Article as ArticleIcon } from '@mui/icons-material';
import ThemeToggle from './ThemeToggle';

interface HeaderProps {
  title?: string;
  showBlogPostsButton?: boolean;
}

/**
 * Header component for consistent navigation
 * 
 * @param title - Optional title to display in the header
 * @param showBlogPostsButton - Whether to show the blog posts button (default: true)
 */
export default function Header({ 
  title = "Next.js Blog", 
  showBlogPostsButton = true 
}: HeaderProps) {
  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {showBlogPostsButton && (
            <Button 
              color="inherit" 
              component={Link} 
              href="/posts"
              startIcon={<ArticleIcon />}
            >
              Blog Posts
            </Button>
          )}
          <ThemeToggle />
        </Box>
      </Toolbar>
    </AppBar>
  );
} 