# Architecture Overview

Two separate web properties. They share an owner and nothing else: no domain, no build, no
runtime dependency.

```
 sthwalo.com — this repo                         aosfin.com — FIN (the `acc` repo)
 ──────────────────────────                       ─────────────────────────────────
 cPanel shared hosting                            Cloudflare (proxy, TLS)
 ├── /        static Vite + React SPA                 │
 │            (prerendered public pages)              ▼
 └── /api     Node.js + Express (cPanel Node app)  nginx on AWS EC2
                │                                  ├── /      FIN web app (React 19)
                ▼                                  └── /api   Spring Boot 3.5 → RDS PostgreSQL 17
              MySQL
              contact_submissions, posts,
              admin_users, post_revisions

 sthwalo.com links out to https://aosfin.com. Nothing calls FIN at runtime.
```

## System components

- **Public pages** (Home, About, Services, Portfolio, Blog, Contact, legal pages) are a static
  React SPA. The public routes are prerendered at build time so crawlers get real HTML.
- **API at `/api`** is one Node.js/Express app on cPanel: the contact form (stored in MySQL,
  notification by email), public blog reads, and the `/admin` blog editor (session cookie,
  bcrypt passwords, a revision on every save). See [database.md](database.md).
- **Same origin.** The SPA calls `/api` relative to its own host, so one bundle works locally
  and in production without CORS.
- **FIN** is described on the Portfolio page and linked to; its architecture is documented in
  its own repository.
