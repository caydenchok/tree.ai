import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

class LearningService {
  private static instance: LearningService;
  private currentSession: string | null = null;

  private constructor() {}

  static getInstance(): LearningService {
    if (!LearningService.instance) {
      LearningService.instance = new LearningService();
    }
    return LearningService.instance;
  }

  async startTracking(userId: string, activityType: string, subjectArea: string) {
    try {
      const response = await axios.post(`${API_URL}/learning/session/start`, {
        userId,
        activityType,
        subjectArea
      });
      this.currentSession = response.data.sessionId;
      return response.data;
    } catch (error) {
      console.error('Failed to start learning session:', error);
      throw error;
    }
  }

  async updateProgress(data: {
    completionRate?: number;
    correctAnswers?: number;
    wrongAnswers?: number;
    focusScore?: number;
  }) {
    if (!this.currentSession) {
      throw new Error('No active learning session');
    }

    try {
      const response = await axios.put(
        `${API_URL}/learning/session/${this.currentSession}`,
        data
      );
      return response.data;
    } catch (error) {
      console.error('Failed to update learning progress:', error);
      throw error;
    }
  }

  async endSession() {
    if (!this.currentSession) {
      return;
    }

    try {
      const response = await axios.post(
        `${API_URL}/learning/session/${this.currentSession}/end`
      );
      this.currentSession = null;
      return response.data;
    } catch (error) {
      console.error('Failed to end learning session:', error);
      throw error;
    }
  }

  async getLearningAnalysis(userId: string) {
    try {
      const response = await axios.get(`${API_URL}/learning/analysis/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Failed to get learning analysis:', error);
      throw error;
    }
  }
}
