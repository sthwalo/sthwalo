// Turns src/data/blogPosts.ts into server/seed-posts.json.
//
// The TypeScript file stays the source of truth for the seed and for the Post
// type the site compiles against; the server, which is CommonJS and has no TS
// toolchain, gets a plain JSON copy. Transpiling with esbuild (already a Vite
// dependency) rather than parsing the file by hand means the seed cannot drift
// from what the site actually type-checks.
//
// Run: npm run seed:generate
import { build } from 'esbuild';
import { mkdtemp, readFile, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

const dir = await mkdtemp(join(tmpdir(), 'blog-seed-'));
const out = join(dir, 'posts.mjs');

await build({
  entryPoints: ['src/data/blogPosts.ts'],
  outfile: out,
  format: 'esm',
  platform: 'node',
  bundle: false,
  logLevel: 'silent',
});

const { blogPosts } = await import(pathToFileURL(out).href);
await rm(dir, { recursive: true, force: true });

const rows = blogPosts.map((p) => ({
  slug: p.slug,
  title: p.title,
  excerpt: p.excerpt,
  category: p.category,
  audience: p.audience,
  author: p.author,
  featured_image: p.featuredImage ?? null,
  read_time: p.readTime ?? null,
  source_label: p.sourceLabel ?? null,
  source_href: p.sourceHref ?? null,
  blocks: p.blocks,
  // Everything already on the live site is published by definition. Drafts are
  // something you create later, in the admin UI.
  status: 'published',
  published_at: p.date ?? null,
  reviewed_at: p.reviewedDate ?? null,
}));

const slugs = new Set(rows.map((r) => r.slug));
if (slugs.size !== rows.length) {
  // The slug is the public URL and the table's unique key, so a duplicate would
  // silently drop a post at seed time.
  throw new Error(`Duplicate slug in blogPosts.ts — ${rows.length} posts, ${slugs.size} unique slugs`);
}

const target = 'server/seed-posts.json';
await writeFile(target, JSON.stringify(rows, null, 2) + '\n');

const stale = JSON.stringify(rows).match(/Tax & Compliance|Reports & AFS/g);
if (stale) {
  // These modules were renamed and split in FIN. Catching them here keeps the
  // marketing copy from drifting back the next time a post is written.
  console.warn(`WARNING: ${stale.length} reference(s) to renamed FIN modules remain in the seed.`);
}

console.log(`${rows.length} posts -> ${target}`);
