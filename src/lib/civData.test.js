// Checks every civ in the real data: the automated version of clicking
// through each civ to see that icons, uniques and regionals appear.
//
//   npm test             -> test/fixtures/ (committed copy of the live data)
//   npm run test:local   -> the worker's local data (LOCAL_DATA_DIR)
import fs from 'node:fs';
import path from 'node:path';
import { describe, test, expect } from 'vitest';
import { buildCivTechTree } from './buildCivTechTree';
import { LOCAL_DATA_DIR } from '../../vite.config.js';

const source = process.env.TEST_DATA === 'local' ? 'local' : 'fixtures';
const dataDir =
  source === 'local' ? LOCAL_DATA_DIR : path.resolve(__dirname, '../../test/fixtures');

const load = (file) => JSON.parse(fs.readFileSync(path.join(dataDir, file), 'utf8'));
const civStrings = load('civstrings.json');
const uniqueStrings = load('uniquestrings.json');
const techTree = load('techtree.json');

const declaredRegionals = (civ) =>
  [].concat(civ.regionals?.unit ?? []).map((u) => u.name ?? u);

const trees = Object.fromEntries(
  Object.keys(civStrings).map((civId) => [
    civId,
    buildCivTechTree(civId, civStrings, uniqueStrings, techTree),
  ]),
);

describe(`civ data (${source}: ${dataDir})`, () => {
  describe.each(Object.keys(civStrings))('%s', (civId) => {
    const tree = trees[civId];
    const lines = () => Object.values(tree.techTree).flatMap((b) => Object.values(b.lines));
    const shownUnits = () => new Set(lines().flatMap((l) => l.availableProgression));

    test('builds a tree', () => {
      expect(tree).not.toBeNull();
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
      expect(tree.uniqueTechs.castle.icon).toBeTruthy();
      expect(tree.uniqueTechs.imperial.icon).toBeTruthy();
    });

    test('every declared regional unit appears in the tree', () => {
      const shown = shownUnits();
      const notShown = declaredRegionals(civStrings[civId]).filter((u) => !shown.has(u));
      expect(notShown).toEqual([]);
    });
  });

  // One file per data source; review the diff whenever data or logic changes.
  test('civ rosters match the saved snapshot', async () => {
    const rosters = Object.fromEntries(
      Object.entries(trees).map(([civId, tree]) => [
        civId,
        {
          units: Object.values(tree.techTree)
            .flatMap((b) => Object.values(b.lines))
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
