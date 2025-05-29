import type { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai';

// Configure OpenAI
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

type RequestData = {
  message: string;
};

type ResponseData = {
  response: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData | { message: string }>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { message } = req.body as RequestData;
    
    if (!message) {
      return res.status(400).json({ message: 'Message is required' });
    }
    
    if (!process.env.OPENAI_API_KEY) {
      console.error("OpenAI API key not configured");
      return res.status(500).json({ message: 'OpenAI API key not configured' });
    }

    // Call OpenAI API
    const completion = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [
        { 
          role: "system", 
          content: `You are an AI assistant for ESnapup, a software development company specializing in:
          - Full Stack Development (React, Node.js, etc.)
          - Mobile App Development (React Native, Flutter, iOS, Android)
          - Frontend Development (React, Angular, Vue)
          - Backend Development (Node.js, Python, Java, .NET)
          - Cloud Architecture & DevOps (AWS, Azure, Google Cloud)
          - Database Design & Optimization
          - AI & Generative AI Integration
          - Machine Learning & Data Solutions
          
          Provide helpful, accurate, and concise responses about our services. Be friendly and professional.
          If asked about pricing, explain that we offer customized quotes based on project requirements.
          If asked about timelines, mention that they depend on project scope and requirements.
          Suggest scheduling a consultation for detailed discussions about specific projects.
          Keep your responses under 150 words.`
        },
        { role: "user", content: message }
      ],
      max_tokens: 300,
      temperature: 0.7,
    });
    
    const chatbotResponse = completion.data.choices[0]?.message?.content || 
      "I apologize, but I'm having trouble processing your request at the moment. Please try again or contact us directly at info@esnapup.com.";
    
    return res.status(200).json({ response: chatbotResponse });
  } catch (error: any) {
    console.error('OpenAI API error:', error.response?.data || error.message);
    return res.status(500).json({ 
      message: 'An error occurred while processing your message' 
    });
  }
}