# FIN Integration

The FIN frontend (React 19 + TypeScript 5.9 + Vite 6) is a **separate build** from this marketing site. Both share the same core technologies (React, TypeScript, Vite, Tailwind) which makes integration straightforward.

## Option A: Same Domain (Subdirectory) -- Recommended

Host the FIN dashboard at `yourdomain.com/app/` alongside the marketing site at `yourdomain.com/`.

### Directory Structure on cPanel

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

### FIN Vite Configuration

In the FIN project's `vite.config.ts`, set the base path:

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/app/',
});
```

### FIN .htaccess (inside `/app/`)

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

### Marketing Site .htaccess (root -- updated)

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

### Linking from the Marketing Site

The "Access FIN" button in the Navbar (`src/components/layout/Navbar.tsx`) links to `/app/`:

```tsx
// In Navbar.tsx:
<Button href="/app/" variant="primary" size="sm">
  Access FIN
</Button>
```

### Deployment Script

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

## Option B: Subdomain

Host the FIN dashboard at `fin.yourdomain.com`.

1. Create a subdomain in cPanel pointing to a separate directory (e.g., `fin.yourdomain.com/`)
2. Build FIN with `base: '/'` in Vite config
3. Upload FIN's `dist/` to the subdomain's document root
4. No `.htaccess` conflicts since they're separate document roots

### Pros
- Clean separation of concerns
- Independent deployments
- No `.htaccess` routing conflicts

### Cons
- Requires subdomain DNS setup
- Cross-origin considerations for shared auth cookies

## Option C: Separate Domain with Cross-Links

If FIN stays on a different domain entirely, just update the "Access FIN" CTA in Navbar to use an external URL:

```tsx
<Button href="https://fin.yourdomain.com" variant="primary" size="sm">
  Access FIN
</Button>
```

## Shared Dependencies

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

## Authentication Handoff

When a user clicks "Access FIN" from the marketing site and arrives at the FIN dashboard:

1. **FIN handles its own auth** -- The Spring Boot backend manages JWT sessions
2. **No shared auth with the marketing site** -- The marketing site is public/static; the Express backend only handles contact form submissions
3. **Same-domain cookies** -- If using Option A (subdirectory), cookies set on `yourdomain.com` by the FIN backend are accessible at both `/` and `/app/`, making session persistence seamless

### Recommended Flow

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

## CORS Configuration

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