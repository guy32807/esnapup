import type { NextApiRequest, NextApiResponse } from 'next';

type ContactFormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type ResponseData = {
  success: boolean;
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const data = req.body as ContactFormData;
    
    // Validate form data
    if (!data.name || !data.email || !data.message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, and message'
      });
    }
    
    // Here you would typically send an email or save to database
    // For now, we'll just simulate a successful submission
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return res.status(200).json({
      success: true,
      message: 'Message received! We will get back to you shortly.'
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while processing your request'
    });
  }
}