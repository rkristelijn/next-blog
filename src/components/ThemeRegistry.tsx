/**
 * ThemeRegistry - MUI theme provider for Next.js with CSS variables
 * 
 * This component handles emotion cache creation and server-side rendering
 * of MUI styles using CSS variables to prevent SSR flickering.
 * 
 * Implementation based on MUI CSS theme variables documentation:
 * https://mui.com/material-ui/customization/css-theme-variables/configuration/
 */

'use client';

import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useColorScheme } from '@mui/material/styles';
import { createContext, useContext, useEffect, ReactNode } from 'react';
import theme from '../lib/theme';

// Theme context for managing theme state
const ThemeContext = createContext<{
  mode: 'light' | 'dark';
  toggleTheme: () => void;
}>({
  mode: 'light',
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

// Theme provider component that manages theme state
const ThemeProviderWrapper = ({ children }: { children: ReactNode }) => {
  const { mode, setMode } = useColorScheme();

  useEffect(() => {
    // Load theme preference from localStorage
    const savedMode = localStorage.getItem('theme-mode') as 'light' | 'dark';
    if (savedMode && (savedMode === 'light' || savedMode === 'dark')) {
      setMode(savedMode);
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setMode(prefersDark ? 'dark' : 'light');
    }
  }, [setMode]);

  const toggleTheme = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    localStorage.setItem('theme-mode', newMode);
  };

  return (
    <ThemeContext.Provider value={{ mode: (mode === 'system' ? 'light' : mode) || 'light', toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * ThemeRegistry component for MUI theme integration with CSS variables
 * 
 * @param children - React components to wrap with theme provider
 */
export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  return (
    <AppRouterCacheProvider>
      <CssVarsProvider theme={theme} defaultColorScheme="light">
        <ThemeProviderWrapper>
          <CssBaseline />
          {children}
        </ThemeProviderWrapper>
      </CssVarsProvider>
    </AppRouterCacheProvider>
  );
} 