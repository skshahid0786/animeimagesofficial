import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 3000;

// Helper to fetch JSON
async function fetchJson(url) {
  const res = await fetch(url);
  return res.json();
}

app.get("/api", async (req, res) => {
  try {
    const queryRaw = req.query.q || "";
    const query = queryRaw.toLowerCase().trim();

    if (!query) {
      return res.json({ success: false, message: "Please provide ?q=<command>" });
    }

    // ---- Basic Commands ----
    if (query.includes("time")) {
      const time = new Date().toLocaleTimeString();
      return res.json({ success: true, result: `⏰ ${time}` });
    }

    if (query.includes("date")) {
      const date = new Date().toLocaleDateString();
      return res.json({ success: true, result: `📅 ${date}` });
    }

    if (query.includes("joke")) {
      const joke = await fetchJson("https://v2.jokeapi.dev/joke/Any?type=single");
      return res.json({ success: true, result: joke?.joke || "Couldn't fetch a joke." });
    }

    if (query.includes("advice")) {
      const advice = await fetchJson("https://api.adviceslip.com/advice");
      return res.json({ success: true, result: advice?.slip?.advice || "Couldn't fetch advice." });
    }

    if (query.includes("quote")) {
      const quote = await fetchJson("https://api.quotable.io/random");
      return res.json({ success: true, result: `"${quote?.content}" — ${quote?.author}` || "Couldn't fetch quote." });
    }

    // ---- Wikipedia Search ----
    if (query.startsWith("search ")) {
      const term = query.replace("search ", "").trim();
      if (!term) return res.json({ success: false, message: "Please provide a search term." });
      const wiki = await fetchJson(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(term)}`);
      return res.json({ success: true, result: wiki?.extract || "No information found on Wikipedia." });
    }

    // ---- Waifu.pics Integration ----
    if (query.includes("waifu")) {
      // default: sfw/waifu
      const type = query.includes("sfw") ? "sfw" : "sfw"; // extend to hentai if needed
      const w = await fetchJson(`https://api.waifu.pics/${type}/waifu`);
      return res.json({ success: true, result: w?.url || "Couldn't fetch a waifu image." });
    }

    // ---- Fallback ----
    return res.json({
      success: true,
      result: "Try: joke, time, date, advice, quote, search <term>, waifu",
    });

  } catch (err) {
    console.error(err);
    return res.json({ success: false, message: "Something went wrong." });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
