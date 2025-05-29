// src/pages/about/index.tsx
import React from 'react';
import { 
  Container, Typography, Box, Grid, Paper, 
  Card, CardContent, Button, useTheme, alpha
} from '@mui/material';
import MainLayout from '@/ui/layouts/MainLayout';
import SEO from '@/ui/components/SEO';
import Link from 'next/link';
import DoneIcon from '@mui/icons-material/Done';

// Import your team member data here
import { teamMembers } from '@/data/team';

interface TeamMemberProps {
  name: string;
  role: string;
  bio: string;
}

const TeamMember = ({ name, role, bio }: TeamMemberProps) => {
  const theme = useTheme();
  
  return (
    <Box sx={{ 
      backgroundColor: 'background.paper',
      borderRadius: 2,
      overflow: 'hidden',
      boxShadow: 1,
      p: { xs: 3, md: 4 }
    }}>
      <Typography variant="h4" component="h3" gutterBottom fontWeight="bold" color="primary.main">
        {name}
      </Typography>
      <Typography variant="h6" color="text.secondary" gutterBottom sx={{ mb: 2 }}>
        {role}
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        {bio}
      </Typography>
      
      <Button 
        component={Link}
        href="/contact"
        variant="contained"
        color="primary"
        sx={{ 
          px: 3,
          py: 1,
          borderRadius: '50px',
          '&:hover': {
            boxShadow: `0 8px 16px ${alpha(theme.palette.primary.main, 0.2)}`
          }
        }}
      >
        Get in Touch
      </Button>
    </Box>
  );
};

const AboutPage = () => {
  const theme = useTheme();

  // Key milestones or achievements
  const milestones = [
    {
      year: '2018',
      title: 'Foundation',
      description: 'ESnapup was founded with the mission to deliver innovative software solutions.'
    },
    {
      year: '2020',
      title: 'Expansion',
      description: 'Extended service offerings to include AI and machine learning solutions.'
    },
    {
      year: '2022',
      title: 'Recognition',
      description: 'Recognized for excellence in delivering high-quality software development.'
    },
    {
      year: '2024',
      title: 'Innovation',
      description: 'Launched new service offerings focused on modern web technologies and AI integration.'
    }
  ];

  return (
    <MainLayout>
      <SEO 
        title="About ESnapup | Our Story & Values"
        description="Learn about ESnapup, our mission to deliver innovative software solutions, and the values that drive our company."
        keywords="about ESnapup, software development expertise, company values, tech mission, development experience"
      />
      
      {/* Hero Section - Text only with gradient background */}
      <Box 
        sx={{ 
          py: { xs: 10, md: 12 }, 
          mb: 8,
          background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h1"
            component="h1"
            align="center"
            color="white"
            sx={{
              fontWeight: 'bold',
              fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
              mb: 2,
              textShadow: '0 2px 10px rgba(0,0,0,0.3)'
            }}
          >
            About ESnapup
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="white"
            sx={{ 
              maxWidth: '800px',
              mx: 'auto',
              textShadow: '0 1px 5px rgba(0,0,0,0.2)'
            }}
          >
            Building the future through innovative software solutions
          </Typography>
        </Container>
      </Box>

      {/* Our Story Section - In an attractive card */}
      <Container maxWidth="md" sx={{ mb: 12 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography 
            variant="h3" 
            component="h2" 
            gutterBottom 
            sx={{ 
              fontWeight: 'bold',
              position: 'relative',
              mb: 6,
              '&:after': {
                content: '""',
                position: 'absolute',
                bottom: -12,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 80,
                height: 4,
                backgroundColor: theme.palette.primary.main,
                borderRadius: 2
              }
            }}
          >
            Our Story
          </Typography>
        </Box>
        
        <Card 
          elevation={3} 
          sx={{ 
            borderRadius: 4,
            overflow: 'hidden',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            '&:hover': {
              boxShadow: 8,
              transform: 'translateY(-5px)'
            },
            position: 'relative'
          }}
        >
          <Box 
            sx={{ 
              position: 'absolute', 
              top: 0, 
              left: 0, 
              width: '100%', 
              height: 8, 
              background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.primary.light})` 
            }} 
          />
          
          <CardContent sx={{ p: { xs: 3, md: 5 } }}>
            <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem' }}>
              ESnapup was founded with a clear mission: to provide businesses with cutting-edge 
              software solutions that drive growth and innovation. As an experienced developer and consultant,
              I bring deep technical expertise and a passion for solving complex business problems through technology.
            </Typography>
            
            <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem' }}>
              My approach is defined by personal attention, technical excellence, and a relentless focus 
              on client success. I believe that technology should serve people, not the other way around, 
              which is why I approach every project with a human-centered mindset.
            </Typography>
            
            <Typography variant="body1" sx={{ fontSize: '1.1rem' }}>
              Today, I'm proud to offer a full spectrum of software development services, from web 
              and mobile applications to complex enterprise systems and AI-driven solutions. As ESnapup grows, 
              my commitment to excellence, innovation, and client satisfaction remains unwavering.
            </Typography>
          </CardContent>
        </Card>
      </Container>

      {/* Milestones Section - Timeline style */}
      <Box sx={{ 
        py: 10, 
        background: `linear-gradient(to right, ${alpha(theme.palette.primary.light, 0.05)}, ${alpha(theme.palette.primary.light, 0.1)})`
      }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            component="h2"
            align="center"
            gutterBottom
            sx={{ 
              fontWeight: 'bold',
              position: 'relative',
              mb: 6,
              '&:after': {
                content: '""',
                position: 'absolute',
                bottom: -12,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 80,
                height: 4,
                backgroundColor: theme.palette.primary.main,
                borderRadius: 2
              }
            }}
          >
            Our Journey
          </Typography>
          
          <Box sx={{ position: 'relative', mt: 8 }}>
            {/* Timeline line */}
            <Box sx={{ 
              position: 'absolute', 
              left: { xs: 20, md: '50%' }, 
              transform: { xs: 'translateX(0)', md: 'translateX(-50%)' },
              top: 0,
              bottom: 0,
              width: 4,
              bgcolor: alpha(theme.palette.primary.main, 0.3),
              zIndex: 0
            }} />
            
            {/* Timeline items */}
            <Grid container spacing={4}>
              {milestones.map((milestone, index) => (
                <Grid item xs={12} key={index}>
                  <Box sx={{
                    position: 'relative',
                    ml: { xs: 6, md: index % 2 === 0 ? 'auto' : 0 },
                    mr: { xs: 0, md: index % 2 === 0 ? 0 : 'auto' },
                    width: { xs: 'auto', md: '45%' },
                    textAlign: { xs: 'left', md: index % 2 === 0 ? 'right' : 'left' },
                    mb: 6
                  }}>
                    {/* Year marker */}
                    <Box sx={{ 
                      position: 'absolute',
                      left: { xs: -50, md: index % 2 === 0 ? 'auto' : -56 },
                      right: { xs: 'auto', md: index % 2 === 0 ? -56 : 'auto' },
                      top: 0,
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      bgcolor: theme.palette.primary.main,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: `0 0 0 4px ${alpha(theme.palette.primary.main, 0.2)}`,
                      zIndex: 2
                    }}>
                      <Typography variant="subtitle1" color="white" fontWeight="bold">
                        {milestone.year}
                      </Typography>
                    </Box>
                    
                    <Paper 
                      elevation={3} 
                      sx={{ 
                        p: 3, 
                        borderRadius: 2,
                        backgroundColor: 'background.paper',
                        '&:hover': {
                          boxShadow: 6,
                          transform: 'translateY(-4px)'
                        },
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <Typography variant="h6" gutterBottom color="primary" fontWeight="bold">
                        {milestone.title}
                      </Typography>
                      <Typography variant="body1">
                        {milestone.description}
                      </Typography>
                    </Paper>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </Box>

      {/* Our Values Section - Card-based with icons */}
      <Container maxWidth="lg" sx={{ py: 12 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography 
            variant="h3" 
            component="h2" 
            gutterBottom 
            sx={{ 
              fontWeight: 'bold',
              position: 'relative',
              mb: 6,
              '&:after': {
                content: '""',
                position: 'absolute',
                bottom: -12,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 80,
                height: 4,
                backgroundColor: theme.palette.primary.main,
                borderRadius: 2
              }
            }}
          >
            Our Values
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto', mb: 8 }}>
            These core principles guide everything I do and shape how I work with clients.
          </Typography>
        </Box>
        
        <Grid container spacing={4}>
          <Grid item xs={12} md={6} lg={3}>
            <Card 
              elevation={2} 
              sx={{ 
                height: '100%',
                borderRadius: 3,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: 8
                }
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Box 
                  sx={{ 
                    width: 60, 
                    height: 60, 
                    borderRadius: '50%',
                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 2
                  }}
                >
                  <DoneIcon sx={{ color: theme.palette.primary.main, fontSize: 28 }} />
                </Box>
                <Typography variant="h5" gutterBottom fontWeight="bold">
                  Excellence
                </Typography>
                <Typography variant="body1">
                  I strive for excellence in everything I do, from code quality to client communication and project management.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6} lg={3}>
            <Card 
              elevation={2} 
              sx={{ 
                height: '100%',
                borderRadius: 3,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: 8
                }
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Box 
                  sx={{ 
                    width: 60, 
                    height: 60, 
                    borderRadius: '50%',
                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 2
                  }}
                >
                  <DoneIcon sx={{ color: theme.palette.primary.main, fontSize: 28 }} />
                </Box>
                <Typography variant="h5" gutterBottom fontWeight="bold">
                  Innovation
                </Typography>
                <Typography variant="body1">
                  I embrace cutting-edge technologies and creative thinking to solve complex problems and deliver innovative solutions.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6} lg={3}>
            <Card 
              elevation={2} 
              sx={{ 
                height: '100%',
                borderRadius: 3,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: 8
                }
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Box 
                  sx={{ 
                    width: 60, 
                    height: 60, 
                    borderRadius: '50%',
                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 2
                  }}
                >
                  <DoneIcon sx={{ color: theme.palette.primary.main, fontSize: 28 }} />
                </Box>
                <Typography variant="h5" gutterBottom fontWeight="bold">
                  Collaboration
                </Typography>
                <Typography variant="body1">
                  I believe the best results come from close collaboration with clients, ensuring your vision becomes reality.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6} lg={3}>
            <Card 
              elevation={2} 
              sx={{ 
                height: '100%',
                borderRadius: 3,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: 8
                }
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Box 
                  sx={{ 
                    width: 60, 
                    height: 60, 
                    borderRadius: '50%',
                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 2
                  }}
                >
                  <DoneIcon sx={{ color: theme.palette.primary.main, fontSize: 28 }} />
                </Box>
                <Typography variant="h5" gutterBottom fontWeight="bold">
                  Integrity
                </Typography>
                <Typography variant="body1">
                  I operate with transparency, honesty, and ethical practices in all business relationships.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Team Section - Leadership */}
      <Box sx={{ 
        py: 12, 
        background: `linear-gradient(to bottom right, ${alpha(theme.palette.primary.light, 0.05)}, ${alpha(theme.palette.primary.light, 0.1)})`
      }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography 
              variant="h3" 
              component="h2" 
              gutterBottom 
              sx={{ 
                fontWeight: 'bold',
                position: 'relative',
                mb: 6,
                '&:after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -12,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 80,
                  height: 4,
                  backgroundColor: theme.palette.primary.main,
                  borderRadius: 2
                }
              }}
            >
              Leadership
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto', mb: 6 }}>
              Meet the founder behind ESnapup's software solutions.
            </Typography>
          </Box>
          
          <Grid container spacing={4} justifyContent="center">
            {teamMembers.map((member, index) => (
              <Grid item xs={12} sm={10} md={8} key={index}>
                <TeamMember 
                  name={member.name}
                  role={member.role}
                  bio={member.bio}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Work With Me CTA Section */}
      <Box sx={{ 
        py: 10, 
        background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
        color: 'white', 
      }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography 
            variant="h3" 
            component="h2" 
            gutterBottom 
            sx={{ 
              fontWeight: 'bold',
              textShadow: '0 2px 10px rgba(0,0,0,0.2)'
            }}
          >
            Work With Me
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, maxWidth: 800, mx: 'auto', opacity: 0.9 }}>
            Ready to discuss your project or explore how I can help with your software development needs?
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 3, mt: 4 }}>
            <Button 
              component={Link}
              href="/contact"
              variant="contained" 
              color="secondary" 
              size="large"
              sx={{ 
                px: 5, 
                py: 1.5, 
                borderRadius: '50px',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                '&:hover': {
                  boxShadow: `0 8px 20px rgba(0,0,0,0.3)`,
                  transform: 'translateY(-2px)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              Contact Me
            </Button>
            <Button 
              component={Link}
              href="/services"
              variant="outlined" 
              color="inherit"
              size="large"
              sx={{ 
                px: 5, 
                py: 1.5, 
                borderRadius: '50px',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                borderWidth: 2,
                '&:hover': {
                  borderWidth: 2,
                  backgroundColor: 'rgba(255,255,255,0.1)'
                }
              }}
            >
              View Services
            </Button>
          </Box>
        </Container>
      </Box>
    </MainLayout>
  );
};

export default AboutPage;