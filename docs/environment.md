# Environment Variables

## Frontend

Create a `.env` file in the project root:

```env
VITE_API_URL=http://localhost:4000
```

This is used by `src/pages/Contact.tsx` to POST contact form submissions to the Express backend.

## Server

Create a `.env` file inside the `server/` directory (see `server/.env.example`):

```env
PORT=4000
FRONTEND_URL=http://localhost:5173

DB_HOST=localhost
DB_PORT=3306
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=sthwalo

SMTP_USER=noreply@yourdomain.com
NOTIFY_TO=hello@sthwalo.com
```