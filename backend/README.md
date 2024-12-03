# TREE8 GLOBAL Backend

## Overview
Backend API for the TREE8 GLOBAL Malaysian education platform. Built with Express and TypeScript, featuring robust authentication, curriculum management, and AI integration.

## Tech Stack
- Node.js with Express
- TypeScript
- MongoDB with Mongoose
- JWT for authentication
- OpenAI integration
- Jest for testing

## Key Features
- User authentication & authorization
- Malaysian curriculum API endpoints
- AI-powered learning assistance
- Real-time chat system
- Progress tracking
- Multi-language support

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm run test

# Start production server
npm start
```

## Project Structure
```
src/
├── config/        # Configuration files
├── controllers/   # Route controllers
├── middleware/    # Express middleware
├── models/        # Mongoose models
├── routes/        # API routes
├── services/      # Business logic
├── types/         # TypeScript types
└── utils/         # Utility functions
```

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - User login
- GET `/api/auth/profile` - Get user profile

### Students
- GET `/api/students/courses` - List courses
- GET `/api/students/progress` - Get progress
- POST `/api/students/homework` - Submit homework

### Teachers
- GET `/api/teachers/classes` - List classes
- GET `/api/teachers/students` - List students
- POST `/api/teachers/assessments` - Create assessment

### AI Assistant
- POST `/api/ai/chat` - Chat with AI
- POST `/api/ai/analyze` - Analyze student progress

## Environment Variables
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/tree8
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_openai_key
```

## Development Guidelines
1. Follow RESTful API principles
2. Write comprehensive tests
3. Use TypeScript strictly
4. Document all endpoints
5. Handle errors consistently

## Current Status
- ✅ Core API structure
- ✅ Authentication system
- ✅ Basic CRUD operations
- 🔄 AI integration
- 🔄 Curriculum endpoints
- 🔄 Real-time features
