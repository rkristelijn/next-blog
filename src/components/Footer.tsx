/**
 * Footer component - displays the main footer with external links
 * 
 * This component encapsulates the footer logic and provides a consistent
 * interface for different pages. It follows the HIPI principle by hiding
 * implementation details behind a clean interface.
 */

import { Box, Container, Stack, Button } from '@mui/material';
import { 
  School as SchoolIcon,
  Language as LanguageIcon,
  GitHub as GitHubIcon
} from '@mui/icons-material';

/**
 * Footer component for consistent footer across pages
 */
export default function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: 'grey.100', py: 3 }}>
      <Container maxWidth="lg">
        <Stack direction="row" spacing={3} justifyContent="center">
          <Button
            startIcon={<SchoolIcon />}
            href="https://nextjs.org/learn"
            target="_blank"
            rel="noopener noreferrer"
            color="inherit"
          >
            Learn Next.js
          </Button>
          <Button
            startIcon={<LanguageIcon />}
            href="https://vercel.com/templates"
            target="_blank"
            rel="noopener noreferrer"
            color="inherit"
          >
            Templates
          </Button>
          <Button
            startIcon={<GitHubIcon />}
            href="https://nextjs.org"
            target="_blank"
            rel="noopener noreferrer"
            color="inherit"
          >
            Go to nextjs.org →
          </Button>
        </Stack>
      </Container>
    </Box>
  );
} 