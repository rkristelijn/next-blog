/**
 * Hero component - displays the main hero section of the home page
 * 
 * This component encapsulates the hero content and provides a clean
 * interface for the main landing area. It follows the single responsibility
 * principle by focusing only on hero content.
 */

import Image from "next/image";
import Link from "next/link";
import { 
  Container, 
  Typography, 
  Button, 
  Box, 
  Stack 
} from '@mui/material';
import { 
  Article as ArticleIcon,
  School as SchoolIcon
} from '@mui/icons-material';

/**
 * Hero component for the main landing section
 */
export default function Hero() {
  return (
    <Container maxWidth="lg" sx={{ flex: 1, py: 8 }}>
      <Box sx={{ textAlign: 'center', mb: 8 }}>
        <Image
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
          style={{ marginBottom: '2rem' }}
        />
        
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
          <Button
            variant="outlined"
            size="large"
            href="https://nextjs.org/docs"
            target="_blank"
            rel="noopener noreferrer"
            startIcon={<SchoolIcon />}
          >
            Next.js Docs
          </Button>
        </Stack>
      </Box>
    </Container>
  );
} 