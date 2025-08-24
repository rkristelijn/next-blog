/**
 * @jest-environment jsdom
 */

import { screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import PostContent from '../PostContent';
import { renderWithTheme } from '@/test-utils/render';
import type { Post } from '@/types';

// Mock Mermaid component to avoid rendering issues in tests
vi.mock('../Mermaid', () => ({
  default: ({ chart }: { chart: string }) => (
    <div data-testid="mermaid-diagram">{chart}</div>
  ),
}));

const mockPost: Post = {
  id: 'test-post',
  slug: 'test-post',
  title: 'Test Post',
  date: '2024-01-01',
  author: 'Test Author',
  excerpt: 'Test excerpt',
  content: `# Test Content

This is a test post with various markdown elements.

## Table Test

| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Row 1 Col 1 | Row 1 Col 2 | Row 1 Col 3 |
| Row 2 Col 1 | Row 2 Col 2 | Row 2 Col 3 |

## Code Block Test

\`\`\`javascript
console.log('Hello, world!');
\`\`\`

## Mermaid Test

\`\`\`mermaid
graph TD
    A[Start] --> B[End]
\`\`\`

## Other Elements

- List item 1
- List item 2

**Bold text** and *italic text*.
`,
};

describe('PostContent', () => {
  it('renders post title and metadata', () => {
    renderWithTheme(<PostContent post={mockPost} />);
    
    expect(screen.getByText('Test Post')).toBeInTheDocument();
    expect(screen.getByText('2024-01-01 by Test Author')).toBeInTheDocument();
  });

  it('renders markdown content correctly', () => {
    renderWithTheme(<PostContent post={mockPost} />);
    
    // Check if headings are rendered
    expect(screen.getByText('Test Content')).toBeInTheDocument();
    expect(screen.getByText('Table Test')).toBeInTheDocument();
    expect(screen.getByText('Code Block Test')).toBeInTheDocument();
    
    // Check if paragraph content is rendered
    expect(screen.getByText('This is a test post with various markdown elements.')).toBeInTheDocument();
  });

  it('renders tables correctly with remark-gfm', () => {
    renderWithTheme(<PostContent post={mockPost} />);
    
    // Check if table elements are present
    const tables = screen.getAllByRole('table');
    expect(tables).toHaveLength(1);
    
    // Check table headers
    expect(screen.getByText('Column 1')).toBeInTheDocument();
    expect(screen.getByText('Column 2')).toBeInTheDocument();
    expect(screen.getByText('Column 3')).toBeInTheDocument();
    
    // Check table data
    expect(screen.getByText('Row 1 Col 1')).toBeInTheDocument();
    expect(screen.getByText('Row 2 Col 2')).toBeInTheDocument();
  });

  it('renders code blocks correctly', () => {
    renderWithTheme(<PostContent post={mockPost} />);
    
    // Check if code content is rendered
    expect(screen.getByText("console.log('Hello, world!');")).toBeInTheDocument();
  });

  it('renders Mermaid diagrams correctly', () => {
    renderWithTheme(<PostContent post={mockPost} />);
    
    // Check if Mermaid component is rendered
    const mermaidDiagram = screen.getByTestId('mermaid-diagram');
    expect(mermaidDiagram).toBeInTheDocument();
    // Check content without strict whitespace matching
    expect(mermaidDiagram.textContent).toContain('graph TD');
    expect(mermaidDiagram.textContent).toContain('A[Start] --> B[End]');
  });

  it('renders lists correctly', () => {
    renderWithTheme(<PostContent post={mockPost} />);
    
    expect(screen.getByText('List item 1')).toBeInTheDocument();
    expect(screen.getByText('List item 2')).toBeInTheDocument();
  });

  it('renders bold and italic text correctly', () => {
    renderWithTheme(<PostContent post={mockPost} />);
    
    // Note: These might be rendered as separate text nodes
    expect(screen.getByText('Bold text')).toBeInTheDocument();
    expect(screen.getByText('italic text')).toBeInTheDocument();
  });

  it('handles empty content gracefully', () => {
    const emptyPost: Post = {
      ...mockPost,
      content: '',
    };
    
    renderWithTheme(<PostContent post={emptyPost} />);
    
    // Should still render title and metadata
    expect(screen.getByText('Test Post')).toBeInTheDocument();
    expect(screen.getByText('2024-01-01 by Test Author')).toBeInTheDocument();
  });

  it('handles posts with only text content', () => {
    const textOnlyPost: Post = {
      ...mockPost,
      content: 'This is just plain text content without any markdown.',
    };
    
    renderWithTheme(<PostContent post={textOnlyPost} />);
    
    expect(screen.getByText('This is just plain text content without any markdown.')).toBeInTheDocument();
  });
});
