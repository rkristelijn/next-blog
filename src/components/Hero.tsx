/**
 * Hero component - displays the main hero section of the home page
 * 
 * This component encapsulates the hero content and provides a clean
 * interface for the main landing area. It follows the single responsibility
 * principle by focusing only on hero content.
 */

import Link from "next/link";
import { 
  Container, 
  Typography, 
  Button, 
  Box, 
  Stack 
} from '@mui/material';
import { 
  Article as ArticleIcon
} from '@mui/icons-material';

/**
 * Hero component for the main landing section
 */
export default function Hero() {
  return (
    <Container maxWidth="lg" sx={{ flex: 1, py: 8, backgroundColor: 'background.default' }}>
      <Box sx={{ textAlign: 'center', mb: 8 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to My Blog
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          A simple blog built with Next.js and deployed on Cloudflare Workers
        </Typography>

        <Stack direction="row" spacing={2} justifyContent="center" sx={{ mb: 6 }}>
          <Button
            variant="contained"
            size="large"
            component={Link}
            href="/posts"
            startIcon={<ArticleIcon />}
          >
            Read Blog Posts
          </Button>
        </Stack>
      </Box>
    </Container>
  );
} 