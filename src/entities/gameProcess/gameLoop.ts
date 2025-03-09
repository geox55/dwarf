import { Dispatch, SetStateAction } from "react";

import { GameState } from "src/pages/Game";

export const gameLoop = (setGameState: Dispatch<SetStateAction<GameState>>) => {
  const interval = setInterval(() => {
    setGameState((prev) => ({
      ...prev,
      timeCycle: prev.timeCycle + 1,
      player: {
        ...prev.player,
        hunger: prev.player.hunger - 1,
        energy: prev.player.energy - 2,
      },
    }));
  }, 10000);
  return () => clearInterval(interval);
};
