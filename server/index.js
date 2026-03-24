const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({ origin: process.env.FRONTEND_URL }));
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

const transporter = nodemailer.createTransport({
  sendmail: true,
  newline: 'unix',
  path: '/usr/sbin/sendmail',
});

app.post(['/contact', '/api/contact'], async (req, res) => {
  const { name, email, company, service, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'name, email and message are required' });
  }

  try {
    await pool.execute(
      'INSERT INTO contact_submissions (name, email, company, service, message) VALUES (?, ?, ?, ?, ?)',
      [name, email, company || null, service || null, message]
    );
  } catch (err) {
    console.error('DB error:', err.message);
    return res.status(500).json({ error: 'Failed to save submission' });
  }

  try {
    await transporter.sendMail({
      from: `"Sthwalo Holdings" <${process.env.SMTP_USER}>`,
      to: process.env.NOTIFY_TO,
      subject: `New enquiry from ${name}${company ? ` — ${company}` : ''}`,
      text: [
        `Name:    ${name}`,
        `Email:   ${email}`,
        `Company: ${company || '—'}`,
        `Service: ${service || '—'}`,
        ``,
        `Message:`,
        message,
      ].join('\n'),
      html: `
        <table style="font-family:sans-serif;font-size:14px;color:#273440;border-collapse:collapse;width:100%;max-width:560px">
          <tr><td style="padding:24px 0 8px"><h2 style="margin:0;color:#273440">New Contact Enquiry</h2></td></tr>
          <tr><td style="padding:4px 0"><strong>Name:</strong> ${name}</td></tr>
          <tr><td style="padding:4px 0"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></td></tr>
          <tr><td style="padding:4px 0"><strong>Company:</strong> ${company || '—'}</td></tr>
          <tr><td style="padding:4px 0"><strong>Service:</strong> ${service || '—'}</td></tr>
          <tr><td style="padding:16px 0 4px"><strong>Message:</strong></td></tr>
          <tr><td style="padding:8px 16px;background:#f5f0e8;border-left:3px solid #F2CF63;white-space:pre-wrap">${message}</td></tr>
        </table>
      `,
    });
  } catch (err) {
    console.error('Email error:', err.message);
  }

  res.status(201).json({ success: true });
});

app.listen(PORT, () => console.log(`API running on port ${PORT}`));
