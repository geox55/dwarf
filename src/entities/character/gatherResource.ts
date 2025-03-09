import { GameState } from "src/pages/Game";

import { ResourceMap } from "./types/character";
import { TILE_TYPES } from "../gameProcess/types/tile";

// Функция для добычи ресурсов
export const gatherResource = (gameState: GameState, gatherPos: { x: number, y: number }): GameState | null => {
  const { map, player } = gameState;
  const playerTileType = map[player.position.y][player.position.x];
  const targetTileType = map[gatherPos.y][gatherPos.x];
  const resources: Record<TILE_TYPES, ResourceMap> = {
    [TILE_TYPES.GRASS]: { WOOD: 5 },
    [TILE_TYPES.MOUNTAIN]: { STONE: 5, IRON: 0.1 },
    [TILE_TYPES.TREE]: { WOOD: 5 },
    [TILE_TYPES.FARM]: { RICE: 5 },
    [TILE_TYPES.FARM_WITH_RICE]: { RICE: 5 },
  };

  if (player.energy < 5) {
    console.warn("Not enough energy to gather resources.");
    return null;
  }

  let tileTypeToGather: TILE_TYPES | null = null;
  let tileToChange = null;
  // Проверяем, находимся ли мы на горе или ферме
  if (
    playerTileType === TILE_TYPES.FARM ||
    playerTileType === TILE_TYPES.FARM_WITH_RICE
  ) {
    tileTypeToGather = playerTileType;
    tileToChange = { x: player.position.x, y: player.position.y };
  } else if (targetTileType === TILE_TYPES.TREE || targetTileType === TILE_TYPES.MOUNTAIN) {
    // Проверяем, находимся ли мы рядом с деревом или горой
      tileTypeToGather = targetTileType;
      tileToChange = { x: gatherPos.x, y: gatherPos.y };
  } else {
        console.warn("Cannot gather resources here.");
        return null;
    }

  if (!tileTypeToGather) {
    console.warn("Cannot gather resources here.");
    return null;
  }

  if (!resources[tileTypeToGather]) {
    console.warn("Cannot gather resources from this tile.");
    return null;
  }

  const newPlayer = { ...player, energy: player.energy - 5 };
  const gainedResources: ResourceMap = {};

  for (const resource in resources[tileTypeToGather]) {
    if (resource === "IRON" && Math.random() > resources[tileTypeToGather][resource])
      continue;
    if (resource !== "IRON") {
      gainedResources[resource] = resources[tileTypeToGather][resource];
    } else {
      gainedResources[resource] = (gainedResources[resource] || 0) + 1;
    }
  }

  for (const resource in gainedResources) {
    newPlayer.inventory[resource] = (newPlayer.inventory[resource] || 0) + gainedResources[resource];
  }

  // Change the tile to GRASS if tile is TREE or MOUNTAIN.
  const newMap = [...map];
  if (tileTypeToGather === TILE_TYPES.TREE || tileTypeToGather === TILE_TYPES.MOUNTAIN) {
    newMap[tileToChange.y][tileToChange.x] = TILE_TYPES.GRASS;
  }

  return { ...gameState, player: newPlayer, map: newMap };
};
