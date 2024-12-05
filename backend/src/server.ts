import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Anthropic from '@anthropic-ai/sdk';

dotenv.config();

const app = express();
const port = 3001;

// Initialize Anthropic with API key
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
});

// Store chat history in memory (replace with database in production)
let chatHistory: Array<{ role: string; content: string; id: number }> = [];
let messageId = 0;

app.use(cors());
app.use(express.json());

// Chat endpoints
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Store user message
    const userMessage = {
      role: 'user',
      content: message,
      id: ++messageId
    };
    chatHistory.push(userMessage);

    try {
      // Get response from Claude
      const response = await anthropic.messages.create({
        model: "claude-3-opus-20240229",
        max_tokens: 1000,
        system: "You are Tree AI, a helpful and knowledgeable AI tutor focused on education. You help students understand concepts, solve problems, and learn effectively. Keep your responses clear, concise, and educational. You specialize in Malaysian education standards and curriculum.",
        messages: [{
          role: "user",
          content: message
        }]
      });

      // Get the AI response content
      const aiResponse = response.content[0].type === 'text' ? response.content[0].text : 'Unable to process response';

      // Store AI response
      const assistantMessage = {
        role: 'assistant',
        content: aiResponse,
        id: ++messageId
      };
      chatHistory.push(assistantMessage);

      res.json(assistantMessage);
    } catch (error: any) {
      console.error('Claude API Error:', error);
      
      // Handle rate limit error specifically
      if (error.message?.includes('rate limit exceeded')) {
        const rateLimitMessage = {
          role: 'assistant',
          content: "The Claude API is currently rate limited. This usually happens when the API key is new or has exceeded its quota. Please wait about an hour before trying again.",
          id: ++messageId
        };
        chatHistory.push(rateLimitMessage);
        return res.status(429).json(rateLimitMessage);
      }

      // Handle other errors
      const fallbackMessage = {
        role: 'assistant',
        content: "I apologize, but I'm having trouble connecting to my knowledge base. Please try again in a moment.",
        id: ++messageId
      };
      chatHistory.push(fallbackMessage);
      res.json(fallbackMessage);
    }
  } catch (error) {
    console.error('Error in chat endpoint:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get chat history
app.get('/api/chat/history', (_req, res) => {
  res.json(chatHistory);
});

// Clear chat history
app.delete('/api/chat/history', (_req, res) => {
  chatHistory = [];
  messageId = 0;
  res.json({ message: 'Chat history cleared' });
});

// Health check endpoint
app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
