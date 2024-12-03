# Contributing to TREE8 GLOBAL Learning Platform

Thank you for your interest in contributing to TREE8 GLOBAL! This document provides guidelines and instructions for contributing to our AI-powered Malaysian education platform.

## Table of Contents
- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Process](#development-process)
- [Pull Request Process](#pull-request-process)
- [Project Structure](#project-structure)
- [Coding Standards](#coding-standards)

## Code of Conduct

Our project is committed to providing a welcoming and inclusive environment. We expect all contributors to:
- Be respectful and inclusive of differing viewpoints
- Use welcoming and inclusive language
- Focus on what is best for the community
- Show empathy towards other community members

## Getting Started

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/your-username/TREE8-GLOBAL.git
   cd TREE8-GLOBAL
   ```
3. Set up development environment:
   ```bash
   # Frontend setup
   cd frontend
   npm install
   
   # Backend setup
   cd ../backend
   npm install
   ```

## Development Process

1. Create a new branch for your feature/fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```
2. Make your changes
3. Test your changes thoroughly
4. Commit your changes following our commit message conventions
5. Push to your fork and submit a pull request

### Commit Message Convention
Format: `type(scope): description`

Types:
- feat: New feature
- fix: Bug fix
- docs: Documentation changes
- style: Code style changes (formatting, etc)
- refactor: Code refactoring
- test: Adding or modifying tests
- chore: Maintenance tasks

## Project Structure
```
TREE8-GLOBAL/
├── frontend/           # React frontend application
├── backend/           # Express.js backend server
├── ai/               # AI components and models
├── scraper/          # Data scraping utilities
└── docs/             # Documentation files
```

## Coding Standards

### Frontend (React)
- Use functional components and hooks
- Follow React best practices
- Use Chakra UI components for consistency
- Write meaningful component and variable names
- Include proper TypeScript types

### Backend (Node.js/Express)
- Follow RESTful API design principles
- Include proper error handling
- Write meaningful API documentation
- Follow security best practices
- Use async/await for asynchronous operations

### Testing
- Write unit tests for new features
- Ensure existing tests pass
- Include integration tests where necessary
- Test edge cases

## Pull Request Process

1. Update the README.md with details of changes if needed
2. Update the CHANGELOG.md following the Keep a Changelog format
3. Update documentation in the /docs directory if needed
4. Ensure your PR includes:
   - Clear description of changes
   - Any related issue numbers
   - Screenshots for UI changes
   - Test coverage for new features

## Educational Content Guidelines

When contributing educational content:
1. Ensure alignment with KPM guidelines
2. Follow KSSR/KSSM curriculum standards
3. Use appropriate language for target age groups (7-17 years)
4. Include bilingual content where appropriate
5. Consider cultural sensitivity

## Questions or Need Help?

Feel free to open an issue for:
- Bug reports
- Feature requests
- Help with development
- General questions

Thank you for contributing to making education more accessible and effective in Malaysia! 🇲🇾
