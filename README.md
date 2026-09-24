# sthwalo.com

**Immaculate Nyoni — full-stack engineer.** Portfolio, services, client work, and an
engineering journal.

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
`aosfin.com`, and `/fin/*` 301s there with the path preserved (see `public/.htaccess`).

> **On deploy:** delete `public_html/fin/` on cPanel. While that directory exists with its own
> `.htaccess`, its per-directory rules can take precedence over the redirect that ships here.

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

**Engineering practice** — 200 versioned migrations. 355 backend test classes (JUnit 5 +
Mockito) against throwaway PostgreSQL Testcontainers, 2,000+ backend tests, 248 Vitest tests on
the frontend. Checkstyle, PMD and SpotBugs gate the build. A CI-enforced design-system ratchet
that only moves down. Build-time prerendering of the public site for crawlability.

Every figure above is countable in the FIN repository. That is the point of printing them —
re-check them before republishing rather than letting them age.

**Where it stops.** FIN holds **no SARS, eFiling, or bank-feed connection**. It prepares returns
internally; users export or print and submit manually. The accounting core is
**jurisdiction-neutral** — the *completed* statutory layer is South African (SARS and CIPC live,
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

## Demo assets

The project thumbnails are animated GIFs of the FIN UI, rendered from a reproducible generator
(Playwright + sharp) whose mockup mirrors the live navigation, pipeline stepper and brand tokens.
They live in [`public/images/`](public/images/):

| GIF | Module | Walkthrough |
|---|---|---|
| `grand-tour.gif` | *all modules* | Full FIN demo touring every module end to end |
| `pipeline.gif` | Accounting Workbench | The core flow: import → classify → ledger → inventory → Reports & AFS |
| `overview.gif` | Business Overview | Portfolio KPIs, companies, and payroll readiness |
| `setup.gif` | Entity & Period Setup | Companies, fiscal periods, RBAC, and Row-Level Security |
| `bank-to-ledger.gif` | Accounting Workbench | import → classify → cashbook → reconcile → ledger |
| `document-vault.gif` | Accounting Workbench | Document capture → OCR extraction → retained source-document vault |
| `inventory.gif` | Inventory Management | Stock on hand, PO → GRN → invoice 3-way match, and reports |
| `tax-compliance.gif` | Tax & Compliance | VAT period review (output vs input) → VAT201 working paper |
| `fixed-assets.gif` | Fixed Assets | Asset register + depreciation schedule posting to the ledger |
| `reporting.gif` | Reports & AFS | Ledger → budgets → AFS + compliance pack |
| `payroll.gif` | Payroll | Pay run, Time & Attendance, EMP201 |
| `billing.gif` | Account, Billing & Access | Plans, add-ons, metered usage, and RBAC |

The generator lives in the FIN repo, so it can read the live UI:
`node scripts/build-fin-demo-gifs.mjs` (all) or `… <name>` (one). Keep this table and the
`featuredImage` mappings in `src/data/blogPosts.ts` in step with the generated set.

## Links

- **LinkedIn**: [linkedin.com/in/inyoni](https://www.linkedin.com/in/inyoni/)
- **GitHub**: [github.com/sthwalo](https://github.com/sthwalo)
- **X (Twitter)**: [x.com/nyoniimma](https://x.com/nyoniimma)
- **Instagram**: [instagram.com/sthwalos](https://www.instagram.com/sthwalos/)
- **Facebook**: [facebook.com/sthwalosenkosi](https://web.facebook.com/sthwalosenkosi/)
- **FIN**: [aosfin.com](https://aosfin.com)

---

**Sthwalo Holdings** — Building foundations with code.
