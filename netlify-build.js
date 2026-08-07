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

// HTML pages — skip the nested cdn/ folder inside patchkraze.com
copyDir('frontend/patchkraze.com', 'public', ['patchkraze.com/cdn']);

// Theme CSS/JS — use updated source which has more files
copyDir('frontend/patchkraze.com/cdn/shop/t', 'public/cdn/shop/t');

// Fonts (served locally so they don't depend on external CDN)
copyDir('frontend/patchkraze.com/cdn/fonts', 'public/cdn/fonts');

// patchbyte.js
copyDir('frontend/js', 'public/js');

console.log('Build complete — public/ ready');