import React, { useState, useRef, useEffect } from 'react';
import { 
  Box, Paper, Typography, TextField, IconButton, 
  Fab, Avatar, CircularProgress, Collapse, Divider
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import ChatIcon from '@mui/icons-material/Chat';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PersonIcon from '@mui/icons-material/Person';

type Message = {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
};

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Initial welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{
        id: '1',
        content: "Hi there! I'm ESnapup's AI assistant. How can I help you with your software development needs today?",
        sender: 'bot',
        timestamp: new Date()
      }]);
    }
  }, []);
  
  // Auto scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };
  
  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (!message.trim()) return;
    
    // Add user message to chat
    const userMessage: Message = {
      id: Date.now().toString(),
      content: message,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    setIsLoading(true);
    
    try {
      // Call the AI API
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage.content }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }
      
      // Add bot response to chat
      const botMessage: Message = {
        id: Date.now().toString(),
        content: data.response,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Chatbot error:', error);
      
      // Add error message
      const errorMessage: Message = {
        id: Date.now().toString(),
        content: "Sorry, I'm having trouble connecting right now. Please try again later or contact us directly.",
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <>
      {/* Chatbot Fab Button */}
      <Fab 
        color="primary" 
        aria-label="chat"
        onClick={toggleChat}
        sx={{ 
          position: 'fixed', 
          bottom: 24, 
          right: 24,
          zIndex: 1000
        }}
      >
        {isOpen ? <CloseIcon /> : <ChatIcon />}
      </Fab>
      
      {/* Chat Window */}
      <Collapse in={isOpen} timeout="auto">
        <Paper
          elevation={6}
          sx={{
            position: 'fixed',
            bottom: 90,
            right: 24,
            width: { xs: 'calc(100% - 48px)', sm: 350 },
            height: 500,
            maxHeight: 'calc(100vh - 120px)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            zIndex: 999,
            borderRadius: 2
          }}
        >
          {/* Chat Header */}
          <Box 
            sx={{ 
              p: 2, 
              bgcolor: 'primary.main', 
              color: 'white',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <SmartToyIcon sx={{ mr: 1 }} />
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              ESnapup Assistant
            </Typography>
            <IconButton 
              size="small" 
              onClick={toggleChat} 
              sx={{ color: 'white' }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          
          {/* Messages Container */}
          <Box 
            sx={{ 
              flexGrow: 1, 
              p: 2, 
              overflowY: 'auto', 
              display: 'flex', 
              flexDirection: 'column'
            }}
          >
            {messages.map((msg) => (
              <Box 
                key={msg.id}
                sx={{ 
                  mb: 2,
                  display: 'flex',
                  flexDirection: msg.sender === 'user' ? 'row-reverse' : 'row',
                  alignItems: 'flex-start'
                }}
              >
                <Avatar 
                  sx={{ 
                    bgcolor: msg.sender === 'user' ? 'secondary.main' : 'primary.main',
                    width: 32,
                    height: 32,
                    mr: msg.sender === 'user' ? 0 : 1,
                    ml: msg.sender === 'user' ? 1 : 0
                  }}
                >
                  {msg.sender === 'user' ? <PersonIcon /> : <SmartToyIcon />}
                </Avatar>
                <Paper
                  variant="outlined"
                  sx={{
                    p: 1.5,
                    maxWidth: '70%',
                    bgcolor: msg.sender === 'user' ? 'secondary.50' : 'grey.50',
                    borderRadius: 2,
                    borderTopRightRadius: msg.sender === 'user' ? 0 : 2,
                    borderTopLeftRadius: msg.sender === 'user' ? 2 : 0
                  }}
                >
                  <Typography variant="body2">
                    {msg.content}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5, textAlign: 'right' }}>
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </Typography>
                </Paper>
              </Box>
            ))}
            
            {isLoading && (
              <Box sx={{ display: 'flex', my: 2, ml: 5 }}>
                <CircularProgress size={20} />
              </Box>
            )}
            
            <div ref={messagesEndRef} />
          </Box>
          
          <Divider />
          
          {/* Message Input */}
          <Box 
            component="form" 
            onSubmit={handleSendMessage}
            sx={{ 
              p: 2, 
              bgcolor: 'background.paper',
              display: 'flex' 
            }}
          >
            <TextField
              fullWidth
              placeholder="Type your message..."
              variant="outlined"
              size="small"
              value={message}
              onChange={handleInputChange}
              disabled={isLoading}
              autoComplete="off"
            />
            <IconButton 
              color="primary" 
              type="submit" 
              disabled={!message.trim() || isLoading}
              sx={{ ml: 1 }}
            >
              <SendIcon />
            </IconButton>
          </Box>
        </Paper>
      </Collapse>
    </>
  );
};

export default Chatbot;