# Project Structure

```
sthwalo-holdings/
├── index.html                          # Entry HTML (Inter font, meta tags)
├── package.json                        # Dependencies and scripts
├── vite.config.ts                      # Vite configuration
├── tailwind.config.js                  # Brand colors, animations, fonts
├── tsconfig.app.json                   # TypeScript strict config
├── postcss.config.js                   # PostCSS + Autoprefixer
├── public/.htaccess                    # SPA routing for cPanel; Vite copies it
│                                       #   into dist/, so the build ships it
├── ANALYTICS_README.md                 # Google Analytics 4 setup guide
│
├── docs/                               # Documentation (organized)
│   ├── README.md                       # Documentation overview
│   ├── architecture.md                 # System design and data flow
│   ├── tech-stack.md                   # Technologies and dependencies
│   ├── project-structure.md            # Code organization and file layout
│   ├── brand-colors.md                 # Design system and color tokens
│   ├── pages.md                        # Route structure and page descriptions
│   ├── environment.md                  # Configuration and environment variables
│   ├── database.md                     # Data storage and schemas
│   ├── getting-started.md              # Installation and development setup
│   ├── fin-integration.md              # Connecting marketing site to FIN dashboard
│   ├── deployment.md                   # Hosting and infrastructure setup
│   └── ui/
│       └── button-spec.md              # Button variants, sizes and label rules
│
├── scripts/
│   └── generate-blog-seed.mjs          # src/data/blogPosts.ts -> server/seed-posts.json
│
├── server/
│   ├── index.js                        # Express API (contact form, public posts, admin routes)
│   ├── db.js                           # MySQL pool
│   ├── auth.js                         # Admin login, signed-cookie session, route guard
│   ├── posts.js                        # Post CRUD, block validation, revision on every save
│   ├── create-admin.js                 # Interactive one-off: create the admin user (bcrypt)
│   ├── seed-posts.js                   # Loads seed-posts.json into the posts table
│   ├── seed-posts.json                 # Generated seed — do not edit by hand
│   ├── schema.sql                      # MySQL tables: contact_submissions, posts,
│   │                                   #   admin_users, post_revisions
│   ├── DEPLOY.md                       # Server deployment notes
│   ├── package.json                    # Server deps (express, mysql2, nodemailer, bcrypt)
│   └── .env.example                    # Server environment variables template
│
├── src/
│   ├── main.tsx                        # React DOM entry point
│   ├── App.tsx                         # Router + layout shell
│   ├── index.css                       # Tailwind directives + custom utilities
│   ├── vite-env.d.ts                   # Vite type declarations
│   │
│   ├── hooks/
│   │   ├── useScrollAnimation.ts       # Intersection Observer for scroll FX
│   │   ├── useBlogPosts.ts             # Fetches posts from the API, static fallback
│   │
│   ├── data/
│   │   ├── clientProjects.ts           # Client work — the single source for both surfaces
│   │   ├── blogPosts.ts                # Typed post contract + seed source (pages read the API)
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx              # Sticky nav, mobile hamburger, "Start free" CTA
│   │   │   └── Footer.tsx              # Links, social (LinkedIn, GitHub, X, YouTube, Instagram, Facebook)
│   │   │
│   │   ├── home/
│   │   │   ├── Hero.tsx                # SaaS hero with FIN messaging and CTAs
│   │   │   ├── FeaturedWork.tsx        # FIN spotlight with tech badges
│   │   │   ├── SkillsBand.tsx          # Stack summary for a thirty-second skim
│   │   │   └── TrustSignals.tsx        # Delivered projects + CTA banner
│   │   │
│   │   ├── admin/
│   │   │   └── BlockEditor.tsx         # Add, edit, reorder and delete post blocks
│   │   │
│   │   ├── legal/
│   │   │   └── LegalPageLayout.tsx     # Shared layout for the five legal pages
│   │   │
│   │   └── ui/
│   │       ├── Analytics.tsx           # Google Analytics 4 integration
│   │       ├── AnimatedSection.tsx     # Scroll-triggered animation wrapper
│   │       ├── BlockContent.tsx        # Renders post blocks (public page and admin preview)
│   │       ├── Button.tsx              # Polymorphic button (link/button/anchor)
│   │       ├── ScrollToTop.tsx         # Reset scroll on route change
│   │       ├── SectionHeading.tsx      # Reusable section header (label + title + desc)
│   │       └── SeoMeta.tsx             # Dynamic SEO metadata component
│   │
│   ├── pages/
│   │   ├── Home.tsx                    # Hero + SkillsBand + FeaturedWork + TrustSignals
│   │   ├── About.tsx                   # Founder story, values, timeline
│   │   ├── Services.tsx                # 4 service categories + process section
│   │   ├── Portfolio.tsx               # FIN deep dive + delivered sites grid
│   │   ├── Contact.tsx                 # Form (Express API) + sidebar contact info
│   │   ├── Blog.tsx                    # Content hub with posts, categories, and social sharing
│   │   ├── BlogPost.tsx                # Individual blog post with SEO metadata and sharing
│   │   ├── Admin.tsx                   # Blog editor — sign in, write, preview, publish (noindex)
│   │   ├── Privacy.tsx                 # Privacy policy (legal page layout)
│   │   ├── Terms.tsx                   # Terms of use (legal page layout)
│   │   ├── Cookies.tsx                 # Cookie policy (legal page layout)
│   │   ├── Paia.tsx                    # PAIA manual (legal page layout)
│   │   └── Refunds.tsx                 # Refund and cancellation policy (legal page layout)
│   │
│   └── utils/
│       ├── adminApi.ts                 # Typed client for the /api/admin routes
│       ├── analytics.ts                # Google Analytics 4 event tracking utilities
│       ├── blogLoader.ts               # Blog data management and utilities
│       └── rssFeed.ts                  # RSS feed generation for content automation
│
├── public/
│   ├── sthwalo.png / sthwalo.webp      # Logo / favicon
│   ├── Immaculate Low.webp             # Founder photo
│   ├── videos/                         # Demo video storage directory
│   │   └── README.md                   # Video asset specifications
│   └── images/
│       ├── demo-thumbnails/            # Video thumbnail + blog images (WebP)
│       └── [other images...]
```

## Removed

`src/pages/Resources.tsx` and `src/pages/Demo.tsx` are gone, and with them
`public/downloads/` (the handbook PDF) and `public/resources/`. See `pages.md`
for why. Nine of the twelve module tour GIFs under `public/images/` are still used
by the blog posts. Three are now unreferenced — `grand-tour.gif` (dropped from the
hero), `setup.gif` and `fixed-assets.gif` (only Resources used them). They are kept
on disk rather than deleted, so a future post can pick them up.
