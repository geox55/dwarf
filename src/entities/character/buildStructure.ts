import { GameState } from "src/pages/Game";

import { Player, ResourceMap } from "./types/character";
import { TILE_TYPES, TileType } from "../gameProcess/types/tile";
import { STRUCTURES } from "../structures/structures";

export interface ActionResult {
  player: Player;
  map: TileType[][];
}

const hasEnoughResources = (inventory: ResourceMap, requirements: ResourceMap): boolean => {
  for (const resource in requirements) {
    if (!(resource in inventory) || inventory[resource] < requirements[resource]) {
      return false;
    }
  }
  return true;
};

const deductResources = (inventory: ResourceMap, requirements: ResourceMap): ResourceMap => {
  const newInventory = { ...inventory };
  for (const resource in requirements) {
    newInventory[resource] -= requirements[resource];
    if (newInventory[resource] === 0) {
      delete newInventory[resource];
    }
  }
  return newInventory;
};

// Функция для строительства
export const buildStructure = (
  gameState: GameState,
  structureName: string,
  buildPos: { x: number; y: number }
): GameState | null => {
  const { map, player } = gameState;
  const structure = STRUCTURES[structureName];

  if (!structure) {
    console.error(`Structure "${structureName}" not found.`);
    return null;
  }

  if (!hasEnoughResources(player.inventory, structure.cost)) {
    console.warn(`Not enough resources to build ${structureName}`);
    return null;
  }

  if (buildPos.x < 0 || buildPos.x >= map[0].length || buildPos.y < 0 || buildPos.y >= map.length) {
    console.warn("Can't build out of map");
    return null;
  }

  const targetTile = map[buildPos.y][buildPos.x];
  if (structureName === "BRIDGE" && targetTile !== TILE_TYPES.RIVER) {
    console.warn("Can only build a bridge on a river.");
    return null;
  }
  if (structureName !== "BRIDGE" && targetTile !== TILE_TYPES.GRASS) {
    console.warn("Can't build here");
    return null;
  }

  const newInventory = deductResources(player.inventory, structure.cost);
  const newMap = [...map];
  newMap[buildPos.y][buildPos.x] = structure.type;

  return { ...gameState, map: newMap, player: { ...player, inventory: newInventory } };
};

// Функция для сноса строений
export const demolishStructure = (
  gameState: GameState,
  demolishPos: { x: number; y: number }
): GameState | null => {
  const { map, player } = gameState;
  const targetTile = map[demolishPos.y][demolishPos.x];

  if (
    targetTile !== TILE_TYPES.CAMPFIRE &&
    targetTile !== TILE_TYPES.WALL &&
    targetTile !== TILE_TYPES.BRIDGE &&
    targetTile !== TILE_TYPES.WORKBENCH
  ) {
    console.warn("Can't demolish here");
    return null;
  }
  const structureToDemolish = Object.values(STRUCTURES).find((s) => s.type === targetTile);

  if (!structureToDemolish) {
    console.warn(`Structure not found.`);
    return null;
  }

  const newMap = [...map];
  newMap[demolishPos.y][demolishPos.x] = TILE_TYPES.GRASS;

  const newInventory = { ...player.inventory };
  for (const resource in structureToDemolish.cost) {
    newInventory[resource] =
      (newInventory[resource] || 0) + structureToDemolish.cost[resource];
  }

  return {
    ...gameState,
    map: newMap,
    player: { ...player, inventory: newInventory },
  };
};
