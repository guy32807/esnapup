import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Grid, 
  Button, 
  Card, 
  CardContent, 
  Tabs, 
  Tab, 
  Chip, 
  Pagination, 
  Stack,
  useMediaQuery,
  useTheme
} from '@mui/material';
import MainLayout from '@/ui/layouts/MainLayout';
import SEO from '@/ui/components/SEO';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { projects } from '@/data/projects';

// Define interface for portfolio items
interface PortfolioProject {
  id: string;
  title: string;
  shortDescription: string;
  imageUrl: string;
  technologies: string[];
  category: string[];
}

interface PortfolioPageProps {
  projects: PortfolioProject[];
}

export const getStaticProps = async () => {
  return {
    props: {
      projects: projects
    }
  };
};

const PortfolioPage = ({ projects }: PortfolioPageProps) => {
  const router = useRouter();
  const [category, setCategory] = useState('all');
  const [imageErrors, setImageErrors] = useState<{[key: string]: boolean}>({});
  const [page, setPage] = useState(1);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const projectsPerPage = 6;

  // Handle image error by setting the error state for that specific image
  const handleImageError = (id: string) => {
    setImageErrors(prev => ({
      ...prev,
      [id]: true
    }));
  };

  // Filter projects based on selected category
  const filteredProjects = category === 'all' 
    ? projects 
    : projects.filter(project => project.category.includes(category));

  // Get unique categories from projects
  const categories = ['all', ...Array.from(new Set(projects.flatMap(project => project.category)))];

  // Calculate pagination
  const pageCount = Math.ceil(filteredProjects.length / projectsPerPage);
  const startIndex = (page - 1) * projectsPerPage;
  const endIndex = startIndex + projectsPerPage;
  const displayedProjects = filteredProjects.slice(startIndex, endIndex);

  // Handle category change - reset to page 1
  const handleCategoryChange = (event: React.SyntheticEvent, newValue: string) => {
    setCategory(newValue);
    setPage(1);
  };

  // Handle page change
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    // Scroll to top of projects section
    document.getElementById('portfolio-grid')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <MainLayout>
      <SEO 
        title="Portfolio | ESnapup Software Development Projects" 
        description="Explore our portfolio of software development projects including web applications, mobile apps, and enterprise solutions."
        keywords={['portfolio', 'software development projects', 'web applications', 'mobile apps', 'case studies']}
      />
      
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'background.paper',
          pt: { xs: 8, md: 12 },
          pb: { xs: 6, md: 10 }
        }}
      >
        <Container maxWidth="lg">
          <Typography
            component="h1"
            variant="h2"
            color="text.primary"
            gutterBottom
            fontWeight="bold"
            sx={{ mb: 2 }}
          >
            Our Portfolio
          </Typography>
          <Typography 
            variant="h5" 
            color="text.secondary" 
            paragraph
            sx={{ mb: 4, maxWidth: 'md' }}
          >
            Explore our showcase of projects that demonstrate our expertise in 
            creating innovative and effective software solutions.
          </Typography>
          
          {/* Category Filter */}
          <Tabs 
            value={category}
            onChange={handleCategoryChange}
            sx={{ 
              mb: 6, 
              '.MuiTabs-indicator': {
                backgroundColor: 'primary.main',
              }
            }}
            variant="scrollable"
            scrollButtons="auto"
          >
            {categories.map((cat) => (
              <Tab 
                key={cat} 
                label={cat.charAt(0).toUpperCase() + cat.slice(1)} 
                value={cat}
                sx={{
                  textTransform: 'capitalize',
                  fontWeight: 500,
                  '&.Mui-selected': {
                    color: 'primary.main',
                    fontWeight: 600
                  }
                }}
              />
            ))}
          </Tabs>
        </Container>
      </Box>
      
      {/* Portfolio Grid */}
      <Container id="portfolio-grid" maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={4}>
          {displayedProjects.map((project) => (
            <Grid item key={project.id} xs={12} sm={6} md={4}>
              <Card 
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  transition: '0.3s',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 6
                  }
                }}
                onClick={() => router.push(`/portfolio/${project.id}`)}
              >
                <Box sx={{ position: 'relative', height: 240 }}>
                  <Image
                    src={imageErrors[project.id] ? '/images/portfolio/placeholder-project.jpg' : project.imageUrl}
                    alt={project.title}
                    fill
                    sizes="(max-width: 600px) 100vw, (max-width: 960px) 50vw, 33vw"
                    style={{ objectFit: 'cover' }}
                    onError={() => handleImageError(project.id)}
                  />
                </Box>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h6" component="h2" fontWeight="bold">
                    {project.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {project.shortDescription}
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 'auto' }}>
                    {project.technologies.slice(0, 3).map((tech) => (
                      <Chip 
                        key={tech} 
                        label={tech} 
                        size="small" 
                        variant="outlined" 
                        sx={{ fontSize: '0.75rem' }}
                      />
                    ))}
                    {project.technologies.length > 3 && (
                      <Chip 
                        label={`+${project.technologies.length - 3}`} 
                        size="small" 
                        variant="outlined" 
                        sx={{ fontSize: '0.75rem' }}
                      />
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        
        {/* If there are no projects in the selected category */}
        {filteredProjects.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 6 }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No projects found in this category.
            </Typography>
            <Button 
              variant="contained" 
              color="primary"
              onClick={() => setCategory('all')}
              sx={{ mt: 2 }}
            >
              View All Projects
            </Button>
          </Box>
        )}
        
        {/* Pagination */}
        {filteredProjects.length > projectsPerPage && (
          <Stack 
            direction="row" 
            spacing={2} 
            justifyContent="center" 
            sx={{ mt: 8 }}
          >
            <Pagination 
              count={pageCount} 
              page={page} 
              onChange={handlePageChange}
              color="primary"
              size={isMobile ? "small" : "medium"}
              showFirstButton
              showLastButton
            />
          </Stack>
        )}
        
        {/* Project count */}
        <Typography 
          variant="body2" 
          color="text.secondary" 
          align="center"
          sx={{ mt: 2 }}
        >
          Showing {startIndex + 1}-{Math.min(endIndex, filteredProjects.length)} of {filteredProjects.length} projects
        </Typography>
      </Container>
    </MainLayout>
  );
};

export default PortfolioPage;