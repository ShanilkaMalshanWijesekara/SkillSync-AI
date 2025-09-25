import { Router } from "express";

const router = Router();

// demo analyzer — replace with your real logic later
router.post("/analyze", async (req, res) => {
  const { resumeText, jobDescription } = req.body || {};
  if (!resumeText || !jobDescription) {
    return res.status(400).json({ error: "resumeText and jobDescription are required" });
  }

  const sample = {
    fitScore: 75,
    summary: "Focus on TypeScript & testing for a quick uplift.",
    addKeywords: ["TypeScript", "Unit testing (Jest)", "React Router", "CI/CD"],
    existing: ["React", "REST APIs", "Git", "MongoDB basics"],
    missing: ["TypeScript", "a11y", "CI/CD"],
    resources: [
      { title: "TypeScript for JS Devs", src: "freeCodeCamp", url: "https://www.freecodecamp.org/" },
      { title: "Jest Crash Course", src: "YouTube", url: "https://youtube.com" },
      { title: "React Testing with Jest", src: "Udemy", url: "https://udemy.com" },
      { title: "Accessibility Fundamentals", src: "web.dev", url: "https://web.dev" }
    ]
  };

  return res.json(sample);
});

export default router;
