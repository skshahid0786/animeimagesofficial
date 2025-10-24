

import express from 'express';
const router = express.Router();

const greetings = ["Hello!", "Hi!", "Hey!", "Greetings!", "Howdy!"];

router.get('/', (req, res) => {
    res.json({ success: true, result: greetings });
});

export default router;
