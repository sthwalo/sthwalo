# Deploying the API to cPanel

The API at `sthwalo.com/api` already runs the contact form. This adds the blog
routes to that same app — same process, same pool, same database.

- **App root:** `/home1/sthwaloc/nodeapi`
- **App URI:** `sthwalo.com/api`
- **Node:** 19.9.0, mode `production`
- Managed by cPanel → **Setup Node.js App** (Phusion Passenger)

## The one fact that will bite you

**`index.js` does not load `dotenv`.** It never has, in any commit. The running
API reads its configuration from the **process environment**, which on cPanel means
the **Environment variables** panel in Setup Node.js App — *not* from `server/.env`.

`.env` on the server is still needed, but only by the two CLI scripts
(`seed-posts.js`, `create-admin.js`), which *do* call `dotenv`.

So: **runtime config → cPanel panel. CLI scripts → `.env` file.** Both.

The consequence: if `ADMIN_SESSION_SECRET` is missing, the app still starts, still
shows green, and the contact form still works — and admin login returns
`500 {"error":"Could not sign in"}`. Nothing in the status display will tell you.

## 1. Upload

Upload to `/home1/sthwaloc/nodeapi`, overwriting:

```
index.js  db.js  auth.js  posts.js
create-admin.js  seed-posts.js  seed-posts.json
package.json  package-lock.json
.env                      # for the CLI scripts only
```

~108 KB total.

**Do not upload `node_modules`.** cPanel rebuilds it for the server's Node
version and architecture in step 3.

**Upload all files before restarting.** `index.js` now `require`s `./auth` and
`./posts`; if Passenger picks up the new `index.js` before those files land, the
whole API — contact form included — throws on boot.

## 2. Environment variables

Setup Node.js App → your app → **Environment variables**.

| Variable | Value | Status |
| --- | --- | --- |
| `ADMIN_SESSION_SECRET` | 32+ chars, e.g. `openssl rand -base64 48` | **NEW — add this** |
| `NODE_ENV` | `production` | verify — sets the `Secure` cookie flag |
| `FRONTEND_URL` | `https://sthwalo.com` | verify — CORS origin |
| `DB_HOST` `DB_PORT` `DB_USER` `DB_PASSWORD` `DB_NAME` | existing | already working |
| `SMTP_USER` `NOTIFY_TO` | existing | already working |

`ADMIN_SESSION_SECRET` shorter than 32 characters is rejected the same as a
missing one — that check is deliberate, so a weak secret can't quietly sign
forgeable sessions.

## 3. Install dependencies

Click **Run NPM Install** in the Node.js app panel.

This is mandatory, not optional: `bcryptjs` is a new dependency and is not in the
currently deployed `node_modules`. Without it the app throws
`Cannot find module 'bcryptjs'` on boot and takes the contact form down with it.

All dependencies are pure JavaScript (`bcryptjs`, not `bcrypt`), so nothing needs
a compiler.

## 4. Restart

**Restart** in the Node.js panel. Confirm the startup file is `index.js`.

## 5. Database

The schema is already imported (4 tables: `contact_submissions`, `posts`,
`admin_users`, `post_revisions`).

Two things remain, both needing a shell in the app root. Use cPanel → **Terminal**
if your plan has it; otherwise see "No terminal?" below.

```bash
cd /home1/sthwaloc/nodeapi
source /home1/sthwaloc/nodevenv/nodeapi/19/bin/activate   # path shown in the cPanel panel

node create-admin.js it@sthwalo.com     # prompts for a password, stores a bcrypt hash
node seed-posts.js                       # loads seed-posts.json (12 posts)
```

`seed-posts.js` matches on slug and is idempotent — re-running inserts only what's
missing. `--refresh` also overwrites posts that already exist, and deliberately
writes no revision row, so a seed refresh doesn't bury real edit history.

`create-admin.js` never takes a password as an argument — it prompts, so the
credential stays out of your shell history and out of git. It requires at least
12 characters, asks twice, and hashes with bcrypt cost 12.

The email is an identifier only. `it@sthwalo.com` is already `NOTIFY_TO` — the
address contact enquiries are sent *to* — but that is a destination, not an
account: nothing in this system holds a password for it. The admin password is
new, and should not be the mailbox password. The insert is
`ON DUPLICATE KEY UPDATE password_hash`, so re-running this for the same address
resets the password rather than erroring.

### No terminal?

Enable cPanel → **Remote MySQL**, add your current IP, then run both scripts from
your laptop against the production database:

```bash
cd server
DB_HOST=epyc.cybercircuit.co.za DB_USER=... DB_PASSWORD=... DB_NAME=... \
  node create-admin.js it@sthwalo.com
```

Remove the IP from Remote MySQL afterwards.

## 6. Front end

The site now fetches posts from the API, so it needs redeploying too:

```bash
npm run build          # .env already has VITE_API_URL=https://sthwalo.com/api
```

Upload the contents of `dist/` to `public_html/`.

## 7. Verify

```bash
# public read — 200 and a JSON array
curl -s https://sthwalo.com/api/posts | head -c 200

# a single post
curl -s https://sthwalo.com/api/posts/why-i-built-fin | head -c 200

# the guard — must be 401, not 200
curl -s -o /dev/null -w '%{http_code}\n' https://sthwalo.com/api/admin/posts

# login — 200 plus a Set-Cookie: sthwalo_admin=...
curl -i -s -X POST https://sthwalo.com/api/admin/login \
  -H 'Content-Type: application/json' \
  -d '{"email":"it@sthwalo.com","password":"..."}' | grep -i 'HTTP/\|set-cookie'

# the contact form still works
curl -s -o /dev/null -w '%{http_code}\n' -X POST https://sthwalo.com/api/contact \
  -H 'Content-Type: application/json' \
  -d '{"name":"Deploy check","email":"it@sthwalo.com","message":"ignore"}'
```

The 401 on `/api/admin/posts` is the check worth caring about: a draft is
invisible because the SQL pins `status = 'published'`, not because the UI hides
it. Publish a draft-only post and confirm it does **not** appear in
`/api/posts` before trusting the admin UI.

## Troubleshooting

| Symptom | Cause |
| --- | --- |
| Login → `500 {"error":"Could not sign in"}`, everything else fine | `ADMIN_SESSION_SECRET` missing or under 32 chars. It fails on first use, not at boot, so the app looks healthy. |
| Whole API 503 after upload | `npm install` not run (missing `bcryptjs`), or `index.js` uploaded without `auth.js`/`posts.js`. Check the Passenger log in the app root. |
| `/api/posts` → 500, contact form fine | Blog tables missing from *this* database — confirm `schema.sql` ran against `DB_NAME`, not a different one. |
| Login returns 200 but the next admin call is 401 | Cookie not stored. `Secure` is set when `NODE_ENV=production`, so the request must be HTTPS. The cookie is `SameSite=Strict`, so the admin UI must be on `sthwalo.com`, not a preview domain. |
| `/api/posts` 200 but the blog page is empty | Stale `dist/` — rebuild and re-upload the front end. |

## Notes

- Routes are registered at both `/posts` and `/api/posts`. That dual registration
  is deliberate: it works whether or not Passenger strips the `/api` base URI, so
  the mount point can change without breaking the front end.
- `post_revisions` rows are written on admin edits only, and survive the deletion
  of the account that wrote them (`ON DELETE SET NULL`).
