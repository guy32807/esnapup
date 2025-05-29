import React from 'react';
import { Box, Container, Grid, Typography, Link as MuiLink, IconButton, Stack, Divider, useTheme, useMediaQuery } from '@mui/material';
import Link from 'next/link';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const FooterLink = ({ href, children }: { href: string, children: React.ReactNode }) => (
  <Link href={href} passHref>
    <MuiLink
      color="inherit"
      sx={{
        display: 'block',
        mb: 1.5,
        fontSize: '0.9rem',
        '&:hover': {
          color: 'primary.main',
          textDecoration: 'none'
        }
      }}
    >
      {children}
    </MuiLink>
  </Link>
);

const Footer: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const currentYear = new Date().getFullYear();
  
  return (
    <Box 
      component="footer" 
      sx={{ 
        bgcolor: 'background.paper',
        borderTop: '1px solid',
        borderColor: 'divider',
        mt: 'auto',
        py: { xs: 6, md: 8 }
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ mb: { xs: 3, md: 0 } }}>
              <Typography variant="h6" color="text.primary" gutterBottom fontWeight={600}>
                ESnapup
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Transforming ideas into powerful digital solutions with cutting-edge technology and expertise.
              </Typography>
              <Stack direction="row" spacing={1}>
                <IconButton 
                  href="https://facebook.com/esnapup" 
                  target="_blank"
                  aria-label="Facebook"
                  size="small"
                  sx={{ color: '#1877F2' }}
                >
                  <FacebookIcon />
                </IconButton>
                <IconButton 
                  href="https://twitter.com/esnapup" 
                  target="_blank"
                  aria-label="Twitter"
                  size="small"
                  sx={{ color: '#1DA1F2' }}
                >
                  <TwitterIcon />
                </IconButton>
                <IconButton 
                  href="https://linkedin.com/company/esnapup" 
                  target="_blank"
                  aria-label="LinkedIn"
                  size="small"
                  sx={{ color: '#0A66C2' }}
                >
                  <LinkedInIcon />
                </IconButton>
                <IconButton 
                  href="https://instagram.com/esnapup" 
                  target="_blank"
                  aria-label="Instagram"
                  size="small"
                  sx={{ color: '#E4405F' }}
                >
                  <InstagramIcon />
                </IconButton>
                <IconButton 
                  href="https://github.com/esnapup" 
                  target="_blank"
                  aria-label="GitHub"
                  size="small"
                  sx={{ color: '#171515' }}
                >
                  <GitHubIcon />
                </IconButton>
              </Stack>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1" color="text.primary" gutterBottom fontWeight={600}>
              Services
            </Typography>
            <FooterLink href="/services/web-development">Web Development</FooterLink>
            <FooterLink href="/services/mobile-apps">Mobile Applications</FooterLink>
            <FooterLink href="/services/cloud-solutions">Cloud Solutions</FooterLink>
            <FooterLink href="/services/ai-integration">AI Integration</FooterLink>
            <FooterLink href="/services/consulting">IT Consulting</FooterLink>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1" color="text.primary" gutterBottom fontWeight={600}>
              Company
            </Typography>
            <FooterLink href="/about">About Us</FooterLink>
            <FooterLink href="/portfolio">Our Work</FooterLink>
            <FooterLink href="/team">Our Team</FooterLink>
            <FooterLink href="/careers">Careers</FooterLink>
            <FooterLink href="/blog">Blog</FooterLink>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1" color="text.primary" gutterBottom fontWeight={600}>
              Contact Us
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                <EmailIcon fontSize="small" color="primary" />
                <MuiLink href="mailto:info@esnapup.com" color="text.secondary">
                  info@esnapup.com
                </MuiLink>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                <PhoneIcon fontSize="small" color="primary" />
                <Typography variant="body2" color="text.secondary">
                  +1 (555) 123-4567
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="flex-start" sx={{ mb: 1 }}>
                <LocationOnIcon fontSize="small" color="primary" sx={{ mt: 0.3 }} />
                <Typography variant="body2" color="text.secondary">
                  123 Tech Plaza, Suite 400<br />
                  San Francisco, CA 94105
                </Typography>
              </Stack>
            </Box>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 4 }} />
        
        <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: isMobile ? 'center' : 'flex-start' }}>
          <Typography variant="body2" color="text.secondary" align={isMobile ? "center" : "left"}>
            © {currentYear} ESnapup. All rights reserved.
          </Typography>
          
          <Box sx={{ display: 'flex', mt: isMobile ? 2 : 0 }}>
            <FooterLink href="/privacy">Privacy Policy</FooterLink>
            <Typography variant="body2" color="text.secondary" sx={{ mx: 1 }}>•</Typography>
            <FooterLink href="/terms">Terms of Service</FooterLink>
            <Typography variant="body2" color="text.secondary" sx={{ mx: 1 }}>•</Typography>
            <FooterLink href="/sitemap">Sitemap</FooterLink>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;