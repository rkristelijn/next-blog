/**
 * Navigation component - provides consistent navigation across the blog
 * 
 * This component encapsulates the navigation logic and provides a consistent
 * interface for different pages. It follows the HIPI principle by hiding
 * implementation details behind a clear interface.
 */

import Link from 'next/link';
import { AppBar, Toolbar, Button, Typography } from '@mui/material';
import { 
  ArrowBack as ArrowBackIcon,
  Home as HomeIcon
} from '@mui/icons-material';
import type { NavigationProps } from '@/types';

interface ExtendedNavigationProps extends NavigationProps {
  showBlogPosts?: boolean;
}

/**
 * Navigation component for consistent header navigation
 * 
 * @param title - Optional title to display in the navigation bar
 * @param showHome - Whether to show the home button (default: true)
 * @param showBack - Whether to show the back button (default: false)
 */
export default function Navigation({ 
  title, 
  showHome = true, 
  showBack = false,
  showBlogPosts = false
}: ExtendedNavigationProps) {
  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar>
        {showHome && (
          <Button
            color="inherit"
            component={Link}
            href="/"
            startIcon={<HomeIcon />}
          >
            Home
          </Button>
        )}
        
        {showBack && (
          <Button
            color="inherit"
            component={Link}
            href="/posts"
            startIcon={<ArrowBackIcon />}
            sx={{ ml: showHome ? 1 : 0 }}
          >
            Blog Posts
          </Button>
        )}
        
        {showBlogPosts && (
          <Button
            color="inherit"
            component={Link}
            href="/posts"
            sx={{ ml: 'auto' }}
          >
            Blog Posts
          </Button>
        )}
        
        {title && (
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ flexGrow: 1, ml: (showHome || showBack) ? 2 : 0 }}
          >
            {title}
          </Typography>
        )}
      </Toolbar>
    </AppBar>
  );
} 