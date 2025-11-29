import { create } from 'zustand';
import type { SkaiEntity, SkaiType } from '../types/skai';
import type {
  WorldEvent,
  Discovery,
  WorldStats,
  Bookmark,
  WorldUI,
  Notification,
  WorldEventCategory,
} from '../types/world';
import { STARTER_SKAI, SKAI_INFO } from '../types/skai';

interface WorldState {
  entities: SkaiEntity[];
  events: WorldEvent[];
  discoveries: Discovery[];
  stats: WorldStats;
  bookmarks: Bookmark[];
  ui: WorldUI;
  notifications: Notification[];
  spawnableTypes: SkaiType[];

  createWorld: () => void;
  spawnSkai: (type: SkaiType, x?: number, y?: number) => SkaiEntity | null;
  moveSkai: (id: string, newX: number, newY: number) => void;
  updateSkaiMood: (id: string, mood: SkaiEntity['mood']) => void;
  updateSkaiTarget: (id: string, targetX: number, targetY: number) => void;
  tickWorld: (deltaSeconds: number) => void;
  registerEvent: (message: string, category: WorldEventCategory) => void;
  registerDiscovery: (type: SkaiType, sourceDescription: string) => boolean;
  claimDiscovery: (id: string) => void;
  setBookmark: (label: string, x: number, y: number, entityId?: string) => void;
  deleteBookmark: (id: string) => void;
  applySpeedBoost: (multiplier: number, durationMinutes: number) => void;
  resetWorld: () => void;
  toggleActivity: () => void;
  toggleNewSkai: () => void;
  toggleSpawnMenu: () => void;
  addNotification: (message: string) => void;
  clearNotification: (id: string) => void;
  updateStats: (updates: Partial<WorldStats>) => void;
  checkDailyReset: () => void;
}

const generateId = () => Math.random().toString(36).substring(2, 11);

const getInitialStats = (): WorldStats => {
  const now = Date.now();
  const dailyLimit = Math.floor(Math.random() * 8) + 3; // 3-10
  return {
    createdAt: now,
    lastSeenAt: now,
    totalSpawnsUsed: 0,
    freeSpawnsRemaining: 25,
    dailyDiscoveryLimit: dailyLimit,
    discoveriesToday: 0,
    credits: 200,
    lastDiscoveryReset: new Date().toDateString(),
  };
};

export const useWorldStore = create<WorldState>((set, get) => ({
  entities: [],
  events: [],
  discoveries: [],
  stats: getInitialStats(),
  bookmarks: [],
  ui: {
    isActivityOpen: false,
    isNewSkaiOpen: false,
    isSpawnMenuOpen: false,
    isSpeedBoostActive: false,
    speedMultiplier: 1,
  },
  notifications: [],
  spawnableTypes: [...STARTER_SKAI],

  createWorld: () => {
    const stats = getInitialStats();
    set({
      entities: [],
      events: [],
      discoveries: [],
      stats,
      bookmarks: [],
      spawnableTypes: [...STARTER_SKAI],
      notifications: [],
    });

    get().registerEvent('A new world has begun. Welcome to Idleverse!', 'SYSTEM');

    // Spawn initial entities
    get().spawnSkai('TREE', -100, 100);
    get().spawnSkai('HUMAN', 0, 0);
  },

  spawnSkai: (type, x, y) => {
    const state = get();

    // Check if we can spawn
    if (state.stats.freeSpawnsRemaining <= 0 && state.stats.credits < SKAI_INFO[type].spawnCost) {
      get().addNotification('Not enough spawns or credits!');
      return null;
    }

    // Deduct cost
    if (state.stats.freeSpawnsRemaining > 0) {
      get().updateStats({
        freeSpawnsRemaining: state.stats.freeSpawnsRemaining - 1,
        totalSpawnsUsed: state.stats.totalSpawnsUsed + 1,
      });
    } else {
      get().updateStats({
        credits: state.stats.credits - SKAI_INFO[type].spawnCost,
        totalSpawnsUsed: state.stats.totalSpawnsUsed + 1,
      });
    }

    const entity: SkaiEntity = {
      id: generateId(),
      type,
      x: x ?? Math.random() * 400 - 200,
      y: y ?? Math.random() * 400 - 200,
      createdAt: Date.now(),
      alive: true,
      mood: 'IDLE',
      moveSpeed: Math.random() * 20 + 10,
    };

    set({ entities: [...state.entities, entity] });
    get().registerEvent(`Spawned a ${SKAI_INFO[type].name}`, 'SPAWN');

    return entity;
  },

  moveSkai: (id, newX, newY) => {
    set((state) => ({
      entities: state.entities.map((e) =>
        e.id === id ? { ...e, x: newX, y: newY } : e
      ),
    }));
  },

  updateSkaiMood: (id, mood) => {
    set((state) => ({
      entities: state.entities.map((e) =>
        e.id === id ? { ...e, mood } : e
      ),
    }));
  },

  updateSkaiTarget: (id, targetX, targetY) => {
    set((state) => ({
      entities: state.entities.map((e) =>
        e.id === id ? { ...e, targetX, targetY } : e
      ),
    }));
  },

  tickWorld: (deltaSeconds) => {
    // This will be called by the behaviour system
    const state = get();
    const now = Date.now();

    // Update lastSeenAt
    get().updateStats({ lastSeenAt: now });

    // Check if speed boost expired
    if (state.ui.isSpeedBoostActive && state.ui.speedBoostEndsAt && now >= state.ui.speedBoostEndsAt) {
      set((s) => ({
        ui: {
          ...s.ui,
          isSpeedBoostActive: false,
          speedMultiplier: 1,
          speedBoostEndsAt: undefined,
        },
      }));
      get().registerEvent('World returned to normal speed', 'SYSTEM');
    }
  },

  registerEvent: (message, category) => {
    const state = get();
    const recentEvent = state.events.find(
      (e) => e.message === message && Date.now() - e.createdAt < 5000
    );

    if (recentEvent) {
      // Increment count
      set((s) => ({
        events: s.events.map((e) =>
          e.id === recentEvent.id ? { ...e, count: (e.count || 1) + 1 } : e
        ),
      }));
    } else {
      const event: WorldEvent = {
        id: generateId(),
        category,
        message,
        createdAt: Date.now(),
        count: 1,
      };

      set((s) => ({
        events: [event, ...s.events].slice(0, 50), // Keep last 50
      }));
    }
  },

  registerDiscovery: (type, sourceDescription) => {
    const state = get();

    // Check daily limit
    get().checkDailyReset();
    const currentState = get();

    if (currentState.stats.discoveriesToday >= currentState.stats.dailyDiscoveryLimit) {
      return false;
    }

    // Check if already discovered
    if (currentState.discoveries.find((d) => d.type === type)) {
      return false;
    }

    const discovery: Discovery = {
      id: generateId(),
      type,
      discoveredAt: Date.now(),
      sourceDescription,
      claimed: false,
    };

    set((s) => ({
      discoveries: [...s.discoveries, discovery],
    }));

    get().updateStats({
      discoveriesToday: currentState.stats.discoveriesToday + 1,
    });

    get().registerEvent(
      `New discovery: ${SKAI_INFO[type].name} (${sourceDescription})`,
      'DISCOVERY'
    );
    get().addNotification(`Discovered: ${SKAI_INFO[type].name}!`);

    return true;
  },

  claimDiscovery: (id) => {
    const state = get();
    const discovery = state.discoveries.find((d) => d.id === id);

    if (!discovery || discovery.claimed) return;

    set((s) => ({
      discoveries: s.discoveries.map((d) =>
        d.id === id ? { ...d, claimed: true } : d
      ),
      spawnableTypes: [...s.spawnableTypes, discovery.type],
    }));

    get().registerEvent(
      `${SKAI_INFO[discovery.type].name} added to spawn menu`,
      'SYSTEM'
    );
    get().addNotification(`${SKAI_INFO[discovery.type].name} unlocked!`);
  },

  setBookmark: (label, x, y, entityId) => {
    const bookmark: Bookmark = {
      id: generateId(),
      label,
      x,
      y,
      entityId,
    };

    set((s) => ({
      bookmarks: [...s.bookmarks, bookmark],
    }));

    get().addNotification(`Bookmark "${label}" created`);
  },

  deleteBookmark: (id) => {
    set((s) => ({
      bookmarks: s.bookmarks.filter((b) => b.id !== id),
    }));
  },

  applySpeedBoost: (multiplier, durationMinutes) => {
    const state = get();
    const cost = 20;

    if (state.stats.credits < cost) {
      get().addNotification('Not enough credits!');
      return;
    }

    get().updateStats({ credits: state.stats.credits - cost });

    const endsAt = Date.now() + durationMinutes * 60 * 1000;

    set((s) => ({
      ui: {
        ...s.ui,
        isSpeedBoostActive: true,
        speedMultiplier: multiplier,
        speedBoostEndsAt: endsAt,
      },
    }));

    get().registerEvent(`World speed increased ${multiplier}x for ${durationMinutes} minutes`, 'SYSTEM');
    get().addNotification(`Speed boost activated!`);
  },

  resetWorld: () => {
    get().createWorld();
  },

  toggleActivity: () => {
    set((s) => ({
      ui: { ...s.ui, isActivityOpen: !s.ui.isActivityOpen },
    }));
  },

  toggleNewSkai: () => {
    set((s) => ({
      ui: { ...s.ui, isNewSkaiOpen: !s.ui.isNewSkaiOpen },
    }));
  },

  toggleSpawnMenu: () => {
    set((s) => ({
      ui: { ...s.ui, isSpawnMenuOpen: !s.ui.isSpawnMenuOpen },
    }));
  },

  addNotification: (message) => {
    const notification: Notification = {
      id: generateId(),
      message,
      createdAt: Date.now(),
    };

    set((s) => ({
      notifications: [...s.notifications, notification],
    }));

    // Auto-remove after 3 seconds
    setTimeout(() => {
      get().clearNotification(notification.id);
    }, 3000);
  },

  clearNotification: (id) => {
    set((s) => ({
      notifications: s.notifications.filter((n) => n.id !== id),
    }));
  },

  updateStats: (updates) => {
    set((s) => ({
      stats: { ...s.stats, ...updates },
    }));
  },

  checkDailyReset: () => {
    const state = get();
    const today = new Date().toDateString();

    if (state.stats.lastDiscoveryReset !== today) {
      get().updateStats({
        discoveriesToday: 0,
        lastDiscoveryReset: today,
      });
    }
  },
}));
