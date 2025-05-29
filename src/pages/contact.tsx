import React, { useState, useEffect, useRef } from 'react';
import { 
  Container, Typography, Box, Grid, TextField, Button, 
  Paper, Alert, AlertTitle, CircularProgress, IconButton,
  Tooltip, Divider, Collapse, Card, CardContent
} from '@mui/material';
import MainLayout from '@/ui/layouts/MainLayout';
import SEO from '@/ui/components/SEO';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import MicIcon from '@mui/icons-material/Mic';
import StopIcon from '@mui/icons-material/Stop';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

// Mock AI suggestions for demo purposes
const aiSuggestions = [
  "I'm interested in developing a mobile app for my business. Can you provide a quote?",
  "We need help integrating AI into our existing platform. What services do you offer?",
  "I'm looking for a team to build a custom e-commerce solution. Are you available for a consultation?",
  "Our company needs to modernize our legacy systems. Can you help with digital transformation?",
  "We're interested in your cloud architecture services. Can you share some case studies?"
];

const Contact = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  
  // Speech recognition states
  const [isListening, setIsListening] = useState(false);
  const [speechTarget, setSpeechTarget] = useState<keyof typeof formState | null>(null);
  const [speechRecognitionSupported, setSpeechRecognitionSupported] = useState(true);
  
  // AI quick response states
  const [showAiSuggestions, setShowAiSuggestions] = useState(false);
  
  // Reference to speech recognition object
  const recognitionRef = useRef<any>(null);

  // Check if speech recognition is supported
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSpeechRecognitionSupported(false);
    }
  }, []);
  
  // Set up speech recognition
  const startListening = (fieldName: keyof typeof formState) => {
    if (!speechRecognitionSupported) return;
    
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;
    
    recognitionRef.current.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        .map((result: any) => result[0])
        .map((result) => result.transcript)
        .join('');
      
      setFormState(prev => ({
        ...prev,
        [fieldName]: transcript
      }));
    };
    
    recognitionRef.current.onend = () => {
      setIsListening(false);
    };
    
    recognitionRef.current.start();
    setIsListening(true);
    setSpeechTarget(fieldName);
  };
  
  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
      setSpeechTarget(null);
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleAiSuggestion = (suggestion: string) => {
    setFormState(prev => ({
      ...prev,
      message: suggestion
    }));
    setShowAiSuggestions(false);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setAiResponse(null);
    
    try {
      // First, check if we're in development or production
      const baseUrl = process.env.NODE_ENV === 'production' 
        ? 'https://www.esnapup.com' 
        : '';
      
      // Make sure we're using the correct path
      const response = await fetch(`${baseUrl}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      });
      
      // Handle non-JSON responses
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error(`Received non-JSON response with status ${response.status}`);
      }
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || `Server error: ${response.status}`);
      }
      
      // Get OpenAI response
      const aiRes = await fetch(`${baseUrl}/api/ai-response`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          message: formState.message,
          name: formState.name,
          subject: formState.subject 
        }),
      });
      
      // Handle AI response with proper error checking
      if (aiRes.ok) {
        const aiContentType = aiRes.headers.get("content-type");
        if (aiContentType && aiContentType.includes("application/json")) {
          const aiData = await aiRes.json();
          setAiResponse(aiData.response);
        }
      }
      
      setSubmitted(true);
      setFormState({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (err: any) {
      console.error("Form submission error:", err);
      setError(err.message || 'An error occurred while submitting the form. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };
  
  return (
    <MainLayout>
      <SEO
        title="Contact ESnapup | Get Expert Software Development Consultation"
        description="Reach out to ESnapup's team of software development experts. We offer free consultations and quick responses to your project inquiries and technical questions."
        keywords="contact software developer, hire developers, software consultation, AI development services, Next.js developers, mobile app developers"
        ogImage="/images/contact-og.jpg"
        twitterCard="summary_large_image"
        canonicalUrl="/contact"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "name": "ESnapup Contact Page",
          "description": "Contact ESnapup for software development services",
          "url": "https://www.esnapup.com/contact",
          "contactPoint": [
            {
              "@type": "ContactPoint",
              "telephone": "+13522985645",
              "email": "info@esnapup.com",
              "contactType": "customer service"
            },
            {
              "@type": "ContactPoint",
              "email": "adubuisson@comcast.net",
              "contactType": "customer service"
            }
          ],
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "1626 West Orange Blossom Trail # 1046",
            "addressLocality": "Apopka",
            "addressRegion": "FL",
            "postalCode": "32712",
            "addressCountry": "US"
          }
        }}
      />
      
      <Box
        sx={{
          bgcolor: 'background.paper',
          pt: 6,
          pb: 6,
        }}
      >
        <Container maxWidth="md">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
            sx={{ fontWeight: 700 }}
          >
            Contact Us
          </Typography>
          <Typography 
            variant="h5" 
            align="center" 
            color="text.secondary" 
            paragraph
            sx={{ maxWidth: 700, mx: 'auto' }}
          >
            Have a project in mind? Let's discuss how we can help bring your ideas to life.
          </Typography>
        </Container>
      </Box>
      
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={6}>
          <Grid item xs={12} md={5}>
            <Typography variant="h4" component="h2" sx={{ mb: 4, fontWeight: 600 }}>
              Get In Touch
            </Typography>
            
            <Box sx={{ mb: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <EmailIcon color="primary" sx={{ mr: 2 }} />
                <Typography variant="h6">
                  Email
                </Typography>
              </Box>
              <Typography variant="body1" sx={{ ml: 5 }}>
                info@esnapup.com
              </Typography>
              <Typography variant="body1" sx={{ ml: 5 }}>
                adubuisson@comcast.net
              </Typography>
            </Box>
            
            <Box sx={{ mb: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <PhoneIcon color="primary" sx={{ mr: 2 }} />
                <Typography variant="h6">
                  Phone
                </Typography>
              </Box>
              <Typography variant="body1" sx={{ ml: 5 }}>
                (352) 298-5645
              </Typography>
            </Box>
            
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <LocationOnIcon color="primary" sx={{ mr: 2 }} />
                <Typography variant="h6">
                  Address
                </Typography>
              </Box>
              <Typography variant="body1" sx={{ ml: 5 }}>
                1626 West Orange Blossom Trail # 1046<br />
                Apopka, FL 32712<br />
                United States
              </Typography>
            </Box>
            
            {submitted && aiResponse && (
              <Paper elevation={3} sx={{ mt: 6, p: 3, bgcolor: 'primary.50', borderRadius: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <SmartToyIcon sx={{ mr: 2, color: 'primary.main' }} />
                  <Typography variant="h6" component="h3" color="primary">
                    AI Assistant Response
                  </Typography>
                </Box>
                <Typography variant="body1">
                  {aiResponse}
                </Typography>
              </Paper>
            )}
          </Grid>
          
          <Grid item xs={12} md={7}>
            <Paper elevation={0} sx={{ p: 4, borderRadius: 2 }}>
              <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
                Send Us a Message
              </Typography>
              
              {submitted ? (
                <Alert severity="success" sx={{ mt: 2 }}>
                  <AlertTitle>Message sent!</AlertTitle>
                  Thank you for contacting us. We'll get back to you as soon as possible.
                </Alert>
              ) : (
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                  {error && (
                    <Alert severity="error" sx={{ mb: 3 }}>
                      {error}
                    </Alert>
                  )}
                  
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ position: 'relative' }}>
                        <TextField
                          required
                          fullWidth
                          id="name"
                          label="Your Name"
                          name="name"
                          autoComplete="name"
                          value={formState.name}
                          onChange={handleChange}
                          disabled={submitting}
                          InputProps={{
                            endAdornment: speechRecognitionSupported && (
                              <IconButton 
                                onClick={() => isListening && speechTarget === 'name' 
                                  ? stopListening() 
                                  : startListening('name')}
                                color={isListening && speechTarget === 'name' ? "error" : "default"}
                              >
                                {isListening && speechTarget === 'name' ? <StopIcon /> : <MicIcon />}
                              </IconButton>
                            )
                          }}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        value={formState.email}
                        onChange={handleChange}
                        disabled={submitting}
                        InputProps={{
                          endAdornment: speechRecognitionSupported && (
                            <IconButton 
                              onClick={() => isListening && speechTarget === 'email' 
                                ? stopListening() 
                                : startListening('email')}
                              color={isListening && speechTarget === 'email' ? "error" : "default"}
                            >
                              {isListening && speechTarget === 'email' ? <StopIcon /> : <MicIcon />}
                            </IconButton>
                          )
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="subject"
                        label="Subject"
                        name="subject"
                        value={formState.subject}
                        onChange={handleChange}
                        disabled={submitting}
                        InputProps={{
                          endAdornment: speechRecognitionSupported && (
                            <IconButton 
                              onClick={() => isListening && speechTarget === 'subject' 
                                ? stopListening() 
                                : startListening('subject')}
                              color={isListening && speechTarget === 'subject' ? "error" : "default"}
                            >
                              {isListening && speechTarget === 'subject' ? <StopIcon /> : <MicIcon />}
                            </IconButton>
                          )
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Box sx={{ position: 'relative' }}>
                        <TextField
                          required
                          fullWidth
                          id="message"
                          label="Your Message"
                          name="message"
                          multiline
                          rows={6}
                          value={formState.message}
                          onChange={handleChange}
                          disabled={submitting}
                          InputProps={{
                            endAdornment: speechRecognitionSupported && (
                              <Box 
                                sx={{ 
                                  position: 'absolute', 
                                  right: 8, 
                                  bottom: 8, 
                                  display: 'flex', 
                                  gap: 1 
                                }}
                              >
                                <Tooltip title="AI Message Suggestions">
                                  <IconButton 
                                    onClick={() => setShowAiSuggestions(!showAiSuggestions)}
                                    color={showAiSuggestions ? "primary" : "default"}
                                  >
                                    <SmartToyIcon />
                                  </IconButton>
                                </Tooltip>
                                
                                <Tooltip title={isListening ? "Stop Speaking" : "Start Speaking"}>
                                  <IconButton 
                                    onClick={() => isListening && speechTarget === 'message' 
                                      ? stopListening() 
                                      : startListening('message')}
                                    color={isListening && speechTarget === 'message' ? "error" : "default"}
                                  >
                                    {isListening && speechTarget === 'message' ? <StopIcon /> : <MicIcon />}
                                  </IconButton>
                                </Tooltip>
                              </Box>
                            )
                          }}
                        />
                      </Box>
                    </Grid>
                  </Grid>
                  
                  <Collapse in={showAiSuggestions}>
                    <Box sx={{ mt: 2, mb: 3 }}>
                      <Typography variant="subtitle2" gutterBottom color="primary" sx={{ fontWeight: 500 }}>
                        AI Message Suggestions:
                      </Typography>
                      {aiSuggestions.map((suggestion, index) => (
                        <Card key={index} sx={{ mb: 1, cursor: 'pointer' }} onClick={() => handleAiSuggestion(suggestion)}>
                          <CardContent sx={{ py: 1, '&:last-child': { pb: 1 } }}>
                            <Typography variant="body2">{suggestion}</Typography>
                          </CardContent>
                        </Card>
                      ))}
                    </Box>
                  </Collapse>
                  
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    size="large"
                    sx={{ mt: 3 }}
                    disabled={submitting}
                  >
                    {submitting ? <CircularProgress size={24} color="inherit" /> : 'Send Message'}
                  </Button>
                  
                  <Typography variant="caption" display="block" sx={{ mt: 2, textAlign: 'center' }}>
                    {speechRecognitionSupported 
                      ? "💡 Use the microphone icon to dictate your message with speech-to-text" 
                      : "💡 Speech recognition is not supported in your browser"}
                  </Typography>
                </Box>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </MainLayout>
  );
};

export default Contact;