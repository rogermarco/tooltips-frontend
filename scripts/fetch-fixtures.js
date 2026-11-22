// Downloads the live data into test/fixtures/ so `npm test` runs against a
// fixed, committed snapshot. Re-run whenever the published data changes.
import fs from 'node:fs/promises';
import path from 'node:path';

const BASE_URL = process.env.DATA_URL ?? 'https://rogermarco.work/data/';
const FILES = ['civstrings.json', 'uniquestrings.json', 'techtree.json'];
const OUT_DIR = path.resolve(import.meta.dirname, '../test/fixtures');

await fs.mkdir(OUT_DIR, { recursive: true });

for (const file of FILES) {
  const res = await fetch(BASE_URL + file);
  if (!res.ok) throw new Error(`${file}: ${res.status} ${res.statusText}`);
  const json = await res.json();
  await fs.writeFile(path.join(OUT_DIR, file), JSON.stringify(json, null, 2) + '\n');
  console.log(`saved ${file}`);
}
