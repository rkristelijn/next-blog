/**
 * Test setup configuration for Vitest
 * Configures testing environment and global utilities
 */

import React from 'react';
import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach, beforeEach, vi } from 'vitest';

// Store original console methods
const originalConsole = {
  error: console.error,
  warn: console.warn,
  log: console.log,
};

// Mock console methods to suppress noisy output during tests
beforeEach(() => {
  // Suppress console.error for Mermaid rendering errors and other test noise
  console.error = vi.fn((message, ...args) => {
    // Only suppress specific known noisy messages
    if (
      typeof message === 'string' && 
      (message.includes('Mermaid rendering error') ||
       message.includes('Invalid syntax') ||
       message.includes('Warning: ReactDOM.render'))
    ) {
      return;
    }
    // For other errors, still log them (useful for debugging real issues)
    originalConsole.error(message, ...args);
  });

  // Optionally suppress warnings too
  console.warn = vi.fn((message, ...args) => {
    if (
      typeof message === 'string' && 
      (message.includes('Warning:') ||
       message.includes('deprecated'))
    ) {
      return;
    }
    originalConsole.warn(message, ...args);
  });
});

// Cleanup after each test
afterEach(() => {
  cleanup();
  // Restore original console methods
  console.error = originalConsole.error;
  console.warn = originalConsole.warn;
  console.log = originalConsole.log;
});

// Mock Next.js router
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    prefetch: vi.fn(),
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}));

// Mock Next.js image component
vi.mock('next/image', () => ({
  default: ({ src, alt, ...props }: { src: string; alt: string; [key: string]: unknown }) => {
    return React.createElement('img', { src, alt, ...props });
  },
}));

// Mock Mermaid to avoid rendering issues in tests
vi.mock('mermaid', () => ({
  default: {
    initialize: vi.fn(),
    render: vi.fn().mockResolvedValue({ svg: '<svg>Mock diagram</svg>' }),
  },
}));

// Mock window.matchMedia for theme tests
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock IntersectionObserver
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));
