export type SkaiType =
  | 'HUMAN'
  | 'TREE'
  | 'COW'
  | 'WATER_PATCH'
  | 'BEE'
  | 'FISH'
  | 'ROCK'
  | 'FLOWER'
  | 'HOUSE'
  | 'UFO'
  | 'ROAD'
  | 'BUSH'
  | 'WOLF'
  | 'FIRE'
  | 'UNKNOWN';

export type SkaiMood = 'IDLE' | 'MOVING' | 'RESTING' | 'CURIOUS';

export interface SkaiEntity {
  id: string;
  type: SkaiType;
  x: number;
  y: number;
  createdAt: number;
  alive: boolean;
  mood?: SkaiMood;
  lastDiscoveryAt?: number;
  label?: string;
  targetX?: number;
  targetY?: number;
  moveSpeed?: number;
}

export interface SkaiTypeInfo {
  type: SkaiType;
  name: string;
  category: 'nature' | 'animal' | 'structure' | 'element' | 'unknown';
  description: string;
  spawnCost: number; // credits if no free spawns
}

export const SKAI_INFO: Record<SkaiType, SkaiTypeInfo> = {
  HUMAN: {
    type: 'HUMAN',
    name: 'Human',
    category: 'animal',
    description: 'Curious wanderers who discover new things',
    spawnCost: 5,
  },
  TREE: {
    type: 'TREE',
    name: 'Tree',
    category: 'nature',
    description: 'Provides shade and spawns saplings',
    spawnCost: 3,
  },
  COW: {
    type: 'COW',
    name: 'Cow',
    category: 'animal',
    description: 'Peaceful grazers that roam the land',
    spawnCost: 5,
  },
  WATER_PATCH: {
    type: 'WATER_PATCH',
    name: 'Water',
    category: 'element',
    description: 'Essential for fish and life',
    spawnCost: 4,
  },
  BEE: {
    type: 'BEE',
    name: 'Bee',
    category: 'animal',
    description: 'Pollinates flowers and produces honey',
    spawnCost: 4,
  },
  FISH: {
    type: 'FISH',
    name: 'Fish',
    category: 'animal',
    description: 'Swims in water patches',
    spawnCost: 4,
  },
  ROCK: {
    type: 'ROCK',
    name: 'Rock',
    category: 'nature',
    description: 'Sturdy stones scattered across the land',
    spawnCost: 2,
  },
  FLOWER: {
    type: 'FLOWER',
    name: 'Flower',
    category: 'nature',
    description: 'Beautiful blooms that attract bees',
    spawnCost: 3,
  },
  HOUSE: {
    type: 'HOUSE',
    name: 'House',
    category: 'structure',
    description: 'Shelter for humans',
    spawnCost: 10,
  },
  UFO: {
    type: 'UFO',
    name: 'UFO',
    category: 'unknown',
    description: 'Mysterious visitor from beyond',
    spawnCost: 20,
  },
  ROAD: {
    type: 'ROAD',
    name: 'Road',
    category: 'structure',
    description: 'Connects places together',
    spawnCost: 5,
  },
  BUSH: {
    type: 'BUSH',
    name: 'Bush',
    category: 'nature',
    description: 'Small shrubs and bushes',
    spawnCost: 2,
  },
  WOLF: {
    type: 'WOLF',
    name: 'Wolf',
    category: 'animal',
    description: 'Wild hunters of the forest',
    spawnCost: 8,
  },
  FIRE: {
    type: 'FIRE',
    name: 'Fire',
    category: 'element',
    description: 'Warm and dangerous',
    spawnCost: 6,
  },
  UNKNOWN: {
    type: 'UNKNOWN',
    name: '???',
    category: 'unknown',
    description: 'Something mysterious...',
    spawnCost: 0,
  },
};

export const STARTER_SKAI: SkaiType[] = ['HUMAN', 'TREE', 'WATER_PATCH', 'COW'];
