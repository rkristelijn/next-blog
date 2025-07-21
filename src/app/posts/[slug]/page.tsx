import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import { 
  Container, 
  Typography, 
  Box, 
  AppBar, 
  Toolbar, 
  Button 
} from '@mui/material';
import { 
  ArrowBack as ArrowBackIcon,
  Home as HomeIcon
} from '@mui/icons-material';
import Link from 'next/link';

// This would typically come from a CMS or file system
const posts = {
  'hello-world': {
    title: 'Hello World',
    content: `# Hello World

Welcome to my first blog post! This is a simple introduction to my blog.

## What to expect

I'll be writing about:
- Web development
- Next.js tips and tricks
- Personal projects
- And much more!

Stay tuned for more content!`,
    date: '2024-01-15',
    excerpt: 'Welcome to my first blog post!'
  },
  'getting-started': {
    title: 'Getting Started with Next.js',
    content: `# Getting Started with Next.js

Next.js is a powerful React framework that makes building full-stack web applications simple and efficient.

## Why Next.js?

- **Server-side rendering** for better SEO
- **File-based routing** for intuitive navigation
- **API routes** for backend functionality
- **Built-in optimizations** for performance

## Getting Started

1. Create a new project: \`npx create-next-app@latest\`
2. Navigate to your project: \`cd your-project\`
3. Start the development server: \`npm run dev\`

That's it! You're ready to build amazing web applications.`,
    date: '2024-01-20',
    excerpt: 'Learn how to build modern web applications with Next.js.'
  }
};

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = posts[slug as keyof typeof posts];

  if (!post) {
    notFound();
  }

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar>
          <Button 
            color="inherit" 
            component={Link} 
            href="/"
            startIcon={<HomeIcon />}
          >
            Home
          </Button>
          <Button 
            color="inherit" 
            component={Link} 
            href="/posts"
            startIcon={<ArrowBackIcon />}
            sx={{ ml: 1 }}
          >
            Blog Posts
          </Button>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, ml: 2 }}>
            {post.title}
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ flex: 1, py: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom>
            {post.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            {post.date}
          </Typography>
        </Box>
        
        <Box sx={{ 
          '& h1': { fontSize: '2rem', fontWeight: 700, mb: 2, mt: 3 },
          '& h2': { fontSize: '1.75rem', fontWeight: 600, mb: 1.5, mt: 2.5 },
          '& h3': { fontSize: '1.5rem', fontWeight: 600, mb: 1, mt: 2 },
          '& p': { mb: 1.5, lineHeight: 1.7 },
          '& ul, & ol': { mb: 1.5, pl: 3 },
          '& li': { mb: 0.5 },
          '& strong': { fontWeight: 600 },
          '& code': { 
            backgroundColor: '#f5f5f5', 
            padding: '0.125rem 0.25rem', 
            borderRadius: '0.25rem',
            fontFamily: 'monospace',
            fontSize: '0.875rem'
          },
          '& pre': {
            backgroundColor: '#f5f5f5',
            padding: '1rem',
            borderRadius: '0.5rem',
            overflow: 'auto',
            mb: 1.5
          }
        }}>
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </Box>
      </Container>
    </Box>
  );
} 