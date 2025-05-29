import React from 'react';
import { 
  Box, Container, Grid, Typography, Link as MuiLink, 
  IconButton, Divider, Stack, useTheme 
} from '@mui/material';
import Link from 'next/link';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import { footerLinks } from '@/data/navigation';
import Logo from './Logo';

const Footer = () => {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();
  
  return (
    <Box 
      component="footer" 
      sx={{
        bgcolor: 'background.paper',
        borderTop: '1px solid',
        borderColor: 'divider',
        py: 6,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Logo & Company Info */}
          <Grid item xs={12} md={4}>
            <Box sx={{ mb: 2 }}>
              <Logo />
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Custom software development solutions that transform your business and drive innovation.
            </Typography>
            
            {/* Contact Info */}
            <Stack spacing={1} sx={{ mt: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <EmailIcon fontSize="small" sx={{ mr: 1, color: 'primary.main' }} />
                <MuiLink href="mailto:info@esnapup.com" color="inherit" underline="hover" variant="body2">
                  info@esnapup.com
                </MuiLink>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <EmailIcon fontSize="small" sx={{ mr: 1, color: 'primary.main' }} />
                <MuiLink href="mailto:adubuisson@comcast.net" color="inherit" underline="hover" variant="body2">
                  adubuisson@comcast.net
                </MuiLink>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <PhoneIcon fontSize="small" sx={{ mr: 1, color: 'primary.main' }} />
                <MuiLink href="tel:+13522985645" color="inherit" underline="hover" variant="body2">
                  (352) 298-5645
                </MuiLink>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                <LocationOnIcon fontSize="small" sx={{ mr: 1, mt: 0.5, color: 'primary.main' }} />
                <Typography variant="body2" color="text.secondary">
                  1626 West Orange Blossom Trail # 1046<br />
                  Apopka, FL 32712
                </Typography>
              </Box>
            </Stack>
          </Grid>
          
          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" component="h3" gutterBottom fontWeight="medium" color="text.primary">
              Quick Links
            </Typography>
            <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
              {footerLinks.map((link, index) => (
                <Box component="li" key={index} sx={{ mb: 1 }}>
                  <Link href={link.path} passHref legacyBehavior>
                    <MuiLink 
                      color="text.secondary" 
                      underline="hover" 
                      sx={{ display: 'inline-block', '&:hover': { color: 'primary.main' } }}
                    >
                      {link.label}
                    </MuiLink>
                  </Link>
                </Box>
              ))}
            </Box>
          </Grid>
          
          {/* Newsletter */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" component="h3" gutterBottom fontWeight="medium" color="text.primary">
              Connect With Us
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Follow us on social media for updates, tech insights, and more.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton 
                aria-label="GitHub" 
                component="a" 
                href="https://github.com/guy32807/esnapup" 
                target="_blank" 
                rel="noopener"
                sx={{ color: 'text.secondary' }}
              >
                <GitHubIcon />
              </IconButton>
              <IconButton 
                aria-label="LinkedIn" 
                component="a" 
                href="https://linkedin.com/in/auguste-dubuisson" 
                target="_blank" 
                rel="noopener"
                sx={{ color: 'text.secondary' }}
              >
                <LinkedInIcon />
              </IconButton>
              <IconButton 
                aria-label="Twitter" 
                component="a" 
                href="https://twitter.com/esnapup" 
                target="_blank" 
                rel="noopener"
                sx={{ color: 'text.secondary' }}
              >
                <TwitterIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 4 }} />
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <Typography variant="body2" color="text.secondary">
            © {currentYear} ESnapup. All rights reserved.
          </Typography>
          <Box>
            <Link href="/privacy" passHref legacyBehavior>
              <MuiLink color="text.secondary" underline="hover" sx={{ mr: 2 }} variant="body2">
                Privacy Policy
              </MuiLink>
            </Link>
            <Link href="/terms" passHref legacyBehavior>
              <MuiLink color="text.secondary" underline="hover" variant="body2">
                Terms of Service
              </MuiLink>
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;