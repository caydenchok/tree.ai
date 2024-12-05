import axios from 'axios';

// Default to localhost if VITE_API_URL is not set
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export interface Message {
  role: 'user' | 'assistant';
  content: string;
  id?: number;
}

// Demo responses for showcase
const demoResponses = [
  "Hello! I'm Tree AI, your educational assistant. How can I help you today?",
  "That's a great question about mathematics! Let me help explain that concept.",
  "I can help you understand this topic better. Would you like me to break it down step by step?",
  "Here's a practical example that might help you understand better.",
  "Is there anything specific about this topic you'd like me to clarify?"
];

let responseIndex = 0;

class ChatService {
  private readonly baseUrl: string;

  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  async sendMessage(message: string): Promise<Message> {
    try {
      // For demo/showcase purposes, return a demo response
      const response = demoResponses[responseIndex];
      responseIndex = (responseIndex + 1) % demoResponses.length;
      
      return {
        role: 'assistant',
        content: response,
        id: Date.now()
      };
    } catch (error) {
      console.error('Error in chat service:', error);
      throw error;
    }
  }

  async getConversationHistory(): Promise<Message[]> {
    return [];
  }

  async clearChatHistory(): Promise<{ message: string }> {
    return { message: 'Chat history cleared' };
  }
}

export default new ChatService();
