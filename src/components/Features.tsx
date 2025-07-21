/**
 * Features component - displays feature cards highlighting blog capabilities
 * 
 * This component encapsulates the features section and provides a clean
 * interface for displaying key features. It follows the single responsibility
 * principle by focusing only on feature presentation.
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
    description: 'Write content in Markdown with MDX support'
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
      <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', justifyContent: 'center' }}>
        {features.map((feature, index) => (
          <Card key={index} sx={{ minWidth: 280, flex: '1 1 300px' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" gutterBottom>
                {feature.icon}
              </Typography>
              <Typography variant="h6" gutterBottom>
                {feature.title}
              </Typography>
              <Typography color="text.secondary">
                {feature.description}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Container>
  );
} 