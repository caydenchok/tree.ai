export interface StudentProfile {
    id: string;
    name: string;
    level: string;
    subjects: string[];
    progress: number;
    lastActive: string;
}

export interface LearningSession {
    id: string;
    subject: string;
    topic: string;
    duration: string;
    completionRate: number;
    date: string;
}

export interface ChatMessage {
    id: string;
    role: 'user' | 'ai';
    content: string;
    timestamp: string;
}

export type ChatHistory = ChatMessage[];

export interface PracticeProblem {
    id: string;
    subject: string;
    topic: string;
    question: string;
    options: string[];
    correctAnswer: string;
    difficulty: 'easy' | 'medium' | 'hard';
}

export interface ProgressData {
    overallProgress: number;
    subjectProgress: {
        [subject: string]: number;
    };
    weakAreas: string[];
    strongAreas: string[];
    recentScores: number[];
}
