// Типы клеток
export enum TILE_TYPES {
  GRASS = "GRASS",
  RIVER = "RIVER",
  MOUNTAIN = "MOUNTAIN",
  DIRT = "DIRT",
  TREE = "TREE",
  FARM = "FARM",
  FARM_WITH_RICE = "FARM_WITH_RICE",
  CAMPFIRE = "CAMPFIRE",
  WALL = "WALL",
  BRIDGE = "BRIDGE",
  WORKBENCH = "WORKBENCH",
}

// Тип клетки
export type TileType = keyof typeof TILE_TYPES;
