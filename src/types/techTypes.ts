export interface UpgradeTier {
  name: string;
  cost: string;
  description: string;
}

export interface ThreeTierUpgrade {
  title: string;
  tierOne: UpgradeTier;
  tierTwo: UpgradeTier;
  tierThree: UpgradeTier;
}

export interface TwoTierUpgrade {
  title: string;
  tierOne: UpgradeTier;
  tierTwo: UpgradeTier;
}

export interface SingleUpgrade {
  title: string;
  cost: string;
  description: string;
}

export interface NoticeBox {
  text: string;
}

export interface TextContent {
  archerArmor: ThreeTierUpgrade;
  archerAttack: ThreeTierUpgrade;
  ballistics: SingleUpgrade;
  bloodlines: SingleUpgrade;
  cavalryArmor: ThreeTierUpgrade;
  infantryArmor: ThreeTierUpgrade;
  infantryCavalryAttack: ThreeTierUpgrade;
  lumbercamp: ThreeTierUpgrade;
  mill: ThreeTierUpgrade;
  pasture: ThreeTierUpgrade;
  noticeBox: NoticeBox;
  villUpgrades: TwoTierUpgrade;
}
