

import express from 'express';
const router = express.Router();

const motivationTips = [
    "Keep going, even if it's slow.",
    "Focus on progress, not perfection."
];
const healthTips = [
    "Drink plenty of water.",
    "Sleep at least 7 hours."
];
const studyTips = [
    "Take breaks every 50 minutes.",
    "Teach what you learn to others."
];

router.get('/motivation', (req, res) => res.json({ success: true, result: motivationTips }));
router.get('/health', (req, res) => res.json({ success: true, result: healthTips }));
router.get('/study', (req, res) => res.json({ success: true, result: studyTips }));

export default router;
