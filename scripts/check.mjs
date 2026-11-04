import { readFile, stat } from 'node:fs/promises';
const root = new URL('../public/', import.meta.url);
const html = await readFile(new URL('index.html', root), 'utf8');
const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]));
const paths = new Set();
for (const [, reference] of html.matchAll(/\b(?:src|href)="([^"]+)"/g)) {
  if (/^(https?:|data:|mailto:)/.test(reference)) continue;
  if (reference.startsWith('#')) {
    if (!ids.has(reference.slice(1))) throw new Error(`Missing anchor: ${reference}`);
  } else paths.add(reference);
}
for (const board of ['driver', 'carrier']) {
  for (const side of ['front', 'back']) paths.add(`projects/led-${board}-${side}.png`);
}
for (const path of paths) {
  const file = await stat(new URL(path, root));
  if (!file.isFile()) throw new Error(`Missing file: ${path}`);
  if (file.size > 25 * 1024 * 1024) throw new Error(`Asset exceeds Pages file limit: ${path}`);
}
console.log(`Verified ${paths.size} assets and all navigation targets.`);
