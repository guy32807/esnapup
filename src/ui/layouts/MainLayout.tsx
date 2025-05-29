// src/ui/layouts/MainLayout.tsx
import React from 'react';
import { AppBar, Toolbar, Container, Box, Button, Typography, useTheme, useMediaQuery, IconButton, Menu, MenuItem, Drawer, List, ListItem } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Chatbot from '@/ui/components/Chatbot';
import Footer from '@/ui/components/Footer'; // Import the new Footer component
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  
  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Contact', href: '/contact' }
  ];
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh',
      bgcolor: 'background.default'
    }}>
      <AppBar 
        position="sticky" 
        color="default" 
        elevation={0}
        sx={{ 
          bgcolor: 'background.paper',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Toolbar sx={{ px: { xs: 2, sm: 4 } }}>
          <Typography 
            variant="h6" 
            component={Link}
            href="/"
            sx={{ 
              flexGrow: 1, 
              fontWeight: 700,
              color: 'primary.main',
              fontSize: { xs: '1.25rem', md: '1.5rem' },
              textDecoration: 'none'
            }}
          >
            ESnapup
          </Typography>
          
          {isMobile ? (
            <>
              <IconButton 
                edge="end" 
                color="inherit" 
                aria-label="menu"
                onClick={toggleMobileMenu}
              >
                <MenuIcon />
              </IconButton>
              
              <Drawer
                anchor="right"
                open={mobileMenuOpen}
                onClose={toggleMobileMenu}
                sx={{ 
                  '& .MuiDrawer-paper': { 
                    width: '80%', 
                    maxWidth: '300px',
                    boxSizing: 'border-box',
                    bgcolor: 'background.paper'
                  }
                }}
              >
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'flex-end', 
                  p: 2, 
                  borderBottom: '1px solid',
                  borderColor: 'divider'
                }}>
                  <IconButton onClick={toggleMobileMenu}>
                    <CloseIcon />
                  </IconButton>
                </Box>
                <List sx={{ pt: 2 }}>
                  {navigation.map((item) => (
                    <ListItem 
                      key={item.name} 
                      onClick={() => {
                        router.push(item.href);
                        toggleMobileMenu();
                      }}
                      sx={{ 
                        py: 2,
                        borderBottom: '1px solid',
                        borderColor: 'divider',
                        color: router.pathname === item.href ? 'primary.main' : 'text.primary',
                        fontWeight: router.pathname === item.href ? 600 : 400,
                        '&:hover': {
                          bgcolor: 'action.hover'
                        }
                      }}
                    >
                      {item.name}
                    </ListItem>
                  ))}
                </List>
              </Drawer>
            </>
          ) : (
            <Box sx={{ display: 'flex' }}>
              {navigation.map((item) => (
                <Button
                  key={item.name}
                  component={Link}
                  href={item.href}
                  sx={{ 
                    mx: 1,
                    color: router.pathname === item.href ? 'primary.main' : 'text.primary',
                    fontWeight: router.pathname === item.href ? 600 : 500,
                    position: 'relative',
                    '&::after': router.pathname === item.href ? {
                      content: '""',
                      position: 'absolute',
                      bottom: 0,
                      left: '25%',
                      width: '50%',
                      height: '2px',
                      bgcolor: 'primary.main'
                    } : {},
                    '&:hover': {
                      bgcolor: 'transparent',
                      color: 'primary.main',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: 0,
                        left: '25%',
                        width: '50%',
                        height: '2px',
                        bgcolor: 'primary.light'
                      }
                    }
                  }}
                >
                  {item.name}
                </Button>
              ))}
              
              <Button
                component={Link}
                href="/contact"
                variant="contained"
                color="primary"
                sx={{
                  ml: 2,
                  px: 3,
                  borderRadius: '4px',
                  fontWeight: 600
                }}
              >
                Get in Touch
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      
      <Box component="main" sx={{ flexGrow: 1 }}>
        {children}
      </Box>
      
      {/* Use the new Footer component */}
      <Footer />
      
      {/* Add the Chatbot component */}
      <Chatbot />
    </Box>
  );
};

export default MainLayout;