import { GetStaticProps, GetStaticPaths } from 'next';
import React from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Grid, 
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  CardMedia,
  CardActionArea,
  Stack
} from '@mui/material';
import MainLayout from '@/ui/layouts/MainLayout';
import SEO from '@/ui/components/SEO';
import Link from 'next/link';
import Image from 'next/image';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import LanguageIcon from '@mui/icons-material/Language';
import GitHubIcon from '@mui/icons-material/GitHub';
import BusinessIcon from '@mui/icons-material/Business';
import DateRangeIcon from '@mui/icons-material/DateRange';
import CategoryIcon from '@mui/icons-material/Category';
import LaunchIcon from '@mui/icons-material/Launch';
import CodeIcon from '@mui/icons-material/Code';
import SocialShare from '@/ui/components/SocialShare';
import { useRouter } from 'next/router';
import { projects, getProjectById, getSimilarProjects } from '@/data/projects';

// Define portfolio project type (same as in index.tsx)
interface Project {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  imageUrl: string;
  category: string[];
  technologies: string[];
  websiteUrl?: string;
  githubUrl?: string;
  client?: string;
  year: number;
  featured: boolean;
  liveUrl?: string;
}

interface ProjectDetailPageProps {
  project: Project;
  similarProjects: Project[];
}

// Add these functions for SSG:
export const getStaticPaths: GetStaticPaths = async () => {
  const paths = projects.map((project) => ({
    params: { id: project.id },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id as string;
  const project = getProjectById(id);
  const similarProjects = getSimilarProjects(id);

  return {
    props: {
      project,
      similarProjects,
    },
  };
};

const ProjectDetailPage = ({ project, similarProjects }: ProjectDetailPageProps) => {
  const router = useRouter();
  const [imageError, setImageError] = React.useState(false);

  return (
    <MainLayout>
      <SEO 
        title={`ESnapup - ${project.title} | Portfolio Project`}
        description={project.shortDescription}
        keywords={[...project.technologies, ...project.category, 'portfolio', 'case study', 'project']}
        ogImage={project.imageUrl}
      />
      
      {/* Project Header */}
      <Box
        sx={{
          bgcolor: 'background.paper',
          pt: { xs: 6, md: 8 },
          pb: { xs: 4, md: 6 }
        }}
      >
        <Container maxWidth="lg">
          <Button
            component={Link}
            href="/portfolio"
            startIcon={<ArrowBackIcon />}
            sx={{ mb: 3 }}
          >
            Back to Portfolio
          </Button>
          
          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              <Typography
                component="h1"
                variant="h3"
                color="text.primary"
                gutterBottom
                fontWeight="bold"
              >
                {project.title}
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                paragraph
              >
                {project.shortDescription}
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                {project.category.map((cat) => (
                  <Chip 
                    key={cat} 
                    label={cat} 
                    color="primary" 
                    variant="outlined" 
                    size="small"
                  />
                ))}
              </Box>
            </Grid>
            <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'flex-end' }, alignItems: 'center' }}>
              <SocialShare 
                title={`Check out this project: ${project.title}`} 
                description={project.shortDescription}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
      
      {/* Project Image */}
      <Box sx={{ position: 'relative', height: { xs: 300, sm: 400, md: 500 }, width: '100%', overflow: 'hidden' }}>
        <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
          <Image
            src={imageError ? '/images/portfolio/placeholder-project.jpg' : project.imageUrl}
            alt={project.title}
            fill
            priority
            onError={() => setImageError(true)}
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
        </Box>
      </Box>
      
      {/* Project Details */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
        <Grid container spacing={6}>
          {/* Main Content */}
          <Grid item xs={12} md={8}>
            <Typography variant="h5" component="h2" gutterBottom fontWeight="bold">
              Project Overview
            </Typography>
            <Typography variant="body1" paragraph sx={{ mb: 4 }}>
              {project.description}
            </Typography>
            
            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" component="h2" gutterBottom fontWeight="bold">
                Project Links
              </Typography>
              <Stack direction="row" spacing={2}>
                {project.liveUrl && (
                  <Button 
                    variant="contained" 
                    color="primary"
                    component="a"
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    startIcon={<LaunchIcon />}
                  >
                    Live Demo
                  </Button>
                )}
                <Button
                  variant="outlined"
                  color="primary"
                  component="a"
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  startIcon={<CodeIcon />}
                >
                  View Code
                </Button>
              </Stack>
            </Box>

            <Typography variant="h5" component="h2" gutterBottom fontWeight="bold">
              Technologies Used
            </Typography>
            <Grid container spacing={2} sx={{ mb: 4 }}>
              {project.technologies.map((tech) => (
                <Grid item key={tech}>
                  <Chip 
                    label={tech} 
                    color="primary" 
                    sx={{ fontWeight: 500 }}
                  />
                </Grid>
              ))}
            </Grid>
            
            <Typography variant="h5" component="h2" gutterBottom fontWeight="bold">
              Key Features
            </Typography>
            <List>
              {/* These are sample features - in a real app, you'd have them in your project data */}
              <ListItem>
                <ListItemIcon>
                  <CheckCircleOutlineIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Responsive design optimized for all devices" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckCircleOutlineIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Secure authentication and data protection" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckCircleOutlineIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Intuitive user interface with smooth navigation" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckCircleOutlineIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Advanced analytics and reporting capabilities" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckCircleOutlineIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Integration with third-party services and APIs" />
              </ListItem>
            </List>
          </Grid>
          
          {/* Sidebar */}
          <Grid item xs={12} md={4}>
            <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
              <Typography variant="h6" component="h3" gutterBottom fontWeight="bold">
                Project Details
              </Typography>
              <List disablePadding>
                <ListItem disablePadding sx={{ py: 1.5 }}>
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <BusinessIcon fontSize="small" color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Client" 
                    secondary={project.client || 'Various Clients'} 
                    primaryTypographyProps={{ variant: 'body2', fontWeight: 600 }}
                    secondaryTypographyProps={{ variant: 'body2' }}
                  />
                </ListItem>
                <Divider component="li" />
                <ListItem disablePadding sx={{ py: 1.5 }}>
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <DateRangeIcon fontSize="small" color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Year" 
                    secondary={project.year} 
                    primaryTypographyProps={{ variant: 'body2', fontWeight: 600 }}
                    secondaryTypographyProps={{ variant: 'body2' }}
                  />
                </ListItem>
                <Divider component="li" />
                <ListItem disablePadding sx={{ py: 1.5 }}>
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <CategoryIcon fontSize="small" color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Category" 
                    secondary={project.category.join(', ')} 
                    primaryTypographyProps={{ variant: 'body2', fontWeight: 600 }}
                    secondaryTypographyProps={{ variant: 'body2' }}
                  />
                </ListItem>
              </List>
              
              <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
                {project.websiteUrl && (
                  <Button 
                    variant="contained" 
                    color="primary"
                    startIcon={<LanguageIcon />}
                    href={project.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    fullWidth
                  >
                    Visit Website
                  </Button>
                )}
                {project.githubUrl && (
                  <Button 
                    variant="outlined" 
                    startIcon={<GitHubIcon />}
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    fullWidth
                  >
                    View Source Code
                  </Button>
                )}
              </Box>
            </Paper>
            
            <Card sx={{ mb: 4 }}>
              <CardContent>
                <Typography variant="h6" component="h3" gutterBottom fontWeight="bold">
                  Need a similar solution?
                </Typography>
                <Typography variant="body2" paragraph>
                  Let's discuss how we can help you achieve your goals with a custom-tailored solution.
                </Typography>
                <Button 
                  variant="contained" 
                  color="primary"
                  component={Link}
                  href="/contact"
                  fullWidth
                >
                  Contact Us
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        
        {/* Similar Projects */}
        {similarProjects.length > 0 && (
          <Box sx={{ mt: 8 }}>
            <Typography variant="h5" component="h2" gutterBottom fontWeight="bold">
              Similar Projects
            </Typography>
            <Grid container spacing={4}>
              {similarProjects.map((similarProject) => (
                <Grid item key={similarProject.id} xs={12} sm={6} md={4}>
                  <Card 
                    sx={{ 
                      height: '100%', 
                      display: 'flex', 
                      flexDirection: 'column',
                      transition: '0.3s',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: 6
                      },
                      cursor: 'pointer'
                    }}
                    onClick={() => router.push(`/portfolio/${similarProject.id}`)}
                  >
                    <Box sx={{ position: 'relative', height: 160 }}>
                      <Image
                        src={similarProject.imageUrl}
                        alt={similarProject.title}
                        fill
                        style={{ objectFit: 'cover' }}
                        onError={(e) => {
                          const imgElement = e.target as HTMLImageElement;
                          imgElement.src = '/images/portfolio/placeholder-project.jpg';
                        }}
                      />
                    </Box>
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h6" component="h3" fontWeight="bold">
                        {similarProject.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {similarProject.shortDescription}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
        
        {/* CTA Section */}
        <Box sx={{ mt: 8, textAlign: 'center' }}>
          <Typography variant="h4" component="h2" gutterBottom fontWeight="bold">
            Ready to Start Your Project?
          </Typography>
          <Typography variant="body1" paragraph sx={{ maxWidth: 700, mx: 'auto', mb: 4 }}>
            Contact us today to discuss how we can help bring your vision to life with our expertise in design and development.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            component={Link}
            href="/contact"
            sx={{ px: 4, py: 1.5 }}
          >
            Get in Touch
          </Button>
        </Box>
      </Container>
    </MainLayout>
  );
};

export default ProjectDetailPage;