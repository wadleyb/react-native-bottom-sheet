import type { SkaiType } from '../types/skai';
import { useWorldStore } from '../store/worldStore';

interface DiscoveryRule {
  type: SkaiType;
  requiredNearby: SkaiType[];
  sourceType: SkaiType;
  chance: number;
  description: string;
}

const DISCOVERY_RULES: DiscoveryRule[] = [
  {
    type: 'FISH',
    requiredNearby: ['WATER_PATCH'],
    sourceType: 'HUMAN',
    chance: 0.15,
    description: 'Human discovered fish in water',
  },
  {
    type: 'BEE',
    requiredNearby: ['FLOWER'],
    sourceType: 'HUMAN',
    chance: 0.2,
    description: 'Human found bees near flowers',
  },
  {
    type: 'FLOWER',
    requiredNearby: ['TREE'],
    sourceType: 'HUMAN',
    chance: 0.25,
    description: 'Human discovered flowers in forest',
  },
  {
    type: 'HOUSE',
    requiredNearby: ['TREE'],
    sourceType: 'HUMAN',
    chance: 0.1,
    description: 'Human built a house near trees',
  },
  {
    type: 'BUSH',
    requiredNearby: ['TREE'],
    sourceType: 'HUMAN',
    chance: 0.3,
    description: 'Human found bushes near trees',
  },
  {
    type: 'ROCK',
    requiredNearby: ['TREE'],
    sourceType: 'HUMAN',
    chance: 0.25,
    description: 'Human discovered rocks',
  },
  {
    type: 'WOLF',
    requiredNearby: ['TREE'],
    sourceType: 'COW',
    chance: 0.08,
    description: 'Wolves appeared near the forest',
  },
  {
    type: 'FIRE',
    requiredNearby: ['HOUSE'],
    sourceType: 'HUMAN',
    chance: 0.15,
    description: 'Human discovered fire',
  },
  {
    type: 'ROAD',
    requiredNearby: ['HOUSE'],
    sourceType: 'HUMAN',
    chance: 0.12,
    description: 'Human built roads',
  },
];

function checkProximity(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  maxDistance: number
): boolean {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const distance = Math.sqrt(dx * dx + dy * dy);
  return distance <= maxDistance;
}

export function checkDiscoveries() {
  const store = useWorldStore.getState();
  const entities = store.entities.filter((e) => e.alive);

  store.checkDailyReset();

  const stats = store.stats;
  if (stats.discoveriesToday >= stats.dailyDiscoveryLimit) {
    return;
  }

  for (const rule of DISCOVERY_RULES) {
    if (Math.random() > rule.chance) continue;

    const alreadyDiscovered = store.discoveries.some(
      (d) => d.type === rule.type
    );
    if (alreadyDiscovered) continue;

    const sourceEntities = entities.filter((e) => e.type === rule.sourceType);
    if (sourceEntities.length === 0) continue;

    for (const source of sourceEntities) {
      const hasRequiredNearby = rule.requiredNearby.every((reqType) => {
        return entities.some(
          (e) =>
            e.type === reqType &&
            checkProximity(source.x, source.y, e.x, e.y, 200)
        );
      });

      if (hasRequiredNearby) {
        const now = Date.now();
        const timeSinceLastDiscovery = source.lastDiscoveryAt
          ? now - source.lastDiscoveryAt
          : Infinity;

        if (timeSinceLastDiscovery > 30000) {
          const success = store.registerDiscovery(rule.type, rule.description);

          if (success) {
            useWorldStore.setState({
              entities: entities.map((e) =>
                e.id === source.id ? { ...e, lastDiscoveryAt: now } : e
              ),
            });
            return;
          }
        }
      }
    }
  }

  if (Math.random() < 0.02) {
    const ufoDiscovered = store.discoveries.some((d) => d.type === 'UFO');
    if (!ufoDiscovered) {
      store.registerDiscovery('UFO', 'Random mysterious appearance');
    }
  }
}

export function maybeSpawnSaplings() {
  const store = useWorldStore.getState();
  const trees = store.entities.filter((e) => e.type === 'TREE' && e.alive);

  if (trees.length > 0 && Math.random() < 0.05) {
    const parentTree = trees[Math.floor(Math.random() * trees.length)];

    const offsetX = (Math.random() - 0.5) * 120;
    const offsetY = (Math.random() - 0.5) * 120;

    store.spawnSkai('TREE', parentTree.x + offsetX, parentTree.y + offsetY);

    store.registerEvent('A new sapling sprouted', 'SPAWN');
  }
}
