# FIN Tech Stack Reference

For context when maintaining both projects side by side:

```
FIN Backend (Spring Boot 3.3.0 + Java 17)
├── 194+ Java source files
├── 25+ business services
├── 24 REST controllers
├── Flyway database migrations
├── HikariCP connection pooling
├── JWT authentication
└── 118+ unit tests

FIN Frontend (React 19 + TypeScript 5.9 + Vite 6)
├── 47 TypeScript/React files
├── Axios HTTP client
├── Context-based state management
└── Responsive dashboard UI

FIN Database (PostgreSQL 17 on AWS RDS)
├── 30+ tables with foreign keys
├── Full ACID compliance
├── 7,156+ transaction records
├── Automated daily backups
└── Point-in-time recovery

FIN Infrastructure
├── Docker Compose orchestration
├── AWS EC2 (backend)
├── AWS RDS (database)
├── Automated backup/restore
├── Cron job scheduling
├── Health monitoring
└── Comprehensive logging
```