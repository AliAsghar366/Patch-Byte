// Netlify Function — PatchByte API (Stripe + Supabase endpoints).
//
// netlify.toml rewrites /api/* to this function. It runs the same Express
// app used by the local server / Vercel, so checkout (Stripe PaymentIntent)
// and the config endpoints work on the live Netlify deployment too.
//
// IMPORTANT: env vars are read from the Netlify dashboard, NOT from .env
// (which is gitignored and local-only). Set these in Netlify → Site settings
// → Environment variables: STRIPE_SECRET_KEY, STRIPE_PUBLISHABLE_KEY,
// SUPABASE_URL, SUPABASE_ANON_KEY.
const serverless = require('serverless-http');
const app = require('../../frontend/server.js');

exports.handler = serverless(app);
