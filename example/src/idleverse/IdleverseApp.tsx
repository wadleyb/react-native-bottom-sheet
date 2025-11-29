import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useWorldStore } from './store/worldStore';
import { WorldCanvas } from './components/WorldCanvas';
import { LeftToolbar } from './components/LeftToolbar';
import { ActivityLogPanel } from './components/ActivityLogPanel';
import { NewSkaiDashboard } from './components/NewSkaiDashboard';
import { SpawnMenu } from './components/SpawnMenu';
import { TopNotificationStack } from './components/TopNotificationStack';
import { BottomSpawnFab } from './components/BottomSpawnFab';
import { GameLoop } from './components/GameLoop';
import { loadWorldFromDatabase, saveWorldToDatabase } from './systems/persistence';

export const IdleverseApp: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [worldId, setWorldId] = useState<string | null>(null);
  const createWorld = useWorldStore((s) => s.createWorld);

  useEffect(() => {
    const initializeGame = async () => {
      try {
        const loadedWorldId = await loadWorldFromDatabase();

        if (loadedWorldId) {
          setWorldId(loadedWorldId);
        } else {
          createWorld();
          const newWorldData = await saveWorldToDatabase();
          if (newWorldData) {
            setWorldId(newWorldData.id);
          }
        }
      } catch (error) {
        console.error('Error initializing game:', error);
        createWorld();
      } finally {
        setIsLoading(false);
      }
    };

    initializeGame();
  }, [createWorld]);

  useEffect(() => {
    if (!worldId || isLoading) return;

    const saveInterval = setInterval(() => {
      saveWorldToDatabase(worldId);
    }, 30000);

    return () => clearInterval(saveInterval);
  }, [worldId, isLoading]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3B82F6" />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.container}>
        <WorldCanvas />
        <LeftToolbar />
        <ActivityLogPanel />
        <NewSkaiDashboard />
        <TopNotificationStack />
        <BottomSpawnFab />
        <SpawnMenu />
        <GameLoop />
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
  },
});
