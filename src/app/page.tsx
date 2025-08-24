import { Box } from '@mui/material';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Footer from '@/components/Footer';

/**
 * Home page - displays the main landing page
 * 
 * This page follows the KISS principle by using simple, focused components
 * and the HIPI principle by hiding implementation details behind clean interfaces.
 */
export default function Home() {
  return (
    <Box sx={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      backgroundColor: 'background.default'
    }}>
      <Header title="Next.js Blog" />
      <Hero />
      <Features />
      <Footer />
    </Box>
  );
}
