export default async function handler(req, res) {
  const query = (req.query.q || "").toLowerCase();
  const fetchJson = async (url) => {
    try {
      const r = await fetch(url);
      return r.ok ? await r.json() : null;
    } catch {
      return null;
    }
  };

  if (!query)
    return res.json({ success: false, message: "Please provide ?q=<command>" });

  // === BASIC COMMANDS ===
  if (query.includes("time"))
    return res.json({ success: true, result: `⏰ ${new Date().toLocaleTimeString()}` });

  if (query.includes("date"))
    return res.json({ success: true, result: `📅 ${new Date().toLocaleDateString()}` });

  if (query.includes("joke")) {
    const j = await fetchJson("https://v2.jokeapi.dev/joke/Any?type=single");
    return res.json({ success: true, result: j?.joke || "Couldn't fetch a joke 😅" });
  }

  if (query.includes("advice")) {
    const a = await fetchJson("https://api.adviceslip.com/advice");
    return res.json({ success: true, result: a?.slip?.advice || "No advice right now." });
  }

  if (query.includes("quote")) {
    const q = await fetchJson("https://api.quotable.io/random");
    return res.json({ success: true, result: `"${q?.content}" — ${q?.author}` });
  }

  // fallback
  return res.json({ success: true, result: "Try: joke, time, date, advice, or quote." });
}
