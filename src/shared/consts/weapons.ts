import { Weapon, WeaponType } from "src/entities/character/types/item";

export const Weapons: Record<string, Weapon> = {
  "fists": {
    name: 'Fists',
    description: 'Обычные кулаки',
    value: 0,
    type: WeaponType.FISTS,
    damage: 2,
    range: 1,
  }
}