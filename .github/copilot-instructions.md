# AI Coding Agent Instructions for Sthwalo Holdings Marketing Site

## Architecture Overview
This is the **portfolio and company site** of Sthwalo Holdings. It consists of:
- **Frontend**: React 18 + Vite + TypeScript + Tailwind CSS (custom color palette)
- **Backend**: Express.js + MySQL at `/api` — contact form, blog posts and the `/admin` editor
- **FIN**: a separate product at https://aosfin.com. This site only links to it; there is no FIN build, route or proxy here.

Key files: `docs/architecture.md`, `src/App.tsx`, `server/index.js`

## Development Workflows
- **Frontend dev**: `npm run dev` (Vite dev server)
- **Backend dev**: `cd server && npm run dev` (Node --watch)
- **Build**: `npm run build` (outputs to `dist/`)
- **Deploy**: Upload `dist/` to cPanel `public_html/`, add `.htaccess` for SPA routing
- **Type check**: `npm run typecheck`
- **Lint**: `npm run lint`

## Code Conventions
### Styling
Use custom Tailwind colors: `deep-space-*`, `warm-sand-*`, `harvest-gold-*`, `ember-*`, `oxblood-*` (defined in `tailwind.config.js`). Example:
```tsx
className="bg-deep-space-800 text-harvest-gold-200"
```

### Animations
Leverage custom scroll animations with `useScrollAnimation` hook (IntersectionObserver-based). Add `animate-fade-in-up` classes for entrance effects.

### Analytics
Track events via `src/utils/analytics.ts` (e.g. `trackCTAClick('fin_live', 'navbar')`). GA4 stays off until `VITE_GA_MEASUREMENT_ID` is set, which needs a consent banner first.

### Components
- Use `Button` component from `src/components/ui/Button.tsx` for CTAs
- Structure pages in `src/pages/`, components in `src/components/` (home/, layout/, ui/)
- SEO: Use `SeoMeta` component for dynamic meta tags

### Contact Form
POST to `/api/contact` with `{name, email, company?, service?, message}`. Backend saves to MySQL and sends email via sendmail.

### FIN links
Link to `https://aosfin.com` (signup: `https://aosfin.com/register`). Never add FIN routes or rewrites to this site.

Reference: `docs/fin-integration.md`, `docs/getting-started.md`