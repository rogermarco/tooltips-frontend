// Shapes of the JSON files served by the worker (rogermarco.work/data/).

export type Resource = 'food' | 'wood' | 'gold' | 'stone';

export interface Cost {
  // uniquestrings.json stores amounts as strings, the other files as numbers
  amount: number | string;
  resource: Resource;
}

/** Anything shown as a single card: title, cost and description. */
export interface SingleUpgrade {
  title: string;
  cost: Cost[];
  description: string;
}

export interface UpgradeTier {
  name: string;
  cost: Cost[];
  description: string;
}

/** An upgrade with two or three tiers, cycled with the arrow buttons. */
export interface TieredUpgrade {
  title: string;
  tierOne: UpgradeTier;
  tierTwo: UpgradeTier;
  tierThree?: UpgradeTier;
}

// ----- techstrings.json -----
export interface TextContent {
  archerArmor: TieredUpgrade;
  archerAttack: TieredUpgrade;
  ballistics: SingleUpgrade;
  bloodlines: SingleUpgrade;
  cavalryArmor: TieredUpgrade;
  infantryArmor: TieredUpgrade;
  infantryCavalryAttack: TieredUpgrade;
  lumbercamp: TieredUpgrade;
  mill: TieredUpgrade;
  pasture: TieredUpgrade;
  noticeBox: { text: string };
  villUpgrades: TieredUpgrade;
}

type KeysOfType<T, V> = { [K in keyof T]: T[K] extends V ? K : never }[keyof T];
export type TieredTechKey = KeysOfType<TextContent, TieredUpgrade>;
export type SingleTechKey = KeysOfType<TextContent, SingleUpgrade>;

// ----- uniquestrings.json -----
export interface UniqueTechs {
  castle: SingleUpgrade;
  imperial: SingleUpgrade;
}
export type UniqueStrings = Record<string, UniqueTechs>;

// ----- civstrings.json -----
export interface UniqueUnit {
  name: string;
  cost: Cost[];
  description: string;
}

export interface Civ {
  /** HTML overview shown on the first page of the civ tooltip */
  string: string;
  excludedTechs: string[];
  uniques: { unit: UniqueUnit; hero?: UniqueUnit };
  regionals?: { unit?: string | string[] | { name: string } };
  replacements?: Record<string, Record<string, { replace: string; with: string }>>;
  extensions?: Record<string, Record<string, string[]>>;
}
export type CivStrings = Record<string, Civ>;

// ----- techtree.json -----
export interface MasterLine {
  progression: string[];
  cost: Cost[];
}
export interface MasterTech {
  cost: Cost[];
  description?: string;
}
export type MasterTechTree = Record<
  string,
  { lines?: Record<string, MasterLine>; techs?: Record<string, MasterTech> }
>;

// ----- profiles.json -----
/** [left, top, id] in 1920px-wide stream coordinates */
export type Coordinate = [number, number, number];

export interface Profile {
  /** Keyed by icon name, e.g. "fletching.png" */
  coordinatesLeft?: Record<string, Coordinate>;
  coordinatesRight?: Record<string, Coordinate>;
  leftCivBox: [number, number];
  rightCivBox: [number, number];
}
export type Profiles = Record<string, Profile> & { defaultProfile: Profile };
