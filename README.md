# Sthwalo Holdings

**Building foundations with code.**

The marketing site for Sthwalo Holdings — a South African software company founded by
[Immaculate Nyoni](https://www.linkedin.com/in/inyoni/) that blends accounting discipline with
full-stack engineering. The site is both the company presence and the entry point to **FIN**, our
financial management platform.

## FIN — Financial Management Platform

FIN is a company-scoped (multi-tenant) financial management platform for South African businesses
and finance teams. It runs the full accounting operating flow in one React + Spring Boot
application:

- **Accounting** — double-entry journals, chart of accounts, general ledger, cashbook, and
  fiscal-period management.
- **Bank statements** — statement import, automatic transaction classification, a reconciliation
  workbench, and a period-scoped source-document vault.
- **Invoices & documents** — customer and supplier invoices plus OCR / scanned-document workflows.
- **Payroll** — employees and payslips with PAYE / UIF / SDL on SARS tables, IRP5 / EMP501
  preparation, an effective-dated **salary-history audit**, **Time & Attendance** (clock events →
  daily summaries → approval → payroll), and **employer-defined earnings & deductions**.
- **Compliance & reporting** — VAT periods, assets and depreciation, budgets, and SARS-facing
  report preparation, exported as PDF / CSV / XLSX.
- **Commercial** — database-driven tenant plans, modular add-ons, metered usage, and
  integration-marketplace foundations.

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

## Links

- **LinkedIn**: [linkedin.com/in/inyoni](https://www.linkedin.com/in/inyoni/)
- **GitHub**: [github.com/sthwalo](https://github.com/sthwalo)
- **X (Twitter)**: [x.com/nyoniimma](https://x.com/nyoniimma)
- **Instagram**: [instagram.com/sthwalos](https://www.instagram.com/sthwalos/)
- **Facebook**: [facebook.com/sthwalosenkosi](https://web.facebook.com/sthwalosenkosi/)

---

**Sthwalo Holdings** — Building foundations with code.
