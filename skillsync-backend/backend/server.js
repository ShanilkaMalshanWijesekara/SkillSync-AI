const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.json({ message: "Backend is working ✅" });
});

// example login route (fake for now)
app.post("/login", (req, res) => {
  const { email, password } = req.body || {};
  if (email && password) {
    return res.json({ ok: true, email });
  }
  res.status(400).json({ ok: false, error: "Missing email or password" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
