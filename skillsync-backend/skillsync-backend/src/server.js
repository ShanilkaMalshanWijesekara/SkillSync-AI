import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import roadmapRoutes from "./routes/roadmap.routes.js";

dotenv.config();
const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: "2mb" }));
app.use(morgan("dev"));

app.get("/health", (_req, res) => res.json({ ok: true, ts: Date.now() }));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/roadmap", roadmapRoutes);

const port = process.env.PORT || 4000;
const uri = process.env.MONGO_URI;

async function start() {
  await connectDB(uri);
  app.listen(port, () => console.log(`🚀 API running on http://localhost:${port}`));
}

start();
