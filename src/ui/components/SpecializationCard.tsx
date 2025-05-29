import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Specialization } from '@/domain/entities/specialization';
import Link from 'next/link';

interface SpecializationCardProps {
  specialization: Specialization;
  showFullDetails?: boolean;
}

const SpecializationCard: React.FC<SpecializationCardProps> = ({ 
  specialization,
  showFullDetails = true 
}) => {
  return (
    <Card sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      transition: 'transform 0.3s, box-shadow 0.3s',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: 4
      }
    }}>
      <CardMedia
        component="img"
        height="200"
        image={specialization.image}
        alt={specialization.title}
      />
      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h5" component="h2" gutterBottom fontWeight="600">
          {specialization.title}
        </Typography>
        
        <Typography variant="body1" color="text.secondary" paragraph>
          {specialization.description}
        </Typography>
        
        {showFullDetails && (
          <>
            <Divider sx={{ my: 2 }} />
            
            <Typography variant="subtitle1" fontWeight="600" gutterBottom>
              Key Benefits
            </Typography>
            
            <List dense disablePadding sx={{ mb: 2 }}>
              {specialization.benefits.slice(0, 3).map((benefit, index) => (
                <ListItem key={index} disablePadding sx={{ py: 0.5 }}>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <CheckCircleOutlineIcon color="primary" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText 
                    primary={benefit}
                    primaryTypographyProps={{ variant: 'body2' }}
                  />
                </ListItem>
              ))}
              {specialization.benefits.length > 3 && (
                <ListItem>
                  <Typography variant="body2" color="primary" sx={{ fontWeight: 500 }}>
                    <Link href={`/services/${specialization.id}`} passHref style={{ textDecoration: 'none' }}>
                      + {specialization.benefits.length - 3} more benefits
                    </Link>
                  </Typography>
                </ListItem>
              )}
            </List>
            
            <Typography variant="subtitle1" fontWeight="600" gutterBottom>
              Technologies
            </Typography>
            
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {specialization.technologies.slice(0, 5).map((tech, index) => {
                // Extract the first part of the technology (before the colon)
                const techName = tech.split(':')[0].trim();
                return (
                  <Box 
                    key={index} 
                    sx={{ 
                      px: 1.5, 
                      py: 0.5, 
                      borderRadius: 1, 
                      bgcolor: 'rgba(79, 70, 229, 0.08)', 
                      fontSize: '0.75rem',
                      fontWeight: 500
                    }}
                  >
                    {techName}
                  </Box>
                );
              })}
              {specialization.technologies.length > 5 && (
                <Box sx={{ px: 1.5, py: 0.5 }}>
                  <Typography variant="body2" color="primary" sx={{ fontWeight: 500 }}>
                    <Link href={`/services/${specialization.id}`} passHref style={{ textDecoration: 'none' }}>
                      +{specialization.technologies.length - 5} more
                    </Link>
                  </Typography>
                </Box>
              )}
            </Box>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default SpecializationCard;