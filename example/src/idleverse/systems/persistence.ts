import AsyncStorage from '@react-native-async-storage/async-storage';
import { useWorldStore } from '../store/worldStore';

const LOCAL_STORAGE_KEY = 'idleverse_world_state';

export async function saveWorldToDatabase(worldId?: string) {
  const store = useWorldStore.getState();

  try {
    const worldState = {
      entities: store.entities,
      events: store.events,
      discoveries: store.discoveries,
      bookmarks: store.bookmarks,
      spawnableTypes: store.spawnableTypes,
      stats: store.stats,
    };

    await AsyncStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(worldState));
    return { id: 'local' };
  } catch (error) {
    console.error('Error saving world:', error);
    return null;
  }
}

export async function loadWorldFromDatabase() {
  try {
    const savedState = await AsyncStorage.getItem(LOCAL_STORAGE_KEY);

    if (!savedState) {
      return null;
    }

    const worldState = JSON.parse(savedState);

    useWorldStore.setState({
      entities: worldState.entities || [],
      events: worldState.events || [],
      discoveries: worldState.discoveries || [],
      bookmarks: worldState.bookmarks || [],
      spawnableTypes: worldState.spawnableTypes || ['HUMAN', 'TREE', 'WATER_PATCH', 'COW'],
      stats: worldState.stats,
    });

    return 'local';
  } catch (error) {
    console.error('Error loading world:', error);
    return null;
  }
}

export async function deleteWorldFromDatabase(worldId: string) {
  try {
    await AsyncStorage.removeItem(LOCAL_STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Error deleting world:', error);
    return false;
  }
}
