'use client';

import React, { useState, useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Box } from '@mui/material';
import { useTheme } from './ThemeRegistry';

// Extend window type for theme mode
declare global {
  interface Window {
    __THEME_MODE__?: 'light' | 'dark';
  }
}

interface CodeBlockProps {
  language: string;
  children: string;
}

export default function CodeBlock({ language, children }: CodeBlockProps) {
  const { mode } = useTheme();
  const [isClient, setIsClient] = useState(false);
  const [initialMode, setInitialMode] = useState<'light' | 'dark'>('light');

  // Only render after hydration to prevent FOUC
  useEffect(() => {
    // Get theme from global variable set by layout script
    const themeMode = (typeof window !== 'undefined' && window.__THEME_MODE__) || 'light';
    setInitialMode(themeMode);
    setIsClient(true);
  }, []);

  // Use CSS-only approach during SSR/hydration
  if (!isClient) {
    return (
      <Box
        className="code-block-ssr"
        sx={{
          mb: 2,
          borderRadius: '0.5rem',
          overflow: 'hidden',
          // Use CSS variables that are set by the theme script in layout.tsx
          backgroundColor: 'var(--syntax-bg-color)',
          '& pre': {
            backgroundColor: 'transparent !important',
            margin: '0 !important',
            padding: '1rem !important',
            fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
            fontSize: '0.875rem',
            lineHeight: '1.5',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
          }
        }}
      >
        <pre>{children}</pre>
      </Box>
    );
  }

  // Use the current mode from context, fallback to initial mode
  const currentMode = mode || initialMode;

  // Full syntax highlighting after hydration
  return (
    <Box
      sx={{
        mb: 2,
        borderRadius: '0.5rem',
        overflow: 'hidden',
        backgroundColor: currentMode === 'dark' ? '#1e1e1e' : '#fafafa',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: currentMode === 'dark' ? '#1e1e1e' : '#fafafa',
          zIndex: 0,
        },
        '& > div': {
          position: 'relative',
          zIndex: 1,
          backgroundColor: 'transparent !important',
        },
        '& pre': {
          backgroundColor: 'transparent !important',
          margin: '0 !important',
          padding: '1rem !important',
        },
        '& code': {
          backgroundColor: 'transparent !important',
        },
        '& code > span': {
          backgroundColor: 'transparent !important',
        },
        '& *': {
          backgroundColor: 'transparent !important',
        }
      }}
    >
      <SyntaxHighlighter
        style={currentMode === 'dark' ? oneDark : oneLight}
        language={language}
        PreTag="div"
        showLineNumbers={true}
        wrapLines={true}
        customStyle={{
          margin: 0,
          fontSize: '0.875rem',
          lineHeight: '1.5',
          background: 'transparent',
          backgroundColor: 'transparent'
        }}
        codeTagProps={{
          style: {
            fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
            background: 'transparent',
            backgroundColor: 'transparent'
          }
        }}
      >
        {children}
      </SyntaxHighlighter>
    </Box>
  );
}
