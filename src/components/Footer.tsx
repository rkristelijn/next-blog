/**
 * Footer component - displays the main footer with relevant links
 * 
 * This component encapsulates the footer logic and provides a consistent
 * interface for different pages. It follows the HIPI principle by hiding
 * implementation details behind a clean interface.
 */

import { Box, Container, Stack, Button, Typography } from '@mui/material';
import { 
  GitHub as GitHubIcon,
  Launch as LaunchIcon,
  Code as CodeIcon
} from '@mui/icons-material';

/**
 * Footer component for consistent footer across pages
 */
export default function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: 'background.paper', py: 4 }}>
      <Container maxWidth="lg">
        <Stack spacing={3}>
          {/* Main links */}
          <Stack direction="row" spacing={3} justifyContent="center" flexWrap="wrap">
            <Button
              startIcon={<LaunchIcon />}
              href="https://next-blog.rkristelijn.workers.dev"
              target="_blank"
              rel="noopener noreferrer"
              color="inherit"
            >
              Live Site
            </Button>
            <Button
              startIcon={<GitHubIcon />}
              href="https://github.com/rkristelijn/next-blog"
              target="_blank"
              rel="noopener noreferrer"
              color="inherit"
            >
              GitHub Repository
            </Button>
            <Button
              startIcon={<CodeIcon />}
              href="https://nextjs.org/docs"
              target="_blank"
              rel="noopener noreferrer"
              color="inherit"
            >
              Next.js Docs
            </Button>
          </Stack>
          
          {/* Project info */}
          <Typography variant="body2" color="text.secondary" textAlign="center">
            Built with Next.js 15, Material-UI, and deployed on Cloudflare Workers
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
} 