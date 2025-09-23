import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

const router = Router();

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: "name, email and password are required" });
    }
    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ error: "Email already registered" });
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, passwordHash });
    return res.status(201).json({ user: user.toJSONSafe() });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ error: "Invalid credentials" });
    const token = jwt.sign({ sub: user._id, role: user.role, email: user.email }, process.env.JWT_SECRET, { expiresIn: "7d" });
    return res.json({ token, user: user.toJSONSafe() });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Server error" });
  }
});

export default router;
