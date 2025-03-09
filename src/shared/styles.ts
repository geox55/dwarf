import { SxProps, Theme } from "@mui/material/styles";

// Стили для HUD (информационная панель)
export const hudStyles: SxProps<Theme> = {
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  backgroundColor: "#f0f0f0",
  padding: "10px",
  marginBottom: "10px",
  borderBottom: "1px solid #ccc",
};

// Стили для карты (map)
export const mapStyles: SxProps<Theme> = {
  border: "1px solid #000",
  backgroundColor: "#fff",
  width: "fit-content",
  margin: "0 auto",
  userSelect: "none",
  outline: "none",
  "&:focus": {
    outline: "none",
  },
};

// Стили для клетки (tile)
export const tileStyles: SxProps<Theme> = {
  width: "20px",
  height: "20px",
  boxSizing: "border-box",
  display: "flex", // Добавил display flex
  alignItems: "center", // Align items vertically
  justifyContent: "center", // Align items horizontally
  fontSize: "16px", // Set the font size for the emoji
  position: 'relative',
};

// Стили для игрока (player)
export const playerStyles: SxProps<Theme> = {
  position: "absolute", // Изменил position на absolute
  top: "0",
  left: "0",
  fontSize: "18px",
  zIndex: 10,
};

// Стили для GRASS клетки
export const grassTileStyles: SxProps<Theme> = {
  backgroundColor: "#90EE90",
};

// Стили для RIVER клетки
export const riverTileStyles: SxProps<Theme> = {
  backgroundColor: "#6495ED",
};

// Стили для MOUNTAIN клетки
export const mountainTileStyles: SxProps<Theme> = {
  backgroundColor: "#808080",
};

// Стили для DIRT клетки
export const dirtTileStyles: SxProps<Theme> = {
  backgroundColor: "#8B4513",
};
// Стили для FARM клетки
export const farmTileStyles: SxProps<Theme> = {
    backgroundColor: "#DEB887",
  };
  
  // Стили для FARM_WITH_RICE клетки
  export const farmWithRiceTileStyles: SxProps<Theme> = {
    backgroundColor: "#8FBC8F",
  };
  
  // Стили для CAMPFIRE клетки
  export const campfireTileStyles: SxProps<Theme> = {
    backgroundColor: "#FFA500",
  };
  
  // Стили для WALL клетки
  export const wallTileStyles: SxProps<Theme> = {
    backgroundColor: "#A9A9A9",
  };
  
  // Стили для BRIDGE клетки
  export const bridgeTileStyles: SxProps<Theme> = {
    backgroundColor: "#8B4513",
  };
  
  // Стили для WORKBENCH клетки
  export const workBenchTileStyles: SxProps<Theme> = {
    backgroundColor: "#778899",
  };

//объединим все стили для плиток в один объект.
export const tileTypeStyles: Record<string, string> = {
  GRASS: "#90EE90",
  RIVER: "#6495ED",
  MOUNTAIN: "#808080",
  DIRT: "#8B4513",
  TREE: "#90EE90",
  FARM: "#DEB887",
  FARM_WITH_RICE: "#8FBC8F",
  CAMPFIRE: "#FFA500",
  WALL: "#A9A9A9",
  BRIDGE: "#8B4513",
  WORKBENCH: "#778899",
};

export const tileEmoji: Record<string, string> = {
  TREE: "🌲",
  FARM: "🌾",
  FARM_WITH_RICE: "🍚",
  CAMPFIRE: "🔥",
  WALL: "🧱",
  BRIDGE: "🌉",
  WORKBENCH: "🛠️",
};

export const playerEmoji: string = "🧑‍🌾";
