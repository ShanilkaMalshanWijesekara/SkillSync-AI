import { Router } from "express";
import { authRequired } from "../middleware/auth.js";
import { User } from "../models/User.js";

const router = Router();

router.get("/me", authRequired, async (req, res) => {
  const me = await User.findById(req.user.sub);
  if (!me) return res.status(404).json({ error: "User not found" });
  return res.json({ user: me.toJSONSafe() });
});

export default router;
