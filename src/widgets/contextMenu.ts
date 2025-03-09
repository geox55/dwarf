import { Dispatch, SetStateAction } from "react";

import { GameState } from "src/pages/Game";

import { buildStructure, demolishStructure } from "src/entities/character/buildStructure";
import { digGround } from "src/entities/character/digGround";
import { gatherResource } from "src/entities/character/gatherResource";
import { TILE_TYPES } from "src/entities/gameProcess/types/tile";

export interface ContextMenuState {
  mouseX: number;
  mouseY: number;
  x: number;
  y: number;
}

export const handleContextMenu = (
  event: React.MouseEvent<HTMLDivElement>,
  x: number,
  y: number,
  setContextMenu: Dispatch<SetStateAction<ContextMenuState | null>>
) => {
  event.preventDefault();
  setContextMenu(
    null === null
      ? {
          mouseX: event.clientX - 2,
          mouseY: event.clientY - 4,
          x: x,
          y: y,
        }
      : // Repeated contextmenu when it is already open closes it with Chrome 84 on Ubuntu
        null
  );
};

export const handleClose = (
  setContextMenu: Dispatch<SetStateAction<ContextMenuState | null>>
) => {
  setContextMenu(null);
};

export const handleMenuItemClick = (
  action: string,
  gameState: GameState,
  contextMenu: ContextMenuState | null,
  setGameState: Dispatch<SetStateAction<GameState>>
) => {
  if (!contextMenu) return;
  const { x, y } = contextMenu;
  let result = null;
  switch (action) {
    case "gather":
      result = gatherResource(gameState, { x, y });
      break;
    case "dig":
      result = digGround(gameState);
      break;
    case "build_campfire":
      result = buildStructure(gameState, "CAMPFIRE", { x, y });
      break;
    case "build_wall":
      result = buildStructure(gameState, "WALL", { x, y });
      break;
    case "build_bridge":
      result = buildStructure(gameState, "BRIDGE", { x, y });
      break;
    case "build_workbench":
      result = buildStructure(gameState, "WORKBENCH", { x, y });
      break;
    case "demolish":
      result = demolishStructure(gameState, { x, y });
      break;
    default:
      break;
  }
  if (result) {
    setGameState(result);
  }
};

// Проверка на соседство плитки
export const isAdjacent = (tileX: number, tileY: number, gameState: GameState) => {
  const { position } = gameState.player;
  const dx = Math.abs(tileX - position.x);
  const dy = Math.abs(tileY - position.y);
  return (dx <= 1 && dy === 0) || (dx === 0 && dy <= 1);
};

export const canGather = (
  tileType: TILE_TYPES,
  gameState: GameState,
  contextMenu: ContextMenuState | null
): boolean => {
  if (!contextMenu) return false;
  const { x, y } = contextMenu;
  const { position } = gameState.player;

  const isAdjacentToTreeOrMountain = () => {
    return isAdjacent(x, y, gameState);
  };
  const isPlayerOnTile = () => {
    return position.x === x && position.y === y;
  }

  if (tileType === TILE_TYPES.TREE || tileType === TILE_TYPES.MOUNTAIN) {
    return isAdjacentToTreeOrMountain();
  }
  if (tileType === TILE_TYPES.FARM || tileType === TILE_TYPES.FARM_WITH_RICE) {
    return isPlayerOnTile();
  }

  return false;
};

export const canDemolish = (
  tileType: TILE_TYPES
): boolean => {
    return (
        tileType === TILE_TYPES.CAMPFIRE ||
        tileType === TILE_TYPES.WALL ||
        tileType === TILE_TYPES.BRIDGE ||
        tileType === TILE_TYPES.WORKBENCH
    );
};
