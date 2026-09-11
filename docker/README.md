# Production-parity harness

Runs the site and API locally in the shape cPanel runs them, so that "it works
here" is evidence about production rather than a hope.

| | Production (cPanel) | This harness |
| --- | --- | --- |
| Node | 19.9.0 under Passenger | `node:19.9.0-bullseye-slim` |
| Config source | cPanel **Environment variables** panel | compose `environment:` — **no `.env` mounted** |
| Web server | Apache + `.htaccess` | `httpd:2.4` + the **same** `.htaccess`, shipped in `dist/` |
| API mount | `sthwalo.com/api` | `https://localhost:8443/api`, same origin |
| TLS | real cert | self-signed (`docker/certs/`, gitignored) |
| Database | cPanel MySQL/MariaDB | `${DB_IMAGE}` — **pin this to match** |

## Pin the database first

Nothing else is meaningful until the engine matches. phpMyAdmin's home page
prints **Server type** and **Server version**. Compare with:

```bash
docker compose exec -T db sh -lc 'mysql -uroot -pparity-root -N -B -e "SELECT VERSION();"'
```

Default is `mariadb:10.6`. Override in `docker/.env` if production differs:

```
DB_IMAGE=mysql:8.0
```

This is not cosmetic. On **MariaDB** the `JSON` column is an alias for
`LONGTEXT`, so mysql2 returns `blocks` as a **string** and the `JSON.parse`
branch in `server/posts.js:53` is the live path. On **MySQL 8** the type is
native and mysql2 returns a parsed object, leaving that branch dead. Testing the
wrong engine exercises the wrong code.

Changing `DB_IMAGE` needs a fresh volume: `docker compose down -v`.

## Run

```bash
npm run build                     # dist/ carries its own .htaccess
docker compose up -d --build
docker compose exec -T api node seed-posts.js
docker compose exec -it api node create-admin.js it@sthwalo.com
```

`create-admin.js` prompts with hidden input and **needs a real TTY** — hence
`-it`. It cannot be driven by piping a password in; the second prompt never
returns. The same applies in cPanel Terminal.

- Site: <https://localhost:8443> (accept the self-signed warning)
- API direct, bypassing Apache: <http://localhost:4000>
- Plain HTTP: <http://localhost:8081> — note the session cookie is `Secure`, so
  **admin login only works over 8443**
- MySQL from the host: `127.0.0.1:13306`

Port 8080 is deliberately avoided; `fin-app-local` already publishes it.

## Verify

```bash
node ../.claude/skills/run-sthwalo-site/driver.mjs smoke --base https://localhost:8443 --insecure
```

`--insecure` exists only for this harness's self-signed cert; it is off by
default everywhere else.

The checks that earn their keep:

| Check | Expected |
| --- | --- |
| `curl -sk .../api/posts \| jq '.[0].blocks \| type'` | `array` — the engine's JSON path round-trips |
| `curl -sk -o /dev/null -w '%{http_code}' .../api/admin/posts` | `401` |
| Login `Set-Cookie` | contains `Secure` — proves `NODE_ENV=production` took effect |
| Draft created via admin API | absent from `/api/posts`, present in `/api/admin/posts`, `404` by slug |
| Editing a post | one `post_revisions` row holding the **previous** text |
| **Blog page article count** | **12** = live API. **14** = the API is dead and `useBlogPosts` is silently rendering the bundled `blogPosts.ts` |
| `POST /api/contact` | `201` even though `sendmail` is absent — the email error is caught |

That blog count is the one to remember. The site renders its writing from the
bundle when the API is unreachable, so a page that looks perfect proves nothing
on its own.

## Deliberately not reproduced

- **Passenger itself.** `mod_proxy` reproduces the routing and the mount point,
  which is all the app can observe. To check the mount is not load-bearing,
  drop the trailing `/api` from both `ProxyPass` lines in
  `httpd/sthwalo.conf` and re-run — everything still passes, because the routes
  are registered at both `/posts` and `/api/posts`.
- **Mail delivery.** The transport is `sendmail` at `/usr/sbin/sendmail`, absent
  from the slim image, so the send fails with `ENOENT`, is caught at
  `server/index.js:71`, and the endpoint still returns 201 with the row saved —
  the same behaviour production has if sendmail breaks. A `mailpit` container
  would need the transport switched to SMTP first.
- **Production data.** The seed is the 12 posts in `server/seed-posts.json`.

## Reset

```bash
docker compose down -v      # -v drops the database volume
```
