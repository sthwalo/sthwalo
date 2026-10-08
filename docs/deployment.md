# Deployment

Everything for this site runs on one cPanel shared host. FIN (aosfin.com) is deployed separately
from its own repository and is not part of this process.

```
 cPanel (sthwalo.com, proxied by Cloudflare)
 ├── public_html/          ← contents of dist/ (static SPA, prerendered pages, .htaccess)
 └── Node.js app at /api   ← server/ (contact form, blog, admin)  →  MySQL
```

## API (cPanel Node.js app)

The contact form and the blog run in one Node app at `sthwalo.com/api`, managed through
cPanel → Setup Node.js App. Step-by-step runbook, including the environment-variable trap that
silently breaks admin login: **[server/DEPLOY.md](../server/DEPLOY.md)**.

## Static site

```bash
npm run build      # vite build + prerender into dist/
```

Upload the contents of `dist/` to `public_html/`. `public/.htaccess` is copied into `dist/` by
the build, so SPA routing and the `/api` pass-through ship with it.

### Pre-deployment checklist

- [ ] `npm run lint`, `npm run typecheck` and `npm run build` pass
- [ ] Routes load: `/`, `/about`, `/services`, `/portfolio`, `/blog`, a post, `/contact`, legal pages
- [ ] Contact form submits and the notification email arrives
- [ ] Blog posts load from the API (the static fallback hides an API outage — check the network tab)
- [ ] SEO metadata, Open Graph tags and `sitemap.xml` present in the built pages
- [ ] Outbound FIN links point at `https://aosfin.com`

### Environment

- `VITE_API_URL=/api` at build time (relative — see [environment.md](environment.md))
- `VITE_GA_MEASUREMENT_ID` only once a cookie-consent banner exists
- API secrets are set on the cPanel Node app, not in files (see `server/DEPLOY.md`)
