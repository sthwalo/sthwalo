# Environment Variables

## Front end (build time)

Copy `.env.example` to `.env`:

```env
VITE_API_URL=/api
```

Relative on purpose: the API is same-origin under `/api` in every environment, so one bundle
works locally and in production. Read by `src/pages/Contact.tsx`, `src/utils/adminApi.ts` and
`src/hooks/useBlogPosts.ts`.

`VITE_GA_MEASUREMENT_ID` enables Google Analytics. Leave it unset until a consent banner exists.

## API (`server/`)

`server/.env.example` lists the variables. The running API on cPanel takes them from the Node
app's environment settings; the `.env` file is read only by the CLI scripts
(`seed-posts.js`, `create-admin.js`).

```env
PORT=4000
FRONTEND_URL=http://localhost:5173
DB_HOST=localhost
DB_PORT=3306
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=sthwalo
ADMIN_SESSION_SECRET=          # >= 32 characters, or every admin request fails
SMTP_USER=no-reply@sthwalo.com
NOTIFY_TO=you@example.com
```
