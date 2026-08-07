---
kind: configuration_system
name: Environment-based Configuration for Static Shopify Site with Stripe & Supabase
category: configuration_system
scope:
    - '**'
source_files:
    - .env.example
    - frontend/server.js
    - api/index.js
    - vercel.json
    - frontend/vercel.json
    - netlify.toml
    - netlify-build.js
    - package.json
---

## Overview

This repository is a static Shopify Dawn theme served by a lightweight Express server. Configuration is minimal and environment-driven: secrets are loaded from `.env` in local development and from the hosting platform's environment variables at runtime (Vercel, Netlify). There is no centralized config object or feature-flag system — configuration values are read directly via `process.env` where needed.

## Key Files and Where Configuration Lives

- **`.env.example`** — Documents required environment variables: `STRIPE_SECRET_KEY`, `STRIPE_PUBLISHABLE_KEY`, `SUPABASE_URL`, `SUPABASE_ANON_KEY`. The comment explicitly says "NEVER commit real values here" and directs users to set them in the hosting dashboard.
- **`frontend/server.js`** — Loads `.env` via `dotenv.config({ path: path.join(__dirname, '..', '.env') })` only in local dev (wrapped in try/catch so it ignores missing files). Reads `STRIPE_SECRET_KEY`, `STRIPE_PUBLISHABLE_KEY`, and `PORT` from `process.env`. If `STRIPE_SECRET_KEY` is absent, the Stripe client is not initialized and payment endpoints return an error.
- **`api/index.js`** — Re-exports `frontend/server.js` as a Vercel serverless function entry point; no additional config logic.
- **`vercel.json`** (root) — Routes all requests to `/api/index` (which delegates to `server.js`) and declares which static assets to include in the deployment bundle.
- **`frontend/vercel.json`** — Alternative Vercel config that uses `@vercel/node` to run `server.js` directly and routes everything to it.
- **`netlify.toml`** — Declares build command (`node netlify-build.js`), publish directory (`public`), Node version (`18`), and contains all URL redirects, CDN proxy rules, and clean-URL mappings. No env vars are referenced here.
- **`package.json`** — Declares `dotenv` as a dependency and sets `engines.node >= 18`. The `start` script runs `node frontend/server.js`.
- **`netlify-build.js`** — Build-time configuration: copies `frontend/patchkraze.com` (excluding `cdn/`) into `public/`, plus theme assets, fonts, and `js/`. This is the only place where build-time paths are configured.

## Architecture and Conventions

1. **Single source of truth for runtime config is `process.env`.** Values are consumed inline wherever they are needed (Stripe initialization, port binding, publishable key exposure). There is no config module that aggregates settings.
2. **Secrets live outside the repo.** `.env.example` documents the shape but real values must be injected by the hosting platform (Vercel/Netlify dashboards). Local development uses a sibling `.env` file loaded by `dotenv`.
3. **Feature toggling is implicit via presence/absence of env vars.** For example, if `STRIPE_SECRET_KEY` is undefined, the Stripe integration is disabled entirely and the `/api/create-payment-intent` endpoint returns a 500 error. This is the project's de facto feature flag mechanism.
4. **Deployment-specific behavior is controlled per platform:**
   - **Vercel**: `vercel.json` rewrites all routes to the API function; `api/index.js` simply re-exports the Express app.
   - **Netlify**: `netlify.toml` handles redirects, CDN proxies, and build steps; the Express server is not used at deploy time — only the built `public/` directory is published.
   - **Local dev**: `node frontend/server.js` serves both static HTML and the Express routes.
5. **Static site structure is the primary "configuration" of content.** Product pages, collections, blogs, and policies are prebuilt HTML files under `frontend/patchkraze.com/`. The server maps clean URLs (e.g. `/products/foo`) to those files by appending `.html` or looking for `index.html` inside directories. Redirects for renamed/moved pages are hardcoded as JS objects (`permanentRedirects`, `temporaryRedirects`) in `server.js` and mirrored in `netlify.toml`.
6. **CDN asset resolution is configured in two places:**
   - At build time, `netlify-build.js` copies theme CSS/JS/fonts into `public/` so they ship with the site.
   - At runtime, `server.js` proxies any `/cdn/*` request not found locally to Shopify's CDN (`cdn.shopify.com`), stripping the leading `/cdn` prefix.

## Conventions and Constraints

- **Never hardcode secrets in code.** The `.env.example` header states this explicitly; Stripe keys are read from `process.env` and Supabase credentials are documented as needing to be moved from hardcoded locations into environment variables.
- **`dotenv` is optional and failure-safe.** Loading `.env` is wrapped in try/catch so deployments without a `.env` file continue to work (they rely on platform-injected env vars).
- **Node version is pinned to 18+** via both `package.json` engines and `netlify.toml` `[build.environment] NODE_VERSION = "18"`.
- **All routing/redirects are duplicated across platforms.** Hardcoded redirect maps exist in `server.js` (for local/Vercel) and identically declared in `netlify.toml` (for Netlify builds). Changes must be kept in sync manually.
- **The Express server is only used for dynamic endpoints** (Stripe PaymentIntent creation, exposing the publishable key, and serving static files locally). Netlify deploys a pure static site built by `netlify-build.js`; the server code is not executed there.
- **No feature flags, no config files (YAML/TOML/JSON config).** Behavior changes come from editing redirect maps in code, adding/removing env vars, or modifying the build script.