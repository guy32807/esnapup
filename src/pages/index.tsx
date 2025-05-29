import { Container, Typography, Box, Button, Grid } from '@mui/material';
import MainLayout from '@/ui/layouts/MainLayout';
import SEO from '@/ui/components/SEO';
import Link from 'next/link';

export default function Home() {
  return (
    <MainLayout>
      <SEO
        title="ESnapup - Innovative Software Solutions"
        description="ESnapup provides innovative software solutions to help businesses transform their ideas into powerful digital solutions."
        keywords="Software Development, Web Development, Mobile Apps, Cloud Solutions, IT Consulting, AI Integration"
      />
      
      <Box
        sx={{
          bgcolor: 'background.paper',
          pt: 8,
          pb: 6,
        }}
      >
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Innovative Software Solutions
          </Typography>
          <Typography variant="h5" align="center" color="text.secondary" paragraph>
            We help businesses transform their ideas into powerful digital solutions using
            cutting-edge technologies and best practices.
          </Typography>
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
            <Button variant="contained" component={Link} href="/services" sx={{ mx: 1 }}>
              Our Services
            </Button>
            <Button variant="outlined" component={Link} href="/contact" sx={{ mx: 1 }}>
              Contact Us
            </Button>
          </Box>
        </Container>
      </Box>
      
      <Container sx={{ py: 8 }} maxWidth="md">
        <Grid container spacing={4}>
          {/* Featured content can go here */}
        </Grid>
      </Container>
    </MainLayout>
  );
}