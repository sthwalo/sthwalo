---
name: run-sthwalo-site
description: Build, run, screenshot and drive the Sthwalo Holdings marketing site (Vite + React + TypeScript SPA). Use when asked to run, start, build, serve, test, screenshot, smoke-test, or click through the site or any of its pages (home, about, services, portfolio, contact, blog, resources, legal pages).
---

# Run the Sthwalo Holdings site

Vite 7 + React 18 + TypeScript SPA, Tailwind, `react-router-dom` v7. 13 client-side
routes, no backend needed to run it.

**Drive it with `driver.mjs`** — a zero-dependency Chrome DevTools Protocol driver
that starts Vite, launches headless Chrome, navigates, clicks, types, and
screenshots. It installs nothing: it uses Node 22's built-in `WebSocket` and a
Chrome already on this machine. Don't reach for Playwright or Puppeteer.

All paths below are relative to the repo root (`/Users/sthwalo/sthwalo`).

## Prerequisites

**Node ≥22 — check this first.** On this machine a *login* shell resolves
`/usr/local/bin/node` (**v20.11.1**), which shadows nvm's v22 and has no global
`WebSocket`. Verify and, if needed, use the nvm binary explicitly:

```bash
node -v                                    # want v22.x; v20.11.1 means the shim won
nvm use 22                                 # or:
~/.nvm/versions/node/v22.21.1/bin/node .claude/skills/run-sthwalo-site/driver.mjs smoke
```

The driver checks this up front and exits with the fix before starting anything.

Also needs a Chrome binary. The driver finds one automatically, trying in order:

1. `~/Library/Caches/ms-playwright/chromium_headless_shell-1234/.../chrome-headless-shell` (used here)
2. `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`
3. Linux paths (`/usr/bin/google-chrome`, `/usr/bin/chromium`)

If none exist: `npx playwright install chromium` (installs only the browser).

## Setup

```bash
npm install
```

## Run (agent path) — start here

The driver starts and stops Vite itself. One command, no server to babysit:

```bash
node .claude/skills/run-sthwalo-site/driver.mjs smoke
```

Visits all 13 routes plus a real blog post, screenshots each to `.artifacts/`
(gitignored), and reports console errors, failed requests, empty pages, and
unrevealed sections. Exits non-zero on failure. Takes ~90s. Verified output:

```
[server] vite dev on http://localhost:5273
[chrome] chrome-headless-shell on port 59986
PASS  /                          3382 chars  1440x6118  "FIN - Financial Operations Platform for SMEs | S"
PASS  /about                     3351 chars  1440x4436  "Sthwalo Holdings | Building Foundations with Cod"
...
All 13 routes OK.
```

### Commands

```bash
D=.claude/skills/run-sthwalo-site/driver.mjs

node $D smoke                    # all routes + screenshots + error report
node $D smoke --dist             # same, against the production build (run npm run build first)
node $D shot / /contact          # screenshot specific routes
node $D shot / --mobile          # 390x844 instead of 1440x900
node $D contact                  # fill + submit the contact form, API stubbed
node $D eval /blog "document.querySelectorAll('article').length"
node $D text /about "h1"         # innerText of a selector
node $D links /                  # every in-app href on the page
node $D routes                   # the route list
node $D --help
```

Useful flags: `--base <url>` (drive an already-running server or production
instead of starting Vite), `--out <dir>` (screenshot dir, default `.artifacts/`),
`--width`/`--height`, `--settle <ms>`.

### Interactive REPL

For exploring, pipe commands to `repl` — it prints `READY`, then `OK`/`ERR` per
line, so it scripts cleanly with a heredoc:

```bash
printf 'open /contact\ntype #name Alpha\nss probe\neval document.title\nquit\n' \
  | node .claude/skills/run-sthwalo-site/driver.mjs repl
```

Commands: `open <route>`, `ss [name]`, `click <sel>`, `type <sel> <text>`,
`eval <js>`, `text [sel]`, `wait <sel>`, `errors`, `quit`.

## Build / check

```bash
npm run typecheck    # tsc --noEmit -p tsconfig.app.json  (clean)
npm run lint         # eslint .                            (clean)
npm run build        # vite build -> dist/, ~2s, ~310 kB JS / 30 kB CSS
```

There is **no test suite** — no test runner or `test` script exists. `driver.mjs smoke`
is the closest thing to an integration test; use it to verify UI changes.

## Run (human path)

```bash
npm run dev          # http://localhost:5173, opens nothing
```

Useful only if you can see a browser. Prefer the driver.

## Gotchas

- **Below-the-fold sections screenshot as blank bands.** `AnimatedSection`
  ([src/components/ui/AnimatedSection.tsx](src/components/ui/AnimatedSection.tsx))
  renders `opacity-0` until its IntersectionObserver fires. CDP's
  `captureBeyondViewport` paints the full page *without scrolling*, so nothing
  below the fold ever reveals. The driver's `reveal()` scrolls the page in
  viewport steps before capturing (and waits 700ms for the 0.6s animation). If
  you write your own capture, do the same or the screenshot lies.

- **The contact form POSTs to production.** `VITE_API_URL` in [.env](.env) is
  `https://sthwalo.com/api`, so submitting the form locally writes a real row
  and emails a real person. `driver.mjs contact` intercepts it (CDP `Fetch`) and
  answers 201 locally. `--no-stub-api` disables that — don't.

- **The stub must answer the CORS preflight too.** The POST is cross-origin with
  `Content-Type: application/json`, so Chrome sends `OPTIONS` first. Passing that
  through to the real host makes it fail, and the POST is then *never sent* — the
  form silently lands in its error state and looks like a broken click. Fulfil
  `OPTIONS` with 204 + `Access-Control-Allow-*`.

- **Home always logs a failed request.** `useTrustMetrics` fetches
  `https://api.sthwalo.com/api/v1/public/trust-metrics`; it's CORS-blocked from
  localhost, is caught, and falls back to `publicMetricsSnapshot`. It appears
  **twice** because `StrictMode` double-invokes effects in dev. Expected — the
  driver reports external-host failures as notes, not failures.

- **Don't count `.opacity-0` to detect unrevealed sections.** The footer uses that
  class on 7 tiny hover-reveal arrows (`group-hover:opacity-100`) on *every*
  page, so a class count reports 7 false positives everywhere. Measure computed
  opacity on elements with real size and text (what `hiddenCount()` does), and
  note Home has a deliberate `opacity-[0.03]` background texture.

- **`/admin` is the blog editor.** With no API reachable it renders its sign-in
  form, which is a real page with real text — that is a pass, not an empty route.
  `/demo` and `/resources` no longer exist.

- **There is no 404 route.** Any unmatched path (including `/fin/`, which the
  "Access FIN" button links to) renders the navbar and footer with an **empty
  `<main>`**. In production nginx serves the separate FIN app at `/fin/`; locally
  it's a blank page. Don't read that as a broken build.

- **Port 5173 is often already taken** by a stale Vite from another project. The
  driver uses **5273** with `--strictPort` and parses Vite's actual URL from its
  output, so it fails loudly rather than silently driving the wrong app.

- **`server/`** is a separate Express + MySQL + sendmail contact API, deployed
  apart from this site. It is not needed to run the site and was not run here.

## Troubleshooting

| Symptom | Cause / fix |
|---|---|
| `Error: Port 5273 is already in use` | A previous driver run leaked Vite. `pkill -f "vite --port 5273"`. The driver spawns Vite detached and kills the process group, but a `SIGKILL`ed driver can't clean up. |
| `server did not start in 60s` with a banner that clearly shows the URL | Vite colours its output even through a pipe (it ignores `FORCE_COLOR`/`NO_COLOR`), so the URL regex missed. The driver strips ANSI before matching — keep that if you edit it. |
| `vite not installed - run 'npm install'` | The driver spawns `node_modules/.bin/vite` directly, *not* `npm run dev` — the npm wrapper survives as an orphan (ppid 1) holding the port even after a group kill. |
| `This driver needs Node >= 22 ... you are on v20.11.1` | `/usr/local/bin/node` shadowed nvm. `nvm use 22`, or call `~/.nvm/versions/node/v22.21.1/bin/node` directly. |
| `No Chrome found` | Install Chrome or run `npx playwright install chromium`. |
| `Chrome never wrote DevToolsActivePort` | Chrome crashed on launch. Run the binary by hand with the args in `launchChrome()` to see the error. |
| Leftover `chrome-headless-shell` processes | Chrome forks gpu/network/renderer helpers; only a process-group kill gets them all. `pkill -f chrome-headless-shell`. |
| A click "does nothing" | Almost always a request the page made failing, not the click. Run `errors` in the REPL, or check the intercepted-POST line from `driver.mjs contact`. |
