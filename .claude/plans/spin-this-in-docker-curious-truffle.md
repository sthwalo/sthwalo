# Dockerised production parity harness

## Context

The blog has just moved into MySQL behind an admin UI, and it is about to be
deployed to cPanel. Production has a specific and slightly unusual shape:

- Config reaches the app through **cPanel's environment-variable panel**, not
  `server/.env` — `index.js` has never called `dotenv`.
- Node **19.9.0** under Phusion Passenger, mounted at the `/api` base URI.
- Apache with the repo's own `.htaccess` doing SPA fallback and `/api` passthrough.
- cPanel's MySQL/MariaDB, holding a `JSON` column.

Several behaviours are currently **assumed rather than verified**, and each one
fails silently rather than loudly:

| Assumption | Why it matters | How it fails |
| --- | --- | --- |
| `blocks` JSON round-trips | MariaDB's `JSON` is `LONGTEXT`, so mysql2 returns a **string**; MySQL 8 returns a parsed object. `posts.js:53` branches on this. | Wrong engine locally means the live branch is never exercised |
| Site and API are same-origin | `adminApi.ts:21` claims they are "different origins in production". They are not — both are `sthwalo.com`. With `SameSite=Strict` a genuinely cross-origin cookie would be **blocked outright**. | Admin writes 401 in production only |
| Passenger passes `/api` through unstripped | Routes are registered at both `/posts` and `/api/posts` to cover either case | Never noticed until the mount point changes |
| `Secure` cookie works | Set only when `NODE_ENV=production`; absent from the cPanel env panel | Cookie silently not stored |
| The blog page proves the API works | `useBlogPosts` **falls back to bundled `blogPosts.ts`** on API failure | Page renders fine against a dead API |

That last one is the trap: a naive smoke test passes even when nothing works.
The bundle carries **14** posts and the seed has **12**, so the count is a
reliable live-vs-fallback discriminator.

Goal: a local stack faithful enough that "it works here" is evidence about
production, not a hope.

## Step 0 — Pin to production first

Nothing else is meaningful until the engine is known. From phpMyAdmin's home
page (tab already open) read **Server type** and **Server version**:

```
Server type:    MariaDB        →  image: mariadb:10.6   (adjust to match)
Server version: 10.6.x-MariaDB
```

Record the exact value and pin the `db` image to it. If it is MariaDB, the
`JSON.parse` branch in `posts.js:53` is the live path, not defensive code.

## Files to add

```
compose.yml                     # three services
docker/api.Dockerfile           # node:19.9.0, deps built in-image
docker/httpd/sthwalo.conf       # rewrite + proxy + ssl vhost
docker/certs/                   # self-signed, generated, gitignored
.dockerignore                   # keep node_modules and dist out of build context
```

**`db`** — image pinned in Step 0. Mount `server/schema.sql` read-only at
`/docker-entrypoint-initdb.d/01-schema.sql`; both the MySQL and MariaDB images
run it on first boot, so the schema is exercised exactly as phpMyAdmin ran it.
`MYSQL_DATABASE`/`MYSQL_USER` set to the production names (`sthwaloc_sthwalo`)
so nothing is name-dependent. Healthcheck on `mysqladmin ping`.

**`api`** — built from `node:19.9.0-bullseye-slim` to match the server exactly.
Copy `server/` **without** `node_modules` and run `npm ci`, mirroring cPanel's
"Run NPM Install". Crucially, **do not mount `server/.env`** — supply every
variable through compose `environment:`, which is precisely how the cPanel panel
behaves. If the app boots this way, the dotenv gap is proven harmless.

**`web`** — `httpd:2.4`, serving built `dist/` as the document root with the
repo's real root `.htaccess` mounted alongside it. The vhost enables
`mod_rewrite`, `mod_proxy`, `mod_proxy_http`, `mod_ssl` and `AllowOverride All`
so the actual `.htaccess` is honoured rather than approximated. `ProxyPass /api`
→ `api:4000/api`. Ports `8443:443` and `8080:80`.

## Code changes

Two, both small.

**1. Make `VITE_API_URL` relative — `/api` instead of `https://sthwalo.com/api`.**

This is the change that actually delivers the stated goal. Today the built
bundle has the production origin compiled in, so the local bundle *cannot* talk
to a local API without being rebuilt differently — which means the thing tested
is never the thing shipped. All three consumers simply concatenate
(`Contact.tsx:63`, `adminApi.ts:5`, `useBlogPosts.ts:4`), and the API is
same-origin under `/api` in both environments, so `/api` resolves correctly in
each. One bundle, both places.

**2. Add an `--insecure` flag to `.claude/skills/run-sthwalo-site/driver.mjs`.**

Headless Chrome rejects the self-signed cert; the driver currently passes no
certificate flags. Add `--ignore-certificate-errors` gated behind an explicit
`--insecure` option, so cert checking is never disabled by default. Update the
skill's SKILL.md to document it.

## Verification

Reuse the existing harness rather than writing a new one — the driver already
takes `--base`.

```bash
docker compose up -d --build
docker compose exec api node seed-posts.js          # expect 12 inserted
docker compose exec -it api node create-admin.js it@sthwalo.com
```

| Check | Command | Expected |
| --- | --- | --- |
| Schema auto-ran | `docker compose exec db mysql -e 'show tables' …` | 4 tables |
| JSON round-trip | `curl -sk https://localhost:8443/api/posts \| jq '.[0].blocks \| type'` | `"array"` — proves the engine's JSON path |
| Draft invisible | create a draft via admin API | absent from `/api/posts`, present in `/api/admin/posts` |
| Guard | `curl -sk -o /dev/null -w '%{http_code}' …/api/admin/posts` | `401` |
| `Secure` cookie | `curl -ski -X POST …/api/admin/login \| grep -i set-cookie` | contains `Secure` |
| Same-origin cookie | browser login, then an admin write | succeeds — settles the `adminApi.ts:21` claim |
| **Live, not fallback** | blog page post count | **12** (live). `14` means the API is dead and the bundle is rendering |
| SPA fallback | `curl -sk https://localhost:8443/blog/why-i-built-fin` | app HTML, via the real `.htaccess` |
| Prefix ambiguity | flip `ProxyPass` to strip `/api`, re-run | still passes — proves the dual route registration earns its keep |
| Contact form | `POST /api/contact` | `201` **despite no sendmail** (the email error is caught at `index.js:71`), and a row lands in `contact_submissions` |
| Full site | `node .claude/skills/run-sthwalo-site/driver.mjs smoke --base https://localhost:8443 --insecure` | 14 routes OK |

## Out of scope

- **Reproducing Passenger itself.** Apache + `mod_proxy` reproduces the routing
  and the mount point, which is what the app can actually observe. Passenger's
  process management is not what we are testing.
- **Real mail delivery.** The transport is `sendmail` at `/usr/sbin/sendmail`,
  absent from the slim image. The failure is caught and the endpoint still
  returns 201 — which is also what happens if sendmail breaks in production, so
  it is worth seeing. A `mailpit` container could be added later if the email
  body itself ever needs checking.
- Changing anything about the deploy already documented in `server/DEPLOY.md`.
