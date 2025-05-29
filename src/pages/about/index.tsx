// src/pages/about/index.tsx
import React from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  Divider,
  Paper,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import MainLayout from '@/ui/layouts/MainLayout';
import SEO from '@/ui/components/SEO';
import Image from 'next/image';

// Team members data
const teamMembers = [
  {
    name: 'Jennifer Roberts',
    position: 'Chief Executive Officer',
    bio: 'With over 15 years of experience in software development and business leadership, Jennifer drives the vision and strategy for ESnapup.',
    image: '/images/team/member-1.jpg'
  },
  {
    name: 'Michael Chen',
    position: 'Chief Technology Officer',
    bio: 'Michael leads our technical strategy and innovation, bringing 12+ years of experience in software architecture and emerging technologies.',
    image: '/images/team/member-2.jpg'
  },
  {
    name: 'Sarah Johnson',
    position: 'Head of Design',
    bio: 'With expertise in UX/UI design and user research, Sarah ensures all our solutions are beautiful, accessible, and user-friendly.',
    image: '/images/team/member-3.jpg'
  },
  {
    name: 'David Martinez',
    position: 'Lead Developer',
    bio: 'David oversees our development team and technical delivery, with deep expertise in full-stack development and cloud architecture.',
    image: '/images/team/member-4.jpg'
  }
];

// Company values
const companyValues = [
  {
    title: 'Client-Focused Solutions',
    description: 'We prioritize understanding your business needs and delivering solutions that drive real value.'
  },
  {
    title: 'Technical Excellence',
    description: 'We maintain the highest standards of code quality, performance, and security in every project.'
  },
  {
    title: 'Continuous Innovation',
    description: 'We stay at the forefront of technology trends to bring innovative solutions to complex problems.'
  },
  {
    title: 'Transparent Communication',
    description: 'We believe in clear, honest communication throughout the entire development process.'
  }
];

const AboutPage = () => {
  return (
    <MainLayout>
      <SEO 
        title="About ESnapup | Our Story, Values and Team" 
        description="Learn about ESnapup's journey, our values, and the talented team behind our innovative software solutions."
        keywords="software development team, tech company, software engineers, about us, company values, web development team"
      />
      
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'background.paper',
          pt: { xs: 8, md: 12 },
          pb: { xs: 6, md: 10 },
          position: 'relative',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                component="h1"
                variant="h2"
                color="text.primary"
                gutterBottom
                fontWeight="bold"
                sx={{ 
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  lineHeight: 1.2
                }}
              >
                About <Box component="span" sx={{ color: 'primary.main' }}>Us</Box>
              </Typography>
              <Typography
                variant="h5"
                color="text.secondary"
                paragraph
                sx={{ mb: 4 }}
              >
                We're a team of passionate technologists dedicated to transforming ideas into powerful digital solutions.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  position: 'relative',
                  height: { xs: 300, md: 400 },
                  width: '100%',
                  borderRadius: 2,
                  overflow: 'hidden',
                  boxShadow: 3
                }}
              >
                <Image
                  src="/images/about/team.jpg"
                  alt="ESnapup Team"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
      
      {/* Our Story */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={6}>
          <Grid item xs={12} md={6}>
            <Typography variant="h3" component="h2" gutterBottom fontWeight="bold">
              Our Story
            </Typography>
            <Typography variant="body1" paragraph>
              Founded in 2018, ESnapup began with a simple mission: to help businesses transform their ideas into powerful digital solutions. What started as a small team of passionate developers has grown into a full-service software development company.
            </Typography>
            <Typography variant="body1" paragraph>
              Over the years, we've had the privilege of partnering with clients across various industries—from healthcare and finance to education and e-commerce. Each project has added to our expertise and reinforced our commitment to delivering exceptional results.
            </Typography>
            <Typography variant="body1">
              Today, ESnapup stands as a trusted technology partner for businesses of all sizes. We combine technical excellence with strategic thinking to create software solutions that drive growth and innovation for our clients.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 4, height: '100%' }}>
              <Typography variant="h4" component="h3" gutterBottom fontWeight="bold">
                Our Vision
              </Typography>
              <Typography variant="body1" paragraph>
                To be the most trusted technology partner for businesses seeking innovative digital solutions.
              </Typography>
              
              <Typography variant="h4" component="h3" gutterBottom fontWeight="bold" sx={{ mt: 4 }}>
                Our Mission
              </Typography>
              <Typography variant="body1">
                To empower businesses through technology by delivering software solutions that are robust, user-friendly, and aligned with their strategic objectives.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      
      {/* Our Values */}
      <Box sx={{ bgcolor: 'background.paper', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" component="h2" gutterBottom fontWeight="bold" align="center" sx={{ mb: 6 }}>
            Our Values
          </Typography>
          
          <Grid container spacing={4}>
            {companyValues.map((value, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card 
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    transition: '0.3s',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: 4
                    }
                  }}
                >
                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    <Typography variant="h5" component="h3" gutterBottom fontWeight="bold">
                      {value.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {value.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      
      {/* Our Team */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h3" component="h2" gutterBottom fontWeight="bold" sx={{ mb: 6 }}>
          Meet Our Team
        </Typography>
        
        <Grid container spacing={4}>
          {teamMembers.map((member, index) => (
            <Grid item key={index} xs={12} sm={6} md={3}>
              <Card 
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  transition: '0.3s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 4
                  }
                }}
              >
                <Box sx={{ position: 'relative', paddingTop: '100%', width: '100%' }}>
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </Box>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" component="h3" gutterBottom>
                    {member.name}
                  </Typography>
                  <Typography variant="subtitle2" color="primary" gutterBottom>
                    {member.position}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {member.bio}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      
      {/* Why Choose Us */}
      <Box sx={{ bgcolor: 'background.paper', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" component="h2" gutterBottom fontWeight="bold" sx={{ mb: 6 }}>
            Why Choose Us
          </Typography>
          
          <Grid container spacing={6}>
            <Grid item xs={12} md={6}>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleOutlineIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Experienced Team" 
                    secondary="Our developers have an average of 8+ years of industry experience."
                    primaryTypographyProps={{ fontWeight: 'bold' }}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleOutlineIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="End-to-End Solutions" 
                    secondary="From concept and design to development, testing, and maintenance."
                    primaryTypographyProps={{ fontWeight: 'bold' }}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleOutlineIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Modern Technology Stack" 
                    secondary="We use cutting-edge technologies to build scalable, high-performance applications."
                    primaryTypographyProps={{ fontWeight: 'bold' }}
                  />
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={12} md={6}>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleOutlineIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Client-Centered Approach" 
                    secondary="We prioritize your business needs and goals throughout the development process."
                    primaryTypographyProps={{ fontWeight: 'bold' }}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleOutlineIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Agile Methodology" 
                    secondary="Flexible, iterative development with regular updates and transparency."
                    primaryTypographyProps={{ fontWeight: 'bold' }}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleOutlineIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Post-Launch Support" 
                    secondary="We provide ongoing maintenance and support to ensure your solution continues to excel."
                    primaryTypographyProps={{ fontWeight: 'bold' }}
                  />
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </MainLayout>
  );
};

export default AboutPage;