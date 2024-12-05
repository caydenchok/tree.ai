// Data Service Layer
import { 
    mockStudentProfile, 
    mockLearningSessions, 
    mockChatHistory,
    mockPracticeProblems,
    mockProgressData 
} from '../mockData';

// Environment variable to control data source
const USE_REAL_DATA = process.env.REACT_APP_USE_REAL_DATA === 'true';

// Student Profile
export const getStudentProfile = async (studentId) => {
    if (USE_REAL_DATA) {
        // Real API call
        return await fetch(`/api/student/${studentId}`).then(res => res.json());
    }
    return mockStudentProfile;
};

// Learning Sessions
export const getLearningSessions = async (studentId) => {
    if (USE_REAL_DATA) {
        return await fetch(`/api/sessions/${studentId}`).then(res => res.json());
    }
    return mockLearningSessions;
};

// Chat History
export const getChatHistory = async (sessionId) => {
    if (USE_REAL_DATA) {
        return await fetch(`/api/chat/${sessionId}`).then(res => res.json());
    }
    return mockChatHistory;
};

// Practice Problems
export const getPracticeProblems = async (subject) => {
    if (USE_REAL_DATA) {
        return await fetch(`/api/practice/${subject}`).then(res => res.json());
    }
    return mockPracticeProblems;
};

// Progress Data
export const getProgressData = async (studentId) => {
    if (USE_REAL_DATA) {
        return await fetch(`/api/progress/${studentId}`).then(res => res.json());
    }
    return mockProgressData;
};
