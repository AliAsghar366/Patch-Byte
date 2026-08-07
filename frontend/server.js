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

// Stripe PaymentIntent endpoint (used by checkout page)
app.post('/api/create-payment-intent', async (req, res) => {
    if (!stripe) {
        return res.status(500).json({ error: 'Stripe is not configured on the server.' });
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

// Expose publishable key to frontend so it never has to guess
app.get('/api/stripe-config', (_req, res) => {
    res.json({ publishableKey: process.env.STRIPE_PUBLISHABLE_KEY || '' });
});

// Proxy all /cdn/ paths to Shopify CDN
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
        res.set('Content-Type', proxyRes.headers['content-type'] || 'application/octet-stream');
        res.set('Cache-Control', 'public, max-age=86400');
        proxyRes.pipe(res);
    }).on('error', (err) => {
        console.error(`CDN proxy error for ${shopifyUrl}:`, err.message);
        res.status(404).send('Not found');
    });
});

// Serve static assets — patchkraze.com/ first, then frontend/ root
app.use(express.static(ROOT));
app.use(express.static(__dirname));

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
