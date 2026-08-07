---
kind: error_handling
name: 'Ad-hoc Error Handling: Express Routes, Frontend try/catch, and Silent Failures'
category: error_handling
scope:
    - '**'
source_files:
    - frontend/server.js
    - api/index.js
    - frontend/js/patchbyte.js
    - frontend/cdn/shop/t/38/assets/component.js
    - frontend/cdn/shop/t/38/assets/product-form.js
    - frontend/cdn/shop/t/38/assets/cart-discount.js
    - frontend/cdn/shop/t/38/assets/morph.js
---

## What system/approach is used

The repository has no centralized error-handling framework. Errors are handled in three ad-hoc layers:

1. **Express server (`frontend/server.js`, re-exported via `api/index.js`)** — route handlers use inline `try/catch` blocks around async Stripe calls and return JSON `{ error }` responses with appropriate HTTP status codes (400 for invalid input, 500 when Stripe is unconfigured). A global CDN proxy handler uses `.on('error', ...)` to map network failures to 404.
2. **Frontend client script (`frontend/js/patchbyte.js`)** — wraps Supabase REST calls and DOM event handlers in `try/catch`. On failure it logs via `console.error('[PatchByte] ...')`, returns a `Response` with status 422 for cart-add errors, and shows an `alert()` for contact-form submission failures.
3. **Shopify Dawn theme assets** (vendored under `frontend/cdn/shop/t/38/assets/`) — throw `new Error(...)` or `new TypeError(...)` on malformed DOM state (e.g. missing refs, invalid element types) and catch network errors with empty `catch` blocks or `console.error`/`console.warn` logging.

There is no shared error type, no error middleware, no structured logger, and no `errors/` directory. The only dedicated file that could be considered central is the thin `api/index.js` which simply re-exports the Express app from `frontend/server.js` so Vercel/Netlify can treat it as a serverless function.

## Key files and packages

- `frontend/server.js` — sole application server; defines all routes, local static serving, Shopify CDN proxy, redirect maps, and the Stripe PaymentIntent endpoint.
- `api/index.js` — re-exports `frontend/server.js` for platform serverless entry points.
- `frontend/js/patchbyte.js` — injected client-side script that intercepts Shopify `/cart/*` fetches, persists cart to Supabase, wires the contact form, and exposes a `window.PatchByte` API.
- Vendored Dawn theme JS under `frontend/cdn/shop/t/38/assets/` (e.g. `component.js`, `product-form.js`, `cart-discount.js`, `morph.js`, `popover-polyfill.js`) — contain most of the DOM-level error handling.

## Architecture and conventions

- **Per-route try/catch**: Each Express route wraps its async work in a `try/catch` and responds with `{ error: message }` plus a status code. There is no global error-handling middleware (no `app.use((err, req, res, next) => ...)`).
- **Input validation before side effects**: The Stripe endpoint validates `amount` before calling Stripe and returns 400 if invalid; configuration absence is checked upfront and returns 500.
- **CDN proxy fallback**: Network errors in the `/cdn/*` proxy are caught by the stream's `.on('error')` listener and mapped to a 404 response body.
- **Static asset 404**: The catch-all `/{*splat}` route falls through candidate paths and finally sends a minimal HTML 404 page.
- **Frontend silent failures**: Many theme asset `try/catch` blocks have empty bodies (`} catch (error) {}`) or only log to `console`; failures do not bubble up to the user. This keeps the UI resilient when optional features (discounts, quantity selectors, morphing) fail.
- **User-visible errors are localized**: Contact form submission failures show an `alert()`, and cart-add failures return a 422 `Response` whose caller can render inline. No global toast or banner is used for backend errors.
- **No `throw` propagation across boundaries**: Server-side `throw` is caught per-route; client-side `throw new Error(...)` is used only for programming mistakes inside a single component (missing DOM ref), not for recoverable runtime conditions.

## Conventions and constraints observed

- Every asynchronous operation that can fail is wrapped in `try/catch`; unhandled promise rejections are not guarded globally.
- HTTP error responses carry a JSON object with an `error` string field rather than arbitrary payloads.
- User-facing pages never expose raw stack traces; the only HTML 404 is a simple `<h2>Page not found</h2>` snippet.
- Logging is done via `console.error` / `console.warn` with a `[PatchByte]` or `[Stripe]` prefix to distinguish sources; there is no log level or transport abstraction.
- Vendored Shopify Dawn assets are treated as third-party code: they throw on invalid DOM state but swallow network errors silently, so the custom code should not assume those components will propagate errors upward.
- Configuration errors (missing `STRIPE_SECRET_KEY`) are detected at startup and produce a 500 response rather than crashing the process.