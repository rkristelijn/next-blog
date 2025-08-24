/**
 * Custom render utilities for testing with providers
 */

import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Create a simple test theme
const testTheme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#1976d2' },
    secondary: { main: '#dc004e' },
  },
});

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  theme?: typeof testTheme;
}

/**
 * Custom render function with theme provider
 * Wraps components with necessary providers for testing
 */
export function renderWithTheme(
  ui: React.ReactElement,
  options: CustomRenderOptions = {}
) {
  const { theme = testTheme, ...renderOptions } = options;

  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );

  return render(ui, { wrapper: Wrapper, ...renderOptions });
}

// Re-export everything from testing library
export * from '@testing-library/react';
export { renderWithTheme as render };
