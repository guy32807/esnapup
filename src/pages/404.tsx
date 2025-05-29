import { Box, Button, Container, Typography } from '@mui/material';
import MainLayout from '@/ui/layouts/MainLayout';
import SEO from '@/ui/components/SEO';
import Link from 'next/link';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function Custom404() {
  return (
    <MainLayout>
      <SEO 
        title="404 - Page Not Found | ESnapup" 
        description="The page you're looking for doesn't exist."
      />
      <Container maxWidth="md">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '60vh',
            textAlign: 'center',
            py: 8
          }}
        >
          <Typography variant="h1" 
            component="h1" 
            gutterBottom
            sx={{ 
              fontSize: { xs: '6rem', sm: '8rem', md: '10rem' },
              fontWeight: 700,
              color: 'primary.main'
            }}
          >
            404
          </Typography>
          <Typography 
            variant="h4" 
            component="h2" 
            gutterBottom
            sx={{ mb: 3 }}
          >
            Page Not Found
          </Typography>
          <Typography variant="body1" paragraph color="text.secondary" sx={{ mb: 4, maxWidth: 'sm' }}>
            The page you're looking for doesn't exist or has been moved.
          </Typography>
          <Button
            component={Link}
            href="/"
            variant="contained"
            color="primary"
            size="large"
            startIcon={<ArrowBackIcon />}
          >
            Back to Home
          </Button>
        </Box>
      </Container>
    </MainLayout>
  );
}