# TREE8 GLOBAL Learning Platform

An AI-powered Malaysian education platform connecting tutors with students, featuring personalized learning recommendations and teaching assistance tools. Built in compliance with KPM (Kementerian Pendidikan Malaysia) guidelines and curriculum standards.

## Development Guide

### Phase 1: Foundation Setup (Week 1-2)
1. **Project Initialization**
   ```bash
   # Create project structure
   mkdir frontend backend
   cd frontend
   npm create vite@latest . -- --template react
   npm install @chakra-ui/react @emotion/react @emotion/styled framer-motion
   
   # Setup backend
   cd ../backend
   npm init -y
   npm install express mongoose jsonwebtoken
   ```

2. **Authentication Setup**
   - Create user models with roles (Student/Teacher)
   - Implement JWT-based authentication
   - Set up protected routes

### Phase 2: Core User Management (Week 3-4)
1. **Registration System**
   - Age verification logic (7-17 years)
   - School type selection (SK/SJKC/SJKT)
   - Teacher qualification verification

2. **UI Components**
   ```jsx
   // Example of age-based registration component
   const AgeBasedRegistration = () => {
     const [age, setAge] = useState(0);
     const [schoolType, setSchoolType] = useState('');
     
     const determineEducationLevel = (age) => {
       if (age >= 7 && age <= 12) return 'PRIMARY';
       if (age >= 13 && age <= 17) return 'SECONDARY';
       return 'INVALID';
     };
     // ... rest of the component
   };
   ```

### Phase 3: Subject Management (Week 5-6)
1. **Subject Mapping**
   - Create subject models based on education level
   - Implement subject selection logic
   ```javascript
   // Example subject mapping
   const subjectMapping = {
     PRIMARY: {
       'SK': ['BM', 'EN', 'MT', 'SC'],
       'SJKC': ['BM', 'EN', 'BC', 'MT'],
       'SJKT': ['BM', 'EN', 'TM', 'MT']
     },
     SECONDARY: {
       'FORM1-3': ['BM', 'EN', 'MT', 'SC', 'HI'],
       'FORM4-5': {
         'SCIENCE': ['BM', 'EN', 'MT', 'PHY', 'CHE', 'BIO'],
         'ARTS': ['BM', 'EN', 'MT', 'ECO', 'ACC']
       }
     }
   };
   ```

### Phase 4: Learning Interface (Week 7-8)
1. **Content Organization**
   - Chapter-based structure
   - Progress tracking system
   ```javascript
   // Example progress tracking
   const trackProgress = async (userId, subjectId, chapterId) => {
     const progress = await Progress.findOne({ userId, subjectId });
     if (!progress) {
       // Initialize progress
     }
     // Update completion status
   };
   ```

### Phase 5: AI Integration (Week 9-10)
1. **AI Setup**
   ```javascript
   // Example AI integration
   const getAITutor = async (subject, level, language) => {
     const response = await openai.createCompletion({
       model: "gpt-4",
       messages: [{
         role: "system",
         content: `You are a ${subject} tutor for ${level} students...`
       }]
     });
     return response;
   };
   ```

### Phase 6: Testing & Deployment (Week 11-12)
1. **Testing**
   ```bash
   # Run tests
   npm run test
   
   # Build for production
   npm run build
   ```

2. **Deployment Checklist**
   - [ ] Environment variables configured
   - [ ] Database backup system in place
   - [ ] Monitoring tools setup
   - [ ] SSL certificates installed

## Project Structure
```
TREE8 GLOBAL/
├── frontend/         # React frontend application
├── backend/         # Node.js backend server
├── shared/          # Shared utilities and types
└── docs/           # Documentation
```

## Getting Started

### Prerequisites
- Node.js >= 16.0.0
- npm >= 8.0.0
- MongoDB

### Quick Start
1. Clone and install dependencies
   ```bash
   git clone <repository-url>
   cd TREE8 GLOBAL
   npm install
   ```

2. Set up environment variables
   ```bash
   cp .env.example .env
   ```

3. Start development
   ```bash
   npm run dev
   ```

Visit `http://localhost:5173` for the frontend and `http://localhost:3000` for the API.

## Additional Resources
- [Roadmap Details](ROADMAP.md)
- [API Documentation](docs/API.md)
- [UI Components](docs/UI.md)

## Features

### Core Educational Features
- Virtual Classroom with real-time interaction
- AI-powered teaching assistance
- KSSR/KSSM curriculum alignment
- Multi-language support (BM, EN, CN, TM)
- Islamic studies integration
- Special education support

### User-Specific Features
- Student learning management
- Teacher resource tools
- Parent monitoring system
- Administrative controls
- Analytics and reporting

### Technical Features
- Real-time collaboration
- Offline support
- Mobile responsiveness
- Performance optimization
- Security compliance

## Tech Stack

### Frontend
- React with Vite
- Chakra UI for components
- WebRTC for video/audio
- Socket.io for real-time features
- TanStack Query for data fetching

### Backend
- Node.js
- Express
- MongoDB
- WebSocket
- OpenAI & Claude AI integration

## Usage

### Student Features
- Join virtual classrooms
- Access KSSR/KSSM materials
- Track progress
- Chat with AI tutor
- Submit assignments
- Practice exercises
- Access multilingual content
- Message saving and organization
  - Save important AI responses
  - Modern modal interface for saved messages
  - Easy message management and deletion
  - Organized message display with visual feedback
- Real-time chat with tutors

### Teacher Features
- Create and manage courses
- Host virtual classes
- Use AI teaching assistant
- Grade assignments
- Track student progress
- Create lesson plans (RPH)
- Access teaching resources

### Parent Features
- Monitor child's progress
- View attendance
- Communicate with teachers
- Access reports
- Track assignments
- View academic calendar

### Admin Features
- Manage users and roles
- Monitor system usage
- Generate reports
- Configure settings
- Manage school data
- Track compliance

## Educational Standards

### Curriculum Alignment
- KSSR (Primary School)
- KSSM (Secondary School)
- Pre-University Programs
- Special Education Integration

### Assessment Types
- Formative Assessment
- Summative Assessment
- PBS (Pentaksiran Bilik Darjah)
- Standardized Tests
- Practice Exercises

### Quality Standards
- SKPMg2 Compliance
- KPM Guidelines
- International Standards
- Educational Best Practices

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests.

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for a list of changes and version history.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Chakra UI](https://chakra-ui.com/) for the component library
- [OpenAI](https://openai.com/) for AI integration
- [WebRTC](https://webrtc.org/) for real-time communication
- KPM for educational standards and guidelines
- Malaysian education community for feedback and support

[Last synced with GitHub and GitLab]
