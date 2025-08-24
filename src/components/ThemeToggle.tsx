/**
 * ThemeToggle component - allows switching between light and dark themes
 * 
 * This component provides a simple toggle button for theme switching.
 * It follows the HIPI principle by hiding theme logic behind a clean interface.
 * 
 * Uses the theme context for theme switching.
 */

'use client';

import { useState, useEffect } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { 
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon 
} from '@mui/icons-material';
import { useTheme } from './ThemeRegistry';

// Extend window type for theme mode
declare global {
  interface Window {
    __THEME_MODE__?: 'light' | 'dark';
  }
}

/**
 * ThemeToggle component for switching between light and dark themes
 */
export default function ThemeToggle() {
  const { mode, toggleTheme } = useTheme();
  const [isClient, setIsClient] = useState(false);
  const [clientMode, setClientMode] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // Get theme from global variable set by layout script
    const initialMode = (typeof window !== 'undefined' && window.__THEME_MODE__) || 'light';
    setClientMode(initialMode);
    setIsClient(true);
  }, []);

  // Update client mode when context mode changes
  useEffect(() => {
    if (isClient) {
      setClientMode(mode);
    }
  }, [mode, isClient]);

  const currentMode = isClient ? clientMode : 'light'; // Default to light during SSR

  return (
    <Tooltip title={`Switch to ${currentMode === 'light' ? 'dark' : 'light'} mode`}>
      <IconButton
        onClick={toggleTheme}
        color="inherit"
        aria-label={`Switch to ${currentMode === 'light' ? 'dark' : 'light'} mode`}
        sx={{
          transition: 'transform 0.2s ease',
          '&:hover': {
            transform: 'scale(1.1)',
          },
        }}
      >
        {currentMode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
      </IconButton>
    </Tooltip>
  );
} 