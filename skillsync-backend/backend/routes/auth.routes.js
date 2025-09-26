const express = require("express");
const router = express.Router();

/** Fake in-memory users – replace with DB later */
const USERS = new Map();

router.post("/register", (req, res) => {
  const { name, email, password } = req.body || {};
  if (!name || !email || !password) {
    return res.status(400).json({ ok: false, error: "missing_fields" });
  }
  if (USERS.has(email)) {
    return res.status(409).json({ ok: false, error: "email_exists" });
  }
  USERS.set(email, { name, email, password });
  return res.json({ ok: true, user: { name, email } });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body || {};
  const user = USERS.get(email);
  if (!user || user.password !== password) {
    return res.status(401).json({ ok: false, error: "invalid_credentials" });
  }
  // no JWT for now – keep it simple
  return res.json({ ok: true, user: { name: user.name, email: user.email } });
});

module.exports = router;
