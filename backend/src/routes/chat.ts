import express from 'express';
import type { Request, Response } from 'express';

const router = express.Router();

// Store chat history in memory (replace with database in production)
let chatHistory: Array<{ role: string; content: string; id: number }> = [];
let messageId = 0;

// Send a message and get response
router.post('/', async (req: Request, res: Response) => {
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

    // Generate assistant response (replace with actual AI integration)
    const assistantMessage = {
      role: 'assistant',
      content: `I received your message: "${message}". This is a placeholder response.`,
      id: ++messageId
    };
    chatHistory.push(assistantMessage);

    res.json(assistantMessage);
  } catch (error) {
    console.error('Error in chat endpoint:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get chat history
router.get('/history', (_req: Request, res: Response) => {
  res.json(chatHistory);
});

// Clear chat history
router.delete('/history', (_req: Request, res: Response) => {
  chatHistory = [];
  messageId = 0;
  res.json({ message: 'Chat history cleared' });
});

export default router;
