import { Request, Response, NextFunction } from 'express';
import { Mode } from '../types/mode-functions';

export const validateChat = (req: Request, res: Response, next: NextFunction) => {
  const { message, mode, functionId } = req.body;

  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    return res.status(400).json({ error: 'Valid message is required' });
  }

  if (message.length > 2000) {
    return res.status(400).json({ error: 'Message exceeds maximum length of 2000 characters' });
  }

  next();
};

export const validateModeFunctions = (req: Request, res: Response, next: NextFunction) => {
  const mode = req.body.mode || req.query.mode as Mode;
  const functionId = req.body.functionId as string;
  const parameters = req.body.parameters as Record<string, any>;

  if (functionId) {
    // Function validation will be handled by the handler factory
    next();
  } else {
    next();
  }
};

export const validateContext = (req: Request, res: Response, next: NextFunction) => {
  const context = req.body.context;

  if (context && typeof context !== 'object') {
    return res.status(400).json({ error: 'Context must be an object if provided' });
  }

  next();
};
