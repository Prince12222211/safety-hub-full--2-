## Safety Hub Frontend Overhaul

### Vision
- Elevate Safety Hub into a premium-grade command center with cinematic gradients, glassmorphism, and data-rich visualizations.
- Offer parity between light/dark themes, responsive layouts down to 320 px, and WCAG 2.1 AA contrast.
- Keep React + Vite + Tailwind + ShadCN as the base, while layering motion + data viz via `framer-motion` and `recharts`.

### Guiding Principles
1. **Living Design System**  
   - Source of truth lives in `src/index.css` (CSS vars) + Tailwind tokens.  
   - Components favor `class-variance-authority` variants for consistent density/shape.  
   - Theme toggle via `next-themes` for body class management.
2. **Experience Layer**  
   - Framer Motion micro-interactions on cards, sidebar, modal flows.  
   - Contextual surfaces (glass panels, frosted metrics, neon badges).  
   - Background orbs + grid mask handled by `DashboardLayout`.
3. **Information Hierarchy**  
   - Hero landing page with story-driven CTA.  
   - Dashboard = 3 tiers: KPIs, situational awareness (timeline/map/charts), action queue.  
   - Dedicated hubs for Alerts, Drills, Facilities, Modules, Assessments, Users, Progress.
4. **Internationalization Ready**  
   - Keep `TranslatedText`; add fallback copy helper + improved typography scale.  
   - Use config-driven navigation + page metadata.

### Workstreams
| Phase | Deliverables |
| --- | --- |
| 1. System Setup | Install `framer-motion`, `@fontsource/space-grotesk`; refactor `index.css`; add `DesignSystemProvider`; upgrade `Topbar`, `AppSidebar`, `DashboardLayout`. |
| 2. Core Screens | Rebuild Dashboard (new KPI ribbon, charts, timeline), Modules grid, Alerts board, Drills planner, Facilities overview, Assessments & Users tables, Progress analytics, Login hero. |
| 3. Supporting UX | Landing page (`/`), report submission wizard, global search/command palette, notifications drawer, toasts. |
| 4. Polish & QA | Accessibility sweep, motion preferences, responsive QA, storybook-style doc (optional). |

### Immediate Next Steps
1. Add dependencies + base typography.  
2. Ship upgraded layout shell (sidebar/topbar/background).  
3. Replace placeholder Index page with marketing hero to showcase the new direction.  
4. Iterate screen-by-screen with shared widgets (timeline, activity log, module cards, facility map stub).

Progress will be tracked in `docs/frontend-overhaul.md` and Git history so every screen transformation is reviewable.

