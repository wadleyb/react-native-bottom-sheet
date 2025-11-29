import type { SkaiType } from './skai';

export type WorldEventCategory = 'DISCOVERY' | 'SPAWN' | 'DEATH' | 'SYSTEM';

export interface WorldEvent {
  id: string;
  category: WorldEventCategory;
  message: string;
  createdAt: number;
  count?: number;
}

export interface Discovery {
  id: string;
  type: SkaiType;
  discoveredAt: number;
  sourceDescription: string;
  claimed: boolean;
}

export interface WorldStats {
  createdAt: number;
  lastSeenAt: number;
  totalSpawnsUsed: number;
  freeSpawnsRemaining: number;
  dailyDiscoveryLimit: number;
  discoveriesToday: number;
  credits: number;
  lastDiscoveryReset: string; // date string for daily reset
}

export interface Bookmark {
  id: string;
  label: string;
  x: number;
  y: number;
  entityId?: string;
}

export interface WorldUI {
  isActivityOpen: boolean;
  isNewSkaiOpen: boolean;
  isSpawnMenuOpen: boolean;
  isSpeedBoostActive: boolean;
  speedMultiplier: number;
  speedBoostEndsAt?: number;
}

export interface Notification {
  id: string;
  message: string;
  createdAt: number;
}

export interface CameraState {
  x: number;
  y: number;
  scale: number;
}
