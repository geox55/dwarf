import { ResourceMap } from "../character/types/character";
import { TILE_TYPES } from "../gameProcess/types/tile";

export interface Structure {
    name: string;
    cost: ResourceMap;
    type: TILE_TYPES;
    description: string;
}

export const STRUCTURES: Record<string, Structure> = {
    CAMPFIRE: {
        name: 'Campfire',
        cost: { WOOD: 2 },
        type: TILE_TYPES.CAMPFIRE,
        description: 'Used to cook food.',
    },
    WALL: {
        name: 'Wall',
        cost: { WOOD: 1, STONE: 1 },
        type: TILE_TYPES.WALL,
        description: 'Protects from enemies.',
    },
    BRIDGE: {
        name: 'Bridge',
        cost: { WOOD: 3 },
        type: TILE_TYPES.BRIDGE,
        description: 'Allows crossing rivers.',
    },
    WORKBENCH: {
        name: 'Workbench',
        cost: { WOOD: 4, STONE: 4, IRON: 1 },
        type: TILE_TYPES.WORKBENCH,
        description: 'Used to craft weapons.',
    },
}
