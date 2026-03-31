# Sthwalo Holdings

**Building foundations with code.**

The official marketing website for Sthwalo Holdings -- a software company founded by [Immaculate Nyoni](https://www.linkedin.com/in/inyoni/) that blends accounting discipline with full-stack engineering. This site serves as both a company presence and a portal to the FIN Financial Management System.

---

## Table of Contents

- [Architecture Overview](#architecture-overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Brand Color System](#brand-color-system)
- [Pages](#pages)
- [Environment Variables](#environment-variables)
- [Database](#database)
- [Getting Started](#getting-started)
- [Build & Deploy](#build--deploy)
- [Plugging In the FIN Dashboard](#plugging-in-the-fin-dashboard)
  - [Option A: Same Domain (Subdirectory)](#option-a-same-domain-subdirectory)
  - [Option B: Subdomain](#option-b-subdomain)
  - [Option C: Separate Domain with Cross-Links](#option-c-separate-domain-with-cross-links)
  - [Shared Dependencies](#shared-dependencies)
  - [Authentication Handoff](#authentication-handoff)
  - [CORS Configuration](#cors-configuration)
- [FIN Tech Stack Reference](#fin-tech-stack-reference)
- [Deployment Architecture](#deployment-architecture)
- [Links](#links)

---

## Architecture Overview

This website follows a **static-first architecture**:

```
┌───────────────────────────────────────────────────────────────────┐
│                         SAME DOMAIN                               │
│                                                                   │
│  ┌──────────────────────┐    ┌──────────────────────────────┐     │
│  │   Marketing Site     │    │   FIN Dashboard (React 19)   │     │
│  │   (This Repo)        │    │   (Separate Build)           │     │
│  │                      │    │                              │     │
│  │   React 18 + Vite    │    │   React 19 + Vite 6          │     │
│  │   Tailwind CSS       │    │   TypeScript 5.9             │     │
│  │   Express + MySQL    │    │   Axios HTTP Client          │     │
│  │   (contact form)     │    │   Context State Management   │     │
│  │                      │    │                              │     │
│  │   Hosted: cPanel     │    │   Hosted: cPanel (subdir)    │     │
│  └──────────┬───────────┘    └──────────────┬───────────────┘     │
│             │                               │                     │
└─────────────┼───────────────────────────────┼─────────────────────┘
              │                               │
              │         HTTPS / REST          │
              │                               │
       ┌──────▼───────────────────────────────▼──────────┐
       │              AWS (EC2 + RDS)                     │
       │                                                  │
       │   ┌────────────────────┐  ┌──────────────────┐   │
       │   │  Spring Boot 3     │  │  PostgreSQL 17   │   │
       │   │  Java 17           │  │  30+ Tables      │   │
       │   │  24 REST Endpoints │  │  Flyway Managed  │   │
       │   │  25+ Services      │  │  HikariCP Pool   │   │
       │   │  Docker Compose    │  │  Daily Backups   │   │
       │   └────────────────────┘  └──────────────────┘   │
       │                                                  │
       └──────────────────────────────────────────────────┘
```

- **Static pages** (Home, About, Services, Contact) serve the marketing site
- **Contact form backend** runs on Express.js with MySQL for storing submissions and Nodemailer for email notifications
- **Portfolio page** acts as a portal/launchpad to the FIN app
- **FIN backend** lives on AWS EC2/RDS (Spring Boot + PostgreSQL)
- **FIN frontend** is a separate React 19 build, hosted alongside this site on cPanel

---

## Tech Stack

### This Website

| Layer       | Technology                         |
|:------------|:-----------------------------------|
| Framework   | React 18.3.1                       |
| Language    | TypeScript 5.5                     |
| Build Tool  | Vite 7.3.1                         |
| Styling     | Tailwind CSS 3.4.1                 |
| Routing     | React Router 7.13                  |
| Icons       | Lucide React 0.344                 |
| Backend     | Express 4 + Node.js (contact API)  |
| Database    | MySQL (contact form submissions)   |
| Email       | Nodemailer (sendmail transport)    |
| Font        | Inter (Google Fonts)               |

### FIN Financial Management System

| Layer        | Technology                         |
|:-------------|:-----------------------------------|
| Backend      | Spring Boot 3.3.0 + Java 17       |
| Frontend     | React 19 + TypeScript 5.9 + Vite 6|
| Database     | PostgreSQL 17                      |
| Migrations   | Flyway                             |
| Connection   | HikariCP                           |
| HTTP Client  | Axios                              |
| State        | React Context                      |
| Infra        | Docker Compose, AWS EC2, AWS RDS   |

---

## Project Structure

```
sthwalo-holdings/
├── index.html                          # Entry HTML (Inter font, meta tags)
├── package.json                        # Dependencies and scripts
├── vite.config.ts                      # Vite configuration
├── tailwind.config.js                  # Brand colors, animations, fonts
├── tsconfig.app.json                   # TypeScript strict config
├── postcss.config.js                   # PostCSS + Autoprefixer
├── .htaccess                           # SPA routing for cPanel
├── app.htaccess                        # SPA routing for FIN subdirectory
│
├── server/
│   ├── index.js                        # Express API (contact form + email)
│   ├── schema.sql                      # MySQL table definition
│   ├── package.json                    # Server dependencies (express, mysql2, nodemailer)
│   └── .env.example                    # Server environment variables template
│
├── src/
│   ├── main.tsx                        # React DOM entry point
│   ├── App.tsx                         # Router + layout shell
│   ├── index.css                       # Tailwind directives + custom utilities
│   ├── vite-env.d.ts                   # Vite type declarations
│   │
│   ├── hooks/
│   │   └── useScrollAnimation.ts       # Intersection Observer for scroll FX
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx              # Sticky nav, mobile hamburger, "Access FIN" CTA
│   │   │   └── Footer.tsx              # Links, social (LinkedIn, GitHub, X)
│   │   │
│   │   ├── home/
│   │   │   ├── Hero.tsx                # Full-screen hero with stats
│   │   │   ├── FeaturedWork.tsx         # FIN spotlight with tech badges
│   │   │   ├── ServicesOverview.tsx     # 4-card service grid
│   │   │   └── TrustSignals.tsx        # Delivered projects + CTA banner
│   │   │
│   │   └── ui/
│   │       ├── Button.tsx              # Polymorphic button (link/button/anchor)
│   │       ├── AnimatedSection.tsx      # Scroll-triggered animation wrapper
│   │       ├── SectionHeading.tsx       # Reusable section header (label + title + desc)
│   │       └── ScrollToTop.tsx          # Reset scroll on route change
│   │
│   └── pages/
│       ├── Home.tsx                    # Hero + FeaturedWork + Services + Trust
│       ├── About.tsx                   # Founder story, values, timeline
│       ├── Services.tsx                # 4 service categories + process section
│       ├── Portfolio.tsx               # FIN deep dive + delivered sites grid
│       └── Contact.tsx                 # Form (Express API) + sidebar contact info
│
└── public/
    ├── STHWALO.png                     # Logo / favicon
    └── Immaculate Low.png              # Founder photo
```

---

## Brand Color System

All colors are defined in `tailwind.config.js` as full ramps (50-900):

| Token          | Base Hex  | Role                          | Tailwind Class Prefix |
|:---------------|:----------|:------------------------------|:----------------------|
| Deep Space     | `#273440` | Headers, dark backgrounds     | `deep-space-{shade}`  |
| Warm Sand      | `#F2ECCE` | Light backgrounds, surfaces   | `warm-sand-{shade}`   |
| Harvest Gold   | `#F2CF63` | CTAs, accents, highlights     | `harvest-gold-{shade}`|
| Ember          | `#BF895A` | Secondary accents, warmth     | `ember-{shade}`       |
| Oxblood        | `#731702` | Deep accents, passion         | `oxblood-{shade}`     |

Usage examples:
```html
<!-- Primary CTA button -->
<button class="bg-harvest-gold-200 text-deep-space-800">Get Started</button>

<!-- Dark section -->
<section class="bg-deep-space-800 text-warm-sand-100">...</section>

<!-- Card on light background -->
<div class="bg-white border border-warm-sand-300/30">...</div>
```

---

## Pages

| Route        | Page           | Description                                              |
|:-------------|:---------------|:---------------------------------------------------------|
| `/`          | Home           | Hero, FIN spotlight, services overview, delivered projects|
| `/about`     | About          | Immaculate's story, values, career timeline (2011-2025)  |
| `/services`  | Services       | Full-stack dev, cloud/DevOps, security, financial systems|
| `/portfolio` | Portfolio      | FIN deep dive, case study, 6 delivered client websites   |
| `/contact`   | Contact        | Form (Express API), email, location, LinkedIn            |

---

## Environment Variables

### Frontend

Create a `.env` file in the project root:

```env
VITE_API_URL=http://localhost:4000
```

This is used by `src/pages/Contact.tsx` to POST contact form submissions to the Express backend.

### Server

Create a `.env` file inside the `server/` directory (see `server/.env.example`):

```env
PORT=4000
FRONTEND_URL=http://localhost:5173

DB_HOST=localhost
DB_PORT=3306
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=sthwalo

SMTP_USER=noreply@yourdomain.com
NOTIFY_TO=hello@sthwalo.com
```

---

## Database

### MySQL (Contact Form)

The `contact_submissions` table stores inquiries from the website contact form. Create it using `server/schema.sql`:

| Column       | Type              | Default             | Notes            |
|:-------------|:------------------|:--------------------|:-----------------|
| `id`         | INT UNSIGNED      | AUTO_INCREMENT      | Primary key      |
| `name`       | VARCHAR(255)      | --                  | Required         |
| `email`      | VARCHAR(255)      | --                  | Required         |
| `company`    | VARCHAR(255)      | `NULL`              | Optional         |
| `service`    | VARCHAR(255)      | `NULL`              | Optional         |
| `message`    | TEXT              | --                  | Required         |
| `created_at` | TIMESTAMP         | `CURRENT_TIMESTAMP` | Auto-generated   |

The Express backend at `server/index.js` handles `POST /contact` (and `/api/contact`) by inserting into MySQL and sending an email notification via Nodemailer.

### FIN Database (AWS RDS -- Separate)

The FIN app uses its own PostgreSQL 17 instance on AWS RDS with 30+ tables, Flyway migrations, and HikariCP connection pooling. That database is entirely independent of the marketing site's MySQL instance.

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+
- MySQL 8+ (for the contact form backend)

### Install & Run

```bash
# Install frontend dependencies
npm install

# Install server dependencies
cd server && npm install && cd ..

# Start development server (frontend)
npm run dev

# Start API server (in a separate terminal)
cd server && npm run dev

# Type-check
npm run typecheck

# Lint
npm run lint

# Production build
npm run build

# Preview production build
npm run preview
```

---

## Build & Deploy

### Production Build

```bash
npm run build
```

This outputs optimized static files to `dist/`. The build includes:
- Minified JS bundle (~110 KB gzipped)
- Purged CSS (~6 KB gzipped)
- Hashed filenames for cache-busting

### Deploying to cPanel

1. Run `npm run build` locally
2. Upload the contents of `dist/` to your cPanel `public_html/` directory
3. Add an `.htaccess` file for SPA routing:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

This ensures all routes (`/about`, `/services`, etc.) resolve to `index.html` for React Router.

---

## Plugging In the FIN Dashboard

The FIN frontend (React 19 + TypeScript 5.9 + Vite 6) is a **separate build** from this marketing site. Both share the same core technologies (React, TypeScript, Vite, Tailwind) which makes integration straightforward.

### Option A: Same Domain (Subdirectory) -- Recommended

Host the FIN dashboard at `yourdomain.com/app/` alongside the marketing site at `yourdomain.com/`.

#### Directory Structure on cPanel

```
public_html/
├── index.html              ← Marketing site (this repo's dist/)
├── assets/
│   ├── index-xxx.css
│   └── index-xxx.js
├── .htaccess               ← SPA routing for marketing site
│
└── app/                    ← FIN dashboard (FIN repo's dist/)
    ├── index.html
    ├── assets/
    │   ├── index-yyy.css
    │   └── index-yyy.js
    └── .htaccess           ← SPA routing for FIN dashboard
```

#### FIN Vite Configuration

In the FIN project's `vite.config.ts`, set the base path:

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/app/',
});
```

#### FIN .htaccess (inside `/app/`)

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /app/
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /app/index.html [L]
</IfModule>
```

#### Marketing Site .htaccess (root -- updated)

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /

  # Don't rewrite requests to the /app/ subdirectory
  RewriteRule ^app(/|$) - [L]

  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

#### Linking from the Marketing Site

The "Access FIN" button in the Navbar (`src/components/layout/Navbar.tsx`) links to `/app/`:

```tsx
// In Navbar.tsx:
<Button href="/app/" variant="primary" size="sm">
  Access FIN
</Button>
```

#### Deployment Script

```bash
#!/bin/bash

# Build marketing site
cd /path/to/sthwalo-holdings
npm run build

# Build FIN dashboard
cd /path/to/fin-frontend
npm run build

# Upload to cPanel (via rsync, FTP, or cPanel File Manager)
# Marketing site → public_html/
rsync -avz --delete dist/ user@server:public_html/ --exclude='app/'

# FIN dashboard → public_html/app/
rsync -avz --delete dist/ user@server:public_html/app/
```

### Option B: Subdomain

Host the FIN dashboard at `fin.yourdomain.com`.

1. Create a subdomain in cPanel pointing to a separate directory (e.g., `fin.yourdomain.com/`)
2. Build FIN with `base: '/'` in Vite config
3. Upload FIN's `dist/` to the subdomain's document root
4. No `.htaccess` conflicts since they're separate document roots

#### Pros
- Clean separation of concerns
- Independent deployments
- No `.htaccess` routing conflicts

#### Cons
- Requires subdomain DNS setup
- Cross-origin considerations for shared auth cookies

### Option C: Separate Domain with Cross-Links

If FIN stays on a different domain entirely, just update the "Access FIN" CTA in Navbar to use an external URL:

```tsx
<Button href="https://fin.yourdomain.com" variant="primary" size="sm">
  Access FIN
</Button>
```

### Shared Dependencies

Both projects use overlapping technology. Here's a compatibility matrix:

| Dependency     | Marketing Site  | FIN Dashboard   | Compatible? |
|:---------------|:----------------|:----------------|:------------|
| React          | 18.3.1          | 19              | Yes (separate builds) |
| TypeScript     | 5.5             | 5.9             | Yes (separate builds) |
| Vite           | 7.3.1           | 6               | Yes (separate builds) |
| Tailwind CSS   | 3.4.1           | Check FIN       | Share color tokens |
| Axios          | Not used        | Used            | N/A         |
| React Router   | 7.13            | Check FIN       | Yes         |

Since both are **separate Vite builds**, version differences don't matter at runtime. They produce independent bundles.

#### Sharing the Brand Color System

To keep both UIs visually consistent, copy the color tokens from this project's `tailwind.config.js` into the FIN project's Tailwind config:

```javascript
// In FIN's tailwind.config.js, add to theme.extend.colors:
'deep-space': {
  50: '#e8edf1',
  100: '#c5cfd8',
  // ... (copy full ramps from this project)
  800: '#273440',
  900: '#1a242d',
  950: '#0f161c',
},
'warm-sand': { /* ... */ },
'harvest-gold': { /* ... */ },
'ember': { /* ... */ },
'oxblood': { /* ... */ },
```

### Authentication Handoff

When a user clicks "Access FIN" from the marketing site and arrives at the FIN dashboard:

1. **FIN handles its own auth** -- The Spring Boot backend manages JWT sessions
2. **No shared auth with the marketing site** -- The marketing site is public/static; the Express backend only handles contact form submissions
3. **Same-domain cookies** -- If using Option A (subdirectory), cookies set on `yourdomain.com` by the FIN backend are accessible at both `/` and `/app/`, making session persistence seamless

#### Recommended Flow

```
Marketing Site (/portfolio)
     │
     │  User clicks "Access FIN" or "Sign In"
     ▼
FIN Dashboard (/app/)
     │
     │  FIN checks for existing session (JWT in localStorage or cookie)
     │
     ├─ Session valid → Dashboard loads
     │
     └─ No session → FIN login page
          │
          │  User enters credentials
          ▼
     Spring Boot backend (AWS EC2)
          │
          │  Validates credentials against PostgreSQL (AWS RDS)
          │  Returns JWT token
          ▼
     FIN Dashboard stores token → Dashboard loads
```

### CORS Configuration

If the FIN frontend is hosted on the same domain as the marketing site (Option A), CORS is not an issue for requests to the Spring Boot backend on AWS -- the browser sees a different origin (your domain vs. the EC2 IP/domain), so CORS must still be configured on the backend.

In your Spring Boot application, ensure CORS allows your cPanel domain:

```java
@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
            .allowedOrigins(
                "https://yourdomain.com",
                "https://www.yourdomain.com",
                "http://localhost:5173"  // local dev
            )
            .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
            .allowedHeaders("*")
            .allowCredentials(true);
    }
}
```

---

## FIN Tech Stack Reference

For context when maintaining both projects side by side:

```
FIN Backend (Spring Boot 3.3.0 + Java 17)
├── 194+ Java source files
├── 25+ business services
├── 24 REST controllers
├── Flyway database migrations
├── HikariCP connection pooling
├── JWT authentication
└── 118+ unit tests

FIN Frontend (React 19 + TypeScript 5.9 + Vite 6)
├── 47 TypeScript/React files
├── Axios HTTP client
├── Context-based state management
└── Responsive dashboard UI

FIN Database (PostgreSQL 17 on AWS RDS)
├── 30+ tables with foreign keys
├── Full ACID compliance
├── 7,156+ transaction records
├── Automated daily backups
└── Point-in-time recovery

FIN Infrastructure
├── Docker Compose orchestration
├── AWS EC2 (backend)
├── AWS RDS (database)
├── Automated backup/restore
├── Cron job scheduling
├── Health monitoring
└── Comprehensive logging
```

---

## Deployment Architecture

```
                    ┌─────────────────────┐
                    │     Your Domain      │
                    │   (cPanel Hosting)   │
                    └────────┬────────────┘
                             │
                    ┌────────▼────────────┐
                    │    public_html/      │
                    │                      │
                    │  /  → Marketing Site │
                    │        (this repo)   │
                    │                      │
                    │  /app/ → FIN         │
                    │     Dashboard        │
                    │     (FIN frontend)   │
                    └────────┬────────────┘
                             │
                             │ HTTPS API calls
                             │
                    ┌────────▼────────────┐
                    │      AWS EC2         │
                    │                      │
                    │  Docker Compose      │
                    │  ├── Spring Boot     │
                    │  │   (port 8080)     │
                    │  └── Nginx/Caddy     │
                    │      (reverse proxy) │
                    └────────┬────────────┘
                             │
                    ┌────────▼────────────┐
                    │      AWS RDS         │
                    │   PostgreSQL 17      │
                    │   30+ tables         │
                    │   Daily backups      │
                    └─────────────────────┘
```

This architecture keeps frontend hosting costs low (cPanel) while maintaining the backend and database on AWS where they need to be for performance and reliability.

---

## Links

- **LinkedIn**: [linkedin.com/in/inyoni](https://www.linkedin.com/in/inyoni/)
- **GitHub**: [github.com/sthwalo](https://github.com/sthwalo)
- **X (Twitter)**: [x.com/nyoniimma](https://x.com/nyoniimma)

---

**Sthwalo Holdings** -- Building foundations with code.