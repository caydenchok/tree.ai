import express, { Request, Response } from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import { OpenAI } from 'openai';

config(); // Load environment variables

const app = express();
const port = process.env.PORT || 8000;

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Define types
interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface ChatRequest {
  message: string;
  history: ChatMessage[];
}

app.use(cors());
app.use(express.json());

// Chat endpoint
app.post('/api/chat', async (req: Request<{}, {}, ChatRequest>, res: Response) => {
  try {
    const { message, history } = req.body;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are Tree AI, a helpful and knowledgeable AI assistant focused on education and learning." },
        ...history.map((msg) => ({
          role: msg.role,
          content: msg.content
        })),
        { role: "user", content: message }
      ],
    });

    const response = completion.choices[0]?.message?.content || "I apologize, but I couldn't generate a response.";
    
    res.json({ response });
  } catch (error) {
    console.error('OpenAI API Error:', error);
    res.status(500).json({ 
      error: 'Failed to get response from AI',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Health check endpoint
app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
