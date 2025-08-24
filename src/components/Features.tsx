/**
 * Features component - displays feature cards highlighting blog capabilities
 * 
 * This component encapsulates the features section and provides a clean
 * interface for displaying key features. It follows the single responsibility
 * principle by focusing only on feature presentation.
 * 
 * Uses theme tokens to ensure proper dark/light theme support.
 */

import { Container, Typography, Box, Card, CardContent } from '@mui/material';

interface Feature {
  icon: string;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: '🚀',
    title: 'Fast',
    description: 'Built with Next.js for optimal performance'
  },
  {
    icon: '📝',
    title: 'Markdown',
    description: 'Write content in Markdown with MDX support and Mermaid diagrams'
  },
  {
    icon: '☁️',
    title: 'Cloudflare',
    description: 'Deployed globally on Cloudflare Workers'
  }
];

/**
 * Features component for displaying key features
 */
export default function Features() {
  return (
    <Container maxWidth="lg" sx={{ mb: 8 }}>
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
        gap: 4,
        justifyContent: 'center',
        alignItems: 'stretch'
      }}>
        {features.map((feature, index) => (
          <Card key={index} sx={{ 
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            backgroundColor: 'background.paper',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: 8
            }
          }}>
            <CardContent sx={{ 
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
              py: 4
            }}>
              <Typography variant="h2" gutterBottom sx={{ mb: 2 }}>
                {feature.icon}
              </Typography>
              <Typography variant="h5" gutterBottom sx={{ mb: 2, fontWeight: 600, color: 'text.primary' }}>
                {feature.title}
              </Typography>
              <Typography color="text.secondary" sx={{ lineHeight: 1.6 }}>
                {feature.description}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Container>
  );
} 