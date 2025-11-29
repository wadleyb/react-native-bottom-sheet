import { useEffect, useRef } from 'react';
import { AppState, type AppStateStatus } from 'react-native';
import { useWorldStore } from '../store/worldStore';
import { tickBehaviours } from '../systems/behaviour';
import { checkDiscoveries, maybeSpawnSaplings } from '../systems/discovery';
import { simulateOfflineProgress } from '../systems/offline';

const TICK_INTERVAL = 1000 / 30;

export const GameLoop: React.FC = () => {
  const lastTickRef = useRef(Date.now());
  const discoveryTimerRef = useRef(0);
  const saplingTimerRef = useRef(0);
  const appState = useRef(AppState.currentState);

  const speedMultiplier = useWorldStore((s) => s.ui.speedMultiplier);
  const tickWorld = useWorldStore((s) => s.tickWorld);

  useEffect(() => {
    simulateOfflineProgress();

    const interval = setInterval(() => {
      const now = Date.now();
      const deltaMs = now - lastTickRef.current;
      const deltaSeconds = (deltaMs / 1000) * speedMultiplier;

      lastTickRef.current = now;

      tickWorld(deltaSeconds);
      tickBehaviours(deltaSeconds);

      discoveryTimerRef.current += deltaMs;
      if (discoveryTimerRef.current > 60000) {
        checkDiscoveries();
        discoveryTimerRef.current = 0;
      }

      saplingTimerRef.current += deltaMs;
      if (saplingTimerRef.current > 120000) {
        maybeSpawnSaplings();
        saplingTimerRef.current = 0;
      }
    }, TICK_INTERVAL);

    const subscription = AppState.addEventListener(
      'change',
      (nextAppState: AppStateStatus) => {
        if (
          appState.current.match(/inactive|background/) &&
          nextAppState === 'active'
        ) {
          simulateOfflineProgress();
        }

        appState.current = nextAppState;
      }
    );

    return () => {
      clearInterval(interval);
      subscription.remove();
    };
  }, [speedMultiplier, tickWorld]);

  return null;
};
