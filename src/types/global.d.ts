// src/types/global.d.ts
interface Window {
  SpeechRecognition: any;
  webkitSpeechRecognition: any;
}

// Add OpenAI API types if needed
declare namespace NodeJS {
  interface ProcessEnv {
    OPENAI_API_KEY: string;
  }
}