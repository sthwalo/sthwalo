# FIN

FIN is no longer hosted by this site. It has its own domain — **[aosfin.com](https://aosfin.com)**
— with the application at the apex and its API on the same origin at `/api`.

## What this site does with FIN

Links to it. Nothing else. There is no FIN build, no shared bundle, no reverse proxy and no
runtime dependency on any FIN hostname.

- FIN CTAs point at `https://aosfin.com`.
- `/fin/*` 301s to `https://aosfin.com/$1`, path preserved — see `public/.htaccess`.
- Signup, if ever linked directly, is `https://aosfin.com/register`. That is a **path**;
  `?view=register` lands on the login screen instead.

## What this document used to say

It described hosting the FIN dashboard as a subdirectory of this site — `public_html/fin/`, with a
second `.htaccess` and a shared `public_html`. That arrangement is retired. FIN was a guest on a
domain whose apex belonged to something else, which is why its bundle was built with a `/fin/`
base path and why its old URLs all carry that prefix.

Two consequences worth remembering while old links are still in circulation:

- Bookmarks and emailed links of the form `sthwalo.com/fin/<path>` reach the right page through
  the redirect above, and `app.sthwalo.com/fin/<path>` is handled on the FIN side.
- `public_html/fin/` should be **deleted** on cPanel. While it exists with its own `.htaccess`,
  those per-directory rules can take precedence over the redirect this repo ships.

## Historical note on usage metrics

This site used to render live FIN usage counts on the home page, fetched from
`api.sthwalo.com/api/v1/public/trust-metrics`. That section is gone: product telemetry is not
portfolio evidence, and removing it dropped this site's last runtime dependency on a hostname
that is being retired.
