import { Container, Typography, Box, Button } from '@mui/material';
import Link from 'next/link';
import Navigation from '@/components/Navigation';

export default function NotFound() {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navigation title="Page Not Found" showHome={true} showBack={false} />
      
      <Container maxWidth="md" sx={{ flex: 1, py: 4, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Typography variant="h1" component="h1" gutterBottom>
          404
        </Typography>
        <Typography variant="h4" component="h2" gutterBottom>
          Page Not Found
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4, textAlign: 'center' }}>
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </Typography>
        <Button component={Link} href="/" variant="contained" size="large">
          Go Home
        </Button>
      </Container>
    </Box>
  );
} 