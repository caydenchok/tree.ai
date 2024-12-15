import { rateLimit } from 'express-rate-limit';

export const chatLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per windowMs
  message: {
    error: 'Too many requests from this IP, please try again after 15 minutes'
  },
  standardHeaders: 'draft-7', // Use draft-7 RateLimit headers
  legacyHeaders: false // Disable the `X-RateLimit-*` headers
});
