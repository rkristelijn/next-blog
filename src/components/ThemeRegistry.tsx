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
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
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
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // Immediately set the mode based on what's already in the DOM
    const isDark = document.documentElement.classList.contains('mui-dark');
    const initialMode = isDark ? 'dark' : 'light';
    
    // Set MUI's mode to match the DOM
    setMode(initialMode);
    
    // Also load from localStorage for consistency
    const savedMode = localStorage.getItem('theme-mode') as 'light' | 'dark';
    if (savedMode && (savedMode === 'light' || savedMode === 'dark') && savedMode !== initialMode) {
      setMode(savedMode);
      // Update DOM to match localStorage
      document.documentElement.classList.remove('mui-light', 'mui-dark');
      document.documentElement.classList.add(`mui-${savedMode}`);
    }
  }, [setMode]);

  const toggleTheme = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    localStorage.setItem('theme-mode', newMode);
    
    // Immediately update document class and data attribute for instant feedback
    document.documentElement.classList.remove('mui-light', 'mui-dark');
    document.documentElement.classList.add(`mui-${newMode}`);
    document.documentElement.setAttribute('data-mui-color-scheme', newMode);
    
    // Update global variable
    if (typeof window !== 'undefined') {
      window.__THEME_MODE__ = newMode;
    }
  };

  // Get the current mode, preferring what's in the DOM during initial load
  const getCurrentMode = (): 'light' | 'dark' => {
    if (!isClient) {
      return 'light'; // SSR default
    }
    
    // Use the mode from MUI context if available, otherwise detect from DOM
    if (mode && mode !== 'system') {
      return mode;
    }
    
    // Fallback to DOM detection
    const isDark = document.documentElement.classList.contains('mui-dark');
    return isDark ? 'dark' : 'light';
  };

  return (
    <ThemeContext.Provider value={{ mode: getCurrentMode(), toggleTheme }}>
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
      <CssVarsProvider 
        theme={theme} 
        defaultColorScheme="light"
        colorSchemeSelector="class"
        modeStorageKey="theme-mode"
        // Disable the automatic theme detection to prevent conflicts
        disableTransitionOnChange={false}
      >
        <ThemeProviderWrapper>
          <CssBaseline />
          {children}
        </ThemeProviderWrapper>
      </CssVarsProvider>
    </AppRouterCacheProvider>
  );
} 