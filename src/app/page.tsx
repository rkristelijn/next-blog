import Image from "next/image";
import Link from "next/link";
import { 
  Container, 
  Typography, 
  Button, 
  Box, 
  Card, 
  CardContent, 
  Stack
} from '@mui/material';
import { 
  Article as ArticleIcon,
  School as SchoolIcon,
  GitHub as GitHubIcon,
  Language as LanguageIcon
} from '@mui/icons-material';
import Navigation from '@/components/Navigation';

export default function Home() {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navigation title="Next.js Blog" showHome={false} showBack={false} showBlogPosts={true} />

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

        <Box sx={{ display: 'flex', gap: 3, mb: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
          <Card sx={{ minWidth: 280, flex: '1 1 300px' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" gutterBottom>
                🚀
              </Typography>
              <Typography variant="h6" gutterBottom>
                Fast
              </Typography>
              <Typography color="text.secondary">
                Built with Next.js for optimal performance
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{ minWidth: 280, flex: '1 1 300px' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" gutterBottom>
                📝
              </Typography>
              <Typography variant="h6" gutterBottom>
                Markdown
              </Typography>
              <Typography color="text.secondary">
                Write content in Markdown with MDX support
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{ minWidth: 280, flex: '1 1 300px' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" gutterBottom>
                ☁️
              </Typography>
              <Typography variant="h6" gutterBottom>
                Cloudflare
              </Typography>
              <Typography color="text.secondary">
                Deployed globally on Cloudflare Workers
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Container>

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
    </Box>
  );
}
