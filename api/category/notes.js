

import express from 'express';
const router = express.Router();

let notes = [];

// Add note
router.post('/add', (req, res) => {
    const { note } = req.body;
    if (!note) return res.json({ success: false, message: "Note is required" });
    notes.push(note);
    res.json({ success: true, result: notes });
});

// Show notes
router.get('/show', (req, res) => {
    res.json({ success: true, result: notes });
});

// Clear notes
router.post('/clear', (req, res) => {
    notes = [];
    res.json({ success: true, result: notes });
});

export default router;
