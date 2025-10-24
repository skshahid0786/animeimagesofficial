import express from 'express';
const router = express.Router();

// Emoji
router.get('/emoji', (req, res) => {
    const emojis = ["😀","😂","😎","🥳","😜"];
    res.json({ success: true, result: emojis });
});

// Fun fact
router.get('/fun-fact', async (req, res) => {
    const resp = await fetch('https://uselessfacts.jsph.pl/random.json?language=en');
    const data = await resp.json();
    res.json({ success: true, result: data.text });
});

// ASCII art (simple example)
router.get('/ascii', (req, res) => {
    const arts = ["( ͡° ͜ʖ ͡°)", "(╯°□°）╯︵ ┻━┻", "¯\\_(ツ)_/¯"];
    res.json({ success: true, result: arts });
});

// Shuffle words
router.get('/shuffle', (req, res) => {
    const { text } = req.query;
    if (!text) return res.json({ success: false, message: "Text is required" });
    const shuffled = text.split(' ').sort(() => Math.random() - 0.5).join(' ');
    res.json({ success: true, result: shuffled });
});

export default router;


