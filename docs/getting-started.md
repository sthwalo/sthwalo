# Getting Started

## Prerequisites

- Node.js 18+
- npm 9+
- MySQL 8+ (for the contact form backend)
- Google Analytics 4 property (for analytics tracking)

## Install & Run

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

## Configuration

### Google Analytics Setup

1. Create a Google Analytics 4 property at [analytics.google.com](https://analytics.google.com)
2. Get your Measurement ID (format: G-XXXXXXXXXX)
3. Update the `GA_MEASUREMENT_ID` in `src/utils/analytics.ts`

### Blog Content Setup

1. Add blog posts to `public/blog/posts/` as JSON files
2. Include required fields: `title`, `slug`, `excerpt`, `content`, `author`, `date`, `category`, `tags`, `featuredImage`
3. Update `public/blog/categories.json` with your blog categories

### Demo Video Setup

1. Add demo walkthrough videos to `public/videos/`
2. Add thumbnail images to `public/images/demo-thumbnails/`
3. Update video URLs in `src/pages/Demo.tsx`

### Social Media Configuration

Update social media links in `src/components/layout/Footer.tsx`:
- LinkedIn: https://www.linkedin.com/in/inyoni/
- Twitter: https://x.com/nyoniimma
- YouTube: https://youtube.com/@sthwalo
- Instagram: https://www.instagram.com/sthwalos/
- Facebook: https://web.facebook.com/sthwalosenkosi/
- GitHub: https://github.com/sthwalo

### RSS Feed Configuration

The RSS feed is automatically generated from blog content. Update the feed metadata in `src/utils/rssFeed.ts` if needed.

### Database Setup (Contact Forms)

1. Create a MySQL database using the schema in `server/schema.sql`
2. Update database credentials in `server/index.js`
3. Configure email settings for contact form notifications