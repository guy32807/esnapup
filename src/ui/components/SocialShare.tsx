import React from 'react';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { useRouter } from 'next/router';

interface SocialShareProps {
  title: string;
  description?: string;
}

const SocialShare: React.FC<SocialShareProps> = ({ title, description }) => {
  const router = useRouter();
  // Ensure we have a valid URL even during SSR
  const currentPath = router.asPath || '/';
  const currentUrl = `https://www.esnapup.com${currentPath}`;
  const encodedUrl = encodeURIComponent(currentUrl);
  const encodedTitle = encodeURIComponent(title || 'ESnapup');
  const encodedDescription = description ? encodeURIComponent(description) : '';
  
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
        Share:
      </Typography>
      
      <Tooltip title="Share on Facebook">
        <IconButton
          component="a"
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on Facebook"
          size="small"
          sx={{ 
            color: '#1877F2',
            '&:hover': {
              bgcolor: 'rgba(24, 119, 242, 0.1)'
            }
          }}
        >
          <FacebookIcon />
        </IconButton>
      </Tooltip>
      
      <Tooltip title="Share on Twitter">
        <IconButton
          component="a"
          href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on Twitter"
          size="small"
          sx={{ 
            color: '#1DA1F2',
            '&:hover': {
              bgcolor: 'rgba(29, 161, 242, 0.1)'
            }
          }}
        >
          <TwitterIcon />
        </IconButton>
      </Tooltip>
      
      <Tooltip title="Share on LinkedIn">
        <IconButton
          component="a"
          href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}&summary=${encodedDescription}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on LinkedIn"
          size="small"
          sx={{ 
            color: '#0A66C2',
            '&:hover': {
              bgcolor: 'rgba(10, 102, 194, 0.1)'
            }
          }}
        >
          <LinkedInIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default SocialShare;