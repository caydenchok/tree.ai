import { Request, Response, NextFunction } from 'express';

export const validateMode = (req: Request, res: Response, next: NextFunction) => {
  const validModes = ['default', 'creative', 'coder', 'writer', 'analyst', 'gamer', 'designer'];
  const mode = req.body.mode || req.query.mode;

  if (!mode) {
    return res.status(400).json({ error: 'Mode is required' });
  }

  if (!validModes.includes(mode)) {
    return res.status(400).json({ error: 'Invalid mode' });
  }

  next();
};

export const validateFunction = (req: Request, res: Response, next: NextFunction) => {
  const functionId = req.body.functionId;
  
  if (!functionId) {
    return next(); // functionId is optional
  }

  // You can add function validation logic here based on the mode
  next();
};
