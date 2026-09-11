// Loads server/seed-posts.json into the posts table.
//
// Idempotent: a post is matched on slug and updated in place, so re-running
// after regenerating the seed refreshes the copy rather than failing on the
// unique key or creating duplicates.
//
//   node seed-posts.js            insert new, leave existing rows alone
//   node seed-posts.js --refresh  also overwrite posts that already exist
require('dotenv').config();
const { pool } = require('./db');
const rows = require('./seed-posts.json');

const refresh = process.argv.includes('--refresh');

(async () => {
  let inserted = 0, updated = 0, skipped = 0;
  for (const p of rows) {
    const [existing] = await pool.query('SELECT id FROM posts WHERE slug = ? LIMIT 1', [p.slug]);
    const values = [p.title, p.excerpt, p.category, p.audience, p.author, p.featured_image,
      p.read_time, p.source_label, p.source_href, JSON.stringify(p.blocks), p.status,
      p.published_at, p.reviewed_at];

    if (existing[0]) {
      if (!refresh) { skipped++; continue; }
      // Deliberately does NOT write a revision: a seed refresh is not an edit
      // someone made, and filling the history with it would bury the real ones.
      await pool.query(
        `UPDATE posts SET title=?, excerpt=?, category=?, audience=?, author=?, featured_image=?,
           read_time=?, source_label=?, source_href=?, blocks=?, status=?, published_at=?, reviewed_at=?
         WHERE id = ?`, [...values, existing[0].id]);
      updated++;
    } else {
      await pool.query(
        `INSERT INTO posts (title, excerpt, category, audience, author, featured_image,
           read_time, source_label, source_href, blocks, status, published_at, reviewed_at, slug)
         VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`, [...values, p.slug]);
      inserted++;
    }
  }
  console.log(`seed: ${inserted} inserted, ${updated} updated, ${skipped} left alone (${rows.length} in file)`);
  await pool.end();
})().catch((e) => { console.error('Seed failed:', e.message); process.exit(1); });
