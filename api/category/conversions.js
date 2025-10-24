import express from 'express';
const router = express.Router();

// To binary
router.get('/to-binary', (req, res) => {
    const { text } = req.query;
    if (!text) return res.json({ success: false, message: "Text is required" });
    const binary = text.split('').map(c => c.charCodeAt(0).toString(2)).join(' ');
    res.json({ success: true, result: binary });
});

// To hex
router.get('/to-hex', (req, res) => {
    const { text } = req.query;
    if (!text) return res.json({ success: false, message: "Text is required" });
    const hex = text.split('').map(c => c.charCodeAt(0).toString(16)).join(' ');
    res.json({ success: true, result: hex });
});

// Reverse words
router.get('/reverse-words', (req, res) => {
    const { text } = req.query;
    if (!text) return res.json({ success: false, message: "Text is required" });
    const reversed = text.split(' ').reverse().join(' ');
    res.json({ success: true, result: reversed });
});

// URL encode
router.get('/url-encode', (req, res) => {
    const { text } = req.query;
    if (!text) return res.json({ success: false, message: "Text is required" });
    res.json({ success: true, result: encodeURIComponent(text) });
});

// URL decode
router.get('/url-decode', (req, res) => {
    const { text } = req.query;
    if (!text) return res.json({ success: false, message: "Text is required" });
    res.json({ success: true, result: decodeURIComponent(text) });
});

// Acronym
router.get('/acronym', (req, res) => {
    const { text } = req.query;
    if (!text) return res.json({ success: false, message: "Text is required" });
    const acronym = text.split(' ').map(w => w[0].toUpperCase()).join('');
    res.json({ success: true, result: acronym });
});

export default router;


