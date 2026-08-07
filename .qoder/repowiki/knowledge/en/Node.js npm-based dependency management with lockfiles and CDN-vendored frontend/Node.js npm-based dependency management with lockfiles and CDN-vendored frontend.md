---
kind: dependency_management
name: Node.js npm-based dependency management with lockfiles and CDN-vendored frontend assets
category: dependency_management
scope:
    - '**'
source_files:
    - package.json
    - package-lock.json
    - frontend/package.json
    - frontend/package-lock.json
    - .gitignore
    - frontend/cdn/shop/t/38/assets/base.css
    - frontend/cdn/shop/t/38/assets/component.js
    - frontend/patchkraze.com/cdn/shopifycloud/storefront/assets/
    - download-images.ps1
---

## System / Approach

The repository uses **npm** as the package manager for Node.js runtime dependencies. There is no bundler, transpiler, or build step — the project is a static Shopify Dawn theme served by a lightweight Express server, so dependency management is intentionally minimal.

Two `package.json` files exist:
- Root `package.json` declares the runtime server dependencies (`express`, `stripe`, `dotenv`) and pins the Node engine to `>=18`. Its `build` script is a no-op (`echo no build needed`).
- `frontend/package.json` mirrors the same three dependencies (though its lockfile only resolves `express`), also declaring `engines.node >= 18` and a no-op build.

A root `package-lock.json` (lockfileVersion 3) pins every transitive dependency with SHA integrity hashes resolved from `https://registry.npmjs.org/`. A separate `frontend/package-lock.json` exists but appears out of sync with its sibling manifest (it lists only `express` while the manifest lists `stripe` and `dotenv`), indicating the two manifests are not kept in perfect lockstep.

## Key Files

- `package.json` — root dependency manifest; declares `express ^5.2.1`, `stripe ^18.1.0`, `dotenv ^16.5.0`; sets `engines.node >= 18`.
- `package-lock.json` — npm v3 lockfile pinning exact versions and `sha512` integrity for all transitive deps under `node_modules/`.
- `frontend/package.json` — duplicate manifest inside the theme directory; same dependency set.
- `frontend/package-lock.json` — lockfile for the frontend subdirectory (appears stale relative to its manifest).
- `.gitignore` — excludes `node_modules/`, ensuring dependencies are never committed and must be installed fresh via `npm install`.
- `frontend/cdn/shop/t/38/assets/*.js` and `frontend/cdn/shop/t/38/compiled_assets/styles.css` — frontend JS/CSS are **vendored directly into the repo** (not pulled via npm). These are Shopify Dawn theme assets downloaded from the Shopify CDN and checked in as static files.
- `frontend/patchkraze.com/cdn/...` — additional vendored Shopify CDN assets (fonts, checkout web assets, storefront assets) copied verbatim from Shopify's CDN.
- `download-images.ps1`, `fix-urls.ps1`, `inject-patchbyte.ps1`, `rebrand.ps1`, `seed-products.ps1` — PowerShell utility scripts that operate on the vendored static assets; they do not manage packages.

## Architecture and Conventions

- **Runtime dependencies are declared per-directory**: the root manifest covers the Express server; the `frontend/` directory carries its own manifest even though it shares the same dependency set. This duplication means updates must be applied to both locations.
- **No devDependencies**: neither manifest lists development-only tooling. Linting, formatting, and asset downloading are handled ad-hoc via PowerShell scripts rather than npm scripts.
- **Frontend assets are vendored, not fetched at build time**: the Shopify Dawn theme JavaScript and CSS live under `frontend/cdn/shop/t/38/` and `frontend/patchkraze.com/cdn/`. They were downloaded once (via `download-images.ps1`) and committed to source control. There is no `package.json` entry for any frontend framework — the site ships prebuilt HTML + these vendored assets.
- **Lockfiles are committed**: `package-lock.json` is tracked in version control, so CI/CD installs a deterministic tree without network resolution drift.
- **Platform deployment configs** (`vercel.json`, `netlify.toml`, `netlify-build.js`) reference `node` builds but do not introduce private registries or custom npm configuration.

## Conventions and Constraints

- **Node version constraint**: both manifests declare `engines.node >= 18`, which constrains the runtime environment for anyone running `npm install` locally or on a platform that honors the engines field.
- **Dependency ranges use caret (`^`)**: all three runtime dependencies use caret ranges (`^5.2.1`, `^18.1.0`, `^16.5.0`), allowing minor/patch upgrades within the major version. The lockfile then pins the exact resolved versions.
- **No private registry or scoped packages**: all packages resolve from the public `https://registry.npmjs.org/`; there is no `.npmrc`, `GOPRIVATE`, or private registry configuration.
- **No vendoring of npm packages**: `node_modules/` is gitignored; packages are always reinstalled from the lockfile rather than committed.
- **Duplicate manifests are a maintenance risk**: because `frontend/package.json` and root `package.json` list the same dependencies independently, an update to one may diverge from the other (evidenced by the mismatched `frontend/package-lock.json`).
- **Frontend assets are treated as immutable vendored content**: once downloaded into `frontend/cdn/...`, they are edited manually (e.g., via `fix-urls.ps1`, `inject-patchbyte.ps1`) rather than rebuilt through a package pipeline.