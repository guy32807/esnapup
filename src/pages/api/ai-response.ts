import type { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai';

type RequestData = {
  name: string;
  subject: string;
  message: string;
};

type ResponseData = {
  response: string;
  success?: boolean;
  error?: string;
};

// Predefined responses based on message content (fallback if OpenAI fails)
const predefinedResponses: Record<string, string> = {
  "mobile app": "Thank you for your interest in our mobile app development services! We've received your inquiry and will prepare a custom quote for your project within 24-48 hours.",
  "website": "Thanks for reaching out about website development. Our team specializes in creating responsive, modern websites tailored to your business needs. We'll review your requirements and get back to you shortly.",
  "e-commerce": "We appreciate your interest in our e-commerce solutions. Our team has extensive experience building custom online stores with secure payment processing and inventory management.",
  "ai": "Thank you for your AI integration inquiry. We're excited to discuss how we can implement AI technologies to enhance your business operations and create innovative solutions.",
  "cloud": "Thanks for your interest in our cloud services. We offer comprehensive cloud architecture, migration, and management solutions tailored to your specific needs and budget.",
  "consultation": "We'd be happy to schedule a consultation to discuss your project in more detail. One of our senior developers will reach out to arrange a meeting at a time that works for you.",
  "quote": "Thank you for requesting a quote. We'll analyze your project requirements and provide you with a detailed estimate within 2 business days.",
};

// Configure OpenAI API
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new Configuration().apiKey ? new OpenAIApi(configuration) : null;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      response: '',
      success: false,
      error: 'Method not allowed'
    });
  }

  try {
    const { name, subject, message } = req.body as RequestData;
    
    // Try to use OpenAI first if configured
    if (openai && process.env.OPENAI_API_KEY) {
      try {
        const prompt = `
You are a helpful assistant working for ESnapup, a software development company. 
A potential client named ${name || 'someone'} has sent the following inquiry:

Subject: ${subject || 'No Subject'}
Message: ${message}

Write a brief, friendly, and professional response acknowledging their inquiry. 
Include that a team member will follow up with more detailed information soon.
Keep the response under 150 words and make it sound natural and helpful.
Do not make up specific details about pricing or timelines.
`;

        const completion = await openai.createCompletion({
          model: "gpt-3.5-turbo-instruct",
          prompt: prompt,
          max_tokens: 200,
          temperature: 0.7,
        });

        const aiResponse = completion.data.choices[0]?.text?.trim();
        
        if (aiResponse && aiResponse.length > 10) {
          return res.status(200).json({ response: aiResponse });
        }
      } catch (openaiError) {
        console.error('OpenAI API error:', openaiError);
        // Fall through to predefined responses if OpenAI fails
      }
    }
    
    // Fallback to predefined responses if OpenAI isn't available or fails
    // Simple response generation based on keywords in the message
    const combinedText = `${subject} ${message}`.toLowerCase();
    let response = '';
    
    // Find matching keywords and use the corresponding response
    for (const [keyword, responseText] of Object.entries(predefinedResponses)) {
      if (combinedText.includes(keyword.toLowerCase())) {
        response = responseText;
        break;
      }
    }
    
    // Fallback response if no keywords match
    if (!response) {
      response = `Thank you for reaching out to us, ${name || 'valued customer'}! We've received your message and will get back to you as soon as possible, usually within 1 business day.`;
    }
    
    // Add personalization if name is provided
    if (name && !response.includes(name)) {
      response = response.replace('Thank you', `Thank you ${name}`);
    }

    return res.status(200).json({ response });
    
  } catch (error) {
    console.error('AI response error:', error);
    return res.status(500).json({ 
      response: 'Thank you for your message. Our team will review it and get back to you soon.',
      success: false,
      error: 'Internal server error'
    });
  }
}