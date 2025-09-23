import { Router } from "express";
import { authRequired } from "../middleware/auth.js";

const router = Router();

// Placeholder: compute a roadmap based on user's skills vs job description
router.post("/analyze", authRequired, async (req, res) => {
  const { resumeText, jobDescription } = req.body;
  // TODO: plug in your analyzer here
  const sample = {
    fitScore: 72,
    missingSkills: ["GraphQL", "Docker"],
    recommendations: [
      { skill: "GraphQL", course: "Intro to GraphQL (freeCodeCamp)", hours: 6 },
      { skill: "Docker", course: "Docker Essentials", hours: 5 },
    ]
  };
  return res.json(sample);
});

export default router;
