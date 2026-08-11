const express = require('express');
const path = require('path');
const fs = require('fs');
const https = require('https');
const crypto = require('crypto');

// Load .env in local development (Vercel/Netlify inject env vars at runtime)
try { require('dotenv').config({ path: path.join(__dirname, '..', '.env') }); } catch (e) { /* ignore */ }

const stripe = process.env.STRIPE_SECRET_KEY ? require('stripe')(process.env.STRIPE_SECRET_KEY) : null;

const app = express();
const PORT = process.env.PORT || 3000;
const ROOT = path.join(__dirname, 'patchkraze.com');

app.use(express.json());
app.disable('x-powered-by');

// Security headers: storefront gets nosniff/referrer; admin API responses
// are never cached; the admin page resists framing/clickjacking and only
// loads its own scripts.
app.use((req, res, next) => {
    res.set('X-Content-Type-Options', 'nosniff');
    res.set('Referrer-Policy', 'no-referrer');
    if (req.path.startsWith('/api/admin')) {
        res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    }
    if (req.path.startsWith('/admin')) {
        res.set('X-Frame-Options', 'DENY');
        res.set('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'");
    }
    next();
});

// Shopify-compatible cart endpoint (for /cart/add.js requests)
app.post('/cart/add.js', (req, res) => {
    console.log('[Server] /cart/add.js endpoint hit');
    // This endpoint is intercepted by patchbyte.js on the client side
    // We just return a success response here since the actual cart logic
    // is handled by the client-side Supabase integration
    res.json({
        id: Date.now(),
        title: 'Item',
        quantity: 1,
        price: 0,
        handle: 'product',
        key: 'product:' + Date.now()
    });
});

app.post('/cart/add', (req, res) => {
    console.log('[Server] /cart/add endpoint hit');
    // Same as above for /cart/add endpoint
    res.json({
        id: Date.now(),
        title: 'Item',
        quantity: 1,
        price: 0,
        handle: 'product',
        key: 'product:' + Date.now()
    });
});

// Stripe PaymentIntent endpoint (used by checkout page)
app.post('/api/create-payment-intent', async (req, res) => {
    if (!stripe) {
        return res.status(500).json({ error: 'Stripe payments are not configured yet — add your Stripe secret key to the host dashboard (Settings → Environment Variables) to accept payments.' });
    }
    try {
        const { amount, metadata } = req.body || {};
        const amountCents = Math.round(Number(amount));
        if (!amountCents || amountCents <= 0) {
            return res.status(400).json({ error: 'Invalid amount.' });
        }
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amountCents,
            currency: 'usd',
            automatic_payment_methods: { enabled: true },
            metadata: metadata || {}
        });
        res.json({ clientSecret: paymentIntent.client_secret });
    } catch (err) {
        console.error('[Stripe] create-payment-intent error:', err.message);
        res.status(400).json({ error: err.message });
    }
});

// Expose publishable key to frontend so it never has to guess.
// The publishable key is PUBLIC by design (it ships in every Stripe.js embed),
// so it also serves as a fallback — the payment form loads even before the
// dashboard env var is set. The SECRET key is never exposed and must be set
// in the host dashboard (Vercel/Netlify) for charges to work.
const FALLBACK_STRIPE_PUBLISHABLE_KEY = 'pk_live_51TwKpCJP7cxbSa1MyPuoZmNZB4gmyEmsZNNAz3LHyFqpZhWEAPedN3ZQ2D80h23cgBH3bHsD0YTGVSINSKN8Up0V00zCiG3Cla';
app.get('/api/stripe-config', (_req, res) => {
    res.json({ publishableKey: process.env.STRIPE_PUBLISHABLE_KEY || FALLBACK_STRIPE_PUBLISHABLE_KEY });
});

// Expose Supabase config to the frontend (falls back to the values bundled
// with the site so cart/checkout still work even without env vars).
app.get('/api/supabase-config', (_req, res) => {
    res.json({
        supabaseUrl: process.env.SUPABASE_URL || 'https://hjnowvzxusjjyhxxgdji.supabase.co',
        supabaseAnonKey: process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhqbm93dnp4dXNqanloeHhnZGppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg5NjE2MzgsImV4cCI6MjA5NDUzNzYzOH0.vf-N61uWE7A3vaEgxFPNYvKvggZ7ppl1JnEldm3Ofxs'
    });
});

// ── Admin Portal API ───────────────────────────────────────────────────────
// The admin portal is protected by a password (ADMIN_PASSWORD) and talks to
// Supabase with the SERVICE ROLE key, which bypasses Row Level Security.
// NEVER expose ADMIN_PASSWORD or SUPABASE_SERVICE_ROLE_KEY to the browser.
// Required env vars (set in .env locally, host dashboard in production):
//   ADMIN_PASSWORD, SUPABASE_SERVICE_ROLE_KEY
// Optional: ADMIN_TOKEN_SECRET (used to sign session tokens), SUPABASE_URL.

// Built-in default so the portal works without configuring env vars. Always
// overridable via ADMIN_PASSWORD in the environment (recommended for real
// deployments).
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'TahaRizvi1214';
if (!process.env.ADMIN_PASSWORD) {
    console.warn('[Admin] ADMIN_PASSWORD is not set — using the built-in default. Set ADMIN_PASSWORD in the environment to override.');
}
// Token signing secret — NEVER a hardcoded constant. Prefer a dedicated
// ADMIN_TOKEN_SECRET; otherwise tokens are signed with the admin password.
const ADMIN_SECRET = process.env.ADMIN_TOKEN_SECRET || ADMIN_PASSWORD;
if (!process.env.ADMIN_TOKEN_SECRET) {
    console.warn('[Admin] ADMIN_TOKEN_SECRET is not set — session tokens are signed with the admin password. Set ADMIN_TOKEN_SECRET for stronger sessions.');
}
const ADMIN_TOKEN_TTL_MS = 12 * 60 * 60 * 1000; // 12 hours
const ADMIN_URL = process.env.SUPABASE_URL || 'https://hjnowvzxusjjyhxxgdji.supabase.co';
const ADMIN_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || '';
const ADMIN_USES_ANON = !process.env.SUPABASE_SERVICE_ROLE_KEY; // warn when falling back to the anon key

// Column sets tried in order until Supabase accepts one, so the portal keeps
// working against older schemas (before admin-migration.sql was run).
// L1 — after admin-migration.sql.
const FULL_ORDER_COLS = 'id,created_at,order_number,session_id,customer_name,customer_email,customer_phone,shipping_address,notes,subtotal,shipping_cost,total,status,payment_intent_id,payment_status,refunded_amount,refund_reason,tracking_number,tracking_url,admin_notes,shipped_at,completed_at';
// L2 — baseline storefront schema (migrate-tables.sql era).
const BASE_ORDER_COLS = 'id,created_at,order_number,session_id,customer_name,customer_email,customer_phone,shipping_address,notes,subtotal,shipping_cost,total,status';
const MIN_ORDER_COLS = '*';
const ORDER_COL_LADDER = [FULL_ORDER_COLS, BASE_ORDER_COLS, MIN_ORDER_COLS];
// Optional PATCH fields — dropped one at a time if the live schema lacks them.
const OPTIONAL_PATCH_COLS = ['shipped_at', 'completed_at', 'payment_status', 'tracking_number', 'tracking_url', 'admin_notes'];

// True when the live schema is pre-migration (payment_status column absent).
let schemaLegacy = null;
async function isLegacySchema() {
    if (schemaLegacy !== null) return schemaLegacy;
    try {
        const r = await supabase('orders?select=payment_status&limit=1');
        schemaLegacy = !r.ok;
    } catch (e) { schemaLegacy = true; }
    return schemaLegacy;
}

const ACTIVE_STATUSES = ['pending', 'confirmed', 'in_production', 'shipped', 'paid'];
const PAST_STATUSES = ['completed', 'cancelled'];
const ALL_STATUSES = ['pending', 'confirmed', 'in_production', 'shipped', 'paid', 'completed', 'cancelled'];

function signToken(payload) {
    const body = Buffer.from(JSON.stringify(payload)).toString('base64url');
    const sig = crypto.createHmac('sha256', ADMIN_SECRET).update(body).digest('base64url');
    return body + '.' + sig;
}

function verifyToken(token) {
    if (!token) return null;
    const parts = String(token).split('.');
    if (parts.length !== 2) return null;
    const [body, sig] = parts;
    const expected = crypto.createHmac('sha256', ADMIN_SECRET).update(body).digest('base64url');
    if (sig.length !== expected.length || !crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) {
        return null;
    }
    try {
        const payload = JSON.parse(Buffer.from(body, 'base64url').toString('utf8'));
        if (!payload.exp || payload.exp < Date.now()) return null;
        return payload;
    } catch (e) {
        return null;
    }
}

function clientIp(req) {
    const fwd = req.headers['x-forwarded-for'];
    return (typeof fwd === 'string' ? fwd.split(',')[0].trim() : '') || req.socket.remoteAddress || 'unknown';
}

function safeEqual(a, b) {
    const ba = Buffer.from(String(a));
    const bb = Buffer.from(String(b));
    return ba.length === bb.length && crypto.timingSafeEqual(ba, bb);
}

function requireAdmin(req, res, next) {
    const auth = req.headers.authorization || '';
    let token = auth.startsWith('Bearer ') ? auth.slice(7) : '';
    if (!token) {
        // Fall back to the HttpOnly session cookie set at login.
        const cookies = String(req.headers.cookie || '').split(';');
        for (const c of cookies) {
            const eq = c.indexOf('=');
            if (eq === -1) continue;
            const key = c.slice(0, eq).trim();
            if (key === 'pk_admin') token = decodeURIComponent(c.slice(eq + 1).trim());
        }
    }
    if (!verifyToken(token)) {
        return res.status(401).json({ error: 'Unauthorized. Please sign in again.' });
    }
    next();
}

function parseCount(header) {
    if (!header) return null;
    const m = String(header).match(/\/(\d+)\s*$/);
    return m ? parseInt(m[1], 10) : null;
}

async function supabase(path, options) {
    options = options || {};
    const res = await fetch(ADMIN_URL + '/rest/v1/' + path, {
        ...options,
        headers: Object.assign({
            apikey: ADMIN_KEY,
            Authorization: 'Bearer ' + ADMIN_KEY,
            'Content-Type': 'application/json'
        }, options.headers || {})
    });
    const text = await res.text();
    let data = null;
    try { data = text ? JSON.parse(text) : null; } catch (e) { data = text; }
    return { status: res.status, ok: res.ok, data, count: parseCount(res.headers.get('content-range')) };
}

// Some endpoints ask for columns that only exist after admin-migration.sql.
// If PostgREST rejects the query (missing column), retry with the base set.
function isMissingColumn(errMsg) {
    return /PGRST204|column.*does not exist|Could not find/.test(String(errMsg || ''));
}

// In-memory brute-force throttle. On serverless hosts the counter resets on
// cold starts — it still raises the bar, but for production-grade protection
// prefer a managed rate limiter at the edge (e.g. Vercel/Netlify WAF).
const loginAttempts = new Map();
const MAX_LOGIN_ATTEMPTS = 8;
const LOGIN_WINDOW_MS = 15 * 60 * 1000;
const LOCKOUT_MS = 15 * 60 * 1000;

app.post('/api/admin/login', async (req, res) => {
    const ip = clientIp(req);
    const now = Date.now();
    const rec = loginAttempts.get(ip) || { count: 0, windowStart: now, lockedUntil: 0 };
    if (rec.lockedUntil > now) {
        const mins = Math.ceil((rec.lockedUntil - now) / 60000);
        return res.status(429).json({ error: 'Too many failed attempts. Try again in ' + mins + ' minute(s).' });
    }
    if (now - rec.windowStart > LOGIN_WINDOW_MS) {
        rec.count = 0;
        rec.windowStart = now;
    }

    const password = (req.body && req.body.password) || '';
    if (!safeEqual(password, ADMIN_PASSWORD)) {
        rec.count += 1;
        if (rec.count >= MAX_LOGIN_ATTEMPTS) {
            rec.lockedUntil = now + LOCKOUT_MS;
            rec.count = 0;
        }
        loginAttempts.set(ip, rec);
        return res.status(401).json({ error: 'Incorrect password.' });
    }
    loginAttempts.delete(ip);

    const payload = { sub: 'admin', exp: now + ADMIN_TOKEN_TTL_MS };
    const token = signToken(payload);
    // HttpOnly cookie (immune to XSS reads) alongside the client-side token.
    const isHttps = req.secure || String(req.headers['x-forwarded-proto'] || '').split(',')[0].trim() === 'https';
    res.cookie('pk_admin', token, {
        httpOnly: true,
        sameSite: 'strict',
        secure: isHttps,
        maxAge: ADMIN_TOKEN_TTL_MS,
        path: '/'
    });
    res.json({
        token,
        expiresAt: payload.exp,
        schema: (await isLegacySchema()) ? 'legacy' : 'migrated',
        warning: ADMIN_USES_ANON ? 'SUPABASE_SERVICE_ROLE_KEY is not set — using the public anon key. Set it in the environment for full admin access.' : null
    });
});

app.post('/api/admin/logout', (req, res) => {
    res.clearCookie('pk_admin', { path: '/' });
    res.json({ ok: true });
});

app.get('/api/admin/me', requireAdmin, async (req, res) => {
    res.json({
        ok: true,
        schema: (await isLegacySchema()) ? 'legacy' : 'migrated',
        warning: ADMIN_USES_ANON ? 'SUPABASE_SERVICE_ROLE_KEY is not set — using the public anon key. Set it in the environment for full admin access.' : null
    });
});

// GET /api/admin/orders?q=&status=&payment=&from=&to=&page=&per_page=
// status may be a comma list, plus the shorthands 'active' and 'past'.
app.get('/api/admin/orders', requireAdmin, async (req, res) => {
    try {
        const q = String(req.query.q || '').trim();
        let statuses = String(req.query.status || '').trim().split(',').filter(Boolean);
        let payments = String(req.query.payment || '').trim().split(',').filter(Boolean);
        const from = String(req.query.from || '').trim();
        const to = String(req.query.to || '').trim();
        const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
        const perPage = Math.min(Math.max(parseInt(req.query.per_page, 10) || 50, 1), 200);

        if (statuses.includes('active')) statuses = statuses.filter(s => s !== 'active').concat(ACTIVE_STATUSES);
        if (statuses.includes('past')) statuses = statuses.filter(s => s !== 'past').concat(PAST_STATUSES);

        const params = new URLSearchParams();
        params.set('order', 'created_at.desc');
        params.set('limit', String(perPage));
        params.set('offset', String((page - 1) * perPage));
        if (from) params.append('created_at', 'gte.' + from);
        if (to) params.append('created_at', 'lte.' + to);
        if (statuses.length) params.set('status', 'in.(' + statuses.join(',') + ')');
        if (q) params.set('or', '(customer_name.ilike.*' + q.replace(/'/g, "''") + '*,customer_email.ilike.*' + q.replace(/'/g, "''") + '*,id::text.ilike.*' + q.replace(/'/g, "''") + '*)');

        // Walk the column ladder: newest schema first, down to `*`.
        let result = null;
        for (const cols of ORDER_COL_LADDER) {
            const p = new URLSearchParams(params);
            p.set('select', cols);
            if (payments.length && cols !== MIN_ORDER_COLS && cols !== BASE_ORDER_COLS) {
                p.set('payment_status', 'in.(' + payments.join(',') + ')');
            }
            result = await supabase('orders?' + p.toString(), { headers: { Prefer: 'count=exact' } });
            if (result.ok) break;
            const errMsg = typeof result.data === 'string' ? result.data : JSON.stringify(result.data);
            if (!isMissingColumn(errMsg)) break; // real error — stop laddering
        }
        if (!result.ok) throw new Error(typeof result.data === 'string' ? result.data : 'Failed to load orders');

        res.json({ orders: result.data || [], total: result.count || 0, page, perPage });
    } catch (err) {
        console.error('[Admin] list orders error:', err.message);
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/admin/orders/:id', requireAdmin, async (req, res) => {
    try {
        const id = req.params.id;
        const orderRes = await supabase('orders?select=' + encodeURIComponent('*') + '&id=eq.' + encodeURIComponent(id));
        if (!orderRes.ok) throw new Error(typeof orderRes.data === 'string' ? orderRes.data : 'Order not found');
        const order = Array.isArray(orderRes.data) ? orderRes.data[0] : null;
        if (!order) return res.status(404).json({ error: 'Order not found.' });

        const itemsRes = await supabase('order_items?select=*&order_id=eq.' + encodeURIComponent(id) + '&order=id.asc');
        res.json({ order, items: (itemsRes.ok && Array.isArray(itemsRes.data)) ? itemsRes.data : [] });
    } catch (err) {
        console.error('[Admin] order detail error:', err.message);
        res.status(500).json({ error: err.message });
    }
});

app.patch('/api/admin/orders/:id', requireAdmin, async (req, res) => {
    try {
        const id = req.params.id;
        const body = req.body || {};
        const now = new Date().toISOString();
        const patch = {};

        if (body.status) {
            if (!ALL_STATUSES.includes(body.status)) return res.status(400).json({ error: 'Unknown status: ' + body.status });
            patch.status = body.status;
            if (body.status === 'shipped') patch.shipped_at = now;
            if (body.status === 'completed') patch.completed_at = now;
        }
        if (body.payment_status) {
            if (!['paid', 'unpaid', 'partially_refunded', 'refunded', 'failed'].includes(body.payment_status)) {
                return res.status(400).json({ error: 'Unknown payment status: ' + body.payment_status });
            }
            patch.payment_status = body.payment_status;
        }
        if (body.tracking_number !== undefined) patch.tracking_number = String(body.tracking_number);
        if (body.tracking_url !== undefined) patch.tracking_url = String(body.tracking_url);
        if (body.admin_notes !== undefined) patch.admin_notes = String(body.admin_notes);

        let result = await supabase('orders?id=eq.' + encodeURIComponent(id), {
            method: 'PATCH',
            headers: { Prefer: 'return=representation' },
            body: JSON.stringify(patch)
        });
        if (!result.ok && isMissingColumn(typeof result.data === 'string' ? result.data : JSON.stringify(result.data))) {
            OPTIONAL_PATCH_COLS.forEach(c => delete patch[c]);
            if (Object.keys(patch).length) {
                result = await supabase('orders?id=eq.' + encodeURIComponent(id), {
                    method: 'PATCH',
                    headers: { Prefer: 'return=representation' },
                    body: JSON.stringify(patch)
                });
            } else {
                return res.json({ order: null, warning: 'Saved what the current database supports — run admin-migration.sql to enable the rest.' });
            }
        }
        if (!result.ok) throw new Error(typeof result.data === 'string' ? result.data : 'Failed to update order');
        res.json({ order: Array.isArray(result.data) ? result.data[0] : result.data });
    } catch (err) {
        console.error('[Admin] update order error:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// POST /api/admin/orders/bulk  { ids: [...], status?, payment_status? }
app.post('/api/admin/orders/bulk', requireAdmin, async (req, res) => {
    try {
        const body = req.body || {};
        const ids = (Array.isArray(body.ids) ? body.ids : []).map(String).filter(Boolean);
        if (!ids.length) return res.status(400).json({ error: 'No orders selected.' });
        if (!body.status && !body.payment_status) return res.status(400).json({ error: 'Nothing to change.' });

        const now = new Date().toISOString();
        const patch = {};
        if (body.status) {
            if (!ALL_STATUSES.includes(body.status)) return res.status(400).json({ error: 'Unknown status: ' + body.status });
            patch.status = body.status;
            if (body.status === 'shipped') patch.shipped_at = now;
            if (body.status === 'completed') patch.completed_at = now;
        }
        if (body.payment_status) {
            if (!['paid', 'unpaid', 'partially_refunded', 'refunded', 'failed'].includes(body.payment_status)) {
                return res.status(400).json({ error: 'Unknown payment status: ' + body.payment_status });
            }
            patch.payment_status = body.payment_status;
        }

        const chunk = 50;
        let updated = 0;
        let warned = false;
        for (let i = 0; i < ids.length; i += chunk) {
            const slice = ids.slice(i, i + chunk);
            let body = patch;
            let result = await supabase('orders?id=in.(' + slice.join(',') + ')', {
                method: 'PATCH',
                headers: { Prefer: 'return=representation' },
                body: JSON.stringify(body)
            });
            if (!result.ok && isMissingColumn(typeof result.data === 'string' ? result.data : JSON.stringify(result.data))) {
                const stripped = {};
                Object.keys(body).forEach(k => { if (!OPTIONAL_PATCH_COLS.includes(k)) stripped[k] = body[k]; });
                if (Object.keys(stripped).length) {
                    body = stripped;
                    warned = true;
                    result = await supabase('orders?id=in.(' + slice.join(',') + ')', {
                        method: 'PATCH',
                        headers: { Prefer: 'return=representation' },
                        body: JSON.stringify(body)
                    });
                }
            }
            if (!result.ok) throw new Error(typeof result.data === 'string' ? result.data : 'Bulk update failed');
            updated += Array.isArray(result.data) ? result.data.length : 0;
        }
        res.json({ updated, warning: warned ? 'Updated what the current database supports — run admin-migration.sql to enable the rest.' : null });
    } catch (err) {
        console.error('[Admin] bulk update error:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// POST /api/admin/orders/:id/refund  { amount?, reason? }  (amount in dollars)
// Creates a Stripe refund and marks the order's payment status.
app.post('/api/admin/orders/:id/refund', requireAdmin, async (req, res) => {
    try {
        if (!stripe) {
            return res.status(503).json({ error: 'Stripe is not configured — set STRIPE_SECRET_KEY to process refunds.' });
        }
        const id = req.params.id;
        const body = req.body || {};

        let orderRes = await supabase('orders?select=id,payment_intent_id,total,refunded_amount&id=eq.' + encodeURIComponent(id));
        if (!orderRes.ok && isMissingColumn(typeof orderRes.data === 'string' ? orderRes.data : JSON.stringify(orderRes.data))) {
            orderRes = await supabase('orders?select=id,total&id=eq.' + encodeURIComponent(id));
        }
        if (!orderRes.ok) throw new Error('Could not load order');
        const order = Array.isArray(orderRes.data) ? orderRes.data[0] : null;
        if (!order) return res.status(404).json({ error: 'Order not found.' });
        if (!order.payment_intent_id) return res.status(400).json({ error: 'This order has no Stripe payment intent — it cannot be refunded online. Update its payment status manually instead.' });

        const total = Number(order.total) || 0;
        const already = Number(order.refunded_amount) || 0;
        const remaining = Math.max(total - already, 0);
        let amount = body.amount === undefined || body.amount === null || body.amount === '' ? remaining : Number(body.amount);
        if (!(amount > 0)) return res.status(400).json({ error: 'Invalid refund amount.' });
        if (amount > remaining + 0.001) return res.status(400).json({ error: 'Refund amount exceeds the remaining balance of $' + remaining.toFixed(2) + '.' });
        amount = Math.round(amount * 100) / 100;

        const refund = await stripe.refunds.create({
            payment_intent: order.payment_intent_id,
            amount: Math.round(amount * 100),
            reason: (body.reason && ['requested_by_customer', 'duplicate', 'fraudulent'].includes(body.reason)) ? body.reason : 'requested_by_customer',
            metadata: { order_id: String(id) }
        });

        const newRefunded = Math.round((already + amount) * 100) / 100;
        const paymentStatus = newRefunded >= total - 0.001 ? 'refunded' : 'partially_refunded';
        const patch = {
            refunded_amount: newRefunded,
            payment_status: paymentStatus,
            refund_reason: body.reason || 'requested_by_customer'
        };
        let updRes = await supabase('orders?id=eq.' + encodeURIComponent(id), {
            method: 'PATCH',
            headers: { Prefer: 'return=representation' },
            body: JSON.stringify(patch)
        });
        let warning = null;
        if (!updRes.ok && isMissingColumn(typeof updRes.data === 'string' ? updRes.data : JSON.stringify(updRes.data))) {
            warning = 'Refund succeeded in Stripe but the order could not be updated — run admin-migration.sql to track refunds on orders.';
            updRes = { ok: true, data: null };
        } else if (!updRes.ok) {
            throw new Error('Refund created in Stripe but the order could not be updated — check the Stripe dashboard.');
        }

        res.json({
            ok: true,
            refundId: refund.id,
            amount,
            paymentStatus,
            warning,
            order: Array.isArray(updRes.data) ? updRes.data[0] : updRes.data
        });
    } catch (err) {
        console.error('[Admin] refund error:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// GET /api/admin/stats?from=&to= — dashboard analytics computed server-side.
app.get('/api/admin/stats', requireAdmin, async (req, res) => {
    try {
        const from = String(req.query.from || '').trim();
        const to = String(req.query.to || '').trim();

        // Ladder: newest schema first; legacy flags whether payment fields exist.
        let ordersRes = null;
        let legacy = false;
        for (const [cols, isLegacy] of [
            ['id,created_at,total,status,payment_status,refunded_amount', false],
            ['id,created_at,total,status', true],
            ['*', true]
        ]) {
            const p = new URLSearchParams();
            p.set('select', cols);
            p.set('order', 'created_at.asc');
            if (from) p.append('created_at', 'gte.' + from);
            if (to) p.append('created_at', 'lte.' + to);
            ordersRes = await supabase('orders?' + p.toString());
            if (ordersRes.ok) { legacy = isLegacy; break; }
            const errMsg = typeof ordersRes.data === 'string' ? ordersRes.data : JSON.stringify(ordersRes.data);
            if (!isMissingColumn(errMsg)) break;
        }
        if (!ordersRes.ok) throw new Error(typeof ordersRes.data === 'string' ? ordersRes.data : 'Failed to load stats');

        const itemsRes = await supabase('order_items?select=product_name,product_slug,unit_price,quantity&limit=10000');

        const orders = (ordersRes.data || []).map(o => {
            const refunded = legacy ? 0 : Number(o.refunded_amount) || 0;
            const paymentStatus = legacy ? (o.status === 'paid' ? 'paid' : 'unpaid') : (o.payment_status || 'unpaid');
            return {
                id: o.id,
                created_at: o.created_at,
                total: Number(o.total) || 0,
                status: o.status || 'pending',
                payment_status: paymentStatus,
                refunded_amount: refunded
            };
        });
        const items = (itemsRes.ok && Array.isArray(itemsRes.data)) ? itemsRes.data : [];

        const grossRevenue = orders.reduce((s, o) => s + o.total, 0);
        const refundAmount = orders.reduce((s, o) => s + o.refunded_amount, 0);
        const netRevenue = Math.round((grossRevenue - refundAmount) * 100) / 100;
        const nonCancelled = orders.filter(o => o.status !== 'cancelled');
        const aov = nonCancelled.length ? Math.round((netRevenue / nonCancelled.length) * 100) / 100 : 0;

        const statusBreakdown = {};
        const paymentBreakdown = {};
        ALL_STATUSES.forEach(s => statusBreakdown[s] = { count: 0, revenue: 0 });
        ['paid', 'unpaid', 'partially_refunded', 'refunded', 'failed'].forEach(p => paymentBreakdown[p] = { count: 0, revenue: 0 });
        orders.forEach(o => {
            statusBreakdown[o.status] = statusBreakdown[o.status] || { count: 0, revenue: 0 };
            statusBreakdown[o.status].count += 1;
            statusBreakdown[o.status].revenue += o.total;
            paymentBreakdown[o.payment_status] = paymentBreakdown[o.payment_status] || { count: 0, revenue: 0 };
            paymentBreakdown[o.payment_status].count += 1;
            paymentBreakdown[o.payment_status].revenue += o.total;
        });

        // Last 30 days of net revenue, zero-filled.
        const dailyMap = {};
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const days = [];
        for (let i = 29; i >= 0; i--) {
            const d = new Date(today.getTime() - i * 86400000);
            const key = d.toISOString().slice(0, 10);
            days.push(key);
            dailyMap[key] = { date: key, revenue: 0, orders: 0 };
        }
        orders.forEach(o => {
            const key = String(o.created_at || '').slice(0, 10);
            if (dailyMap[key]) {
                dailyMap[key].revenue += o.total - o.refunded_amount;
                dailyMap[key].orders += 1;
            }
        });
        const daily = days.map(k => ({ date: k, revenue: Math.round(dailyMap[k].revenue * 100) / 100, orders: dailyMap[k].orders }));

        const productMap = {};
        items.forEach(it => {
            const name = it.product_name || it.product_slug || 'Unknown product';
            const key = it.product_slug || name;
            productMap[key] = productMap[key] || { name, slug: it.product_slug || '', quantity: 0, revenue: 0 };
            productMap[key].quantity += Number(it.quantity) || 0;
            productMap[key].revenue += (Number(it.unit_price) || 0) * (Number(it.quantity) || 0);
        });
        const topProducts = Object.values(productMap)
            .map(p => ({ ...p, revenue: Math.round(p.revenue * 100) / 100 }))
            .sort((a, b) => b.revenue - a.revenue)
            .slice(0, 10);

        const activeOrders = orders.filter(o => ACTIVE_STATUSES.includes(o.status)).length;
        const completedOrders = orders.filter(o => o.status === 'completed').length;
        const refundCount = orders.filter(o => o.refunded_amount > 0).length;

        const recent = orders.slice(-8).reverse().map(o => ({
            id: o.id, created_at: o.created_at, total: o.total,
            status: o.status, payment_status: o.payment_status
        }));

        res.json({
            generatedAt: new Date().toISOString(),
            legacyMode: legacy,
            kpis: {
                grossRevenue: Math.round(grossRevenue * 100) / 100,
                refundAmount: Math.round(refundAmount * 100) / 100,
                netRevenue,
                orders: orders.length,
                aov,
                activeOrders,
                completedOrders,
                refundCount
            },
            statusBreakdown: Object.entries(statusBreakdown).map(([status, v]) => ({ status, ...v })),
            paymentBreakdown: Object.entries(paymentBreakdown).map(([status, v]) => ({ status, ...v })),
            daily,
            topProducts,
            recentOrders: recent
        });
    } catch (err) {
        console.error('[Admin] stats error:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// GET /api/admin/export?q=&status=&payment=&from=&to= → CSV download
app.get('/api/admin/export', requireAdmin, async (req, res) => {
    try {
        const q = String(req.query.q || '').trim();
        let statuses = String(req.query.status || '').trim().split(',').filter(Boolean);
        let payments = String(req.query.payment || '').trim().split(',').filter(Boolean);
        const from = String(req.query.from || '').trim();
        const to = String(req.query.to || '').trim();

        if (statuses.includes('active')) statuses = statuses.filter(s => s !== 'active').concat(ACTIVE_STATUSES);
        if (statuses.includes('past')) statuses = statuses.filter(s => s !== 'past').concat(PAST_STATUSES);

        const params = new URLSearchParams();
        params.set('order', 'created_at.desc');
        params.set('limit', '5000');
        if (from) params.append('created_at', 'gte.' + from);
        if (to) params.append('created_at', 'lte.' + to);
        if (statuses.length) params.set('status', 'in.(' + statuses.join(',') + ')');
        if (q) params.set('or', '(customer_name.ilike.*' + q.replace(/'/g, "''") + '*,customer_email.ilike.*' + q.replace(/'/g, "''") + '*,id::text.ilike.*' + q.replace(/'/g, "''") + '*)');

        let result = null;
        for (const cols of ORDER_COL_LADDER) {
            const p = new URLSearchParams(params);
            p.set('select', cols);
            if (payments.length && cols !== MIN_ORDER_COLS && cols !== BASE_ORDER_COLS) {
                p.set('payment_status', 'in.(' + payments.join(',') + ')');
            }
            result = await supabase('orders?' + p.toString());
            if (result.ok) break;
            const errMsg = typeof result.data === 'string' ? result.data : JSON.stringify(result.data);
            if (!isMissingColumn(errMsg)) break;
        }
        if (!result.ok) throw new Error('Failed to export orders');

        const rows = result.data || [];
        const esc = v => {
            const s = (v === null || v === undefined) ? '' : (typeof v === 'object' ? JSON.stringify(v) : String(v));
            // Guard against CSV formula injection (=, +, -, @ leading cells).
            const guarded = /^[=+\-@]/.test(s) ? "'" + s : s;
            return /[",\n]/.test(guarded) ? '"' + guarded.replace(/"/g, '""') + '"' : guarded;
        };
        const header = ['id', 'created_at', 'customer_name', 'customer_email', 'customer_phone', 'total', 'status', 'payment_status', 'refunded_amount', 'tracking_number', 'tracking_url', 'shipping_address', 'notes', 'admin_notes', 'payment_intent_id'];
        const lines = [header.join(',')];
        rows.forEach(o => {
            lines.push([o.id, o.created_at, o.customer_name, o.customer_email, o.customer_phone, o.total, o.status, o.payment_status || '', o.refunded_amount || 0, o.tracking_number || '', o.tracking_url || '', o.shipping_address || '', o.notes || '', o.admin_notes || '', o.payment_intent_id || ''].map(esc).join(','));
        });
        const csv = '\uFEFF' + lines.join('\r\n');
        res.setHeader('Content-Type', 'text/csv; charset=utf-8');
        res.setHeader('Content-Disposition', 'attachment; filename="orders-' + new Date().toISOString().slice(0, 10) + '.csv"');
        res.send(csv);
    } catch (err) {
        console.error('[Admin] export error:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// Serve static assets — patchkraze.com/ first, then frontend/ root.
// These run BEFORE the CDN proxy so locally downloaded assets (logos,
// product images, theme files) are served directly instead of being
// proxied to Shopify (many of those CDN URLs now return 404).
// Server source / package files must never be downloadable.
const BLOCKED_STATIC = ['/server.js', '/package.json', '/package-lock.json', '/vercel.json', '/netlify-build.js', '/start-server.bat', '/.env', '/.env.example'];
app.use((req, res, next) => {
    if (BLOCKED_STATIC.includes(req.path.toLowerCase())) {
        return res.status(404).end();
    }
    next();
});
app.use(express.static(ROOT));
app.use(express.static(__dirname));

// Proxy remaining /cdn/ paths to Shopify CDN (fallback for files that
// were not downloaded locally).
app.use((req, res, next) => {
    if (!req.path.startsWith('/cdn')) {
        return next();
    }
    
    const cdnPath = req.path; // Keep the full path including /cdn
    let shopifyUrl;
    if (cdnPath.startsWith('/cdn/shop/files/')) {
        shopifyUrl = `https://cdn.shopify.com/s/files/1/0661/2965/7940/files/${cdnPath.replace('/cdn/shop/files/', '')}`;
    } else if (cdnPath.startsWith('/cdn/shop/')) {
        shopifyUrl = `https://cdn.shopify.com/s/files/1/0661/2965/7940${cdnPath.replace('/cdn/shop', '')}`;
    } else if (cdnPath.startsWith('/cdn/')) {
        shopifyUrl = `https://cdn.shopify.com${cdnPath.replace('/cdn', '')}`;
    } else {
        shopifyUrl = `https://cdn.shopify.com${cdnPath}`;
    }
    console.log(`Proxying CDN request: ${cdnPath} -> ${shopifyUrl}`);
    https.get(shopifyUrl, (proxyRes) => {
        // Pass through Shopify's status code (previously always 200, which
        // masked upstream 404s with an HTML error body)
        res.status(proxyRes.statusCode || 200);
        res.set('Content-Type', proxyRes.headers['content-type'] || 'application/octet-stream');
        res.set('Cache-Control', 'public, max-age=86400');
        proxyRes.pipe(res);
    }).on('error', (err) => {
        console.error(`CDN proxy error for ${shopifyUrl}:`, err.message);
        res.status(404).send('Not found');
    });
});

// Permanent redirects for moved/renamed product pages
const permanentRedirects = {
    '/products/genuine-leather-patches': '/products/leather-patches',
    '/products/chrome-flex-patches': '/products/full-color-flex-patches',
    '/products/rubber-patches-for-hats': '/products/pvc-rubber-patches',

    '/products/core-365-ce002-adult-drive-performance-visor-2': '/collections/all',
    '/products/custom-keychains': '/collections/all',
    '/policies/shipping-policy': '/policies/refund-policy',
    '/collections/blanks': '/collections/patch-kraze-blanks',
};

// Temporary redirects for content pages not yet built
const temporaryRedirects = {
    '/pages/heatpress-for-garments': '/blogs/patches/the-complete-guide-to-heat-pressing-custom-patches-temperature-time-techniques',
    '/pages/heatpress-for-hats': '/blogs/patches/the-complete-guide-to-heat-pressing-custom-patches-temperature-time-techniques',
    '/pages/iron-for-garments': '/blogs/patches/the-complete-guide-to-heat-pressing-custom-patches-temperature-time-techniques',
    '/pages/peel-and-stick': '/blogs/patches/the-complete-guide-to-heat-pressing-custom-patches-temperature-time-techniques',
    '/pages/order-issues': '/pages/contact',
    '/pages/faq': '/pages/contact',
    '/pages/satisfaction-guarantee': '/policies/refund-policy',
    '/pages/printhouse': '/',
    '/pages/pod': '/',
};

// Clean URL handler: /products/foo → patchkraze.com/products/foo.html
app.get('/{*splat}', (req, res) => {
    if (permanentRedirects[req.path]) {
        return res.redirect(301, permanentRedirects[req.path]);
    }
    if (temporaryRedirects[req.path]) {
        return res.redirect(302, temporaryRedirects[req.path]);
    }
    const candidates = [
        path.join(ROOT, req.path + '.html'),
        path.join(ROOT, req.path, 'index.html'),
        path.join(ROOT, req.path),
    ];
    for (const candidate of candidates) {
        if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
            return res.sendFile(candidate);
        }
    }
    res.status(404).send(`<h2>Page not found: ${req.path}</h2><p><a href="/">← Home</a></p>`);
});

// Export for Vercel serverless
module.exports = app;

// Listen only when run directly (local dev)
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Site running at http://localhost:${PORT}`);
        console.log(`Root: ${ROOT}`);
    });
}
