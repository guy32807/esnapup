import { GetStaticProps, GetStaticPaths } from 'next';
import Link from 'next/link'; // Add this import
import { InMemorySpecializationRepository } from '@/infrastructure/repositories/in-memory-specialization-repository';
import { SpecializationService } from '@/application/services/specialization-service';
import MainLayout from '@/ui/layouts/MainLayout';
import { Specialization, specializations } from '@/domain/entities/specialization';
import { Container, Typography, Box, Grid, List, ListItem, ListItemIcon, ListItemText, Paper, Chip, Divider } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CodeIcon from '@mui/icons-material/Code';
import SEO from '@/ui/components/SEO';
import SocialShare from '@/ui/components/SocialShare';
import SpecializationCard from '@/ui/components/SpecializationCard'; // Make sure this is imported as well

interface ServiceDetailPageProps {
  specialization: Specialization;
  relatedSpecializations: Specialization[];
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: specializations.map(spec => ({
      params: { id: spec.id }
    })),
    fallback: false
  };
};

export const getStaticProps: GetStaticProps<ServiceDetailPageProps> = async (context) => {
  const repository = new InMemorySpecializationRepository();
  const service = new SpecializationService(repository);
  
  const id = context.params?.id as string;
  const specialization = await service.getSpecializationById(id);
  
  if (!specialization) {
    return {
      notFound: true
    };
  }
  
  // Get 3 related specializations (excluding current)
  const allSpecializations = await service.getAllSpecializations();
  const relatedSpecializations = allSpecializations
    .filter(s => s.id !== id)
    .slice(0, 3);
  
  return {
    props: {
      specialization,
      relatedSpecializations,
    },
  };
};

const ServiceDetailPage = ({ specialization, relatedSpecializations }: ServiceDetailPageProps) => {
  return (
    <MainLayout>
      <SEO
        title={`${specialization.title} | ESnapup Services`}
        description={specialization.description}
        keywords={`${specialization.title}, ${specialization.technologies.join(', ')}, software development, ESnapup`}
        canonicalUrl={`/services/${specialization.id}`}
      />
      
      <Box sx={{ bgcolor: 'background.paper', py: 6 }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography 
                  variant="h2" 
                  component="h1" 
                  gutterBottom
                  sx={{ fontWeight: 700 }}
                >
                  {specialization.title}
                </Typography>
                <SocialShare title={`${specialization.title} | ESnapup Services`} description={specialization.description} />
              </Box>
              
              <Typography 
                variant="h5" 
                color="text.secondary" 
                paragraph
                sx={{ mb: 4 }}
              >
                {specialization.description}
              </Typography>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                sx={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: 2,
                  boxShadow: 3
                }}
                src={specialization.image}
                alt={specialization.title}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
      
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={8}>
          <Grid item xs={12} md={6}>
            <Paper elevation={0} sx={{ p: 4, bgcolor: 'background.paper', borderRadius: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <CheckCircleOutlineIcon color="primary" sx={{ mr: 2, fontSize: 30 }} />
                <Typography variant="h4" component="h2" sx={{ fontWeight: 600 }}>
                  Key Benefits
                </Typography>
              </Box>
              
              <List>
                {specialization.benefits.map((benefit, index) => (
                  <ListItem 
                    key={index} 
                    sx={{ 
                      py: 1.5, 
                      px: 1,
                      borderBottom: index < specialization.benefits.length - 1 ? '1px solid' : 'none',
                      borderColor: 'divider' 
                    }}
                  >
                    <ListItemIcon>
                      <CheckCircleOutlineIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary={benefit}
                      primaryTypographyProps={{
                        fontWeight: 500
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Paper elevation={0} sx={{ p: 4, bgcolor: 'background.paper', borderRadius: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <CodeIcon color="primary" sx={{ mr: 2, fontSize: 30 }} />
                <Typography variant="h4" component="h2" sx={{ fontWeight: 600 }}>
                  Technologies
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {specialization.technologies.map((tech, index) => {
                  // Split the technology string if it contains a colon
                  const [category, items] = tech.includes(':') 
                    ? [tech.split(':')[0].trim(), tech.split(':')[1].trim()] 
                    : [null, tech];
                  
                  return (
                    <Box key={index}>
                      {category && (
                        <Typography 
                          variant="subtitle1" 
                          color="primary" 
                          sx={{ fontWeight: 600, mb: 1 }}
                        >
                          {category}
                        </Typography>
                      )}
                      
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {items.split(',').map((item, idx) => (
                          <Chip 
                            key={idx}
                            label={item.trim()}
                            variant="outlined"
                            color="primary"
                            size="medium"
                          />
                        ))}
                      </Box>
                    </Box>
                  );
                })}
              </Box>
            </Paper>
          </Grid>
          
          <Grid item xs={12}>
            <Divider sx={{ my: 4 }} />
            <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
              Related Services
            </Typography>
            
            <Grid container spacing={4} sx={{ mt: 2 }}>
              {relatedSpecializations.map((relatedSpec) => (
                <Grid item key={relatedSpec.id} xs={12} sm={6} md={4}>
                  <Link href={`/services/${relatedSpec.id}`} passHref style={{ textDecoration: 'none' }}>
                    <SpecializationCard specialization={relatedSpec} showFullDetails={false} />
                  </Link>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </MainLayout>
  );
};

export default ServiceDetailPage;