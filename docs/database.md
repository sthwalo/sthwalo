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