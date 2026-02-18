import { iconMap } from '../index.js';

// These units exist in the master tech tree but are regional
// They only appear for civs that specifically list them inside their "regionals" field.
const regionalUnits = [
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
];

/**
 * Merge master tree + civ data, remove unused regionals, and embed icon URLs.
 * @param {string} civId
 * @returns {object|null}
 */
export function buildCivTechTree(civId, civStrings, uniqueStrings, techTree) {
  const civ = civStrings[civId];
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
  const civRegionalUnits = new Set();
  const regionalsUnitData = regionals.unit;

  if (Array.isArray(regionalsUnitData)) {
    regionalsUnitData.forEach((u) => civRegionalUnits.add(u));
  } else if (regionalsUnitData?.name) {
    civRegionalUnits.add(regionalsUnitData.name);
  } else if (typeof regionalsUnitData === 'string') {
    civRegionalUnits.add(regionalsUnitData);
  }

  // --- Begin merging ---
  const mergedTree = Object.entries(techTree).reduce(
    (acc, [building, data]) => {
      const buildingData = { lines: {}, techs: {}, icon: iconMap[building] };

      // ----- UNIT LINES -----
      for (const [lineName, line] of Object.entries(data.lines || {})) {
        // Remove fully regional lines if civ doesn't get them
        const isRegionalLine = line.progression.every((u) =>
          regionalUnits.includes(u),
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
            (!regionalUnits.includes(u) || civRegionalUnits.has(u)),
        );

        if (availableProgression.length === 0) continue; // skip lines civ can't train

        const current = availableProgression.at(-1);

        buildingData.lines[lineName] = {
          ...line,
          progression,
          availableProgression,
          current,
          disabled: false,
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
  if (uniques.unit) {
    const key = uniques.unit.name.toLowerCase().replace(/\s+/g, '-');
    uniques.unit.icon = iconMap[key] || null;
  }
  if (uniques.hero) {
    const key = uniques.hero.name.toLowerCase().replace(/\s+/g, '-');
    uniques.hero.icon = iconMap[key] || null;
  }
  if (uniqueTechs) {
    uniqueTechs.castle.icon = iconMap['unique-tech-1'];
    uniqueTechs.imperial.icon = iconMap['unique-tech-2'];
  }

  // console.log(mergedTree);

  return {
    civId,
    uniques,
    uniqueTechs: uniqueTechs,
    techTree: mergedTree,
  };
}
