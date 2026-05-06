# Deployment Architecture

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

## Marketing Site Deployment

### Build Process

```bash
# Build the marketing site
npm run build

# The build output will be in the dist/ directory
# Upload the contents of dist/ to your cPanel public_html/ directory
```

### Pre-deployment Checklist

- [ ] Update Google Analytics Measurement ID in `src/utils/analytics.ts`
- [ ] Add blog content to `public/blog/posts/` and `public/blog/categories.json`
- [ ] Upload demo videos to `public/videos/` and thumbnails to `public/images/demo-thumbnails/`
- [ ] Update social media links in `src/components/layout/Footer.tsx`
- [ ] Configure contact form database and email settings in `server/`
- [ ] Test all routes: `/`, `/demo`, `/blog`, `/about`, `/contact`, `/portfolio`, `/services`
- [ ] Verify SEO metadata and Open Graph tags
- [ ] Test analytics tracking events
- [ ] Validate RSS feed generation
- [ ] Check responsive design across devices

### Environment Variables

Create environment files for different stages:

- `.env.local` - Local development
- `.env.production` - Production deployment

Required variables:
- `VITE_GA_MEASUREMENT_ID` - Google Analytics 4 Measurement ID
- Database credentials for contact form backend

### CDN and Performance

- Host videos on a CDN (Cloudflare, AWS CloudFront) for better performance
- Optimize images and implement lazy loading
- Enable gzip compression on your hosting provider
- Set up proper caching headers for static assets

### Monitoring

- Google Analytics 4 for user behavior and conversion tracking
- Set up alerts for contact form submissions
- Monitor server logs for API errors
- Track Core Web Vitals in Google Search Console