/**
 * Tests for Mermaid component
 */

import { describe, it, expect, vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import { render } from '../../test-utils/render';
import { mockMermaidChart } from '../../test-utils/mocks';
import Mermaid from '../Mermaid';
import mermaid from 'mermaid';

// Mock mermaid module
vi.mock('mermaid');

describe('Mermaid', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders mermaid diagram successfully', async () => {
    const mockRender = vi.mocked(mermaid.render);
    mockRender.mockResolvedValue({ svg: '<svg>Test diagram</svg>' });

    render(<Mermaid chart={mockMermaidChart} />);

    await waitFor(() => {
      expect(screen.getByText('Test diagram')).toBeInTheDocument();
    });

    expect(mermaid.initialize).toHaveBeenCalled();
    expect(mermaid.render).toHaveBeenCalledWith(
      expect.stringMatching(/^mermaid-/),
      mockMermaidChart
    );
  });

  it('handles rendering errors gracefully', async () => {
    const mockRender = vi.mocked(mermaid.render);
    mockRender.mockRejectedValue(new Error('Invalid syntax'));

    render(<Mermaid chart="invalid chart" />);

    await waitFor(() => {
      expect(screen.getByText(/Mermaid Rendering Error/)).toBeInTheDocument();
      expect(screen.getByText(/Invalid syntax/)).toBeInTheDocument();
    });
  });

  it('uses custom id when provided', async () => {
    const mockRender = vi.mocked(mermaid.render);
    mockRender.mockResolvedValue({ svg: '<svg>Custom ID diagram</svg>' });

    const customId = 'custom-diagram-id';
    render(<Mermaid chart={mockMermaidChart} id={customId} />);

    await waitFor(() => {
      expect(mermaid.render).toHaveBeenCalledWith(customId, mockMermaidChart);
    });
  });

  it('generates unique id when not provided', async () => {
    const mockRender = vi.mocked(mermaid.render);
    mockRender.mockResolvedValue({ svg: '<svg>Auto ID diagram</svg>' });

    render(<Mermaid chart={mockMermaidChart} />);

    await waitFor(() => {
      expect(mermaid.render).toHaveBeenCalledWith(
        expect.stringMatching(/^mermaid-[a-z0-9]+$/),
        mockMermaidChart
      );
    });
  });

  it('configures mermaid with theme settings', async () => {
    const mockInitialize = vi.mocked(mermaid.initialize);
    const mockRender = vi.mocked(mermaid.render);
    mockRender.mockResolvedValue({ svg: '<svg>Themed diagram</svg>' });

    render(<Mermaid chart={mockMermaidChart} />);

    await waitFor(() => {
      expect(mockInitialize).toHaveBeenCalledWith(
        expect.objectContaining({
          startOnLoad: false,
          theme: 'default', // Should be default for light theme
          themeVariables: expect.objectContaining({
            primaryColor: expect.any(String),
            primaryTextColor: expect.any(String),
          }),
          fontFamily: expect.any(String),
        })
      );
    });
  });

  it('makes SVG responsive', async () => {
    const mockRender = vi.mocked(mermaid.render);
    mockRender.mockResolvedValue({ 
      svg: '<svg width="400" height="300">Responsive diagram</svg>' 
    });

    const { container } = render(<Mermaid chart={mockMermaidChart} />);

    await waitFor(() => {
      const svgElement = container.querySelector('svg');
      expect(svgElement).toHaveStyle({
        maxWidth: '100%',
        height: 'auto',
      });
    });
  });
});
