import { StudentProfile, LearningSession, ChatHistory, PracticeProblem, ProgressData } from '../types/ai.types';
import { mockStudentProfile, mockLearningSessions, mockChatHistory, mockPracticeProblems, mockProgressData } from '../mockData';

const USE_REAL_DATA = import.meta.env.VITE_USE_REAL_DATA === 'true';

// Student Profile
export const getStudentProfile = async (studentId: string): Promise<StudentProfile> => {
    if (USE_REAL_DATA) {
        return await fetch(`/api/student/${studentId}`).then(res => res.json());
    }
    return mockStudentProfile;
};

// Learning Sessions
export const getLearningSessions = async (studentId: string): Promise<LearningSession[]> => {
    if (USE_REAL_DATA) {
        return await fetch(`/api/sessions/${studentId}`).then(res => res.json());
    }
    return mockLearningSessions;
};

// Chat History
export const getChatHistory = async (sessionId: string): Promise<ChatHistory[]> => {
    if (USE_REAL_DATA) {
        return await fetch(`/api/chat/${sessionId}`).then(res => res.json());
    }
    return mockChatHistory;
};

// Practice Problems
export const getPracticeProblems = async (subject: string): Promise<PracticeProblem[]> => {
    if (USE_REAL_DATA) {
        return await fetch(`/api/practice/${subject}`).then(res => res.json());
    }
    return mockPracticeProblems;
};

// Progress Data
export const getProgressData = async (studentId: string): Promise<ProgressData> => {
    if (USE_REAL_DATA) {
        return await fetch(`/api/progress/${studentId}`).then(res => res.json());
    }
    return mockProgressData;
};
