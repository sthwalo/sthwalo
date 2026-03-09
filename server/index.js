require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173' }));
app.use(express.json());

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
});

app.post('/contact', async (req, res) => {
  const { name, email, company, service, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'name, email and message are required' });
  }

  try {
    await pool.execute(
      'INSERT INTO contact_submissions (name, email, company, service, message) VALUES (?, ?, ?, ?, ?)',
      [name, email, company || null, service || null, message]
    );
    res.status(201).json({ success: true });
  } catch (err) {
    console.error('DB error:', err);
    res.status(500).json({ error: 'Failed to save submission' });
  }
});

app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
