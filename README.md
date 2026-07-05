# Sthwalo Holdings

**Building foundations with code.**

The marketing site for Sthwalo Holdings — a South African software company founded by
[Immaculate Nyoni](https://www.linkedin.com/in/inyoni/) that blends accounting discipline with
full-stack engineering. The site is both the company presence and the entry point to **FIN**, our
financial management platform.

## FIN — Financial Management Platform

FIN is a company-scoped (multi-tenant) financial management platform for South African businesses
and finance teams. It runs the full accounting operating flow in one React + Spring Boot
application. The workspace is organised into a grouped command sidebar:

- **Command** — *Business Overview* (portfolio metrics) and *Entity & Period Setup* (companies,
  fiscal periods, access).
- **Accounting Flow**
  - *Accounting Workbench* — the source-to-ledger pipeline: bank-statement / document import,
    automatic transaction classification, cashbook, bank reconciliation, general ledger, and a
    period-scoped source-document vault.
  - *Inventory Management* — items, multi-location stock with weighted-average / FIFO / standard
    costing, purchase-order → goods-receipt → invoice 3-way matching, sales documents, and
    customer / supplier ledgers (AR / AP) — wired into the same ledger and VAT engine.
  - *Tax & Compliance* — VAT periods, review, and submission working papers.
  - *Fixed Assets* — asset register, depreciation, and disposals.
  - *Budgets & Forecasts* — planning, targets, and variance.
  - *Reports & AFS* — financial statements, management packs, and SARS-facing working papers,
    exported as PDF / CSV / XLSX.
- **People** — *Payroll*: employees and payslips with PAYE / UIF / SDL on SARS tables, IRP5 /
  EMP501 preparation, an effective-dated **salary-history audit**, **Time & Attendance** (clock
  events → daily summaries → approval → payroll), and **employer-defined earnings & deductions**.
- **System** — *Account, Billing & Access*: database-driven tenant plans, modular add-ons, metered
  usage, users / permissions, and integration-marketplace foundations.

FIN performs the regulatory calculations and report generation internally. It is **not** wired to a
SARS / eFiling / bank-feed API — users export or print reports for manual submission. SARS,
consent-based bank feeds, CIPC and approved-partner integrations are roadmap items, not current
capabilities.

### Security & architecture

- **Multi-tenant isolation:** RBAC + per-company scoping + **PostgreSQL Row-Level Security
  (enforced in production)** as a database-level backstop.
- **Stack:** Java 17 · Spring Boot 3.5 · PostgreSQL 17 (Flyway migrations) · React 19 · TypeScript ·
  Vite. Deployed on AWS (EC2 + RDS + nginx) with GitHub Actions CI/CD.
- **Live:** [sthwalo.com/fin](https://sthwalo.com/fin) · API at `api.sthwalo.com`.

## This site

The marketing site is a Vite + React single-page app. Developer documentation lives in
[`docs/`](docs/):

- **[Getting Started](docs/getting-started.md)** — installation and development setup
- **[Project Structure](docs/project-structure.md)** — code organization and file layout
- **[Architecture](docs/architecture.md)** — site design and data flow
- **[FIN Integration](docs/fin-integration.md)** — how the marketing site links into the FIN dashboard
- **[Tech Stack](docs/tech-stack.md)** · **[Brand Colors](docs/brand-colors.md)** ·
  **[Pages](docs/pages.md)** · **[Environment](docs/environment.md)** ·
  **[Deployment](docs/deployment.md)**

## Demo assets

The hero and Blog walkthrough thumbnails are animated GIFs of the **current** FIN UI, rendered
from a reproducible generator (Playwright + sharp) whose mockup mirrors the live navigation,
pipeline stepper, and brand tokens. They live in [`public/images/`](public/images/):

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
| `budgets` *(in reporting.gif)* | Budgets & Forecasts | Budget-vs-actual variance |
| `reporting.gif` | Reports & AFS | Ledger → budgets → AFS + compliance pack |
| `payroll.gif` | Payroll | Pay run, Time & Attendance, EMP201 |
| `billing.gif` | Account, Billing & Access | Plans, add-ons, metered usage, and RBAC |

Regenerate after a UI change (the generator lives in the FIN repo so it can read the live UI):
`node scripts/build-fin-demo-gifs.mjs` (all) or `… <name>` (one). Keep this table and the Blog
`featuredImage` mappings in `src/data/blogPosts.ts` in step with the generated set.

## Links

- **LinkedIn**: [linkedin.com/in/inyoni](https://www.linkedin.com/in/inyoni/)
- **GitHub**: [github.com/sthwalo](https://github.com/sthwalo)
- **X (Twitter)**: [x.com/nyoniimma](https://x.com/nyoniimma)
- **Instagram**: [instagram.com/sthwalos](https://www.instagram.com/sthwalos/)
- **Facebook**: [facebook.com/sthwalosenkosi](https://web.facebook.com/sthwalosenkosi/)

---

**Sthwalo Holdings** — Building foundations with code.
