// Rules of buildCivTechTree, tested against small hand-written data so they
// don't depend on (or break with) the real data files.
import { describe, test, expect } from 'vitest';
import { buildCivTechTree, type CivTechTree } from './buildCivTechTree';
import type { Civ, CivStrings, MasterTechTree, UniqueStrings } from '../types/techTypes';

// The test data only has the fields buildCivTechTree reads, hence the casts.
const techTree = {
  'archery-range': {
    lines: {
      archer: { progression: ['archer', 'crossbowman', 'arbalester'] },
      skirmisher: { progression: ['skirmisher', 'elite-skirmisher'] },
    },
    techs: { 'thumb-ring': {}, 'parthian-tactics': {} },
  },
  stable: {
    lines: {
      knight: { progression: ['knight', 'cavalier', 'paladin'] },
      'camel-scout': { progression: ['camel-rider', 'heavy-camel-rider'] },
    },
    techs: { bloodlines: {} },
  },
} as unknown as MasterTechTree;

const baseCiv = {
  excludedTechs: [],
  uniques: { unit: { name: 'longbowman' } },
  regionals: {},
};
const uniqueTech = {
  castle: { title: 'Castle UT' },
  imperial: { title: 'Imperial UT' },
};

function build(civOverrides: Partial<Record<keyof Civ, unknown>> = {}): CivTechTree {
  const civStrings = { testciv: { ...baseCiv, ...civOverrides } } as unknown as CivStrings;
  const uniqueStrings = { testciv: structuredClone(uniqueTech) } as unknown as UniqueStrings;
  const tree = buildCivTechTree('testciv', civStrings, uniqueStrings, techTree);
  if (!tree) throw new Error('expected a tree for testciv');
  return tree;
}

describe('buildCivTechTree', () => {
  test('returns null for an unknown civ', () => {
    expect(buildCivTechTree('nope', {}, {}, techTree)).toBeNull();
  });

  test('drops a fully regional line when the civ does not declare it', () => {
    const tree = build();
    expect(tree.techTree.stable.lines['camel-scout']).toBeUndefined();
    expect(tree.techTree.stable.lines.knight).toBeDefined();
  });

  test.each([
    ['an array', ['camel-rider', 'heavy-camel-rider']],
    ['a string', 'camel-rider'],
    ['an object with a name', { name: 'camel-rider' }],
  ])('keeps a regional line when regionals.unit is %s', (_, unit) => {
    const line = build({ regionals: { unit } }).techTree.stable.lines['camel-scout'];
    expect(line).toBeDefined();
    expect(line.availableProgression).toContain('camel-rider');
  });

  test('excluded units are removed from the available progression', () => {
    const line = build({ excludedTechs: ['arbalester'] }).techTree['archery-range'].lines.archer;
    expect(line.availableProgression).toEqual(['archer', 'crossbowman']);
    expect(line.current).toBe('crossbowman');
  });

  test('a line with every unit excluded is skipped', () => {
    const tree = build({ excludedTechs: ['knight', 'cavalier', 'paladin'] });
    expect(tree.techTree.stable.lines.knight).toBeUndefined();
  });

  test('excluded techs are kept but disabled', () => {
    const techs = build({ excludedTechs: ['thumb-ring'] }).techTree['archery-range'].techs;
    expect(techs['thumb-ring'].disabled).toBe(true);
    expect(techs['parthian-tactics'].disabled).toBe(false);
  });

  test('replacements swap a unit in place', () => {
    const line = build({
      replacements: { stable: { knight: { replace: 'paladin', with: 'savar' } } },
    }).techTree.stable.lines.knight;
    expect(line.progression).toEqual(['knight', 'cavalier', 'savar']);
    expect(line.current).toBe('savar');
  });

  test('replacements append when the unit to replace is not in the line', () => {
    const line = build({
      replacements: { stable: { knight: { replace: 'missing', with: 'savar' } } },
    }).techTree.stable.lines.knight;
    expect(line.progression.at(-1)).toBe('savar');
  });

  test('extensions are appended to the end of a line', () => {
    const line = build({
      extensions: { 'archery-range': { skirmisher: ['imperial-skirmisher'] } },
    }).techTree['archery-range'].lines.skirmisher;
    expect(line.current).toBe('imperial-skirmisher');
  });

  test('buildings, units, techs and uniques get icons', () => {
    const tree = build({ uniques: { unit: { name: 'Longbowman' }, hero: { name: 'Liu Bei' } } });
    expect(tree.techTree.stable.icon).toBeTruthy();
    expect(tree.techTree.stable.lines.knight.icon).toBeTruthy();
    expect(tree.techTree.stable.techs.bloodlines.icon).toBeTruthy();
    expect(tree.uniques.unit.icon).toBeTruthy();
    expect(tree.uniques.hero?.icon).toBeTruthy();
    expect(tree.uniqueTechs?.castle.icon).toBeTruthy();
    expect(tree.uniqueTechs?.imperial.icon).toBeTruthy();
  });

  test('does not mutate its inputs (they are cached query data)', () => {
    const civStrings = { testciv: structuredClone(baseCiv) } as unknown as CivStrings;
    const uniqueStrings = { testciv: structuredClone(uniqueTech) } as unknown as UniqueStrings;
    const before = structuredClone({ civStrings, uniqueStrings, techTree });
    buildCivTechTree('testciv', civStrings, uniqueStrings, techTree);
    expect({ civStrings, uniqueStrings, techTree }).toEqual(before);
  });
});
