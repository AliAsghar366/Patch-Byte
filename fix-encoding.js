const fs = require('fs');
const path = require('path');

const root = 'd:/zeesha/Patch-Byte-main/Patch-Byte-main/frontend/patchkraze.com';
const files = [];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p);
    else if (p.endsWith('.html')) files.push(p);
  }
}
walk(root);

let fixed = 0;
for (const f of files) {
  let c = fs.readFileSync(f, 'utf8');
  const before = c;

  // Copyright symbol
  c = c.replace(/Copyright � 2026/g, 'Copyright © 2026');

  // Curly/smart apostrophe replacements
  c = c.replace(/�ll/g, "'ll");
  c = c.replace(/�m/g, "'m");
  c = c.replace(/�re/g, "'re");
  c = c.replace(/�ve/g, "'ve");
  c = c.replace(/�s/g, "'s");
  c = c.replace(/�t/g, "'t");

  // Quantity minus button
  c = c.replace(/>�<\/button>/g, '>−</button>');

  // Product meta description leading ornament -> star
  c = c.replace(/content="� /g, 'content="★ ');

  // En-dash separator
  c = c.replace(/ -�/g, ' –');
  c = c.replace(/ � /g, ' – ');
  c = c.replace(/attachment�no/g, 'attachment—no');
  c = c.replace(/application�no/g, 'application—no');

  // Quoted terms
  c = c.replace(/ �we�, �us� and �our�/g, ' "we", "us" and "our"');
  c = c.replace(/�Services�/g, '"Services"');
  c = c.replace(/�Always Hustling�/g, '"Always Hustling"');
  c = c.replace(/�COME BACK�/g, '"COME BACK"');
  c = c.replace(/�As far as I know/g, '"As far as I know');

  // Missing period after email link
  c = c.replace(/orders@patchkraft\.com�<\/a>/g, 'orders@patchkraft.com.</a>');

  // JSON description ornament (escaped JSON in HTML attribute)
  c = c.replace(/\\"description\\":\\"�      /g, '\\"description\\":\\"★      ');
  c = c.replace(/"description":"�      /g, '"description":"★      ');

  // Ellipsis in loading text
  c = c.replace(/Loading�/g, 'Loading…');

  // Standalone paragraph ornament
  c = c.replace(/<p>�<\/p>/g, '<p>•</p>');

  // Curly quotes around terms
  c = c.replace(/these �Terms of Service�/g, 'these "Terms of Service"');
  c = c.replace(/or �Terms�\)/g, 'or "Terms")');
  c = c.replace(/delightful\.� This/g, 'delightful." This');

  // Ellipsis in placeholder text / button text
  c = c.replace(/instructions�"/g, 'instructions…"');
  c = c.replace(/Processing�'/g, "Processing…'");

  // Curly quotes
  c = c.replace(/ �as is� and �as avai/g, ' "as is" and "as avai');

  // JSON string orphan
  c = c.replace(/techniques\.\\n�\\",\\"headline\\"/g, 'techniques.\\n—\\",\\"headline\\"');

  // Terms of service closing curly quote
  c = c.replace(/as available� without/g, 'as available" without');

  if (c !== before) {
    fs.writeFileSync(f, c, 'utf8');
    fixed++;
  }
}

console.log('Fixed', fixed, 'files');
