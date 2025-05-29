import { GetStaticProps } from 'next';
import { Specialization } from '@/domain/entities/specialization';
import { InMemorySpecializationRepository } from '@/infrastructure/repositories/in-memory-specialization-repository';
import { SpecializationService } from '@/application/services/specialization-service';
import MainLayout from '@/ui/layouts/MainLayout';
import { Container, Typography, Box, Grid } from '@mui/material';
import SpecializationCard from '@/ui/components/SpecializationCard';
import SEO from '@/ui/components/SEO';
import Link from 'next/link';

interface ServicesPageProps {
  specializations: Specialization[];
}

export const getStaticProps: GetStaticProps<ServicesPageProps> = async () => {
  const repository = new InMemorySpecializationRepository();
  const service = new SpecializationService(repository);
  
  const specializations = await service.getAllSpecializations();
  
  return {
    props: {
      specializations,
    },
  };
};

const ServicesPage = ({ specializations }: ServicesPageProps) => {
  return (
    <MainLayout>
      <SEO 
        title="Our Services | ESnapup"
        description="Explore our specialized software development services including full stack, mobile, frontend, backend development, cloud architecture, and database design."
        keywords="full stack development, mobile app development, frontend development, backend services, cloud architecture, database design, software development services"
      />
      
      <Box
        sx={{
          bgcolor: 'background.paper',
          pt: 6,
          pb: 6,
        }}
      >
        <Container maxWidth="md">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Our Services
          </Typography>
          <Typography 
            variant="h5" 
            align="center" 
            color="text.secondary" 
            paragraph
            sx={{ maxWidth: 700, mx: 'auto' }}
          >
            We offer a comprehensive range of software development services tailored to your business needs
          </Typography>
        </Container>
      </Box>
      
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={4}>
          {specializations.map((specialization) => (
            <Grid item key={specialization.id} xs={12} sm={6} md={4}>
              <Link href={`/services/${specialization.id}`} passHref style={{ textDecoration: 'none' }}>
                <SpecializationCard specialization={specialization} />
              </Link>
            </Grid>
          ))}
        </Grid>
      </Container>
    </MainLayout>
  );
};

export default ServicesPage;