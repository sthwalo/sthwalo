// One pool, shared by the contact form and the blog routes.
//
// Previously the pool was created inline in index.js. Extracted so the blog
// modules can use the same connections rather than opening a second pool
// against the same database.
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
});

module.exports = { pool };
