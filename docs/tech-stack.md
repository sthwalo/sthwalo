# Tech Stack

# Tech Stack

## This Website (Marketing Site)

| Layer           | Technology                         |
|:----------------|:-----------------------------------|
| Framework       | React 18.3.1                       |
| Language        | TypeScript 5.5                     |
| Build Tool      | Vite 7.3.1                         |
| Styling         | Tailwind CSS 3.4.1                 |
| Routing         | React Router 7.13                  |
| Icons           | Lucide React 0.344                 |
| Analytics       | Google Analytics 4                 |
| SEO             | Dynamic meta tags, Open Graph      |
| Content         | Static blog system with RSS        |
| Backend         | Express 4 + Node.js (contact API)  |
| Database        | MySQL (contact form submissions)   |
| Email           | Nodemailer (sendmail transport)    |
| Font            | Inter (Google Fonts)               |
| Video Hosting   | Local MP4 files in public/videos/  |

## FIN Financial Management System

| Layer        | Technology                         |
|:-------------|:-----------------------------------|
| Backend      | Spring Boot 3.3.0 + Java 17       |
| Frontend     | React 19 + TypeScript 5.9 + Vite 6|
| Database     | PostgreSQL 17                      |
| Migrations   | Flyway                             |
| Connection   | HikariCP                           |
| HTTP Client  | Axios                              |
| State        | React Context                      |
| Infra        | Docker Compose, AWS EC2, AWS RDS   |

## Compatibility Notes

Both projects use overlapping technology stacks which makes integration straightforward. Since both are **separate Vite builds**, version differences don't matter at runtime - they produce independent bundles that can coexist on the same domain.