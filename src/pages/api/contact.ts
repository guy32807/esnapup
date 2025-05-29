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
  // Only allow POST method
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    // Get form data
    const { name, email, subject, message } = req.body as ContactFormData;
    
    // Validate form data
    if (!name || !email || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please fill out all required fields' 
      });
    }
    
    // Save to database or send email
    // For now, we'll just log and return success
    console.log('Contact form submission:', { name, email, subject, message });
    
    // Return success response
    return res.status(200).json({ 
      success: true, 
      message: 'Your message has been received. We will contact you shortly.' 
    });

  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'An error occurred while submitting your message. Please try again later.' 
    });
  }
}