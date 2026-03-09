# Copilot instructions for Sthwalo Holdings

## Big picture architecture
- This repo is a React 18 + Vite 5 marketing site with client-side routing in [src/App.tsx](src/App.tsx).
- The contact form posts to a separate API (`POST /contact`) defined in [server/index.js](server/index.js); data lands in MySQL per [server/schema.sql](server/schema.sql).
- The FIN dashboard referenced in README is a separate app; this repo only hosts the marketing site and its API helper.

## Key structure & patterns
- Pages live in [src/pages](src/pages) and are wired in the router. Each page is mostly composition of UI blocks from [src/components](src/components).
- Reusable UI patterns:
  - `AnimatedSection` + `useScrollAnimation` for reveal-on-scroll animations ([src/components/ui/AnimatedSection.tsx](src/components/ui/AnimatedSection.tsx), [src/hooks/useScrollAnimation.ts](src/hooks/useScrollAnimation.ts)).
  - `Button` is polymorphic: use `to` for internal routes and `href` for external links ([src/components/ui/Button.tsx](src/components/ui/Button.tsx)).
- Styling is Tailwind-first with custom utilities in [src/index.css](src/index.css): `section-container`, `section-padding`, `text-gradient`, `gold-gradient`, `card-hover`.
- Brand color ramps are defined in [tailwind.config.js](tailwind.config.js) (e.g., `bg-harvest-gold-200`, `text-deep-space-800`). Match these when extending UI.

## Data flow & integration
- Contact form submits JSON to `${import.meta.env.VITE_API_URL}/contact` (see [src/pages/Contact.tsx](src/pages/Contact.tsx)).
- API reads DB config from environment and inserts into `contact_submissions` (see [server/index.js](server/index.js)).

## Developer workflows
- Frontend (root): `npm install`, `npm run dev`, `npm run build`, `npm run preview`, `npm run lint`, `npm run typecheck` (see [package.json](package.json)).
- API (server/): `npm install`, `npm run dev` or `npm run start` (see [server/package.json](server/package.json)).

## Environment variables
- Frontend requires `VITE_API_URL` to point to the API base URL (used in Contact form).
- API requires DB + CORS config: `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, optional `FRONTEND_URL`, `PORT`.

## When editing
- Keep page composition in `src/pages/*` and avoid embedding routing logic elsewhere.
- Use existing Tailwind tokens/utilities instead of introducing new colors or layout primitives.
- Preserve the animation pattern: wrap sections with `AnimatedSection` and use `animate-*` + `animate-delay-*` classes where needed.
