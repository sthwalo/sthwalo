# Architecture Overview

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

## System Components

- **Static pages** (Home, About, Services, Contact) serve the marketing site
- **Contact form backend** runs on Express.js with MySQL for storing submissions and Nodemailer for email notifications
- **Portfolio page** acts as a portal/launchpad to the FIN app
- **FIN backend** lives on AWS EC2/RDS (Spring Boot + PostgreSQL)
- **FIN frontend** is a separate React 19 build, hosted alongside this site on cPanel