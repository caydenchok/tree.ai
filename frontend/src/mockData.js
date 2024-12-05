// Mock data for frontend development

// Placeholder for student profile
export const mockStudentProfile = {
    id: "student123",
    name: "John Doe",
    level: "Intermediate",
    subjects: ["Mathematics", "Physics", "Chemistry"],
    progress: 75,
    lastActive: "2024-01-15"
};

// Placeholder for learning sessions
export const mockLearningSessions = [
    {
        id: "session1",
        subject: "Mathematics",
        topic: "Algebra",
        duration: "45 minutes",
        completionRate: 80,
        date: "2024-01-15"
    },
    {
        id: "session2",
        subject: "Physics",
        topic: "Mechanics",
        duration: "30 minutes",
        completionRate: 65,
        date: "2024-01-14"
    }
];

// Placeholder for AI chat messages
export const mockChatHistory = [
    {
        id: "msg1",
        role: "user",
        content: "Can you explain fractions?",
        timestamp: "2024-01-15T10:30:00"
    },
    {
        id: "msg2",
        role: "ai",
        content: "A fraction represents a part of a whole. For example, in 1/4, 1 is the numerator (top number) and 4 is the denominator (bottom number)...",
        timestamp: "2024-01-15T10:30:05"
    }
];

// Placeholder for practice problems
export const mockPracticeProblems = [
    {
        id: "prob1",
        subject: "Mathematics",
        topic: "Fractions",
        question: "What is 1/4 + 1/2?",
        options: ["3/4", "2/6", "1/6", "1/8"],
        correctAnswer: "3/4",
        difficulty: "medium"
    },
    {
        id: "prob2",
        subject: "Mathematics",
        topic: "Fractions",
        question: "Simplify 8/16",
        options: ["1/2", "2/4", "4/8", "All of these"],
        correctAnswer: "All of these",
        difficulty: "easy"
    }
];

// Placeholder for progress analytics
export const mockProgressData = {
    overallProgress: 68,
    subjectProgress: {
        Mathematics: 75,
        Physics: 60,
        Chemistry: 70
    },
    weakAreas: ["Trigonometry", "Quantum Physics"],
    strongAreas: ["Algebra", "Mechanics"],
    recentScores: [85, 70, 90, 65, 75]
};

// Placeholder for recommendations
export const mockRecommendations = [
    {
        id: "rec1",
        type: "practice",
        subject: "Mathematics",
        topic: "Trigonometry",
        reason: "Identified as a weak area",
        priority: "high"
    },
    {
        id: "rec2",
        type: "review",
        subject: "Physics",
        topic: "Basic Mechanics",
        reason: "Foundation for upcoming topics",
        priority: "medium"
    }
];
