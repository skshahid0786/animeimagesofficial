import express from 'express';
const router = express.Router();

const imageApis = {
    waifu: 'https://api.waifu.pics/sfw/waifu',
    neko: 'https://api.waifu.pics/sfw/neko',
    cuddle: 'https://api.waifu.pics/sfw/cuddle',
    kiss: 'https://api.waifu.pics/sfw/kiss'
};

for (const [key, url] of Object.entries(imageApis)) {
    router.get(`/${key}`, async (req, res) => {
        const resp = await fetch(url);
        const data = await resp.json();
        res.json({ success: true, result: data.url });
    });
}

export default router;


