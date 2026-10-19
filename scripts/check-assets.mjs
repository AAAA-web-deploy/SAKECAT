/** Run with `node scripts/check-assets.mjs` (no dependencies needed). */
import fs from 'node:fs';
import path from 'node:path';
const root = process.cwd();
const files = [];
const source = [path.join(root,'app'),path.join(root,'components'),path.join(root,'lib')];
for (const start of source) {
  for (const name of fs.readdirSync(start)) {
    if (/\.(css|tsx|ts)$/.test(name)) files.push(path.join(start,name));
  }
}
const references = new Set();
for (const f of files) {
  const contents = fs.readFileSync(f,'utf8');
  const re = /["'`]((?:\/assets\/)[A-Za-z0-9_./-]+\.(?:webp|png|jpg|jpeg|svg|ico))["'`]/g;
  for(const match of contents.matchAll(re)) references.add(match[1]);
}
for (let i = 1; i <= 10; i++) {
  // File names are asserted independently to cover runtime-built paths too.
  const names = ['the-palace','the-mansion','old-town','first-class','roman-sunset','the-villa','opera-night','red-carpet','paris-lounge','the-back-room'];
  references.add(`/assets/grand-tour/reel-${String(i).padStart(2,'0')}-${names[i-1]}.webp`);
}
for (let i = 1; i <= 8; i++) references.add(`/assets/posters/poster-${String(i).padStart(2,'0')}.webp`);
const missing = [...references].filter(f => !fs.existsSync(path.join(root,'public',f)));
const actual = fs.readdirSync(path.join(root,'public','assets'),{recursive:true,withFileTypes:true})
  .filter(f => f.isFile()).length;
console.log(`Checked ${references.size} explicit image references; ${actual} asset files exist.`);
if (missing.length) {console.error('Missing:',missing);process.exitCode = 1;}
else console.log('All explicitly referenced image files present.');
