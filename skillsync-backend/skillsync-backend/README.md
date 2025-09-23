# SkillSync Backend (Express + MongoDB)

Lightweight REST API for SkillSync (JWT auth + users + example roadmap analyzer).

## Quick Start (Windows / macOS / Linux)

1. Install Node 18+ and MongoDB Community (or run MongoDB Atlas).
2. Clone or unzip this folder.
3. Copy `.env.example` to `.env` and adjust values.
4. Install packages:
   ```bash
   npm install
   ```
5. Start dev server:
   ```bash
   npm run dev
   ```
6. Test endpoints:

- **Health**
  ```
  GET http://localhost:4000/health
  ```

- **Register**
  ```
  POST http://localhost:4000/api/auth/register
  Content-Type: application/json

  { "name": "Alice", "email": "alice@example.com", "password": "Passw0rd!" }
  ```

- **Login**
  ```
  POST http://localhost:4000/api/auth/login
  { "email": "alice@example.com", "password": "Passw0rd!" }
  ```

- **Me (auth)**
  ```
  GET http://localhost:4000/api/users/me
  Authorization: Bearer <token>
  ```

- **Roadmap Analyze (auth)**
  ```
  POST http://localhost:4000/api/roadmap/analyze
  Authorization: Bearer <token>
  { "resumeText": "…", "jobDescription": "…" }
  ```

## Notes
- Uses ESM (`"type": "module"`). If you prefer CommonJS, remove that field and change `import` to `require` syntax.
- Add a proper analyzer in `src/routes/roadmap.routes.js` later.
- For production, consider rate limiting, validation (zod/joi), and logging to a file.
