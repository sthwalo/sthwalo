# Marketing site: close the drift, cut the noise, put the blog in a database

> Supersedes this file's previous contents (FIN performance work — shipped, PRs #388/#389).
> **Different repo:** everything here is in `/Users/sthwalo/sthwalo`, not `acc`.

## Context

The marketing site describes a version of FIN that no longer exists, and it front-loads so much
documentation that a visitor can read for an hour without ever signing up. Three changes follow
from that: correct the drift, remove the reading, and move the blog into a database so posts can be
written and edited through an admin UI instead of a TypeScript file and a deploy.

Verified against the live app rather than assumed. FIN's modules today are **Getting started,
Business Overview, Entity & Period Setup, Inventory Management, Accounting Workbench, Management
Accounts, Financial Statements, Compliance, Fixed Assets, Payroll, Budgets & Forecasts**
(`acc/frontend/src/App.tsx`). The site still says "Tax & Compliance" and "Reports & AFS" — the
first renamed, the second split in two — and **"Management Accounts" and "Financial Statements"
appear nowhere on the site at all**, nor does the onboarding.

Conveniently, that drift lives in only two files: `src/data/blogPosts.ts` and
`src/pages/Resources.tsx`. The second is being deleted; the first is the content moving into the
database. **Fixing the drift and migrating the blog are the same job**, done once, in the seed.

## What exists (reuse, don't rebuild)

- **`server/`** — Express 4 + `mysql2` + Nodemailer. One table (`contact_submissions`), one route
  (`POST /contact`), **and no authentication of any kind**. That is the gap the admin UI opens.
- **`src/data/blogPosts.ts`** — 14 posts, already structured as typed blocks
  (`paragraph` | `heading` | `list`). This is the content model; it does not change, it just moves.
- **`.claude/skills/run-sthwalo-site/driver.mjs`** — the only integration test there is. `smoke`
  drives all 14 routes headless and reports console errors, failed requests and blank sections.
  **There is no test runner and no `test` script.** Verification runs through this.
- **`docs/database.md`** documents the existing schema as a column table; the blog schema follows
  that format. `docs/pages.md` carries the route table that must lose `/resources`.

## The plan

### Phase 1 — Schema, seed and the admin API

`server/schema.sql` gains three tables, documented in `docs/database.md` in its existing style and
drawn as a diagram (`artifact-diagramming`) so the shape is reviewable before it is built:

- **`posts`** — id, slug (unique), title, excerpt, category, audience, author, featured_image,
  read_time, source_label, source_href, `blocks` JSON, status (`draft` | `published`),
  published_at, reviewed_at, created_at, updated_at.
- **`admin_users`** — id, email (unique), password_hash (bcrypt), created_at. One row: you.
- **`post_revisions`** — post_id, blocks JSON, saved_at. Editing prose through a browser without an
  undo is how a good post gets lost to a stray paste; a row per save is cheap.

`blocks` stays JSON rather than becoming rows. It is read whole, written whole and never queried
into — a `post_blocks` table would buy nothing and cost a join and an ordering column.

**Auth**: `POST /api/admin/login` verifies bcrypt and sets an httpOnly, SameSite=Strict, Secure
cookie; a guard middleware protects every `/api/admin/*` write. Public reads (`GET /api/posts`,
`GET /api/posts/:slug`) stay unauthenticated and serve `status = 'published'` only, so a draft is
invisible until you say so.

**Seed** carries the 14 existing posts **and the 7 Resources guides**, converted to posts — that is
where the resources content survives the page being deleted. The seed is written with the module
names corrected, which is the drift fix.

### Phase 2 — Admin UI

A new `/admin` route on the site: login, post list, and an editor over the block model — add,
reorder, delete blocks of the three existing kinds. No raw HTML is ever accepted, so there is no
sanitising problem to get wrong. Draft/publish toggle, and a preview that renders through the same
component the public post uses, so what you see is what ships.

### Phase 3 — Blog reads the API

`src/pages/Blog.tsx` and `BlogPost.tsx` fetch from the API instead of importing the static array.
`blogPosts.ts` stays as the typed contract and the seed source, then stops being imported by pages.
Keep the existing snapshot-fallback pattern used by `useTrustMetrics`: if the API is unreachable
the blog renders the last known posts rather than an empty page.

### Phase 4 — Remove Resources, repoint what pointed at it

Delete `src/pages/Resources.tsx`, the `/resources` route, `src/pages/Demo.tsx` (a bare redirect to
it), and the Navbar and Footer entries. **Twelve blog `sourceHref` values and nine in-site CTAs**
point there; each guide already names the post it maps to, so the destinations are known:

| was | becomes |
|---|---|
| `/resources#business-owners` | `/blog/why-i-built-fin` |
| `/resources#bookkeepers` | `/blog/practical-fin-workflow-for-bookkeepers` |
| `/resources#accountants` | `/blog/ledger-backed-reporting-for-accountants` |
| `/resources#trust-boundaries`, `#regulatory-reporting` | `/blog/what-fin-automates-and-what-remains-manual` |
| `/resources#value-proposition` | `/blog/why-i-built-fin` |
| site CTAs (AudienceSplit, FeaturedWork, Blog, BlogPost, Contact, Portfolio) | `/blog` |

### Phase 5 — Remove the hero tour

Drop the `grand-tour.gif` block from `src/components/home/Hero.tsx`. It also appeared on Resources,
so after both removals the hero is shorter and the FIN showcase in `FeaturedWork` (which uses its
own `pipeline.gif`) carries that job alone.

### Phase 6 — Drift in the docs

`docs/pages.md` loses the `/resources` row. `docs/marketing.md` and `docs/fin-integration.md` get
the module names corrected and the onboarding added. `docs/database.md` gains the blog tables.

## Decisions worth surfacing before implementation

- **Three GIFs and a PDF become unreferenced.** `grand-tour.gif` plus nine module tours, and
  `public/downloads/FIN_Public_Handbook.pdf` (312 kB, linked only from Resources). Deleting
  Resources orphans all of them. They are assets, not code — I will leave them in place and list
  them rather than delete them silently.
- **The handbook has nowhere to live** once Resources goes. Given FIN now ships in-app onboarding,
  dropping the public PDF may be the intent — but that is a content decision, not a code one.

## Verification

1. `npm run typecheck && npm run lint && npm run build` — all currently clean; keep them so.
2. `node .claude/skills/run-sthwalo-site/driver.mjs smoke` before and after. The route count drops
   from 14 to 12 (`/resources`, `/demo`); **every other route must still pass**, and the driver
   reports blank sections and console errors, which is exactly how a broken link surfaces.
3. `node $D links /` on each changed page — no remaining `/resources` or `/demo` href anywhere.
4. Seed into a local MySQL, then confirm the blog renders the same 14 posts plus 7 converted
   guides, and that `sourceHref` values resolve.
5. Admin: log in, edit a post, save, confirm the public page changes and a `post_revisions` row
   exists; log out and confirm `/api/admin/*` writes are refused.
6. Node ≥22 for the driver — a login shell here resolves v20.11.1, which has no global `WebSocket`.

## Still outstanding from earlier (not part of this)

The JWT rotation on FIN production. `scripts/prod/start-app.sh` now exports `JWT_SECRET_PREVIOUS`
(merged, PR #391) but **has not been deployed**, so the box still runs the old boot script. The
rotation cannot start until it is.
