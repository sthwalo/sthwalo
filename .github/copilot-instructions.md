# AI Coding Agent Instructions for Sthwalo Holdings Marketing Site

## Architecture Overview
This is a **static-first marketing website** for Sthwalo Holdings, serving as a portal to the FIN Financial Management System. It consists of:
- **Frontend**: React 18 + Vite + TypeScript + Tailwind CSS (custom color palette)
- **Backend**: Express.js + MySQL for contact form submissions (stored in `contact_submissions` table)
- **Integration**: FIN dashboard hosted at `/app/` subdirectory (separate React 19 build)

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
Track events via `src/utils/analytics.ts` functions like `trackCTAClick('trial_signup', 'hero')` for GA4 integration.

### Components
- Use `Button` component from `src/components/ui/Button.tsx` for CTAs
- Structure pages in `src/pages/`, components in `src/components/` (home/, layout/, ui/)
- SEO: Use `SeoMeta` component for dynamic meta tags

### Contact Form
POST to `/api/contact` with `{name, email, company?, service?, message}`. Backend saves to MySQL and sends email via sendmail.

### Integration
FIN app links: Use `/app/` URLs. Update `.htaccess` to exclude `/app/` from marketing site routing.

Reference: `docs/fin-integration.md`, `docs/getting-started.md`