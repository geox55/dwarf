import { TILE_TYPES, TileType } from "./types/tile";

// Генерация карты
export const generateMap = (): TileType[][] => {
  const size = 30;
  const map: TileType[][] = Array(size)
    .fill(null)
    .map(() => Array(size).fill(TILE_TYPES.GRASS));

  // Генерация рек
  const generateRiver = () => {
    const start = [Math.floor(Math.random() * size), 0];
    const end = [Math.floor(Math.random() * size), size - 1];
    let [x, y] = start;
    while (x !== end[0] || y !== end[1]) {
      map[y][x] = TILE_TYPES.RIVER;
      if (Math.random() < 0.5) x += x < end[0] ? 1 : -1;
      else y += y < end[1] ? 1 : -1;
    }
  };

  // Генерация гор
  const generateMountains = () => {
    for (let i = 0; i < 5; i++) { // Генерируем 5 гор
      const mountainX = Math.floor(Math.random() * size);
      const mountainY = Math.floor(Math.random() * size);

      // Рисуем гору в 3x3
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const x = mountainX + dx;
          const y = mountainY + dy;
          if (x >= 0 && x < size && y >= 0 && y < size) {
            map[y][x] = TILE_TYPES.MOUNTAIN;
          }
        }
      }
    }
  };

  // Генерация деревьев
  const generateTrees = () => {
    for (let i = 0; i < 40; i++) { // Генерируем 40 деревьев
      const treeX = Math.floor(Math.random() * size);
      const treeY = Math.floor(Math.random() * size);
      if (map[treeY][treeX] === TILE_TYPES.GRASS) {
        map[treeY][treeX] = TILE_TYPES.TREE;
      }
    }
  };

  generateRiver();
  generateMountains();
  generateTrees();
  console.log("map", map);
  return map;
};
