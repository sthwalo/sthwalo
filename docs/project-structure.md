# Project Structure

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
│   ├── build-deploy.md                 # Production builds and deployment
│   ├── fin-integration.md              # Connecting marketing site to FIN dashboard
│   ├── fin-tech-stack.md               # Reference for the FIN application
│   ├── deployment.md                   # Hosting and infrastructure setup
│   └── links.md                        # External resources and profiles
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
│   │   ├── useScrollAnimation.ts       # Intersection Observer for scroll FX
│   │   └── useTrustMetrics.ts          # Fetches live FIN trust-metrics, snapshot fallback
│   │
│   ├── data/
│   │   ├── blogPosts.ts                # Blog post content + categories (typed)
│   │   └── publicMetricsSnapshot.ts    # Reviewed trust-metrics fallback values
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx              # Sticky nav, mobile hamburger, "Access FIN" CTA
│   │   │   └── Footer.tsx              # Links, social (LinkedIn, GitHub, X, YouTube, Instagram, Facebook)
│   │   │
│   │   ├── home/
│   │   │   ├── Hero.tsx                # SaaS hero with FIN messaging and CTAs
│   │   │   ├── FeaturedWork.tsx         # FIN spotlight with tech badges
│   │   │   ├── HowFinWorks.tsx          # FIN workflow explainer section
│   │   │   ├── ServicesOverview.tsx     # 4-card service grid (now key features)
│   │   │   ├── TrustMetrics.tsx         # Live/snapshot FIN usage metrics
│   │   │   └── TrustSignals.tsx        # Delivered projects + CTA banner
│   │   │
│   │   ├── legal/
│   │   │   └── LegalPageLayout.tsx      # Shared layout for Privacy/Terms pages
│   │   │
│   │   └── ui/
│   │       ├── Analytics.tsx           # Google Analytics 4 integration
│   │       ├── AnimatedSection.tsx      # Scroll-triggered animation wrapper
│   │       ├── Button.tsx              # Polymorphic button (link/button/anchor)
│   │       ├── ScrollToTop.tsx          # Reset scroll on route change
│   │       ├── SectionHeading.tsx       # Reusable section header (label + title + desc)
│   │       └── SeoMeta.tsx              # Dynamic SEO metadata component
│   │
│   ├── pages/
│   │   ├── Home.tsx                    # Hero + FeaturedWork + Services + Trust
│   │   ├── About.tsx                   # Founder story, values, timeline
│   │   ├── Services.tsx                # 4 service categories + process section
│   │   ├── Portfolio.tsx               # FIN deep dive + delivered sites grid
│   │   ├── Contact.tsx                 # Form (Express API) + sidebar contact info
│   │   ├── Demo.tsx                    # FIN product walkthrough (8-step video sequence)
│   │   ├── Resources.tsx               # FIN manuals/guides, trust boundaries, handbook PDF
│   │   ├── Blog.tsx                    # Content hub with posts, categories, and social sharing
│   │   ├── BlogPost.tsx                # Individual blog post with SEO metadata and sharing
│   │   ├── Privacy.tsx                 # Privacy policy (legal page layout)
│   │   └── Terms.tsx                   # Terms of use (legal page layout)
│   │
│   └── utils/
│       ├── analytics.ts                # Google Analytics 4 event tracking utilities
│       ├── blogLoader.ts               # Blog data management and utilities
│       └── rssFeed.ts                  # RSS feed generation for content automation
│
├── public/
│   ├── sthwalo.png / sthwalo.webp      # Logo / favicon
│   ├── Immaculate Low.webp             # Founder photo
│   ├── downloads/                      # Public downloads (FIN_Public_Handbook.pdf)
│   ├── resources/                      # Resource assets
│   ├── videos/                         # Demo video storage directory
│   │   └── README.md                   # Video asset specifications
│   └── images/
│       ├── demo-thumbnails/            # Video thumbnail + blog images (WebP)
│       └── [other images...]
```