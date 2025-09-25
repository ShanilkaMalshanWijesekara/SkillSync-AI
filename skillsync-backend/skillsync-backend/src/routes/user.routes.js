import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { User } from "../models/User.js";

const router = Router();

router.get("/me", requireAuth, async (req, res) => {
  const user = await User.findById(req.user.id).select("_id name email createdAt");
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
});

export default router;
