'use client';

import { useEffect, useRef } from 'react';
import mermaid from 'mermaid';
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';

interface MermaidProps {
  chart: string;
  id?: string;
}

export default function Mermaid({ chart, id }: MermaidProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  useEffect(() => {
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

    const renderChart = async () => {
      if (elementRef.current) {
        try {
          // Clear previous content
          elementRef.current.innerHTML = '';
          
          // Generate unique ID if not provided
          const chartId = id || `mermaid-${Math.random().toString(36).substr(2, 9)}`;
          
          // Render the chart
          const { svg } = await mermaid.render(chartId, chart);
          elementRef.current.innerHTML = svg;
          
          // Make SVG responsive
          const svgElement = elementRef.current.querySelector('svg');
          if (svgElement) {
            svgElement.style.maxWidth = '100%';
            svgElement.style.height = 'auto';
          }
        } catch (error) {
          console.error('Mermaid rendering error:', error);
          elementRef.current.innerHTML = `
            <div style="
              padding: 16px; 
              border: 1px solid ${theme.palette.error.main}; 
              border-radius: 4px; 
              background-color: ${theme.palette.error.light}20;
              color: ${theme.palette.error.main};
              font-family: monospace;
            ">
              <strong>Mermaid Rendering Error:</strong><br/>
              <pre style="margin: 8px 0 0 0; white-space: pre-wrap;">${error}</pre>
            </div>
          `;
        }
      }
    };

    renderChart();
  }, [chart, id, theme, isDark]);

  return (
    <Box
      ref={elementRef}
      sx={{
        my: 3,
        display: 'flex',
        justifyContent: 'center',
        '& svg': {
          maxWidth: '100%',
          height: 'auto',
        },
        // Ensure text is readable in both themes
        '& .node rect, & .node circle, & .node ellipse, & .node polygon': {
          fill: theme.palette.background.paper,
          stroke: theme.palette.divider,
        },
        '& .node text': {
          fill: theme.palette.text.primary,
        },
        '& .edgePath path': {
          stroke: theme.palette.text.secondary,
        },
        '& .edgeLabel': {
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
        },
      }}
    />
  );
}
