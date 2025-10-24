import express from 'express';
const router = express.Router();

// Joke
router.get('/joke', async (req, res) => {
    const resp = await fetch('https://v2.jokeapi.dev/joke/Any');
    const data = await resp.json();
    const joke = data.type === 'single' ? data.joke : `${data.setup} - ${data.delivery}`;
    res.json({ success: true, result: joke });
});

// Advice
router.get('/advice', async (req, res) => {
    const resp = await fetch('https://api.adviceslip.com/advice');
    const data = await resp.json();
    res.json({ success: true, result: data.slip.advice });
});

// Quote
router.get('/quote', async (req, res) => {
    const resp = await fetch('https://api.quotable.io/random');
    const data = await resp.json();
    res.json({ success: true, result: `${data.content} —${data.author}` });
});

export default router;


