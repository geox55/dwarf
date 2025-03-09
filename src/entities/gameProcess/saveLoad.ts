import { Dispatch, SetStateAction } from "react";

import { GameState } from "src/pages/Game";

import { generateMap } from "./generateMap";


export const loadGame = (setGameState: Dispatch<SetStateAction<GameState>>) => {
  const saved = localStorage.getItem("gameState");
  if (saved) {
    const parsedSaved = JSON.parse(saved) as GameState;
    setGameState(parsedSaved);
  } else {
    setGameState((prev) => ({ ...prev, map: generateMap() }));
  }
};

export const saveGame = (
  gameState: GameState,
  isInitialMount: React.MutableRefObject<boolean>
) => {
  if (isInitialMount.current) {
    isInitialMount.current = false;
  } else {
    localStorage.setItem("gameState", JSON.stringify(gameState));
  }
};
