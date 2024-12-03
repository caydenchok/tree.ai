# TREE8 GLOBAL Frontend

## Overview
Frontend for the TREE8 GLOBAL Malaysian education platform, built with React, TypeScript, and Vite. Features a modern UI with mobile-first design and support for multiple Malaysian school systems (SK/SJKC/SJKT).

## Tech Stack
- React 18 with TypeScript
- Vite for build tooling
- Chakra UI for components
- Framer Motion for animations
- Redux Toolkit for state management
- Vitest for testing

## Key Features
- Multi-language support (BM/English/Mandarin/Tamil)
- Responsive design for all devices
- Dark/Light theme
- AI-powered learning assistant
- Interactive tech tree background
- Real-time chat system

## Getting Started

```bash
# Install dependencies
npm install --legacy-peer-deps

# Start development server
npm run dev

# Run tests
npm run test

# Build for production
npm run build
```

## Project Structure
```
src/
├── assets/         # Static assets
├── components/     # Reusable UI components
├── contexts/       # React contexts
├── hooks/         # Custom React hooks
├── i18n/          # Internationalization
├── pages/         # Main page components
├── services/      # API services
├── store/         # Redux store
├── theme/         # UI theme
├── types/         # TypeScript types
└── utils/         # Utility functions
```

## Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run test` - Run Vitest tests
- `npm run test:coverage` - Run tests with coverage
- `npm run test:ui` - Run tests with UI
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Development Guidelines
1. Follow the established component structure
2. Use TypeScript strictly
3. Write tests for new features
4. Follow Chakra UI theming
5. Maintain mobile-first approach

## Current Status
- Core UI components
- Mobile optimization
- Authentication system
- AI chat interface
- Malaysian curriculum integration
- Multi-language support
