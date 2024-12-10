import { Configuration, OpenAIApi } from 'openai';
import axios from 'axios';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export class ClaudeService {
  private apiKey: string;
  private baseURL: string = 'https://api.anthropic.com/v1';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async chat(messages: ChatMessage[], options = {}) {
    try {
      const response = await axios.post(
        `${this.baseURL}/messages`,
        {
          model: 'claude-3-opus-20240229',
          messages: messages,
          max_tokens: 4096,
          temperature: 0.7,
          ...options
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': this.apiKey,
            'anthropic-version': '2023-06-01'
          }
        }
      );

      return response.data;
    } catch (error) {
      console.error('Claude API Error:', error);
      throw error;
    }
  }

  // Jenni AI-like features
  async generateContent(prompt: string, type: 'essay' | 'research' | 'summary' | 'analysis') {
    const systemPrompts = {
      essay: "You are a professional essay writer. Write a well-structured essay that is engaging, informative, and academically sound.",
      research: "You are a research assistant. Provide comprehensive research with citations and evidence-based analysis.",
      summary: "You are a summarization expert. Create a clear, concise summary that captures the main points while maintaining context.",
      analysis: "You are a critical analyst. Provide in-depth analysis with key insights and thoughtful evaluation."
    };

    const messages: ChatMessage[] = [
      { role: 'user', content: `${systemPrompts[type]}\n\n${prompt}` }
    ];

    return this.chat(messages, {
      temperature: type === 'research' ? 0.3 : 0.7
    });
  }

  async improveWriting(text: string) {
    const messages: ChatMessage[] = [
      {
        role: 'user',
        content: `Please improve the following text while maintaining its original meaning. Make it more professional, clear, and engaging:\n\n${text}`
      }
    ];

    return this.chat(messages, {
      temperature: 0.4
    });
  }

  async generateQuestions(topic: string, count: number = 5) {
    const messages: ChatMessage[] = [
      {
        role: 'user',
        content: `Generate ${count} thought-provoking practice questions about ${topic}. Include answers and explanations.`
      }
    ];

    return this.chat(messages);
  }

  async provideFeedback(text: string) {
    const messages: ChatMessage[] = [
      {
        role: 'user',
        content: `Review the following text and provide constructive feedback on its structure, clarity, and effectiveness:\n\n${text}`
      }
    ];

    return this.chat(messages);
  }
}

export default ClaudeService;
