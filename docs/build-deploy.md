# Build & Deploy

## Production Build

```bash
npm run build
```

This outputs optimized static files to `dist/`. The build includes:
- Minified JS bundle (~110 KB gzipped)
- Purged CSS (~6 KB gzipped)
- Hashed filenames for cache-busting

## Deploying to cPanel

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