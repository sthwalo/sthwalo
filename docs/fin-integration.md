# FIN

FIN is not hosted by this site. It has its own domain — **[aosfin.com](https://aosfin.com)** —
with the application at the apex and its API on the same origin at `/api`.

## What this site does with FIN

Links to it. Nothing else. There is no FIN build, no shared bundle, no reverse proxy and no
runtime dependency on any FIN hostname.

- FIN CTAs point at `https://aosfin.com`.
- Signup, if ever linked directly, is `https://aosfin.com/register`. That is a **path**;
  `?view=register` lands on the login screen instead.
