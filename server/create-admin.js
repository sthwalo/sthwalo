// Creates or updates the one admin account, prompting for the password.
//
// Deliberately not part of the seed and deliberately interactive: a password in
// a seed file is a password in git, and a default one is a password everybody
// knows. This way the credential exists only in the database, as a bcrypt hash.
//
//   node create-admin.js you@example.com
require('dotenv').config();
const readline = require('readline');
const bcrypt = require('bcryptjs');
const { pool } = require('./db');

const email = process.argv[2];
if (!email || !email.includes('@')) {
  console.error('Usage: node create-admin.js <email>');
  process.exit(1);
}

/** Prompts without echoing, so the password never appears on screen. */
function askHidden(prompt) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: true });
    rl._writeToOutput = (str) => {
      rl.output.write(str.includes(prompt) ? prompt : '*');
    };
    rl.question(prompt, (answer) => {
      rl.close();
      process.stdout.write('\n');
      resolve(answer);
    });
  });
}

(async () => {
  const password = await askHidden('Password: ');
  if (password.length < 12) {
    console.error('Too short - use at least 12 characters.');
    process.exit(1);
  }
  const again = await askHidden('Confirm: ');
  if (password !== again) {
    console.error('Passwords did not match.');
    process.exit(1);
  }

  // Cost 12: a few hundred ms per attempt, which is nothing for one login a day
  // and a great deal for anyone working through a stolen hash.
  const hash = await bcrypt.hash(password, 12);
  await pool.query(
    `INSERT INTO admin_users (email, password_hash) VALUES (?, ?)
     ON DUPLICATE KEY UPDATE password_hash = VALUES(password_hash)`, [email, hash]);
  console.log(`Admin account ready for ${email}`);
  await pool.end();
})().catch((e) => { console.error('Failed:', e.message); process.exit(1); });
