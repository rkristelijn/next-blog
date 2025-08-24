/**
 * Custom hook for managing Mermaid diagram rendering
 * Separates rendering logic from component presentation
 */

import { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import { useTheme } from '@mui/material/styles';

export interface UseMermaidRendererOptions {
  /** Mermaid diagram syntax */
  chart: string;
  /** Optional unique identifier for the diagram */
  id?: string;
}

export interface UseMermaidRendererReturn {
  /** Ref to attach to the container element */
  elementRef: React.RefObject<HTMLDivElement | null>;
  /** Loading state during rendering */
  isLoading: boolean;
  /** Error state if rendering fails */
  error: string | null;
  /** Function to retry rendering */
  retry: () => void;
}

/**
 * Hook for managing Mermaid configuration and rendering
 * 
 * @param options - Configuration options for the Mermaid renderer
 * @returns Rendering state and utilities
 * 
 * @example
 * ```tsx
 * function MyDiagram({ chart }: { chart: string }) {
 *   const { elementRef, isLoading, error, retry } = useMermaidRenderer({ chart });
 *   
 *   if (error) return <ErrorDisplay error={error} onRetry={retry} />;
 *   if (isLoading) return <LoadingSkeleton />;
 *   
 *   return <div ref={elementRef} />;
 * }
 * ```
 */
export function useMermaidRenderer({
  chart,
  id,
}: UseMermaidRendererOptions): UseMermaidRendererReturn {
  const elementRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [renderKey, setRenderKey] = useState(0);

  const retry = () => {
    setError(null);
    setIsLoading(true);
    setRenderKey(prev => prev + 1);
  };

  useEffect(() => {
    const renderChart = async () => {
      if (!elementRef.current || !chart.trim()) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        // Configure mermaid with theme-aware settings
        mermaid.initialize({
          startOnLoad: false,
          theme: isDark ? 'dark' : 'default',
          themeVariables: {
            primaryColor: theme.palette.primary.main,
            primaryTextColor: theme.palette.text.primary,
            primaryBorderColor: theme.palette.divider,
            lineColor: theme.palette.text.secondary,
            secondaryColor: theme.palette.background.paper,
            tertiaryColor: theme.palette.background.default,
            background: theme.palette.background.default,
            mainBkg: theme.palette.background.paper,
            secondBkg: theme.palette.action.hover,
            tertiaryBkg: theme.palette.action.selected,
          },
          fontFamily: theme.typography.fontFamily,
          fontSize: 14,
          flowchart: {
            useMaxWidth: true,
            htmlLabels: true,
          },
          sequence: {
            useMaxWidth: true,
          },
          gantt: {
            useMaxWidth: true,
          },
          journey: {
            useMaxWidth: true,
          },
          gitGraph: {
            useMaxWidth: true,
          },
        });

        // Clear previous content
        elementRef.current.innerHTML = '';
        
        // Generate unique ID if not provided
        const chartId = id || `mermaid-${Math.random().toString(36).substr(2, 9)}`;
        
        // Render the chart
        const { svg } = await mermaid.render(chartId, chart);
        
        if (elementRef.current) {
          elementRef.current.innerHTML = svg;
          
          // Make SVG responsive
          const svgElement = elementRef.current.querySelector('svg');
          if (svgElement) {
            svgElement.style.maxWidth = '100%';
            svgElement.style.height = 'auto';
          }
        }
        
        setIsLoading(false);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown rendering error';
        setError(errorMessage);
        setIsLoading(false);
        
        // Log error in development
        if (process.env.NODE_ENV === 'development') {
          console.error('Mermaid rendering error:', err);
        }
      }
    };

    renderChart();
  }, [chart, id, theme, isDark, renderKey]);

  return {
    elementRef,
    isLoading,
    error,
    retry,
  };
}
