/**
 * PostContent component - renders blog post content with markdown support
 * 
 * This component handles the rendering of post content with proper styling
 * for markdown elements. It encapsulates the markdown rendering logic
 * and provides consistent styling across all blog posts.
 * 
 * Supports both regular markdown and MDX content from frontmatter.
 * Includes Mermaid diagram support for code blocks with language "mermaid".
 */

import ReactMarkdown from 'react-markdown';
import { Typography, Box, Stack } from '@mui/material';
import type { PostContentProps } from '@/types';
import Mermaid from './Mermaid';

/**
 * PostContent component for rendering blog post content
 * 
 * @param post - The post containing the content to render
 */
export default function PostContent({ post }: PostContentProps) {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        {post.title}
      </Typography>
      <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
        <Typography variant="body2" color="text.secondary">
          {post.date} by {post.author}
        </Typography>
      </Stack>
      
      <Box sx={{ 
        '& h1': { fontSize: '2rem', fontWeight: 700, mb: 2, mt: 3 },
        '& h2': { fontSize: '1.75rem', fontWeight: 600, mb: 1.5, mt: 2.5 },
        '& h3': { fontSize: '1.5rem', fontWeight: 600, mb: 1, mt: 2 },
        '& p': { mb: 1.5, lineHeight: 1.7 },
        '& ul, & ol': { mb: 1.5, pl: 3 },
        '& li': { mb: 0.5 },
        '& strong': { fontWeight: 600 },
        '& code': { 
          backgroundColor: 'action.hover', 
          color: 'text.primary',
          padding: '0.125rem 0.25rem', 
          borderRadius: '0.25rem',
          fontFamily: 'monospace',
          fontSize: '0.875rem'
        },
        '& pre': {
          backgroundColor: 'background.paper',
          border: 1,
          borderColor: 'divider',
          padding: '1rem',
          borderRadius: '0.5rem',
          overflow: 'auto',
          mb: 1.5,
          '& code': {
            backgroundColor: 'transparent',
            padding: 0,
            borderRadius: 0,
            color: 'text.primary'
          }
        }
      }}>
        <ReactMarkdown
          components={{
            code(props) {
              const { className, children } = props;
              const match = /language-(\w+)/.exec(className || '');
              const language = match ? match[1] : '';
              
              // Handle Mermaid diagrams
              if (language === 'mermaid') {
                return <Mermaid chart={String(children).replace(/\n$/, '')} />;
              }
              
              // Regular code blocks and inline code
              return (
                <code className={className}>
                  {children}
                </code>
              );
            },
          }}
        >
          {post.content}
        </ReactMarkdown>
      </Box>
    </Box>
  );
} 