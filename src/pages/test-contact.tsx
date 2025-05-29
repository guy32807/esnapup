import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Container, Alert } from '@mui/material';

export default function TestContact() {
  const [formState, setFormState] = useState({
    name: 'Test User',
    email: 'test@example.com',
    subject: 'API Test',
    message: 'This is a test message'
  });
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const testApi = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    
    try {
      const res = await fetch('/api/hello');
      const data = await res.json();
      setResult({ route: '/api/hello', status: res.status, data });
    } catch (err: any) {
      setError(`Hello API failed: ${err.message}`);
    }
    
    setLoading(false);
  };

  const submitForm = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState)
      });
      
      // Try to parse as JSON but handle non-JSON responses
      let data;
      const contentType = res.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        data = await res.json();
      } else {
        data = { text: await res.text() };
      }
      
      setResult({ 
        route: '/api/contact',
        status: res.status, 
        statusText: res.statusText,
        contentType,
        data 
      });
    } catch (err: any) {
      setError(`Contact API failed: ${err.message}`);
    }
    
    setLoading(false);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>API Test Page</Typography>
      <Typography variant="body1" paragraph>
        This page is for testing API endpoints.
      </Typography>
      
      <Box sx={{ my: 4 }}>
        <Button 
          variant="outlined" 
          onClick={testApi} 
          disabled={loading}
          sx={{ mr: 2 }}
        >
          Test /api/hello
        </Button>
        
        <Button 
          variant="contained" 
          onClick={submitForm}
          disabled={loading}
        >
          Test Contact Form API
        </Button>
      </Box>
      
      <Box sx={{ my: 4 }}>
        <Typography variant="h6" gutterBottom>Test Form Data:</Typography>
        <TextField
          fullWidth
          label="Name"
          name="name"
          value={formState.name}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          value={formState.email}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Subject"
          name="subject"
          value={formState.subject}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Message"
          name="message"
          value={formState.message}
          onChange={handleChange}
          margin="normal"
          multiline
          rows={4}
        />
      </Box>
      
      {error && (
        <Alert severity="error" sx={{ my: 2 }}>
          {error}
        </Alert>
      )}
      
      {result && (
        <Box sx={{ my: 2, p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
          <Typography variant="h6" gutterBottom>Response from {result.route}:</Typography>
          <Typography variant="body2" component="pre" sx={{ whiteSpace: 'pre-wrap' }}>
            Status: {result.status} {result.statusText}
            {result.contentType && `\nContent-Type: ${result.contentType}`}
            {"\n\nData: " + JSON.stringify(result.data, null, 2)}
          </Typography>
        </Box>
      )}
    </Container>
  );
}