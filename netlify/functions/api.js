// Netlify Function — PatchByte API (Stripe + Supabase config endpoints).
//
// netlify.toml rewrites /api/* to this function. It implements the three
// API endpoints directly (no Express, no serverless-http) so the bundle is
// trivial and deploys reliably on Netlify's build image:
//
//   GET  /api/stripe-config      → { publishableKey }
//   GET  /api/supabase-config    → { supabaseUrl, supabaseAnonKey }
//   POST /api/create-payment-intent → { clientSecret }
//
// Env vars come from the Netlify dashboard (NOT from .env, which is
// gitignored and local-only). Set in Netlify → Site settings → Environment
// variables: STRIPE_SECRET_KEY, STRIPE_PUBLISHABLE_KEY, SUPABASE_URL,
// SUPABASE_ANON_KEY.

const stripe = require('stripe');

// Supabase fallbacks bundled with the site (public anon credentials) so the
// cart/checkout still work even if the env vars are not set in the dashboard.
const FALLBACK_SUPABASE_URL = 'https://hjnowvzxusjjyhxxgdji.supabase.co';
const FALLBACK_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhqbm93dnp4dXNqanloeHhnZGppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg5NjE2MzgsImV4cCI6MjA5NDUzNzYzOH0.vf-N61uWE7A3vaEgxFPNYvKvggZ7ppl1JnEldm3Ofxs';

function json(status, body) {
  return {
    statusCode: status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'no-store',
    },
    body: JSON.stringify(body),
  };
}

exports.handler = async (event) => {
  const path = (event.path || '').replace(/^\/api/, '') || '/';
  const method = event.httpMethod || 'GET';

  if (path === '/stripe-config' && method === 'GET') {
    return json(200, { publishableKey: process.env.STRIPE_PUBLISHABLE_KEY || '' });
  }

  if (path === '/supabase-config' && method === 'GET') {
    return json(200, {
      supabaseUrl: process.env.SUPABASE_URL || FALLBACK_SUPABASE_URL,
      supabaseAnonKey: process.env.SUPABASE_ANON_KEY || FALLBACK_SUPABASE_ANON_KEY,
    });
  }

  if (path === '/create-payment-intent' && method === 'POST') {
    let body = {};
    try { body = JSON.parse(event.body || '{}'); } catch (e) { /* ignore */ }
    const amountCents = Math.round(Number(body.amount));
    if (!amountCents || amountCents <= 0) {
      return json(400, { error: 'Invalid amount.' });
    }
    if (!process.env.STRIPE_SECRET_KEY) {
      return json(500, { error: 'Stripe is not configured on the server.' });
    }
    try {
      const client = stripe(process.env.STRIPE_SECRET_KEY);
      const paymentIntent = await client.paymentIntents.create({
        amount: amountCents,
        currency: 'usd',
        automatic_payment_methods: { enabled: true },
        metadata: body.metadata || {},
      });
      return json(200, { clientSecret: paymentIntent.client_secret });
    } catch (err) {
      console.error('[Stripe] create-payment-intent error:', err.message);
      return json(400, { error: err.message });
    }
  }

  return json(404, { error: 'Not found.' });
};
