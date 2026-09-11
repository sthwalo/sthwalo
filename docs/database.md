# Database

## MySQL (Contact Form)

The `contact_submissions` table stores inquiries from the website contact form. Create it using `server/schema.sql`:

| Column       | Type              | Default             | Notes            |
|:-------------|:------------------|:--------------------|:-----------------|
| `id`         | INT UNSIGNED      | AUTO_INCREMENT      | Primary key      |
| `name`       | VARCHAR(255)      | --                  | Required         |
| `email`      | VARCHAR(255)      | --                  | Required         |
| `company`    | VARCHAR(255)      | `NULL`              | Optional         |
| `service`    | VARCHAR(255)      | `NULL`              | Optional         |
| `message`    | TEXT              | --                  | Required         |
| `created_at` | TIMESTAMP         | `CURRENT_TIMESTAMP` | Auto-generated   |

The Express backend at `server/index.js` handles `POST /contact` (and `/api/contact`) by inserting into MySQL and sending an email notification via Nodemailer.

## MySQL (Blog)

The blog moved out of `src/data/blogPosts.ts` — where publishing meant editing
TypeScript and running a deploy — into three tables, edited through `/admin`.

**One table, two doors.** The public reads (`GET /posts`, `GET /posts/:slug`) are
unauthenticated but pinned to `status = 'published'` in the SQL itself; the admin
routes require a session cookie and see everything. A draft is invisible because
the query cannot return it, not because the UI hides it.

### `posts`

| Column | Type | Notes |
|:---|:---|:---|
| `id` | INT UNSIGNED | Primary key |
| `slug` | VARCHAR(160) | Unique — the public URL |
| `title`, `excerpt` | VARCHAR / TEXT | |
| `category`, `audience` | VARCHAR(80) | The existing blog filters |
| `author` | VARCHAR(120) | |
| `featured_image`, `read_time` | VARCHAR | |
| `source_label`, `source_href` | VARCHAR | Provenance line on the post |
| `blocks` | JSON | `paragraph` \| `heading` \| `list` |
| `status` | ENUM | `draft` \| `published`, default `draft` |
| `published_at` | DATETIME | Set on first publish |
| `reviewed_at` | DATE | |
| `created_at`, `updated_at` | TIMESTAMP | `updated_at` auto-updates |

Indexed on `(status, published_at DESC)` — the shape of every public read.

`blocks` is JSON rather than its own table because a post is read whole, written
whole and never queried into. A `post_blocks` table would add a join and an
ordering column to answer a question nobody asks.

### `admin_users`

| Column | Type | Notes |
|:---|:---|:---|
| `id` | INT UNSIGNED | Primary key |
| `email` | VARCHAR(255) | Unique |
| `password_hash` | VARCHAR(255) | bcrypt, cost 12 |
| `last_login_at` | DATETIME | |
| `created_at` | TIMESTAMP | |

Created with `npm run admin:create you@example.com`, which prompts without echo.
There is deliberately no seeded account and no default password: a credential in
a seed file is a credential in git.

### `post_revisions`

| Column | Type | Notes |
|:---|:---|:---|
| `id` | INT UNSIGNED | Primary key |
| `post_id` | INT UNSIGNED | FK → `posts`, ON DELETE CASCADE |
| `title`, `blocks` | VARCHAR / JSON | The post as it was before the save |
| `saved_by` | INT UNSIGNED | FK → `admin_users`, ON DELETE SET NULL |
| `saved_at` | TIMESTAMP | |

Written inside the same transaction as the update, from the row as it stood
beforehand — so a save either records what it replaced or does not happen.

### Seeding

`npm run seed:generate` (site root) transpiles `src/data/blogPosts.ts` with
esbuild and writes `server/seed-posts.json`; `npm run seed` (in `server/`) loads
it, matching on slug so re-running is safe. `--refresh` also overwrites existing
rows. The TypeScript file remains the typed contract the site compiles against.

### Environment

`ADMIN_SESSION_SECRET` — at least 32 characters. The server refuses to start
without it, because a short or defaulted secret makes every session forgeable
while appearing to work.

## FIN Database (AWS RDS -- Separate)

The FIN app uses its own PostgreSQL 17 instance on AWS RDS with 30+ tables, Flyway migrations, and HikariCP connection pooling. That database is entirely independent of the marketing site's MySQL instance.

### FIN Database Reference

```
FIN Database (PostgreSQL 17 on AWS RDS)
├── 30+ tables with foreign keys
├── Full ACID compliance
├── 7,156+ transaction records
├── Automated daily backups
└── Point-in-time recovery
```