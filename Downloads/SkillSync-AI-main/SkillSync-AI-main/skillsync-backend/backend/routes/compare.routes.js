const express = require("express");
const router = express.Router();

/**
 * Naive scoring: counts keyword overlaps and returns a % plus gap list.
 * This is only for demo – replace with your real logic later.
 */
router.post("/", (req, res) => {
  try {
    const { resume = "", jd = "" } = req.body || {};
    if (!resume.trim() || !jd.trim()) {
      return res.status(400).json({ ok: false, error: "resume and jd are required" });
    }

    const norm = (s) =>
      s.toLowerCase().replace(/[^a-z0-9\s]/g, " ").split(/\s+/).filter(Boolean);

    const rTokens = new Set(norm(resume));
    const jTokens = norm(jd);

    const important = [
      "react","reactnative","typescript","javascript","router","jest","testing",
      "api","integration","ci","docker","a11y","accessibility","git","css","html"
    ];

    let hits = 0;
    const gaps = [];

    important.forEach((kw) => {
      if (rTokens.has(kw)) hits += 1;
      else gaps.push(kw);
    });

    const score = Math.round((hits / important.length) * 100);

    // Also compute simple overlap for display
    const overlap = jTokens.filter((t) => rTokens.has(t)).slice(0, 10);

    return res.json({
      ok: true,
      score,                 // 0–100
      matchedKeywords: overlap,
      missingKeywords: gaps, // skills to learn
      advice:
        score >= 70
          ? "Great fit. Polish your projects and be ready for technical questions."
          : "Work on the missing topics to increase your match."
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, error: "internal_error" });
  }
});

module.exports = router;
