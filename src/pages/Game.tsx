import { useEffect, useRef, useState } from "react";

import { Box, Button, LinearProgress, Menu, MenuItem } from "@mui/material";

import {
  canDemolish,
  canGather,
  ContextMenuState,
  handleClose,
  handleContextMenu,
  handleMenuItemClick,
  isAdjacent,
} from "src/widgets/contextMenu";
import { movePlayer } from "src/entities/character/movePlayer";
import { Player, Vector2D } from "src/entities/character/types/character";
import { gameLoop } from "src/entities/gameProcess/gameLoop";
import { generateMap } from "src/entities/gameProcess/generateMap";
import { loadGame, saveGame } from "src/entities/gameProcess/saveLoad";
import { TILE_TYPES, TileType } from "src/entities/gameProcess/types/tile";

import { Weapons } from "src/shared/consts/weapons";
import {
  hudStyles,
  mapStyles,
  playerEmoji,
  playerStyles,
  tileEmoji,
  tileStyles,
  tileTypeStyles,
} from "src/shared/styles";

// Тип состояния игры
export interface GameState {
  map: TileType[][];
  player: Player;
  timeCycle: number;
}

const Game = () => {
  const initialGameState: GameState = {
    map: [],
    player: {
      position: new Vector2D(15, 15),
      name: "Player",
      maxHealth: 50,
      health: 50,
      maxHunger: 100,
      hunger: 100,
      maxEnergy: 100,
      energy: 100,
      inventory: {},
      gold: 0,
      equippedWeapon: Weapons["fists"],
    },
    timeCycle: 0,
  };
  const [gameState, setGameState] = useState<GameState>(initialGameState);
  const isInitialMount = useRef(true);
  const [hoveredTile, setHoveredTile] = useState<{ x: number; y: number } | null>(null);
  const [isSleeping, setIsSleeping] = useState(false);
  const [sleepProgress, setSleepProgress] = useState(0);
  const maxSleepCycles = 3;

  // Контекстное меню
  const [contextMenu, setContextMenu] = useState<ContextMenuState | null>(null);

  // Загрузка сохранения
  useEffect(() => {
    loadGame(setGameState);
  }, []);

  // Сохранение игры
  useEffect(() => {
    saveGame(gameState, isInitialMount);
  }, [gameState]);

  // Игровой цикл
  useEffect(() => {
    const cleanup = gameLoop(setGameState);
    return cleanup
  }, []);

  // Обработка движений
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (isSleeping) return; // Нельзя двигаться когда спишь
    const { position } = gameState.player;
    let newX = position.x;
    let newY = position.y;

    if (e.key === "w" || e.key === "W" || e.key === "ц" || e.key === "Ц") {
      newY--;
    } else if (e.key === "s" || e.key === "S" || e.key === "ы" || e.key === "Ы") {
      newY++;
    } else if (e.key === "a" || e.key === "A" || e.key === "ф" || e.key === "Ф") {
      newX--;
    } else if (e.key === "d" || e.key === "D" || e.key === "в" || e.key === "В") {
      newX++;
    }

    const newPos = new Vector2D(newX, newY);
    const moveResult = movePlayer(gameState, newPos);
    if (moveResult) {
      setGameState(moveResult);
    }
  };

  const handleNewGame = () => {
    localStorage.removeItem("gameState");
    setGameState({ ...initialGameState, map: generateMap() });
  };
  const handleSleep = () => {
    setIsSleeping(true);
    setSleepProgress(0);
  };

  useEffect(() => {
    if (isSleeping) {
      const sleepInterval = setInterval(() => {
        setGameState((prev) => ({
            ...prev,
            player: {
                ...prev.player,
                energy: Math.min(prev.player.maxEnergy, prev.player.energy + 15),
              },
          }))
        setSleepProgress((prev) => {
          const nextProgress = prev + 1;
          if (nextProgress >= maxSleepCycles) {
            setIsSleeping(false);
            clearInterval(sleepInterval);
            return 0;
          }
          return nextProgress;
        });
      }, 10000); // Имитация цикла, для наглядности
      return () => clearInterval(sleepInterval);
    }
  }, [isSleeping]);

  // Рендер карты
  return (
    <Box>
      <Box sx={hudStyles}>
        <div>Здоровье: {gameState.player.health}</div>
        <div>Голод: {gameState.player.hunger}</div>
        <div>Энергия: {gameState.player.energy}</div>
        <div>Дерево: {gameState.player.inventory.WOOD || 0}</div>
        <div>Камень: {gameState.player.inventory.STONE || 0}</div>
        <div>Железо: {gameState.player.inventory.IRON || 0}</div>
        <div>Рис: {gameState.player.inventory.RICE || 0}</div>
      </Box>
      <Button onClick={handleNewGame}>New Game</Button>
      <Button onClick={handleSleep} disabled={isSleeping}>
        Sleep
      </Button>
      {isSleeping && <LinearProgress variant="determinate" value={(sleepProgress / maxSleepCycles) * 100} />}
      <Box
        tabIndex={0}
        onKeyDown={handleKeyDown}
        sx={{
          ...mapStyles,
          display: "grid", // Make the map a grid container
          gridTemplateColumns: `repeat(30, 20px)`, // 30 columns, each 20px wide
        }}
      >
        {gameState.map.map((row, y) =>
          row.map((tile, x) => (
            <Box
              key={`${x}-${y}`}
              sx={{
                ...tileStyles,
                backgroundColor: tileTypeStyles[tile],
                "&::before": {
                  content: '""',
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  zIndex: 1000,
                  border:
                    hoveredTile?.x === x && hoveredTile.y === y
                      ? "1px solid red"
                      : "none",
                },
              }}
              onContextMenu={(event) =>
                handleContextMenu(event, x, y, setContextMenu)
              }
              onMouseEnter={() => setHoveredTile({ x, y })}
              onMouseLeave={() => setHoveredTile(null)}
            >
              {tileEmoji[tile] && <div>{tileEmoji[tile]}</div>}
              {gameState.player.position.x === x &&
                gameState.player.position.y === y && (
                  <Box sx={playerStyles}>{playerEmoji}</Box>
                )}
            </Box>
          ))
        )}
      </Box>
      {contextMenu && (
        <Menu
          open={contextMenu !== null}
          onClose={() => handleClose(setContextMenu)}
          anchorReference="anchorPosition"
          anchorPosition={
            contextMenu !== null
              ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
              : undefined
          }
        >
          {canGather(
            gameState.map[contextMenu.y][contextMenu.x],
            gameState,
            contextMenu
          ) && (
            <MenuItem
              onClick={() =>
                handleMenuItemClick(
                  "gather",
                  gameState,
                  contextMenu,
                  setGameState
                )
              }
            >
              Gather
            </MenuItem>
          )}
          {gameState.map[contextMenu.y][contextMenu.x] ===
            TILE_TYPES.GRASS && (
            <MenuItem
              onClick={() =>
                handleMenuItemClick("dig", gameState, contextMenu, setGameState)
              }
            >
              Dig Ground
            </MenuItem>
          )}
          {isAdjacent(contextMenu.x, contextMenu.y, gameState) && [
            <MenuItem
              key="build_campfire"
              onClick={() =>
                handleMenuItemClick(
                  "build_campfire",
                  gameState,
                  contextMenu,
                  setGameState
                )
              }
            >
              Build Campfire
            </MenuItem>,
            <MenuItem
              key="build_wall"
              onClick={() =>
                handleMenuItemClick(
                  "build_wall",
                  gameState,
                  contextMenu,
                  setGameState
                )
              }
            >
              Build Wall
            </MenuItem>,
            gameState.map[contextMenu.y][contextMenu.x] ===
              TILE_TYPES.RIVER && (
              <MenuItem
                key="build_bridge"
                onClick={() =>
                  handleMenuItemClick(
                    "build_bridge",
                    gameState,
                    contextMenu,
                    setGameState
                  )
                }
              >
                Build Bridge
              </MenuItem>
            ),
            <MenuItem
              key="build_workbench"
              onClick={() =>
                handleMenuItemClick(
                  "build_workbench",
                  gameState,
                  contextMenu,
                  setGameState
                )
              }
            >
              Build Workbench
            </MenuItem>,
          ]}
          {canDemolish(gameState.map[contextMenu.y][contextMenu.x]) && (
            <MenuItem
              onClick={() =>
                handleMenuItemClick(
                  "demolish",
                  gameState,
                  contextMenu,
                  setGameState
                )
              }
            >
              Demolish
            </MenuItem>
          )}
        </Menu>
      )}
    </Box>
  );
};

export default Game;
