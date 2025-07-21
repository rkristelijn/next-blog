/**
 * ThemeToggle component - allows switching between light and dark themes
 * 
 * This component provides a simple toggle button for theme switching.
 * It follows the HIPI principle by hiding theme logic behind a clean interface.
 * 
 * Uses the theme context for theme switching.
 */

'use client';

import { IconButton, Tooltip } from '@mui/material';
import { 
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon 
} from '@mui/icons-material';
import { useTheme } from './ThemeRegistry';

/**
 * ThemeToggle component for switching between light and dark themes
 */
export default function ThemeToggle() {
  const { mode, toggleTheme } = useTheme();

  return (
    <Tooltip title={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}>
      <IconButton
        onClick={toggleTheme}
        color="inherit"
        aria-label={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}
        sx={{
          transition: 'transform 0.2s ease',
          '&:hover': {
            transform: 'scale(1.1)',
          },
        }}
      >
        {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
      </IconButton>
    </Tooltip>
  );
} 