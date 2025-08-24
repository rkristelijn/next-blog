'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Typography, Box, Stack } from '@mui/material';
import type { PostContentProps } from '@/types';
import Mermaid from './Mermaid';
import CodeBlock from './CodeBlock';

/**
 * PostContent component for rendering blog post content
 * 
 * @param post - The post containing the content to render
 */
export default function PostContent({ post }: PostContentProps) {
  // Remove unused mode variable since we now use CodeBlock component

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
              
              // Check if this is a multi-line code block (has newlines)
              const isMultiLine = String(children).includes('\n');
              
              // Handle code blocks with or without syntax highlighting
              if (match || isMultiLine) {
                return (
                  <CodeBlock language={language || 'text'}>
                    {String(children).replace(/\n$/, '')}
                  </CodeBlock>
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