/**
 * MUI theme configuration
 * 
 * This file defines the Material-UI theme for the application.
 * It follows the KISS principle by keeping the theme simple and
 * focused on the essential styling needs.
 * 
 * Supports both light and dark modes with proper color palettes.
 */

'use client';

import { createTheme } from '@mui/material/styles';

/**
 * Create theme with proper color scheme support
 * @returns MUI theme object
 */
export function createAppTheme() {
  return createTheme({
    palette: {
      mode: 'light', // This will be overridden by useColorScheme
      primary: {
        main: '#1976d2',
        light: '#42a5f5',
        dark: '#1565c0',
        contrastText: '#ffffff',
      },
      secondary: {
        main: '#dc004e',
        light: '#ff5983',
        dark: '#9a0036',
        contrastText: '#ffffff',
      },
      background: {
        default: '#fafafa',
        paper: '#ffffff',
      },
      text: {
        primary: 'rgba(0, 0, 0, 0.87)',
        secondary: 'rgba(0, 0, 0, 0.6)',
      },
    },
    typography: {
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      h1: {
        fontWeight: 700,
      },
      h2: {
        fontWeight: 600,
      },
      h3: {
        fontWeight: 600,
      },
      h4: {
        fontWeight: 600,
      },
      h5: {
        fontWeight: 600,
      },
      h6: {
        fontWeight: 600,
      },
    },
    shape: {
      borderRadius: 8,
    },
  });
}

// Default theme
const theme = createAppTheme();

export default theme; 