import { useWorldStore } from '../store/worldStore';
import { tickBehaviours } from './behaviour';
import { checkDiscoveries, maybeSpawnSaplings } from './discovery';

const OFFLINE_SPEED_FACTOR = 0.5;
const MAX_OFFLINE_SECONDS = 2 * 60 * 60;

export function simulateOfflineProgress() {
  const store = useWorldStore.getState();
  const now = Date.now();
  const lastSeen = store.stats.lastSeenAt;

  const elapsedMs = now - lastSeen;
  const elapsedSeconds = Math.floor(elapsedMs / 1000);

  if (elapsedSeconds < 60) {
    return;
  }

  const simulatedSeconds = Math.min(
    elapsedSeconds * OFFLINE_SPEED_FACTOR,
    MAX_OFFLINE_SECONDS
  );

  const tickInterval = 5;
  const numTicks = Math.floor(simulatedSeconds / tickInterval);

  for (let i = 0; i < numTicks; i++) {
    tickBehaviours(tickInterval);

    if (i % 12 === 0) {
      checkDiscoveries();
    }

    if (i % 20 === 0) {
      maybeSpawnSaplings();
    }
  }

  const minutes = Math.floor(simulatedSeconds / 60);
  const remainingSeconds = Math.floor(simulatedSeconds % 60);

  if (minutes > 0) {
    store.registerEvent(
      `Your world continued while you were away: ${minutes}m ${remainingSeconds}s passed`,
      'SYSTEM'
    );
  }

  store.updateStats({ lastSeenAt: now });
}
