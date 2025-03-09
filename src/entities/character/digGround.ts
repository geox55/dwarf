import { GameState } from "src/pages/Game";

import { TILE_TYPES } from "../gameProcess/types/tile";

export const digGround = (gameState: GameState): GameState | null => {
  const { map, player } = gameState;
  if (player.energy < 5) {
    console.warn("Not enough energy to dig ground");
    return null;
  }

  const newPlayer = { ...player, energy: player.energy - 5 };
  const newMap = [...map];
  if (newMap[player.position.y][player.position.x] === TILE_TYPES.GRASS) {
    newMap[player.position.y][player.position.x] = TILE_TYPES.FARM;
    return { ...gameState, player: newPlayer, map: newMap };
  } else {
    console.warn("Cannot dig ground here");
    return null;
  }
};