import React, { useState } from 'react';
import { 
  Container, Typography, Box, Grid as MuiGrid, Card, 
  CardContent, CardMedia, List, ListItem, ListItemIcon, 
  ListItemText, Divider, Button, Tabs, Tab
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Specialization } from '@/domain/entities/specialization';
import SEO from './SEO';

// Create a custom Grid component that accepts 'item' prop for TypeScript compatibility
const Grid = MuiGrid as any;

interface ServicesProps {
  specializations: Specialization[];
}

const Services: React.FC<ServicesProps> = ({ specializations }) => {
  const [currentTab, setCurrentTab] = useState('fullstack');
  
  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  };
  
  // Find the current specialization based on the selected tab
  const currentSpecialization = specializations.find(spec => spec.id === currentTab);
  
  // If no specialization is found, show an error message
  if (!currentSpecialization) {
    return (
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography variant="h4" color="error" align="center">
          Specialization not found
        </Typography>
      </Container>
    );
  }

  return (
    <>
      <SEO 
        title="Our Services | ESnapup"
        description="Explore our specialized software development services including full stack, mobile, frontend, backend development, cloud architecture, and database design."
        keywords={[
          "full stack development", 
          "mobile app development", 
          "frontend development", 
          "backend services", 
          "cloud architecture", 
          "database design", 
          "AI integration",
          "LLMs",
          "Next.js development"
        ]}
        canonicalUrl="/services"
      />
      
      {/* Rest of your component, similar to your existing Services.tsx but adapted for Next.js */}
      {/* ... */}
    </>
  );
};

export default Services;