import { Item, Weapon } from "./item";

export class Vector2D {
  x: number;
  y: number;

  constructor(public _x: number, public _y: number) {
    this.x = _x;
    this.y = _y;
  }

  add(vector: Vector2D) {
    this.x += vector.x;
    this.y += vector.y;
  }
}

export interface Character {
  position: Vector2D;
  name: string;
  maxHealth: number;
  health: number;
}
export interface ResourceMap {
  [key: string]: number;
}

// Тип игрока
export interface Player extends Character {
  maxHunger: number;
  hunger: number;
  maxEnergy: number;
  energy: number;
  inventory: ResourceMap; // Изменен тип инвентаря
  equippedWeapon: Weapon;
  gold: number;
}
