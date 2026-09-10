#!/usr/bin/env node
/**
 * driver.mjs - zero-dependency browser driver for the Sthwalo Holdings site.
 *
 * Drives a real Chrome over the Chrome DevTools Protocol using Node 22's
 * built-in WebSocket. No npm install, no Playwright, nothing added to
 * package.json. Starts (and stops) the Vite server itself unless --base is
 * given.
 *
 * See SKILL.md for usage.
 */

import { spawn } from 'node:child_process';
import { mkdtempSync, mkdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createInterface } from 'node:readline';

const SKILL_DIR = dirname(fileURLToPath(import.meta.url));
const UNIT_DIR = resolve(SKILL_DIR, '../../..');

// Every route in src/App.tsx, plus one real blog post for the :slug branch.
const ROUTES = [
  '/', '/about', '/services', '/portfolio', '/contact', '/demo',
  '/resources', '/blog', '/privacy', '/terms', '/cookies', '/paia', '/refunds',
];

const CHROME_CANDIDATES = [
  join(process.env.HOME || '', 'Library/Caches/ms-playwright/chromium_headless_shell-1234/chrome-headless-shell-mac-arm64/chrome-headless-shell'),
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function log(...a) { console.log(...a); }
function warn(...a) { console.error(...a); }

// ---------------------------------------------------------------- CLI args

function parseArgs(argv) {
  const opts = {
    cmd: 'smoke', args: [], base: null, outDir: join(UNIT_DIR, '.artifacts'),
    dist: false, width: 1440, height: 900, stubApi: true, keepServer: false,
    settle: 400,
  };
  const rest = [];
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--base') opts.base = argv[++i];
    else if (a === '--out') opts.outDir = resolve(argv[++i]);
    else if (a === '--dist') opts.dist = true;
    else if (a === '--width') opts.width = Number(argv[++i]);
    else if (a === '--height') opts.height = Number(argv[++i]);
    else if (a === '--mobile') { opts.width = 390; opts.height = 844; }
    else if (a === '--no-stub-api') opts.stubApi = false;
    else if (a === '--settle') opts.settle = Number(argv[++i]);
    else if (a === '--help' || a === '-h') opts.cmd = 'help';
    else rest.push(a);
  }
  if (rest.length && opts.cmd !== 'help') { opts.cmd = rest[0]; opts.args = rest.slice(1); }
  return opts;
}

const HELP = `
driver.mjs - drive the Sthwalo Holdings site over CDP

  node .claude/skills/run-sthwalo-site/driver.mjs <command> [options]

Commands
  smoke                 Visit every route, screenshot each, fail on console/network errors
  shot <route>...       Screenshot one or more routes (default: /)
  contact               Fill + submit the contact form against a stubbed API, assert success
  eval <route> <js>     Evaluate JS on a route, print the JSON result
  text <route> [sel]    Print innerText of a selector (default: body), trimmed
  links <route>         List every in-app link href found on the route
  repl                  Interactive: open/ss/click/type/eval/text/errors/wait/quit
  routes                Print the route list this driver knows about

Options
  --base <url>     Drive an already-running server instead of starting one
  --dist           Serve the built dist/ via 'vite preview' instead of the dev server
  --out <dir>      Screenshot directory (default: <unit>/.artifacts)
  --mobile         390x844 viewport instead of 1440x900
  --width/--height Explicit viewport
  --no-stub-api    Let the contact form hit the REAL production API (don't)
  --settle <ms>    Extra wait after networkIdle (default 400)
`;

// ------------------------------------------------------------- Vite server

async function startServer(opts) {
  // Spawn vite's binary directly, NOT `npm run dev`: the npm wrapper survives
  // as an orphan (ppid 1) holding the port, even with a process-group kill.
  const viteBin = join(UNIT_DIR, 'node_modules/.bin/vite');
  if (!existsSync(viteBin)) throw new Error(`vite not installed - run 'npm install' in ${UNIT_DIR}`);
  const args = opts.dist
    ? ['preview', '--port', '4173', '--strictPort']
    : ['--port', '5273', '--strictPort'];

  const proc = spawn(viteBin, args, {
    cwd: UNIT_DIR, stdio: ['ignore', 'pipe', 'pipe'], detached: true,
    env: { ...process.env, FORCE_COLOR: '0', NO_COLOR: '1', BROWSER: 'none' },
  });

  // Vite colours its banner even through a pipe (FORCE_COLOR/NO_COLOR are both
  // ignored by its logger), so strip ANSI before matching the URL.
  const stripAnsi = (s) => s.replace(/\u001B\[[0-9;]*m/g, '');

  let buf = '';
  const url = await new Promise((res, rej) => {
    const timer = setTimeout(() => rej(new Error(`server did not start in 60s:\n${buf}`)), 60000);
    const onData = (d) => {
      buf += stripAnsi(d.toString());
      // Vite prints "  ➜  Local:   http://localhost:5273/"
      const m = buf.match(/Local:\s+(https?:\/\/\S+?)\/?\s/);
      if (m) { clearTimeout(timer); res(m[1]); }
    };
    proc.stdout.on('data', onData);
    proc.stderr.on('data', onData);
    proc.on('exit', (c) => { clearTimeout(timer); rej(new Error(`server exited (${c}):\n${buf}`)); });
  });

  log(`[server] ${opts.dist ? 'vite preview' : 'vite dev'} on ${url}`);
  return {
    url,
    stop: () => {
      for (const sig of ['SIGTERM', 'SIGKILL']) {
        try { process.kill(-proc.pid, sig); } catch { }
        try { proc.kill(sig); } catch { }
      }
    },
  };
}

// ------------------------------------------------------------------- CDP

function findChrome() {
  for (const p of CHROME_CANDIDATES) if (p && existsSync(p)) return p;
  throw new Error(
    'No Chrome found. Tried:\n  ' + CHROME_CANDIDATES.join('\n  ') +
    '\nInstall Google Chrome, or run: npx playwright install chromium'
  );
}

async function launchChrome(opts) {
  const bin = findChrome();
  const userDataDir = mkdtempSync(join(tmpdir(), 'sthwalo-cdp-'));
  const isShell = bin.includes('headless-shell');
  const args = [
    ...(isShell ? [] : ['--headless=new']),
    '--remote-debugging-port=0',
    `--user-data-dir=${userDataDir}`,
    `--window-size=${opts.width},${opts.height}`,
    '--no-first-run', '--no-default-browser-check', '--disable-gpu',
    '--hide-scrollbars', '--mute-audio', '--disable-dev-shm-usage',
    '--disable-background-timer-throttling', '--disable-renderer-backgrounding',
    'about:blank',
  ];
  // detached: Chrome forks gpu/network/renderer helpers; killing only the
  // parent pid leaves them running. Own process group => one group kill.
  const proc = spawn(bin, args, { stdio: ['ignore', 'pipe', 'pipe'], detached: true });

  const portFile = join(userDataDir, 'DevToolsActivePort');
  let raw = null;
  for (let i = 0; i < 200; i++) {
    if (existsSync(portFile)) {
      const c = readFileSync(portFile, 'utf8').trim().split('\n');
      if (c.length >= 2) { raw = c; break; }
    }
    await sleep(50);
  }
  if (!raw) { proc.kill(); throw new Error('Chrome never wrote DevToolsActivePort'); }

  log(`[chrome] ${bin.split('/').pop()} on port ${raw[0]}`);
  return {
    wsUrl: `ws://127.0.0.1:${raw[0]}${raw[1]}`,
    stop: () => { try { process.kill(-proc.pid, 'SIGKILL'); } catch { } try { proc.kill('SIGKILL'); } catch { } },
  };
}

class Cdp {
  constructor(ws) { this.ws = ws; this.id = 0; this.pending = new Map(); this.handlers = new Map(); }

  static async connect(wsUrl) {
    const ws = new WebSocket(wsUrl);
    await new Promise((res, rej) => { ws.onopen = res; ws.onerror = () => rej(new Error(`cannot connect ${wsUrl}`)); });
    const c = new Cdp(ws);
    ws.onmessage = (e) => c._onMessage(JSON.parse(e.data));
    return c;
  }

  _onMessage(msg) {
    if (msg.id != null) {
      const p = this.pending.get(msg.id);
      if (!p) return;
      this.pending.delete(msg.id);
      msg.error ? p.rej(new Error(`${msg.error.message}${msg.error.data ? ` - ${msg.error.data}` : ''}`)) : p.res(msg.result);
      return;
    }
    for (const h of this.handlers.get(msg.method) || []) h(msg.params, msg.sessionId);
  }

  on(method, fn) {
    if (!this.handlers.has(method)) this.handlers.set(method, []);
    this.handlers.get(method).push(fn);
  }

  send(method, params = {}, sessionId) {
    const id = ++this.id;
    const payload = { id, method, params };
    if (sessionId) payload.sessionId = sessionId;
    this.ws.send(JSON.stringify(payload));
    return new Promise((res, rej) => {
      this.pending.set(id, { res, rej });
      setTimeout(() => {
        if (this.pending.delete(id)) rej(new Error(`CDP timeout: ${method}`));
      }, 30000);
    });
  }

  close() { try { this.ws.close(); } catch { } }
}

// ------------------------------------------------------------------ Page

class Page {
  constructor(cdp, sessionId, opts) {
    this.cdp = cdp; this.sid = sessionId; this.opts = opts;
    this.errors = [];   // console errors + uncaught exceptions
    this.netFails = []; // failed / 4xx / 5xx requests
    this._lifecycle = new Set();
    this._urls = new Map(); // requestId -> url
  }

  static async create(cdp, opts) {
    const { targetId } = await cdp.send('Target.createTarget', { url: 'about:blank' });
    const { sessionId } = await cdp.send('Target.attachToTarget', { targetId, flatten: true });
    const p = new Page(cdp, sessionId, opts);

    cdp.on('Runtime.consoleAPICalled', (params, sid) => {
      if (sid !== sessionId || params.type !== 'error') return;
      p.errors.push('console.error: ' + params.args.map((a) => a.value ?? a.description ?? a.type).join(' '));
    });
    cdp.on('Runtime.exceptionThrown', (params, sid) => {
      if (sid !== sessionId) return;
      const d = params.exceptionDetails;
      p.errors.push('exception: ' + (d.exception?.description || d.text));
    });
    // loadingFailed carries no URL - remember it from requestWillBeSent.
    cdp.on('Network.requestWillBeSent', (params, sid) => {
      if (sid === sessionId) p._urls.set(params.requestId, params.request.url);
    });
    cdp.on('Network.loadingFailed', (params, sid) => {
      if (sid !== sessionId || params.canceled) return;
      p.netFails.push(`${params.type} failed (${params.errorText}): ${p._urls.get(params.requestId) || '?'}`);
    });
    cdp.on('Network.responseReceived', (params, sid) => {
      if (sid !== sessionId) return;
      if (params.response.status >= 400) p.netFails.push(`HTTP ${params.response.status} ${params.response.url}`);
    });
    cdp.on('Page.lifecycleEvent', (params, sid) => {
      if (sid === sessionId) p._lifecycle.add(params.name);
    });

    await p.send('Page.enable');
    await p.send('Runtime.enable');
    await p.send('Network.enable');
    await p.send('Page.setLifecycleEventsEnabled', { enabled: true });
    await p.send('Emulation.setDeviceMetricsOverride', {
      width: opts.width, height: opts.height, deviceScaleFactor: 1,
      mobile: opts.width < 500,
    });
    if (opts.stubApi) await p.stubContactApi();
    return p;
  }

  send(method, params) { return this.cdp.send(method, params, this.sid); }

  /**
   * The contact form POSTs to VITE_API_URL (https://sthwalo.com/api by
   * default) - a LIVE production endpoint that writes to a database and
   * emails a real person. Intercept it and answer 201 locally instead.
   */
  async stubContactApi() {
    this.stubbedRequests = [];
    await this.send('Fetch.enable', { patterns: [{ urlPattern: '*/contact', requestStage: 'Request' }] });
    this.cdp.on('Fetch.requestPaused', async (params, sid) => {
      if (sid !== this.sid) return;
      const { requestId, request } = params;
      const cors = [
        { name: 'Access-Control-Allow-Origin', value: '*' },
        { name: 'Access-Control-Allow-Methods', value: 'POST, OPTIONS' },
        { name: 'Access-Control-Allow-Headers', value: 'Content-Type' },
      ];
      // The POST is cross-origin with Content-Type: application/json, so the
      // browser sends a CORS preflight FIRST. Letting that OPTIONS through to
      // the real host fails, and the POST is then never sent at all - the
      // form just lands in its error state. Answer the preflight locally.
      if (request.method === 'OPTIONS') {
        await this.send('Fetch.fulfillRequest', { requestId, responseCode: 204, responseHeaders: cors });
      } else if (request.method === 'POST') {
        this.stubbedRequests.push({ url: request.url, body: request.postData });
        await this.send('Fetch.fulfillRequest', {
          requestId, responseCode: 201,
          responseHeaders: [{ name: 'Content-Type', value: 'application/json' }, ...cors],
          body: Buffer.from(JSON.stringify({ success: true, stubbed: true })).toString('base64'),
        });
      } else {
        await this.send('Fetch.continueRequest', { requestId });
      }
    });
  }

  clearErrors() { this.errors = []; this.netFails = []; }

  async goto(url) {
    this._lifecycle.clear();
    await this.send('Page.navigate', { url });
    for (let i = 0; i < 300; i++) {
      if (this._lifecycle.has('networkIdle')) break;
      await sleep(50);
    }
    await sleep(this.opts.settle);
  }

  async eval(expr) {
    const r = await this.send('Runtime.evaluate', {
      expression: expr, returnByValue: true, awaitPromise: true, userGesture: true,
    });
    if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description || r.exceptionDetails.text);
    return r.result.value;
  }

  async box(selector) {
    const b = await this.eval(`(() => {
      const el = document.querySelector(${JSON.stringify(selector)});
      if (!el) return null;
      el.scrollIntoView({ block: 'center', behavior: 'instant' });
      const r = el.getBoundingClientRect();
      return { x: r.x + r.width / 2, y: r.y + r.height / 2, w: r.width, h: r.height };
    })()`);
    return b;
  }

  async waitFor(selector, timeoutMs = 10000) {
    const t0 = Date.now();
    while (Date.now() - t0 < timeoutMs) {
      if (await this.eval(`!!document.querySelector(${JSON.stringify(selector)})`)) return true;
      await sleep(100);
    }
    throw new Error(`timeout waiting for ${selector}`);
  }

  /** Real mouse click at the element's centre - exercises React handlers. */
  async click(selector) {
    await this.waitFor(selector);
    await sleep(150); // let scrollIntoView + scroll animations settle
    const b = await this.box(selector);
    if (!b) throw new Error(`no element: ${selector}`);
    for (const type of ['mousePressed', 'mouseReleased']) {
      await this.send('Input.dispatchMouseEvent', {
        type, x: b.x, y: b.y, button: 'left', clickCount: 1, buttons: type === 'mousePressed' ? 1 : 0,
      });
    }
    await sleep(200);
  }

  async type(selector, text) {
    await this.click(selector);
    await this.send('Input.insertText', { text });
    // React's onChange listens to the native input event; insertText fires it.
    await sleep(80);
  }

  async text(selector = 'body') {
    return this.eval(`(document.querySelector(${JSON.stringify(selector)})||{}).innerText || ''`);
  }

  /**
   * <AnimatedSection> renders `opacity-0` until its IntersectionObserver
   * fires. captureBeyondViewport paints the whole page WITHOUT scrolling, so
   * every below-the-fold section screenshots as a blank band. Scroll through
   * the page first to trip the observers, then return to the top.
   * Animations are 0.6s ease-out forwards (tailwind.config.js).
   */
  async reveal() {
    const step = Math.round(this.opts.height * 0.8);
    let y = 0;
    for (let i = 0; i < 100; i++) {
      const h = await this.eval('document.body.scrollHeight');
      if (y >= h) break;
      await this.eval(`window.scrollTo(0, ${y})`);
      await sleep(120);
      y += step;
    }
    await this.eval('window.scrollTo(0, 0)');
    await sleep(700); // let the final 0.6s reveal animation finish
  }

  /**
   * Count large blocks still invisible - i.e. reveal() missed a section.
   * Do NOT just count '.opacity-0': the Footer uses that class on 7 tiny
   * hover-reveal arrow icons (group-hover:opacity-100) on EVERY page, so a
   * class count reports 7 false positives everywhere. Measure computed
   * opacity on elements big enough to be a content band instead.
   */
  hiddenCount() {
    // The text requirement also skips Home's decorative 'opacity-[0.03]'
    // background texture, which is meant to be nearly invisible.
    return this.eval(`[...document.querySelectorAll('main *')].filter(el => {
      const r = el.getBoundingClientRect();
      if (r.height < 150 || r.width < 300) return false;
      if ((el.innerText || '').trim().length < 20) return false;
      return parseFloat(getComputedStyle(el).opacity) < 0.1;
    }).length`);
  }

  async screenshot(file, { reveal = true } = {}) {
    if (reveal) await this.reveal();
    const { cssContentSize } = await this.send('Page.getLayoutMetrics');
    const height = Math.min(Math.ceil(cssContentSize.height), 12000);
    const width = Math.ceil(cssContentSize.width);
    const { data } = await this.send('Page.captureScreenshot', {
      format: 'png', captureBeyondViewport: true,
      clip: { x: 0, y: 0, width, height, scale: 1 },
    });
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, Buffer.from(data, 'base64'));
    return { file, width, height };
  }
}

// -------------------------------------------------------------- Commands

const slug = (route) => (route === '/' ? 'home' : route.replace(/^\//, '').replace(/\//g, '-'));

async function cmdSmoke(page, base, opts) {
  // Grab a real blog slug so the /blog/:slug route gets exercised too.
  const routes = [...ROUTES];
  await page.goto(base + '/blog');
  const postHref = await page.eval(
    `(document.querySelector('a[href^="/blog/"]')||{}).getAttribute?.('href') || null`
  );
  if (postHref) routes.push(postHref);
  else warn('[warn] no blog post link found - skipping /blog/:slug');

  let failed = 0;
  for (const route of routes) {
    page.clearErrors();
    await page.goto(base + route);
    const title = await page.eval('document.title');
    const bodyLen = (await page.text('main')).trim().length;
    const shot = await page.screenshot(join(opts.outDir, `${slug(route)}.png`));
    const hidden = await page.hiddenCount();

    // Requests to third-party hosts (api.sthwalo.com trust metrics, Google
    // Fonts, GA) fail by design when offline / CORS-blocked; the app degrades
    // gracefully. Report them, don't fail on them.
    const isExternal = (f) => /https?:\/\/(?!localhost|127\.0\.0\.1)/.test(f);
    const problems = [...page.errors, ...page.netFails.filter((f) => !/favicon/i.test(f) && !isExternal(f))];
    const notes = page.netFails.filter(isExternal);
    const empty = bodyLen < 200;
    const ok = problems.length === 0 && !empty && hidden === 0;
    if (!ok) failed++;

    log(`${ok ? 'PASS' : 'FAIL'}  ${route.padEnd(24)} ${String(bodyLen).padStart(6)} chars  ${shot.width}x${shot.height}  "${title.slice(0, 48)}"`);
    if (empty) log(`        ! <main> has almost no text (${bodyLen} chars)`);
    if (hidden) log(`        ! ${hidden} element(s) still .opacity-0 after scroll-reveal - screenshot has blank bands`);
    for (const p of problems) log(`        ! ${p}`);
    for (const n of [...new Set(notes)]) log(`        - external (expected offline): ${n}`);
  }
  log(`\nScreenshots: ${opts.outDir}`);
  log(failed === 0 ? `\nAll ${routes.length} routes OK.` : `\n${failed}/${routes.length} routes FAILED.`);
  return failed === 0 ? 0 : 1;
}

async function cmdContact(page, base, opts) {
  page.clearErrors();
  await page.goto(base + '/contact');
  await page.waitFor('form');

  await page.type('#name', 'Driver Smoke Test');
  await page.type('#email', 'driver@example.invalid');
  await page.type('#company', 'Skill Harness');
  await page.type('#message', 'Automated check from the run-sthwalo-site driver. Not a real enquiry.');
  await page.eval(`(() => {
    const s = document.querySelector('#service');
    if (s && s.options.length > 1) {
      s.value = s.options[1].value;
      s.dispatchEvent(new Event('change', { bubbles: true }));
    }
  })()`);

  await page.screenshot(join(opts.outDir, 'contact-filled.png'));
  await page.click('button[type="submit"]');

  let ok = false;
  for (let i = 0; i < 60; i++) {
    if (/Message Sent/i.test(await page.text('main'))) { ok = true; break; }
    await sleep(100);
  }
  await page.screenshot(join(opts.outDir, 'contact-result.png'));

  const stub = page.stubbedRequests?.[0];
  log(stub ? `Intercepted POST ${stub.url}\n  body: ${stub.body}` : 'No POST was intercepted!');
  if (!opts.stubApi) warn('!! --no-stub-api was set: that request hit the REAL API.');
  log(ok ? 'PASS  contact form reached the "Message Sent" state' : 'FAIL  never reached the success state');
  for (const e of page.errors) log(`      ! ${e}`);
  log(`Screenshots: ${join(opts.outDir, 'contact-filled.png')}, ${join(opts.outDir, 'contact-result.png')}`);
  return ok ? 0 : 1;
}

async function cmdRepl(page, base, opts) {
  const rl = createInterface({ input: process.stdin, output: process.stdout, terminal: false });
  log('repl ready. commands: open <route> | ss [name] | click <sel> | type <sel> <text> | eval <js> | text [sel] | wait <sel> | errors | quit');
  log('READY');
  for await (const line of rl) {
    const raw = line.trim();
    if (!raw) continue;
    const [cmd, ...rest] = raw.split(/\s+/);
    const arg = rest.join(' ');
    try {
      switch (cmd) {
        case 'open': await page.goto(base + (arg || '/')); log(`OK opened ${arg || '/'} - ${await page.eval('document.title')}`); break;
        case 'ss': { const f = await page.screenshot(join(opts.outDir, `${arg || 'repl'}.png`)); log(`OK ${f.file} (${f.width}x${f.height})`); break; }
        case 'click': await page.click(arg); log(`OK clicked ${arg}`); break;
        case 'type': { const i = arg.indexOf(' '); await page.type(arg.slice(0, i), arg.slice(i + 1)); log(`OK typed`); break; }
        case 'eval': log('OK ' + JSON.stringify(await page.eval(arg))); break;
        case 'text': log('OK ' + (await page.text(arg || 'body')).trim().slice(0, 2000)); break;
        case 'wait': await page.waitFor(arg); log(`OK ${arg} present`); break;
        case 'errors': log('OK ' + JSON.stringify({ console: page.errors, network: page.netFails }, null, 2)); break;
        case 'quit': case 'exit': rl.close(); return 0;
        default: log(`ERR unknown command: ${cmd}`);
      }
    } catch (e) { log(`ERR ${e.message}`); }
  }
  return 0;
}

// ------------------------------------------------------------------ main

async function main() {
  const opts = parseArgs(process.argv.slice(2));
  if (opts.cmd === 'help') { log(HELP); return 0; }
  if (opts.cmd === 'routes') { log(ROUTES.join('\n')); return 0; }

  // Check before spawning Vite and Chrome, not after. On this machine a login
  // shell resolves /usr/local/bin/node (v20.11.1), which shadows nvm's v22 and
  // has no global WebSocket - the CDP connection is what breaks.
  if (typeof globalThis.WebSocket === 'undefined') {
    throw new Error(
      `This driver needs Node >= 22 for the built-in WebSocket; you are on ${process.version} ` +
      `(${process.execPath}).\nRun it with: ~/.nvm/versions/node/v22.21.1/bin/node <driver> ...  or 'nvm use 22' first.`
    );
  }

  let server = null, chrome = null, cdp = null;
  const cleanup = () => { try { cdp?.close(); } catch { } chrome?.stop(); server?.stop(); };
  process.on('SIGINT', () => { cleanup(); process.exit(130); });

  try {
    let base = opts.base;
    if (!base) { server = await startServer(opts); base = server.url; }
    else log(`[server] using ${base}`);

    chrome = await launchChrome(opts);
    cdp = await Cdp.connect(chrome.wsUrl);
    const page = await Page.create(cdp, opts);

    switch (opts.cmd) {
      case 'smoke': return await cmdSmoke(page, base, opts);
      case 'contact': return await cmdContact(page, base, opts);
      case 'repl': return await cmdRepl(page, base, opts);
      case 'shot': {
        for (const r of (opts.args.length ? opts.args : ['/'])) {
          await page.goto(base + r);
          const s = await page.screenshot(join(opts.outDir, `${slug(r)}.png`));
          log(`${s.file}  ${s.width}x${s.height}`);
        }
        return 0;
      }
      case 'eval': {
        await page.goto(base + (opts.args[0] || '/'));
        log(JSON.stringify(await page.eval(opts.args.slice(1).join(' ')), null, 2));
        return 0;
      }
      case 'text': {
        await page.goto(base + (opts.args[0] || '/'));
        log((await page.text(opts.args[1] || 'body')).trim());
        return 0;
      }
      case 'links': {
        await page.goto(base + (opts.args[0] || '/'));
        const hrefs = await page.eval(
          `[...new Set([...document.querySelectorAll('a[href^="/"]')].map(a => a.getAttribute('href')))].sort()`
        );
        log(hrefs.join('\n'));
        return 0;
      }
      default: warn(`unknown command: ${opts.cmd}`); log(HELP); return 2;
    }
  } finally {
    cleanup();
  }
}

main().then((code) => process.exit(code), (err) => { warn(err.stack || String(err)); process.exit(1); });
