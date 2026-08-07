---
kind: external_dependency
name: Shopify CDN asset proxying
slug: shopify-cdn
category: external_dependency
category_hints:
    - framework_behavior
    - client_constraint
scope:
    - '**'
---

Static assets under `/cdn/shop/files/*`, `/cdn/s/*`, `/cdn/shopifycloud/*`, `/cdn/wpm/*`, and `/cdn/fonts/*` are proxied to `cdn.shopify.com` both in the Express server (Node `https.get` proxy) and in Netlify build-time redirects. The site serves a static export of a Shopify theme rooted at `frontend/patchkraze.com`; product images and theme assets are fetched live from Shopify's CDN rather than vendored.