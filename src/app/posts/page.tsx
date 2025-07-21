import Link from 'next/link';
import { 
  Container, 
  Typography, 
  Card, 
  CardContent, 
  Box,
  AppBar,
  Toolbar,
  Button
} from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';

// This would typically come from a CMS or file system
const posts = [
  {
    id: 'hello-world',
    title: 'Hello World',
    excerpt: 'Welcome to my first blog post!',
    date: '2024-01-15',
    slug: 'hello-world'
  },
  {
    id: 'getting-started',
    title: 'Getting Started with Next.js',
    excerpt: 'Learn how to build modern web applications with Next.js.',
    date: '2024-01-20',
    slug: 'getting-started'
  }
];

export default function PostsPage() {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar>
          <Button 
            color="inherit" 
            component={Link} 
            href="/"
            startIcon={<ArrowBackIcon />}
          >
            Home
          </Button>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, ml: 2 }}>
            Blog Posts
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ flex: 1, py: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ mb: 4 }}>
          Blog Posts
        </Typography>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {posts.map((post) => (
            <Card key={post.id} sx={{ 
              transition: 'box-shadow 0.2s ease',
              '&:hover': {
                boxShadow: 4
              }
            }}>
              <CardContent>
                <Typography variant="h5" component="h2" gutterBottom>
                  <Box
                    component={Link}
                    href={`/posts/${post.slug}`}
                    sx={{ 
                      color: 'inherit', 
                      textDecoration: 'none',
                      '&:hover': {
                        color: 'primary.main'
                      }
                    }}
                  >
                    {post.title}
                  </Box>
                </Typography>
                <Typography color="text.secondary" paragraph>
                  {post.excerpt}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {post.date}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
} 