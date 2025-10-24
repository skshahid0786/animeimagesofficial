import express from 'express';
const router = express.Router();

router.get('/time', (req, res) => {
    const now = new Date();
    res.json({ success: true, result: now.toLocaleTimeString() });
});

router.get('/date', (req, res) => {
    const now = new Date();
    res.json({ success: true, result: now.toLocaleDateString() });
});

export default router;


