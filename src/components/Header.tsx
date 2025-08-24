/**
 * Header component - unified header with breadcrumb support
 * 
 * This component provides consistent navigation across all pages with
 * optional breadcrumb functionality. It follows the HIPI principle by
 * hiding implementation details behind a clean interface.
 */

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { AppBar, Toolbar, Typography, Button, Box, Breadcrumbs } from '@mui/material';
import { 
  Home as HomeIcon,
  Article as ArticleIcon,
  NavigateNext as NavigateNextIcon
} from '@mui/icons-material';
import ThemeToggle from './ThemeToggle';

// Extend window type for theme mode
declare global {
  interface Window {
    __THEME_MODE__?: 'light' | 'dark';
  }
}

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface HeaderProps {
  title?: string;
  breadcrumbs?: BreadcrumbItem[];
}

/**
 * Unified header component for consistent navigation
 * 
 * @param title - Optional title to display in the header
 * @param breadcrumbs - Optional breadcrumb navigation items
 */
export default function Header({ 
  title = "Next.js Blog",
  breadcrumbs = []
}: HeaderProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // During SSR/initial render, use a simple header to prevent FOUC
  if (!isClient) {
    return (
      <Box
        component="header"
        sx={{
          backgroundColor: 'var(--mui-palette-background-paper)',
          borderBottom: '1px solid var(--mui-palette-divider)',
          boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 3,
            py: 2,
            minHeight: '64px',
          }}
        >
          <Typography 
            variant="h6" 
            component="div"
            sx={{ 
              color: 'var(--mui-palette-text-primary)',
              fontWeight: 500,
            }}
          >
            {breadcrumbs.length > 0 ? breadcrumbs[breadcrumbs.length - 1].label : title}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {/* Placeholder for theme toggle */}
            <Box sx={{ width: '40px', height: '40px' }} />
          </Box>
        </Box>
      </Box>
    );
  }

  // Full MUI header after hydration
  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar>
        {/* Left side - Title or Breadcrumbs */}
        <Box sx={{ flexGrow: 1 }}>
          {breadcrumbs.length > 0 ? (
            <Breadcrumbs 
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumb"
            >
              {breadcrumbs.map((crumb, index) => {
                const isLast = index === breadcrumbs.length - 1;
                
                if (isLast || !crumb.href) {
                  return (
                    <Typography 
                      key={index}
                      color={isLast ? "text.primary" : "text.secondary"}
                      variant="h6"
                      component="span"
                    >
                      {crumb.label}
                    </Typography>
                  );
                }
                
                return (
                  <Button
                    key={index}
                    color="inherit"
                    component={Link}
                    href={crumb.href}
                    sx={{ 
                      minWidth: 'auto',
                      p: 0,
                      textTransform: 'none',
                      fontSize: '1.25rem',
                      fontWeight: 500
                    }}
                  >
                    {crumb.label}
                  </Button>
                );
              })}
            </Breadcrumbs>
          ) : (
            <Typography variant="h6" component="div">
              {title}
            </Typography>
          )}
        </Box>
        
        {/* Right side - Navigation buttons and theme toggle */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {/* Home button - only show if not already on home */}
          {breadcrumbs.length > 0 && (
            <Button 
              color="inherit" 
              component={Link} 
              href="/"
              startIcon={<HomeIcon />}
            >
              Home
            </Button>
          )}
          
          {/* Blog Posts button - only show if not already on posts page */}
          {(breadcrumbs.length === 0 || !breadcrumbs.some(crumb => crumb.href === '/posts')) && (
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
