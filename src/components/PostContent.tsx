'use client';

/**
 * PostContent component - renders blog post content with markdown support
 * 
 * This component handles the rendering of post content with proper styling
 * for markdown elements. It encapsulates the markdown rendering logic
 * and provides consistent styling across all blog posts.
 * 
 * Supports both regular markdown and MDX content from frontmatter.
 * Includes Mermaid diagram support for code blocks with language "mermaid".
 * Includes GitHub Flavored Markdown support for tables, strikethrough, etc.
 * Includes syntax highlighting for code blocks using react-syntax-highlighter.
 */

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Typography, Box, Stack, useTheme } from '@mui/material';
import type { PostContentProps } from '@/types';
import Mermaid from './Mermaid';

/**
 * PostContent component for rendering blog post content
 * 
 * @param post - The post containing the content to render
 */
export default function PostContent({ post }: PostContentProps) {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

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
        // Table styling
        '& table': {
          width: '100%',
          borderCollapse: 'collapse',
          mb: 2,
          border: 1,
          borderColor: 'divider',
          borderRadius: '0.5rem',
          overflow: 'hidden'
        },
        '& th': {
          backgroundColor: 'action.hover',
          padding: '0.75rem',
          textAlign: 'left',
          fontWeight: 600,
          borderBottom: 1,
          borderColor: 'divider'
        },
        '& td': {
          padding: '0.75rem',
          borderBottom: 1,
          borderColor: 'divider',
          '&:last-child': {
            borderRight: 0
          }
        },
        '& tr:last-child td': {
          borderBottom: 0
        },
        '& th:not(:last-child), & td:not(:last-child)': {
          borderRight: 1,
          borderColor: 'divider'
        }
      }}>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            code(props) {
              const { className, children, ...rest } = props;
              const match = /language-(\w+)/.exec(className || '');
              const language = match ? match[1] : '';
              
              // Handle Mermaid diagrams
              if (language === 'mermaid') {
                return <Mermaid chart={String(children).replace(/\n$/, '')} />;
              }
              
              // Handle code blocks with syntax highlighting
              if (match) {
                return (
                  <Box 
                    className="syntax-highlighter-container"
                    sx={{ mb: 2 }}
                  >
                    <SyntaxHighlighter
                      style={isDarkMode ? oneDark : oneLight}
                      language={language}
                      PreTag="div"
                      showLineNumbers={true}
                      wrapLines={true}
                      customStyle={{
                        margin: 0,
                        fontSize: '0.875rem',
                        lineHeight: '1.5'
                      }}
                      codeTagProps={{
                        style: {
                          fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Monaco, Consolas, "Liberation Mono", "Courier New", monospace'
                        }
                      }}
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  </Box>
                );
              }
              
              // Handle inline code
              return (
                <code className={className} {...rest}>
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