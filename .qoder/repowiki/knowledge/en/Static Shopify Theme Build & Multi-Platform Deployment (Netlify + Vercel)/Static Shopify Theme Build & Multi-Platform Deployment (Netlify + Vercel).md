---
kind: build_system
name: Static Shopify Theme Build & Multi-Platform Deployment (Netlify + Vercel)
category: build_system
scope:
    - '**'
source_files:
    - package.json
    - frontend/package.json
    - netlify.toml
    - netlify-build.js
    - vercel.json
    - api/index.js
    - frontend/server.js
    - .env.example
    - download-images.ps1
    - fix-urls.ps1
    - inject-patchbyte.ps1
    - rebrand.ps1
    - seed-products.ps1
    - migrate-tables.sql
---

## What system/approach is used

This repository deploys a **static Shopify Dawn theme** that has been pre-rendered into plain HTML/CSS/JS and is served either by a lightweight Express server (`frontend/server.js`) or via static hosting on Netlify/Vercel. There is no traditional build pipeline: `package.json` scripts simply echo that no build step is required, and the site's assets are copied from `frontend/patchkraze.com/` into `public/` during deployment.

The build/deploy surface consists of:
- A Node.js script (`netlify-build.js`) that copies selected directories from `frontend/patchkraze.com/` into `public/`, excluding the large nested `cdn/` folder while keeping theme assets under `cdn/shop/t`, fonts, and the client-side `js/patchbyte.js`.
- Platform configuration files for two hosters: `netlify.toml` (build command, redirects, CDN proxy rules) and `vercel.json` (serverless function routing all requests to `api/index.js`).
- PowerShell utility scripts at the repo root (`download-images.ps1`, `fix-urls.ps1`, `inject-patchbyte.ps1`, `rebrand.ps1`, `seed-products.ps1`) that prepare the static site — downloading Shopify CDN images, rewriting URLs in generated HTML, injecting the PatchByte client script, rebranding text, and seeding product metadata into Supabase.
- A SQL migration file (`migrate-tables.sql`) for Supabase cart/order/contact tables.

## Key files and packages

- `package.json` (root): declares `node >=18`, Express + Stripe + dotenv as runtime dependencies; `npm start` runs `node frontend/server.js`; `npm run build` is a no-op.
- `frontend/package.json`: mirrors the root manifest for the Express server inside `frontend/`.
- `netlify.toml`: defines `[build]` command (`node netlify-build.js`), `publish = public`, `NODE_VERSION = 18`, plus ~40 redirect rules (301/302) mapping old Shopify URLs to the new static paths, clean URL rewrites (`/products/:slug` → `.html`), cart/checkout index redirects, and CDN proxy rules forwarding `/cdn/*` to `https://cdn.shopify.com/...` with `force = true`.
- `netlify-build.js`: recursive directory copier that skips `patchkraze.com/cdn` but copies theme CSS/JS (`cdn/shop/t`), fonts, and `js/` into `public/`.
- `vercel.json`: empty `buildCommand`, `outputDirectory = "."`, a single serverless function `api/index.js` that includes only the needed static assets, and a catch-all rewrite routing every request to `/api/index`.
- `api/index.js`: re-exports `../frontend/server.js`, so Vercel's serverless runtime serves the same Express app.
- `frontend/server.js`: Express server that serves the static HTML pages, proxies Stripe payment intents, and maps clean URLs to prebuilt `.html` files.
- `frontend/patchkraze.com/`: the prebuilt static site output (HTML pages for products, collections, blogs, policies, plus a vendored copy of the Shopify Dawn theme assets under `cdn/shop/t` and `cdn/fonts`).
- PowerShell utilities: `download-images.ps1`, `fix-urls.ps1`, `inject-patchbyte.ps1`, `rebrand.ps1`, `seed-products.ps1` — used to generate/maintain the static site before committing.
- `migrate-tables.sql`: Supabase schema for cart, order, and contact tables.

## Architecture and conventions

- **No compilation/transpilation**: The project treats the static site as an artifact produced externally (by scraping/downloading from Shopify). The repository stores the rendered HTML/CSS/JS directly, so the "build" is just copying files into the deploy target directory.
- **Dual-host strategy**: Netlify handles pure static hosting with its own redirect/CDN-proxy rules; Vercel routes everything through a single serverless function that delegates to the same Express server. Both platforms require Node ≥ 18.
- **Clean URL convention**: All user-facing URLs omit the `.html` extension. On Netlify this is handled by `[[redirects]]` patterns like `/products/:slug → /products/:slug.html`. On Vercel the catch-all rewrite sends every path to `api/index.js`, which must resolve the corresponding `.html` file.
- **CDN asset handling**: Product images and theme assets live under `frontend/patchkraze.com/cdn/`. The Netlify build explicitly excludes the deep `cdn/` tree from `public/` to keep the deploy bundle small, then proxies `/cdn/*` requests to Shopify's CDN at deploy time. Fonts are copied locally so they do not depend on external CDNs.
- **Environment-driven config**: The Express server reads `STRIPE_SECRET_KEY` and other values via `dotenv` (see `.env.example`); both hosters inject these at deploy time.

## Conventions and constraints

- **Node version**: Both manifests pin Node ≥ 18 (`engines.node` in package files, `NODE_VERSION = 18` in `netlify.toml`). Deployments will fail on older runtimes.
- **Build is a no-op by default**: `npm run build` prints a message and does nothing; the real work happens via the PowerShell prep scripts and the Netlify-specific `netlify-build.js`.
- **Deploy targets**: The `public/` directory is the published artifact for Netlify; Vercel publishes the repo root and relies on its serverless function to serve it.
- **URL shape is frozen**: New pages must be added as prebuilt `.html` files under `frontend/patchkraze.com/<section>/` and matching redirect entries must be added to `netlify.toml` if clean URLs are desired.
- **Redirect policy**: Old Shopify URLs are preserved via explicit 301/302 redirects in `netlify.toml`; missing redirects result in 404s on Netlify.
- **CDN proxy scope**: Only `/cdn/shop/files/*`, `/cdn/s/*`, `/cdn/shopifycloud/*`, `/cdn/wpm/*`, and `/cdn/fonts/*` are proxied to Shopify; anything else under `/cdn/` must be bundled into the deploy.
- **Serverless function inclusion**: Vercel's `includeFiles` pattern restricts the function payload to `frontend/patchkraze.com/**/*.html`, `robots.txt`, `frontend/js/**`, and `frontend/cdn/shop/t/**` — adding new assets outside these globs requires updating `vercel.json`.