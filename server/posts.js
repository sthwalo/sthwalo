// Blog routes: two public reads, the rest behind the admin guard.
//
// The status filter lives in the SQL of the public reads, not in a branch the
// UI takes. A draft is therefore invisible because the query cannot return it,
// which is a property that survives someone later adding a new public endpoint
// and forgetting the UI convention.
const { pool } = require('./db');
const { requireAdmin } = require('./auth');

const BLOCK_TYPES = new Set(['paragraph', 'heading', 'list']);

/**
 * Rejects anything that is not the block shape the renderer understands.
 *
 * The editor only ever produces these three, but this is an HTTP API: what it
 * accepts is what it accepts, regardless of which client sent it. Validating
 * the shape here is also why no HTML sanitising is needed anywhere — no field
 * ever holds markup.
 */
function validateBlocks(blocks) {
  if (!Array.isArray(blocks) || blocks.length === 0) {
    return 'blocks must be a non-empty array';
  }
  for (const [i, b] of blocks.entries()) {
    if (!b || typeof b !== 'object' || !BLOCK_TYPES.has(b.type)) {
      return `block ${i}: type must be one of ${[...BLOCK_TYPES].join(', ')}`;
    }
    if (b.type === 'list') {
      if (!Array.isArray(b.items) || b.items.some((t) => typeof t !== 'string')) {
        return `block ${i}: list needs an items array of strings`;
      }
    } else if (typeof b.text !== 'string' || !b.text.trim()) {
      return `block ${i}: ${b.type} needs non-empty text`;
    }
  }
  return null;
}

/** The wire shape the site already expects, so the pages need no new mapping. */
function toApi(row) {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    category: row.category,
    audience: row.audience,
    author: row.author,
    featuredImage: row.featured_image,
    readTime: row.read_time,
    sourceLabel: row.source_label,
    sourceHref: row.source_href,
    // mysql2 parses JSON columns already; tolerate a string in case a driver or
    // column type changes underneath.
    blocks: typeof row.blocks === 'string' ? JSON.parse(row.blocks) : row.blocks,
    status: row.status,
    date: row.published_at,
    reviewedDate: row.reviewed_at,
  };
}

const COLUMNS = `id, slug, title, excerpt, category, audience, author, featured_image,
  read_time, source_label, source_href, blocks, status, published_at, reviewed_at`;

function register(app) {
  // ---- public ----------------------------------------------------------
  app.get(['/posts', '/api/posts'], async (_req, res) => {
    try {
      const [rows] = await pool.query(
        `SELECT ${COLUMNS} FROM posts WHERE status = 'published'
          ORDER BY published_at DESC, id DESC`);
      res.json(rows.map(toApi));
    } catch (e) {
      console.error('List posts failed:', e.message);
      res.status(500).json({ error: 'Could not load posts' });
    }
  });

  app.get(['/posts/:slug', '/api/posts/:slug'], async (req, res) => {
    try {
      const [rows] = await pool.query(
        `SELECT ${COLUMNS} FROM posts WHERE slug = ? AND status = 'published' LIMIT 1`,
        [req.params.slug]);
      if (!rows[0]) return res.status(404).json({ error: 'Not found' });
      res.json(toApi(rows[0]));
    } catch (e) {
      console.error('Get post failed:', e.message);
      res.status(500).json({ error: 'Could not load post' });
    }
  });

  // ---- admin -----------------------------------------------------------
  // Lists drafts too — that is the whole difference from the public read.
  app.get(['/admin/posts', '/api/admin/posts'], requireAdmin, async (_req, res) => {
    const [rows] = await pool.query(
      `SELECT ${COLUMNS} FROM posts ORDER BY COALESCE(published_at, created_at) DESC, id DESC`);
    res.json(rows.map(toApi));
  });

  app.get(['/admin/posts/:slug', '/api/admin/posts/:slug'], requireAdmin, async (req, res) => {
    const [rows] = await pool.query(
      `SELECT ${COLUMNS} FROM posts WHERE slug = ? LIMIT 1`, [req.params.slug]);
    if (!rows[0]) return res.status(404).json({ error: 'Not found' });
    res.json(toApi(rows[0]));
  });

  app.post(['/admin/posts', '/api/admin/posts'], requireAdmin, async (req, res) => {
    const p = req.body || {};
    const problem = validateBlocks(p.blocks);
    if (problem) return res.status(400).json({ error: problem });
    if (!p.slug || !p.title) return res.status(400).json({ error: 'slug and title are required' });

    try {
      const [result] = await pool.query(
        `INSERT INTO posts (slug, title, excerpt, category, audience, author, featured_image,
           read_time, source_label, source_href, blocks, status, published_at, reviewed_at)
         VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
        [p.slug, p.title, p.excerpt || '', p.category || '', p.audience || '', p.author || '',
         p.featuredImage || null, p.readTime || null, p.sourceLabel || null, p.sourceHref || null,
         JSON.stringify(p.blocks), p.status === 'published' ? 'published' : 'draft',
         p.status === 'published' ? (p.date || new Date()) : null, p.reviewedDate || null]);
      res.status(201).json({ id: result.insertId, slug: p.slug });
    } catch (e) {
      if (e.code === 'ER_DUP_ENTRY') return res.status(409).json({ error: 'That slug is already used' });
      console.error('Create post failed:', e.message);
      res.status(500).json({ error: 'Could not create post' });
    }
  });

  app.put(['/admin/posts/:slug', '/api/admin/posts/:slug'], requireAdmin, async (req, res) => {
    const p = req.body || {};
    const problem = validateBlocks(p.blocks);
    if (problem) return res.status(400).json({ error: problem });

    const conn = await pool.getConnection();
    try {
      await conn.beginTransaction();
      const [existing] = await conn.query(
        'SELECT id, title, blocks FROM posts WHERE slug = ? LIMIT 1 FOR UPDATE', [req.params.slug]);
      if (!existing[0]) {
        await conn.rollback();
        return res.status(404).json({ error: 'Not found' });
      }

      // The revision is written from the row as it stands, before the update,
      // and in the same transaction — so a save either records what it replaced
      // or does not happen at all.
      await conn.query(
        'INSERT INTO post_revisions (post_id, title, blocks, saved_by) VALUES (?,?,?,?)',
        [existing[0].id, existing[0].title,
         typeof existing[0].blocks === 'string' ? existing[0].blocks : JSON.stringify(existing[0].blocks),
         req.adminUserId]);

      const publishing = p.status === 'published';
      await conn.query(
        `UPDATE posts SET title=?, excerpt=?, category=?, audience=?, author=?, featured_image=?,
           read_time=?, source_label=?, source_href=?, blocks=?, status=?, reviewed_at=?,
           published_at = CASE WHEN ? AND published_at IS NULL THEN NOW() ELSE published_at END
         WHERE id = ?`,
        [p.title, p.excerpt || '', p.category || '', p.audience || '', p.author || '',
         p.featuredImage || null, p.readTime || null, p.sourceLabel || null, p.sourceHref || null,
         JSON.stringify(p.blocks), publishing ? 'published' : 'draft', p.reviewedDate || null,
         publishing, existing[0].id]);

      await conn.commit();
      res.json({ slug: req.params.slug });
    } catch (e) {
      await conn.rollback();
      console.error('Update post failed:', e.message);
      res.status(500).json({ error: 'Could not save post' });
    } finally {
      conn.release();
    }
  });

  app.get(['/admin/posts/:slug/revisions', '/api/admin/posts/:slug/revisions'], requireAdmin, async (req, res) => {
    const [rows] = await pool.query(
      `SELECT r.id, r.title, r.blocks, r.saved_at, u.email AS saved_by
         FROM post_revisions r
         JOIN posts p ON p.id = r.post_id
         LEFT JOIN admin_users u ON u.id = r.saved_by
        WHERE p.slug = ? ORDER BY r.saved_at DESC LIMIT 50`, [req.params.slug]);
    res.json(rows.map((r) => ({
      ...r, blocks: typeof r.blocks === 'string' ? JSON.parse(r.blocks) : r.blocks,
    })));
  });

  app.delete(['/admin/posts/:slug', '/api/admin/posts/:slug'], requireAdmin, async (req, res) => {
    const [result] = await pool.query('DELETE FROM posts WHERE slug = ?', [req.params.slug]);
    if (!result.affectedRows) return res.status(404).json({ error: 'Not found' });
    res.status(204).end();
  });
}

module.exports = { register, validateBlocks, toApi };
