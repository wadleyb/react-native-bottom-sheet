import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useWorldStore } from '../store/worldStore';

export const BottomSpawnFab: React.FC = () => {
  const toggleSpawnMenu = useWorldStore((s) => s.toggleSpawnMenu);
  const discoveries = useWorldStore((s) => s.discoveries);

  const unclaimedCount = discoveries.filter((d) => !d.claimed).length;

  return (
    <>
      <TouchableOpacity style={styles.fab} onPress={toggleSpawnMenu}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>

      {unclaimedCount > 0 && (
        <TouchableOpacity
          style={styles.discoveryBadge}
          onPress={() => useWorldStore.getState().toggleNewSkai()}
        >
          <Text style={styles.discoveryBadgeText}>
            {unclaimedCount} New!
          </Text>
        </TouchableOpacity>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#1F2937',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  fabText: {
    fontSize: 32,
    color: '#FFF',
    fontWeight: '300',
  },
  discoveryBadge: {
    position: 'absolute',
    bottom: 112,
    alignSelf: 'center',
    backgroundColor: '#10B981',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  discoveryBadgeText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '700',
  },
});
