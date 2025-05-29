import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';

interface LogoProps {
  variant?: 'default' | 'white';
  showText?: boolean;
}

const Logo = ({ variant = 'default', showText = true }: LogoProps) => {
  const theme = useTheme();
  
  // Text color based on variant
  const textColor = variant === 'white' ? 'white' : 'text.primary';
  
  return (
    <Link href="/" passHref style={{ textDecoration: 'none' }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {/* Logo Image */}
        <Box 
          sx={{ 
            position: 'relative',
            width: 40, 
            height: 40,
            mr: showText ? 1 : 0,
          }}
        >
          {/* If you have an actual logo image, use this: */}
          {/* 
          <Image
            src="/images/logo.svg"
            alt="ESnapup Logo"
            fill
            priority
            sizes="40px"
            style={{ objectFit: 'contain' }}
          />
          */}
          
          {/* Temporary text-based logo */}
          <Box
            sx={{
              width: '100%',
              height: '100%',
              borderRadius: '8px',
              backgroundColor: 'primary.main',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              color: 'white',
              fontSize: '18px',
            }}
          >
            E
          </Box>
        </Box>
        
        {/* Text */}
        {showText && (
          <Typography 
            variant="h6" 
            component="span" 
            sx={{ 
              fontWeight: 700,
              color: textColor,
              letterSpacing: '-0.5px',
              '& span': {
                color: 'primary.main'
              }
            }}
          >
            E<span>Snapup</span>
          </Typography>
        )}
      </Box>
    </Link>
  );
};

export default Logo;