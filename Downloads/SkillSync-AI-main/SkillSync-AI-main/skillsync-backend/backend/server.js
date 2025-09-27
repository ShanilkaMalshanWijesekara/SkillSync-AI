// server.js
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();

const app = express();

// ✅ Middleware
app.use(cors({ origin: "*" })); // allow all origins (adjust in production)
app.use(express.json({ limit: "1mb" })); // parse JSON body
app.use(morgan("dev")); // logs requests to console

// ✅ Health check route
app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Backend is running ✅" });
});

// ✅ Auth route (fake for now, replace with real logic later)
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ ok: false, error: "Missing email or password" });
  }

  // You can connect this to your DB later
  return res.json({
    ok: true,
    user: { email },
    token: "fake-jwt-token-1234", // replace with real JWT
  });
});

// ✅ Example protected route (just demo)
app.get("/api/profile", (req, res) => {
  // Normally, you'd check auth token here
  res.json({ ok: true, profile: { name: "Demo User", email: "demo@example.com" } });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ ok: false, error: "Not Found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(500).json({ ok: false, error: "Internal Server Error" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
