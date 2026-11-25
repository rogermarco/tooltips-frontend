import { iconMap } from './iconMap';
import type {
  Civ,
  CivStrings,
  MasterLine,
  MasterTech,
  MasterTechTree,
  UniqueStrings,
  UniqueTechs,
  UniqueUnit,
} from '../types/techTypes';

export interface CivLine extends MasterLine {
  availableProgression: string[];
  current: string;
  disabled: boolean;
  icon: string | null;
}
export interface CivTech extends MasterTech {
  disabled: boolean;
  icon: string | null;
}
export interface CivBuilding {
  lines: Record<string, CivLine>;
  techs: Record<string, CivTech>;
  icon: string | undefined;
}
type WithIcon<T> = T & { icon: string | null };
export interface CivTechTree {
  civId: string;
  uniques: { unit: WithIcon<UniqueUnit>; hero?: WithIcon<UniqueUnit> };
  uniqueTechs:
    | { castle: WithIcon<UniqueTechs['castle']>; imperial: WithIcon<UniqueTechs['imperial']> }
    | undefined;
  techTree: Record<string, CivBuilding>;
}

// These units exist in the master tech tree but are regional
// They only appear for civs that specifically list them inside their "regionals" field.
const regionalUnits = new Set([
  'eagle-scout',
  'eagle-warrior',
  'elite-eagle-warrior',
  'flemish-militia',
  'fire-lancer',
  'elite-fire-lancer',
  'jian-swordsman',
  'condottiero',
  'slinger',
  'genitour',
  'elite-genitour',
  'elephant-archer',
  'elite-elephant-archer',
  'grenadier',
  'xianbei-raider',
  'xolotl-warrior',
  'camel-scout',
  'camel-rider',
  'heavy-camel-rider',
  'imperial-camel-rider',
  'steppe-lancer',
  'elite-steppe-lancer',
  'hei-guang-cavalry',
  'heavy-hei-guang-cavalry',
  'shrivamsha-rider',
  'elite-shrivamsha-rider',
  'battle-elephant',
  'elite-battle-elephant',
  'armored-elephant',
  'siege-elephant',
  'rocket-cart',
  'heavy-rocket-cart',
  'war-chariot',
  'flaming-camel',
  'mounted-trebuchet',
  'traction-trebuchet',
  'turtle-ship',
  'elite-turtle-ship',
  'longboat',
  'elite-longboat',
  'caravel',
  'elite-caravel',
  'dromon',
  'lou-chuan',
  'thirisadai',
  'warrior-priest',
  'missionary',
  'catapult-galleon',
  'champi-scout',
  'champi-runner',
  'champi-warrior',
  'elite-champi-warrior',
  'ibirapema-warrior',
  'elite-ibirapema',
  'bolas-rider',
  'elite-bolas-rider',
  'temple-guard',
  'elite-temple-guard',
  'mounted-crossbow',
  'heavy-mounted-crossbow',
  'varangian-guard',
  'elite-varangian-guard',
  'longship',
  'elite-longship',
]);

/**
 * Merge master tree + civ data, remove unused regionals, and embed icon URLs.
 * Returns null when the civ isn't in civStrings.
 */
export function buildCivTechTree(
  civId: string,
  civStrings: CivStrings,
  uniqueStrings: UniqueStrings,
  techTree: MasterTechTree,
): CivTechTree | null {
  const civ: Civ | undefined = civStrings[civId];
  const uniqueTechs = uniqueStrings[civId];
  if (!civ) {
    console.warn(`No civ data found for ${civId}`);
    return null;
  }

  const excludedTechs = new Set(civ.excludedTechs);
  const uniques = civ.uniques;
  const regionals = civ.regionals || {};
  const replacements = civ.replacements || {};

  // --- Collect civ's regionals (ones they actually have) ---
  const civRegionalUnits = new Set<string>();
  const regionalsUnitData = regionals.unit;

  if (Array.isArray(regionalsUnitData)) {
    regionalsUnitData.forEach((u) => civRegionalUnits.add(u));
  } else if (typeof regionalsUnitData === 'string') {
    civRegionalUnits.add(regionalsUnitData);
  } else if (regionalsUnitData?.name) {
    civRegionalUnits.add(regionalsUnitData.name);
  }

  // --- Begin merging ---
  const mergedTree = Object.entries(techTree).reduce<Record<string, CivBuilding>>(
    (acc, [building, data]) => {
      const buildingData: CivBuilding = { lines: {}, techs: {}, icon: iconMap[building] };

      // ----- UNIT LINES -----
      for (const [lineName, line] of Object.entries(data.lines || {})) {
        // Remove fully regional lines if civ doesn't get them
        const isRegionalLine = line.progression.every((u) =>
          regionalUnits.has(u),
        );
        if (isRegionalLine) {
          const civHasIt = line.progression.some((u) =>
            civRegionalUnits.has(u),
          );
          if (!civHasIt) continue;
        }

        // Clone base progression
        let progression = [...line.progression];

        // Adjust progression if civ has unique replacements (eg Savar)
        const replacementForBuilding = replacements?.[building]?.[lineName];
        if (replacementForBuilding) {
          const { replace, with: replaceWith } = replacementForBuilding;
          const idx = progression.indexOf(replace);
          if (idx !== -1) progression.splice(idx, 1, replaceWith);
          else progression.push(replaceWith);
        }

        // Apply civ-specific extensions (eg Imperial Skirmisher)
        const extensionForBuilding = civ.extensions?.[building]?.[lineName];
        if (extensionForBuilding) {
          progression = [...progression, ...extensionForBuilding];
        }

        // Filter progression to what civ actually gets
        const availableProgression = progression.filter(
          (u) =>
            !excludedTechs.has(u) &&
            (!regionalUnits.has(u) || civRegionalUnits.has(u)),
        );

        if (
          availableProgression.length === 0 &&
          lineName !== 'bombard-cannon'
        ) {
          continue; // skip lines civ can't train
        }

        const current = (availableProgression.at(-1) ?? progression.at(-1))!;

        buildingData.lines[lineName] = {
          ...line,
          progression,
          availableProgression,
          current,
          disabled: availableProgression.length === 0,
          icon: iconMap[current] || null,
        };
      }

      // ----- TECHNOLOGIES -----
      for (const [techName, techData] of Object.entries(data.techs || {})) {
        buildingData.techs[techName] = {
          ...techData,
          disabled: excludedTechs.has(techName),
          icon: iconMap[techName] || null,
        };
      }

      acc[building] = buildingData;
      return acc;
    },
    {},
  );

  // ----- Add icons for uniques -----
  // Copy rather than mutate: the inputs are react-query's cached data.
  function withIcon(item: UniqueUnit): WithIcon<UniqueUnit>;
  function withIcon(item: UniqueUnit | undefined): WithIcon<UniqueUnit> | undefined;
  function withIcon(item: UniqueUnit | undefined) {
    if (!item) return item;
    const key = item.name.toLowerCase().replace(/\s+/g, '-');
    return { ...item, icon: iconMap[key] || null };
  }
  const uniquesWithIcons = {
    ...uniques,
    unit: withIcon(uniques.unit),
    hero: withIcon(uniques.hero),
  };
  const uniqueTechsWithIcons = uniqueTechs && {
    ...uniqueTechs,
    castle: { ...uniqueTechs.castle, icon: iconMap['unique-tech-1'] ?? null },
    imperial: { ...uniqueTechs.imperial, icon: iconMap['unique-tech-2'] ?? null },
  };

  return {
    civId,
    uniques: uniquesWithIcons,
    uniqueTechs: uniqueTechsWithIcons,
    techTree: mergedTree,
  };
}
