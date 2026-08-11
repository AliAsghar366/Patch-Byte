// Netlify Function — PatchByte API.
//
// Routes the full Express app (frontend/server.js) through serverless-http,
// so ALL API endpoints work on Netlify: the storefront's stripe/supabase
// config and payment-intent endpoints AND the /api/admin/* portal endpoints
// (login, orders, stats, refunds, export).
//
// netlify.toml rewrites /api/* to this function.
//
// Env vars come from the Netlify dashboard (NOT from .env, which is
// gitignored and local-only). Set in Netlify → Site settings → Environment
// variables: STRIPE_SECRET_KEY, STRIPE_PUBLISHABLE_KEY, SUPABASE_URL,
// SUPABASE_ANON_KEY, ADMIN_PASSWORD, ADMIN_TOKEN_SECRET,
// SUPABASE_SERVICE_ROLE_KEY.

const serverless = require('serverless-http');
const app = require('../../frontend/server.js');

module.exports.handler = serverless(app);
