// Checks every civ in the real data: the automated version of clicking
// through each civ to see that icons, uniques and regionals appear.
//
//   npm test             -> test/fixtures/ (committed copy of the live data)
//   npm run test:local   -> the worker's local data (LOCAL_DATA_DIR)
import fs from 'node:fs';
import path from 'node:path';
import { describe, test, expect } from 'vitest';
import { buildCivTechTree, type CivTechTree } from './buildCivTechTree';
import { LOCAL_DATA_DIR } from '../../vite.config.js';
import type { Civ, CivStrings, MasterTechTree, UniqueStrings } from '../types/techTypes';

const source = process.env.TEST_DATA === 'local' ? 'local' : 'fixtures';
const dataDir =
  source === 'local' ? LOCAL_DATA_DIR : path.resolve(import.meta.dirname, '../../test/fixtures');

if (!fs.existsSync(dataDir)) {
  throw new Error(
    `Data folder not found: ${dataDir}\n` +
      (source === 'local'
        ? 'Set LOCAL_DATA_DIR in .env.local to the worker repo data folder (see .env.example).'
        : 'Run `npm run fetch-fixtures` to download the live data.'),
  );
}

const load = <T>(file: string): T =>
  JSON.parse(fs.readFileSync(path.join(dataDir, file), 'utf8')) as T;
const civStrings = load<CivStrings>('civstrings.json');
const uniqueStrings = load<UniqueStrings>('uniquestrings.json');
const techTree = load<MasterTechTree>('techtree.json');

// Regionals that civs may declare but which are intentionally never shown in
// the tree (kept in the data for future civs). Skipped by the regional check.
const HIDDEN_REGIONALS = new Set(['camel-scout']);

const declaredRegionals = (civ: Civ): string[] =>
  [civ.regionals?.unit ?? []]
    .flat()
    .map((u) => (typeof u === 'string' ? u : u.name))
    .filter((u) => !HIDDEN_REGIONALS.has(u));

const trees: Record<string, CivTechTree | null> = Object.fromEntries(
  Object.keys(civStrings).map((civId) => [
    civId,
    buildCivTechTree(civId, civStrings, uniqueStrings, techTree),
  ]),
);

const allLines = (tree: CivTechTree) =>
  Object.values(tree.techTree).flatMap((b) => Object.values(b.lines));

describe(`civ data (${source}: ${dataDir})`, () => {
  describe.each(Object.keys(civStrings))('%s', (civId) => {
    // Every civ in civStrings builds a tree; this keeps TypeScript happy
    const tree = trees[civId]!;

    test('builds a tree', () => {
      expect(trees[civId]).not.toBeNull();
    });

    test('every building, unit line and tech has an icon', () => {
      const missing = Object.entries(tree.techTree).flatMap(([building, data]) => [
        !data.icon && `building:${building}`,
        ...Object.values(data.lines)
          .filter((line) => !line.icon)
          .map((line) => `unit:${line.current}`),
        ...Object.entries(data.techs)
          .filter(([, tech]) => !tech.icon)
          .map(([name]) => `tech:${name}`),
      ]);
      expect(missing.filter(Boolean)).toEqual([]);
    });

    test('unique unit, hero and unique techs are present with icons', () => {
      expect(tree.uniques.unit?.icon, `unique unit "${tree.uniques.unit?.name}"`).toBeTruthy();
      if (tree.uniques.hero) {
        expect(tree.uniques.hero.icon, `hero "${tree.uniques.hero.name}"`).toBeTruthy();
      }
      expect(tree.uniqueTechs, 'missing from uniquestrings.json').toBeTruthy();
      expect(tree.uniqueTechs?.castle.icon).toBeTruthy();
      expect(tree.uniqueTechs?.imperial.icon).toBeTruthy();
    });

    test('every declared regional unit appears in the tree', () => {
      const shown = new Set(allLines(tree).flatMap((l) => l.availableProgression));
      const notShown = declaredRegionals(civStrings[civId]).filter((u) => !shown.has(u));
      expect(notShown).toEqual([]);
    });
  });

  // One file per data source; review the diff whenever data or logic changes.
  test('civ rosters match the saved snapshot', async () => {
    const rosters = Object.fromEntries(
      Object.entries(trees).map(([civId, tree]) => [
        civId,
        tree && {
          units: allLines(tree)
            .flatMap((l) => l.availableProgression)
            .sort(),
          unique: tree.uniques.unit?.name,
          hero: tree.uniques.hero?.name,
        },
      ]),
    );
    await expect(JSON.stringify(rosters, null, 2) + '\n').toMatchFileSnapshot(
      `../../test/rosters/${source}.json`,
    );
  });
});
