# Immaculate Nyoni

Backend engineer — Java, Spring Boot, PostgreSQL, AWS — and founder of Sthwalo Holdings
(Johannesburg). Software engineering since 2023, after twelve years in bookkeeping and tax as a
SARS-registered tax practitioner.

| Work | What it is | Stack |
|---|---|---|
| **[FIN](https://aosfin.com)** | Multi-tenant financial operations platform, in production | Java 17, Spring Boot 3.5, PostgreSQL 17 (row-level security), React 19, AWS, Terraform |
| **Career Lab** (private, in development) | Resume builder with interview practice, CV-claim drills and progress tracking | Java 17, Spring Boot |
| **Client work** | Live sites and systems for clients in healthcare, training and vehicle rental; a Laravel business directory and a construction-company site in progress | React + TypeScript; Laravel 12; PHP; Node.js/Express |

[sthwalo.com](https://sthwalo.com) · [LinkedIn](https://www.linkedin.com/in/inyoni/) · [aosfin.com](https://aosfin.com)

Most of my code lives in private repositories; this one is public.

---

# sthwalo.com — this repository

Portfolio, services, client work, and an engineering journal.

This site is written for two readers: a **recruiter** deciding whether the stack matches, and a
**prospective client** deciding whether to hire. It is not written for FIN's users — they have
their own site.

## The two properties

FIN used to be the subject of this site. It has its own domain now, so the split is clean:

| Property | Owns | Repo |
|---|---|---|
| **sthwalo.com** | This portfolio — profile, services, projects, blog | this repo |
| **aosfin.com** | The FIN product site **and** the application itself | the `acc` repo |

There is **no FIN application surface here**. Every FIN destination is an outbound link to
`aosfin.com`.

## FIN — the flagship case study

A multi-tenant financial operations platform, designed and shipped solo, in production.

**Architecture** — Java 17 · Spring Boot 3.5 · Gradle (Kotlin DSL) behind React 19 ·
TypeScript · Vite. PostgreSQL 17 with the schema Flyway-managed end to end. AWS EC2 + RDS in
`af-south-1` behind Cloudflare, nginx at the origin, deploys over SSM. OpenAPI-documented API.

**Isolation** — company-scoped throughout, Spring Security RBAC above and PostgreSQL row-level
security beneath it.

**Domain depth** — double-entry ledger with source-document traceability from upload to final
report; a document pipeline with OCR fallback and per-line account suggestion; payroll, VAT,
inventory, point of sale, assets, budgets and AFS generation.

**Engineering practice** — 236 versioned migrations. 426 backend test classes (JUnit 5 +
Mockito) against throwaway PostgreSQL Testcontainers, 2,200+ backend tests, 400+ Vitest tests on
the frontend. Checkstyle, PMD and SpotBugs gate the build. A CI-enforced design-system ratchet
that only moves down. Build-time prerendering of the public site for crawlability.

Every figure above is countable in the FIN repository. That is the point of printing them —
re-check them before republishing rather than letting them age.

**Where it stops.** FIN holds **no SARS, eFiling, or bank-feed connection**. It prepares returns
internally; users export or print and submit manually. The accounting core is
**jurisdiction-neutral** — the *completed* statutory layer is South African (SARS and CIPC report preparation,
Employment & Labour in progress). Describing it as "a South African product" understates the
core and overstates the coverage.

## This site

Vite + React + TypeScript with Tailwind CSS, deployed to **cPanel** (not the AWS path FIN uses).

```bash
npm install
npm run dev        # local dev server
npm run typecheck  # tsc --noEmit
npm run lint       # eslint
npm run build      # production build into dist/
```

Developer documentation lives in [`docs/`](docs/):

- **[Getting Started](docs/getting-started.md)** — installation and development setup
- **[Project Structure](docs/project-structure.md)** — code organization and file layout
- **[Architecture](docs/architecture.md)** — site design and data flow
- **[Tech Stack](docs/tech-stack.md)** · **[Brand Colors](docs/brand-colors.md)** ·
  **[Pages](docs/pages.md)** · **[Environment](docs/environment.md)** ·
  **[Deployment](docs/deployment.md)** · **[FIN](docs/fin-integration.md)**

## Links

- **LinkedIn**: [linkedin.com/in/inyoni](https://www.linkedin.com/in/inyoni/)
- **GitHub**: [github.com/sthwalo](https://github.com/sthwalo)
- **X (Twitter)**: [x.com/nyoniimma](https://x.com/nyoniimma)
- **Instagram**: [instagram.com/sthwalos](https://www.instagram.com/sthwalos/)
- **Facebook**: [facebook.com/sthwalosenkosi](https://web.facebook.com/sthwalosenkosi/)
- **FIN**: [aosfin.com](https://aosfin.com)

---

**Sthwalo Holdings** — Building foundations with code.
