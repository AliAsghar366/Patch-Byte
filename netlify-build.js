const fs   = require('fs');
const path = require('path');

function copyDir(src, dest, skip) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (skip && skip.some(p => s.replace(/\\/g, '/').includes(p))) continue;
    if (entry.isDirectory()) copyDir(s, d, skip);
    else fs.copyFileSync(s, d);
  }
}

// HTML pages — skip the accidental nested cdn/cdn scrape artifact AND the
// 600+MB product-image folder (product images still exist on Shopify's CDN,
// so they proxy through the netlify.toml redirect; only the logo ships
// locally because Shopify no longer serves that file).
copyDir('frontend/patchkraze.com', 'public', ['patchkraze.com/cdn/cdn', 'patchkraze.com/cdn/shop/files']);

// Theme CSS/JS — use updated source which has more files
copyDir('frontend/patchkraze.com/cdn/shop/t', 'public/cdn/shop/t');

// Fonts (served locally so they don't depend on external CDN)
copyDir('frontend/patchkraze.com/cdn/fonts', 'public/cdn/fonts');

// Logo — Shopify's CDN no longer serves this file, so ship it locally
fs.mkdirSync('public/cdn/shop/files', { recursive: true });
fs.copyFileSync(
  'frontend/patchkraze.com/cdn/shop/files/Patch_Kraft_Logo.jpg',
  'public/cdn/shop/files/Patch_Kraft_Logo.jpg'
);
fs.copyFileSync(
  'frontend/patchkraze.com/cdn/shop/files/order-process-banner.jpg',
  'public/cdn/shop/files/order-process-banner.jpg'
);
// Ordering-process step cards (text is baked into the images, so they ship
// locally — Shopify's CDN returns 404 for them)
for (let i = 1; i <= 4; i++) {
  fs.copyFileSync(
    `frontend/patchkraze.com/cdn/shop/files/order-process-${i}.png`,
    `public/cdn/shop/files/order-process-${i}.png`
  );
}
// Patch category card images (homepage + mega menu). These are brand-new
// images that never existed on Shopify's CDN, so they must ship locally or
// the /cdn/shop/files/* proxy would 404 them in production. The rest of each
// category's set stays in the source folder for future use.
const PATCH_CATEGORY_IMAGES = [
  'embroidered-patches-1.jpg',
  '3d-embroidered-patches-1.jpg',
  'full-color-printed-patches-1.jpg',
  'pvc-rubber-patches-1.jpg',
  'genuine-leather-patches-1.jpg',
  'faux-leather-patches-1.jpg',
  'woven-patches-1.jpg',
  'tpu-full-color-patches-1.jpg',
  'chenille-patches-1.jpg',
  'silicone-transfers-1.jpg',
  'custom-embroidered-name-patches-1.jpg',
  'dtf-transfers-1.jpg',
  'chrome-flex-patches-1.jpg',
  'custom-tackle-twill-letters-1.jpg',
  'custom-pvc-keychains-1.jpg'
];
for (const name of PATCH_CATEGORY_IMAGES) {
  fs.copyFileSync(
    `frontend/patchkraze.com/cdn/shop/files/${name}`,
    `public/cdn/shop/files/${name}`
  );
}

// patchbyte.js
copyDir('frontend/js', 'public/js');

console.log('Build complete — public/ ready');