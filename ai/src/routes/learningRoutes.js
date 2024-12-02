import express from 'express';
import { LearningAnalyzer, StudyTracker } from '../learningSystem.js';

const router = express.Router();

// Start tracking a study session
router.post('/session/start', async (req, res) => {
  try {
    const { userId, activityType, subjectArea } = req.body;
    const session = await StudyTracker.startSession(userId, activityType, subjectArea);
    res.json({ success: true, sessionId: session._id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update session with progress
router.put('/session/:sessionId', async (req, res) => {
  try {
    const { sessionId } = req.params;
    const updates = req.body;
    const updated = await StudyTracker.updateSession(sessionId, updates);
    res.json({ success: true, session: updated });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// End study session
router.post('/session/:sessionId/end', async (req, res) => {
  try {
    const { sessionId } = req.params;
    const session = await StudyTracker.endSession(sessionId);
    res.json({ success: true, session });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get learning analysis for a user
router.get('/analysis/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const analysis = await LearningAnalyzer.analyzeBehavior(userId);
    res.json(analysis);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
