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
app.use(express.json({ limit: "1mb" }));
app.use(morgan(process.env.NODE_ENV === "development" ? "dev" : "combined"));

app.get("/", (_req, res) => res.json({ ok: true, service: "SkillSync API" }));
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/roadmap", roadmapRoutes);

const port = process.env.PORT || 4000;

async function start() {
  await connectDB(process.env.MONGO_URI);
  app.listen(port, () => console.log(`🚀 API running on http://localhost:${port}`));
}
start();
