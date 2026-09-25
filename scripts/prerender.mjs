/**
 * Renders the static pages to HTML after `vite build`.
 *
 * Why: this site served a 1.9 kB shell and zero words of body text to anything that does not run
 * JavaScript. The portfolio could not rank for its own author's name, and the links to aosfin.com
 * — that domain's first inbound links — lived only inside a JS bundle, where they are discovered
 * late and count for less.
 *
 * Browser-free on purpose: `renderToStaticMarkup`, no Playwright, no Chrome. The prerendered
 * pages fetch nothing, so a DOM would buy nothing and would put a browser download in the deploy
 * path of a site that deploys by uploading a folder to cPanel.
 *
 * Run by `npm run build`. Safe to run on its own against an existing dist/.
 */

import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { renderToStaticMarkup } from 'react-dom/server';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const ssrDir = path.join(root, '.prerender-ssr');
const SITE = process.env.PUBLIC_SITE_ORIGIN || 'https://sthwalo.com';

const fail = (message) => {
  console.error(`\n  prerender: ${message}\n`);
  process.exit(1);
};

if (!fs.existsSync(path.join(dist, 'index.html'))) {
  fail('dist/index.html is missing — run `vite build` first.');
}

console.log('prerender: building SSR bundle…');
const build = spawnSync(
  'npx',
  ['vite', 'build', '--ssr', 'src/prerender.tsx', '--outDir', '.prerender-ssr', '--logLevel', 'warn'],
  { cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] },
);
if (build.status !== 0) fail(`SSR build failed:\n${build.stderr || build.stdout}`);

const entry = path.join(ssrDir, 'prerender.js');
if (!fs.existsSync(entry)) fail(`SSR build produced no ${path.relative(root, entry)}`);

const { routes, renderRoute } = await import(pathToFileURL(entry).href);
if (!Array.isArray(routes) || routes.length === 0) fail('the SSR bundle exported no routes.');

// Asset links come from the real index.html, so hashed filenames can never drift from the build
// that produced them.
const shell = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
if (!/<div id="root">\s*<\/div>/.test(shell)) {
  fail('dist/index.html has no empty <div id="root"></div> to render into.');
}

const escapeAttr = (v) =>
  v.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const headFor = ({ path: urlPath, title, description }) => {
  const canonical = `${SITE}${urlPath === '/' ? '/' : urlPath}`;
  const d = escapeAttr(description);
  return [
    `<meta name="description" content="${d}" />`,
    `<link rel="canonical" href="${canonical}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="Sthwalo Holdings" />`,
    `<meta property="og:title" content="${escapeAttr(title)}" />`,
    `<meta property="og:description" content="${d}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
  ].map((t) => `    ${t}`).join('\n');
};

let written = 0;
for (const route of routes) {
  const markup = renderToStaticMarkup(renderRoute(route.path));
  if (!markup || markup.length < 500) {
    fail(`${route.path} rendered ${markup.length} characters — that is not a page.`);
  }

  const html = shell
    .replace(/<title>[^<]*<\/title>/, `<title>${escapeAttr(route.title)}</title>`)
    // Replace the shell's own metadata rather than appending to it: two canonicals, the first
    // naming the wrong page, is worse than none.
    .replace(/^[ \t]*<meta name="description"[^>]*>\n?/gm, '')
    .replace(/^[ \t]*<link rel="canonical"[^>]*>\n?/gm, '')
    .replace(/^[ \t]*<meta property="og:[^"]*"[^>]*>\n?/gm, '')
    .replace(/^[ \t]*<meta name="twitter:[^"]*"[^>]*>\n?/gm, '')
    .replace('</head>', `${headFor(route)}\n  </head>`)
    .replace(/<div id="root">\s*<\/div>/, `<div id="root">${markup}</div>`);

  for (const [what, re] of [
    ['<title>', /<title>/g],
    ['canonical', /<link rel="canonical"/g],
    ['description', /<meta name="description"/g],
  ]) {
    const n = (html.match(re) ?? []).length;
    if (n !== 1) fail(`${route.file} has ${n} ${what} tags — expected exactly 1.`);
  }

  const target = path.join(dist, route.file);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, html);
  console.log(`prerender: ${route.path.padEnd(12)} → dist/${route.file} (${(html.length / 1024).toFixed(1)} kB)`);
  written += 1;
}

// Generated from the same table, so a page cannot be prerendered and left out of the sitemap.
// /blog is included though it is not prerendered: it is a real, linked page and Google renders
// JavaScript — it just should not be the only way in.
const today = new Date().toISOString().slice(0, 10);

// Image sitemap extension. The logo is referenced only from a <link> and from JSON-LD, so nothing
// discovers it by following links — this is what points Google at the image the site claims as its
// identity. /blog is listed though it is not prerendered: it is a real, linked page and Google
// renders JavaScript; it just should not be the only way in.
const logo = `${SITE}/sthwalo.png`;
const urls = [...routes.map((r) => r.path), '/blog'];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls.map((u) => `  <url>
    <loc>${SITE}${u}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u === '/' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${u === '/' ? '1.0' : '0.7'}</priority>
    <image:image>
      <image:loc>${logo}</image:loc>
      <image:title>Sthwalo Holdings</image:title>
    </image:image>
  </url>`).join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemap);

fs.rmSync(ssrDir, { recursive: true, force: true });
console.log(`prerender: ${written} pages + sitemap.xml written to dist/`);
