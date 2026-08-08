const express = require('express');
const path = require('path');
const fs = require('fs');
const https = require('https');

// Load .env in local development (Vercel/Netlify inject env vars at runtime)
try { require('dotenv').config({ path: path.join(__dirname, '..', '.env') }); } catch (e) { /* ignore */ }

const stripe = process.env.STRIPE_SECRET_KEY ? require('stripe')(process.env.STRIPE_SECRET_KEY) : null;

const app = express();
const PORT = process.env.PORT || 3000;
const ROOT = path.join(__dirname, 'patchkraze.com');

app.use(express.json());

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

// Serve static assets — patchkraze.com/ first, then frontend/ root.
// These run BEFORE the CDN proxy so locally downloaded assets (logos,
// product images, theme files) are served directly instead of being
// proxied to Shopify (many of those CDN URLs now return 404).
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
