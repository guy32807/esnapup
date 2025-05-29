import type { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai';

type RequestData = {
  message: string;
  name: string;
  subject: string;
};

type ResponseData = {
  response: string;
};

// Configure OpenAI
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData | { message: string }>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { message, name, subject } = req.body as RequestData;
    
    if (!message) {
      return res.status(400).json({ message: 'Message is required' });
    }
    
    if (!process.env.OPENAI_API_KEY) {
      console.error("OpenAI API key not configured");
      return res.status(500).json({ message: 'OpenAI API key not configured' });
    }
    
    // Create a prompt for OpenAI
    const prompt = `
    You are an AI assistant for ESnapup, a software development company. You need to generate a helpful, friendly response to a potential client inquiry.
    
    Client Name: ${name || 'Potential Client'}
    Subject: ${subject || 'General Inquiry'}
    Message: ${message}
    
    Your response should be professional, helpful, and demonstrate expertise in software development. 
    Be concise (under 200 words) but informative. Personalize the response by using their name.
    If there are specific services mentioned (like mobile development, AI, cloud, etc.), highlight ESnapup's expertise in those areas.
    End with a call to action like scheduling a consultation or requesting more information.
    `;
    
    // Call OpenAI API
    const completion = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are a helpful assistant for a software development company." },
        { role: "user", content: prompt }
      ],
      max_tokens: 500,
      temperature: 0.7,
    });
    
    const aiResponse = completion.data.choices[0]?.message?.content || 
      "Thank you for reaching out! A team member will get back to you shortly.";
    
    return res.status(200).json({ response: aiResponse });
  } catch (error: any) {
    console.error('OpenAI API error:', error.response?.data || error.message);
    return res.status(500).json({ 
      message: 'An error occurred while generating AI response' 
    });
  }
}