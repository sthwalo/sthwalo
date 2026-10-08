# Getting Started

## Prerequisites

- Node.js 22 (the browser driver in `.claude/skills/run-sthwalo-site` needs it)
- npm 9+
- MySQL 8+ for the API (contact form, blog, admin)

## Install & run

```bash
npm install
cd server && npm install && cd ..

npm run dev                  # front end (Vite)
cd server && npm run dev     # API, in a second terminal

npm run typecheck
npm run lint
npm run build                # production build + prerender into dist/
npm run preview
```

## Configuration

- **Environment:** see [environment.md](environment.md).
- **Database:** create the tables from `server/schema.sql`. Then, from `server/`, create the
  admin user with `npm run admin:create -- you@example.com` and load the starter posts with
  `npm run seed` (generated from `src/data/blogPosts.ts` by `scripts/generate-blog-seed.mjs`).
- **Blog content:** written and published at `/admin`, stored in MySQL. `src/data/blogPosts.ts`
  is the typed seed and the offline fallback, not the place to publish.
- **Analytics:** off by default; see [environment.md](environment.md).
- **Social links:** `src/components/layout/Footer.tsx`.
- **RSS:** generated from blog content; feed metadata in `src/utils/rssFeed.ts`.
