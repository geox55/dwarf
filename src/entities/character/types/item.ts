export interface Item {
  name: string;
  type: string;
  description: string;
  value: number;
};

export enum WeaponType {
  SWORD = 'SWORD',
  FISTS = 'FISTS',
}

export interface Weapon extends Item {
  damage: number;
  range: number;
  type: WeaponType;
}