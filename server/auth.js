// Session auth for the blog admin.
//
// The API had none: one public endpoint, no users, nothing to protect. Writing
// posts through a browser changes that, so this is the whole of it — a login
// that compares a bcrypt hash, a signed httpOnly cookie, and a guard.
//
// Deliberately not JWT. There is one operator and one server; a signed cookie
// carrying a user id needs no key rotation story, no claim minimisation, and no
// way to be replayed after the secret changes.
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const { pool } = require('./db');

const COOKIE = 'sthwalo_admin';
const MAX_AGE_MS = 12 * 60 * 60 * 1000; // A working day; re-login is cheap.

function secret() {
  const value = process.env.ADMIN_SESSION_SECRET;
  if (!value || value.length < 32) {
    // Failing at startup is the point: a default or short secret would make
    // every session forgeable, and it would look like it was working.
    throw new Error('ADMIN_SESSION_SECRET must be set and at least 32 characters');
  }
  return value;
}

/** `<userId>.<expiresAt>.<hmac>` — signed, not encrypted; it carries no secret. */
function sign(userId) {
  const expiresAt = Date.now() + MAX_AGE_MS;
  const body = `${userId}.${expiresAt}`;
  const mac = crypto.createHmac('sha256', secret()).update(body).digest('hex');
  return `${body}.${mac}`;
}

function verify(token) {
  if (typeof token !== 'string') return null;
  const parts = token.split('.');
  if (parts.length !== 3) return null;
  const [userId, expiresAt, mac] = parts;
  const expected = crypto.createHmac('sha256', secret()).update(`${userId}.${expiresAt}`).digest('hex');
  // timingSafeEqual throws on length mismatch, so compare lengths first.
  const a = Buffer.from(mac, 'utf8');
  const b = Buffer.from(expected, 'utf8');
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
  if (Number(expiresAt) < Date.now()) return null;
  return Number(userId);
}

function readCookie(req, name) {
  const header = req.headers.cookie;
  if (!header) return null;
  for (const part of header.split(';')) {
    const [k, ...v] = part.trim().split('=');
    if (k === name) return decodeURIComponent(v.join('='));
  }
  return null;
}

function setSessionCookie(res, userId) {
  const secure = process.env.NODE_ENV === 'production';
  res.setHeader('Set-Cookie', [
    `${COOKIE}=${sign(userId)}`,
    'Path=/',
    'HttpOnly',
    'SameSite=Strict',
    secure ? 'Secure' : '',
    `Max-Age=${Math.floor(MAX_AGE_MS / 1000)}`,
  ].filter(Boolean).join('; '));
}

function clearSessionCookie(res) {
  res.setHeader('Set-Cookie', `${COOKIE}=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0`);
}

/** Refuses anything without a valid session. Applied to every admin write. */
function requireAdmin(req, res, next) {
  const userId = verify(readCookie(req, COOKIE));
  if (!userId) {
    return res.status(401).json({ error: 'Not signed in' });
  }
  req.adminUserId = userId;
  next();
}

async function login(req, res) {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }
  const [rows] = await pool.query(
    'SELECT id, password_hash FROM admin_users WHERE email = ? LIMIT 1', [email]);

  // Same answer whether the account is unknown or the password is wrong, and
  // the hash comparison runs either way — otherwise response timing tells an
  // attacker which addresses have accounts.
  const hash = rows[0]?.password_hash
    || '$2a$10$invalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidin';
  const ok = await bcrypt.compare(password, hash);

  if (!rows[0] || !ok) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }
  await pool.query('UPDATE admin_users SET last_login_at = NOW() WHERE id = ?', [rows[0].id]);
  setSessionCookie(res, rows[0].id);
  res.json({ email });
}

module.exports = { requireAdmin, login, setSessionCookie, clearSessionCookie, COOKIE };
