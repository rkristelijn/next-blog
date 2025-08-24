/**
 * Tests for Features component
 */

import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { render } from '../../test-utils/render';
import Features from '../Features';

describe('Features', () => {
  it('renders all feature cards', () => {
    render(<Features />);
    
    // Check for expected feature titles
    expect(screen.getByText('Fast')).toBeInTheDocument();
    expect(screen.getByText('Markdown')).toBeInTheDocument();
    expect(screen.getByText('Cloudflare')).toBeInTheDocument();
  });

  it('displays feature descriptions', () => {
    render(<Features />);
    
    expect(screen.getByText(/Built with Next.js for optimal performance/)).toBeInTheDocument();
    expect(screen.getByText(/Write content in Markdown with MDX support and Mermaid diagrams/)).toBeInTheDocument();
    expect(screen.getByText(/Deployed globally on Cloudflare Workers/)).toBeInTheDocument();
  });

  it('displays feature icons', () => {
    render(<Features />);
    
    expect(screen.getByText('🚀')).toBeInTheDocument();
    expect(screen.getByText('📝')).toBeInTheDocument();
    expect(screen.getByText('☁️')).toBeInTheDocument();
  });

  it('renders cards with proper structure', () => {
    render(<Features />);
    
    // Should have 3 cards
    const cards = screen.getAllByRole('article'); // MUI Card has role="article" by default
    expect(cards).toHaveLength(3);
  });

  it('has proper accessibility structure', () => {
    render(<Features />);
    
    // Each feature should have a heading
    const headings = screen.getAllByRole('heading', { level: 5 });
    expect(headings).toHaveLength(3);
    
    // Check specific headings
    expect(screen.getByRole('heading', { name: 'Fast' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Markdown' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Cloudflare' })).toBeInTheDocument();
  });

  it('applies hover effects correctly', () => {
    const { container } = render(<Features />);
    
    const cards = container.querySelectorAll('[class*="MuiCard"]');
    expect(cards).toHaveLength(3);
    
    // Cards should have hover transition styles
    cards.forEach(card => {
      expect(card).toHaveStyle({
        transition: expect.stringContaining('transform'),
      });
    });
  });
});
