import { GameState } from "src/pages/Game";

import { Vector2D } from "./types/character";
import { TILE_TYPES } from "../gameProcess/types/tile";

// Функция для перемещения игрока
export const movePlayer = (
  gameState: GameState,
  newPos: { x: number; y: number }
): GameState | null => {
  const { map, player } = gameState;
  if (newPos.x >= 0 && newPos.x < 30 && newPos.y >= 0 && newPos.y < 30) {
    const tile = map[newPos.y][newPos.x];
    // Add TILE_TYPES.WALL and TILE_TYPES.WORKBENCH to the list of impassable tiles
    if (
      tile !== TILE_TYPES.RIVER &&
      tile !== TILE_TYPES.MOUNTAIN &&
      tile !== TILE_TYPES.TREE &&
      tile !== TILE_TYPES.WALL &&
      tile !== TILE_TYPES.WORKBENCH
    ) {
      return {
        ...gameState,
        player: { ...player, position: new Vector2D(newPos.x, newPos.y) },
      };
    }
  }
  return null;
};
