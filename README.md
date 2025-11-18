# Safety Hub – Full Stack

Safety Hub is a bilingual disaster-readiness platform that combines a React/Vite dashboard with an Express/MongoDB API. It lets organizations manage safety alerts, submit incident reports, and monitor readiness metrics from a single glassmorphism UI.

## Features
- **Modern dashboard** with theme support, framer-motion micro-interactions, and shadcn/ui components.
- **JWT authentication** flow (register, login, profile) shared between frontend and backend.
- **Safety alerts** list with filtering, stats cards, and animated transitions.
- **Incident reports** form with validation, priority selection, and toast feedback.
- **Multilingual experience** (English, Hindi, Punjabi) powered by `LanguageProvider`.
- **Modular layout** for drills, facilities, assessments, users, and progress pages (stubs ready for expansion).

## Tech Stack
- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, shadcn/ui, framer-motion, TanStack Query.
- **Backend**: Node.js, Express, MongoDB (Mongoose), JWT, bcrypt, dotenv.

## Repository Layout
```
safety-hub-full (root)
├── safety-hub-main/           # Frontend workspace
│   └── safety-hub-main/       # Vite project (React dashboard)
└── safety-hub-backend/        # Express + Mongo REST API
```

## Prerequisites
- Node.js 18+
- npm 9+
- Running MongoDB instance (local or Atlas connection string)

## Environment Variables

Create `safety-hub-backend/.env`:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/safety-hub
JWT_SECRET=replace-this-with-a-long-random-string
```

*(Optional)* If you change the API origin, update `safety-hub-main/safety-hub-main/src/services/api.js` or introduce a `VITE_API_URL` environment variable and load it via `import.meta.env`.

## Local Development

1. **Install dependencies**
   ```bash
   # Frontend
   cd "/home/prince-verma/Downloads/safety-hub-full (2)/safety-hub-main/safety-hub-main"
   npm install

   # Backend
   cd "/home/prince-verma/Downloads/safety-hub-full (2)/safety-hub-backend"
   npm install
   ```

2. **Start MongoDB** (if not already running).

3. **Run the backend**
   ```bash
   cd "/home/prince-verma/Downloads/safety-hub-full (2)/safety-hub-backend"
   npm run dev           # nodemon src/server.js
   ```
   API is served at `http://localhost:5000/api`.

4. **Run the frontend**
   ```bash
   cd "/home/prince-verma/Downloads/safety-hub-full (2)/safety-hub-main/safety-hub-main"
   npm run dev
   ```
   Vite serves the dashboard at `http://localhost:8080` (see `vite.config.ts`).

5. **Login**
   - Register a user via `POST /api/auth/register` or build a seed script.
   - Use those credentials on the `/login` page; a successful login stores the JWT in `localStorage`.

## API Surface (selected)
- `POST /api/auth/register` – create user, returns `{ user, token }`.
- `POST /api/auth/login` – authenticate, returns `{ user, token }`.
- `GET /api/auth/profile` – retrieve profile (requires `Authorization: Bearer <token>`).
- `GET /api/alerts` – list alerts (public).
- `POST /api/alerts` – create alert (protected).
- `GET /api/reports` – list incident reports (public).
- `POST /api/reports` – submit incident report (protected).

See `safety-hub-backend/src/routes` and controllers for more endpoints (modules, drills, etc., can be added following the same pattern).

## Useful Scripts
| Location | Command | Description |
|----------|---------|-------------|
| Frontend | `npm run dev` | Start Vite dev server (port 8080). |
| Frontend | `npm run build` | Production build (outputs to `dist`). |
| Frontend | `npm run preview` | Preview built assets locally. |
| Backend  | `npm run dev` | Nodemon reload server (default port 5000). |
| Backend  | `npm start` | Run Express API via Node. |

## Testing API Quickly
```bash
curl http://localhost:5000/api/alerts
curl -X POST http://localhost:5000/api/reports \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Incident","location":"Warehouse 1","description":"Smoke detected","type":"incident","priority":"high"}'
```

## Next Steps
- Seed MongoDB with sample alerts/reports for demo data.
- Wire remaining pages (modules, drills, assessments, facilities) to their respective endpoints.
- Add integration tests covering critical API flows.

Enjoy building with Safety Hub!

