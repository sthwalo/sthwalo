# Matches the cPanel runtime exactly: Node 19.9.0.
#
# Node 19 is end-of-life and these images no longer receive updates. That is
# the point — the server runs 19.9.0, so testing on 22 would prove nothing
# about production. Bump this only when the cPanel Node version is bumped.
FROM node:19.9.0-bullseye-slim

WORKDIR /app

# npm ci from the committed lockfile, which is what "Run NPM Install" does on
# the server. Dependencies are built here rather than copied from the host, so
# nothing macOS/arm64-specific leaks in.
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY . .

# Deliberately no .env. Configuration arrives through the process environment,
# exactly as it does from cPanel's "Environment variables" panel — index.js has
# never called dotenv. If the app boots here, that gap is proven harmless.
#
# The CLI scripts (seed-posts.js, create-admin.js) DO call dotenv, but dotenv
# never overwrites variables already present, so they read the same values.

EXPOSE 4000
CMD ["node", "index.js"]
