import mongoose from 'mongoose';

// Schema for tracking study behavior
const StudyBehaviorSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  sessionStart: { type: Date, required: true },
  sessionEnd: { type: Date },
  activityType: { type: String, enum: ['reading', 'practice', 'quiz', 'video'], required: true },
  subjectArea: { type: String, required: true },
  timeSpent: { type: Number }, // in minutes
  completionRate: { type: Number }, // percentage
  correctAnswers: { type: Number },
  wrongAnswers: { type: Number },
  difficultyLevel: { type: String, enum: ['easy', 'medium', 'hard'] },
  focusScore: { type: Number }, // calculated based on engagement metrics
  patterns: {
    preferredTimeOfDay: { type: String },
    averageSessionDuration: { type: Number },
    strongestSubjects: [String],
    weakestSubjects: [String],
    learningStyle: { type: String }
  }
});

// Learning pattern analyzer
class LearningAnalyzer {
  static async analyzeBehavior(userId) {
    const behaviors = await StudyBehavior.find({ userId });
    
    return {
      preferredTimes: this.calculatePreferredStudyTimes(behaviors),
      strengths: this.identifyStrengths(behaviors),
      weaknesses: this.identifyWeaknesses(behaviors),
      recommendedContent: this.generateRecommendations(behaviors),
      learningStyle: this.determineLearningStyle(behaviors)
    };
  }

  static calculatePreferredStudyTimes(behaviors) {
    // Analyze when the student is most active and productive
    const timeSlots = behaviors.map(b => new Date(b.sessionStart).getHours());
    return this.findMostFrequent(timeSlots);
  }

  static identifyStrengths(behaviors) {
    // Analyze subjects with high performance
    return behaviors
      .filter(b => b.completionRate > 80)
      .map(b => b.subjectArea);
  }

  static identifyWeaknesses(behaviors) {
    // Identify areas needing improvement
    return behaviors
      .filter(b => b.completionRate < 60)
      .map(b => b.subjectArea);
  }

  static determineLearningStyle(behaviors) {
    // Analyze preferred content types and study patterns
    const contentPreferences = behaviors.reduce((acc, b) => {
      acc[b.activityType] = (acc[b.activityType] || 0) + 1;
      return acc;
    }, {});
    
    return Object.entries(contentPreferences)
      .sort(([,a], [,b]) => b - a)[0][0];
  }

  static generateRecommendations(behaviors) {
    // Generate personalized content recommendations
    const weakAreas = this.identifyWeaknesses(behaviors);
    const learningStyle = this.determineLearningStyle(behaviors);
    
    return {
      focusAreas: weakAreas,
      recommendedContentType: learningStyle,
      suggestedDifficulty: this.calculateOptimalDifficulty(behaviors)
    };
  }
}

// Real-time tracking system
class StudyTracker {
  static async startSession(userId, activityType, subjectArea) {
    return await StudyBehavior.create({
      userId,
      sessionStart: new Date(),
      activityType,
      subjectArea
    });
  }

  static async updateSession(sessionId, updates) {
    return await StudyBehavior.findByIdAndUpdate(sessionId, updates, { new: true });
  }

  static async endSession(sessionId) {
    const session = await StudyBehavior.findById(sessionId);
    session.sessionEnd = new Date();
    session.timeSpent = (session.sessionEnd - session.sessionStart) / (1000 * 60); // Convert to minutes
    return await session.save();
  }
}

export { StudyBehavior, LearningAnalyzer, StudyTracker };
