import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from 'react-native';
import { useWorldStore } from '../store/worldStore';

export const ActivityLogPanel: React.FC = () => {
  const isOpen = useWorldStore((s) => s.ui.isActivityOpen);
  const toggleActivity = useWorldStore((s) => s.toggleActivity);
  const events = useWorldStore((s) => s.events);
  const stats = useWorldStore((s) => s.stats);
  const resetWorld = useWorldStore((s) => s.resetWorld);
  const applySpeedBoost = useWorldStore((s) => s.applySpeedBoost);
  const entities = useWorldStore((s) => s.entities);

  if (!isOpen) return null;

  const worldAge = Math.floor((Date.now() - stats.createdAt) / 1000);
  const minutes = Math.floor(worldAge / 60);
  const seconds = worldAge % 60;

  const livingCount = entities.filter((e) => e.alive).length;

  const handleDeleteWorld = () => {
    if (confirm('Are you sure you want to delete this world and start over?')) {
      resetWorld();
      toggleActivity();
    }
  };

  return (
    <Modal visible={isOpen} transparent animationType="fade">
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={toggleActivity}
      >
        <TouchableOpacity activeOpacity={1} onPress={(e) => e.stopPropagation()}>
          <View style={styles.panel}>
            <View style={styles.header}>
              <Text style={styles.title}>World Stats</Text>
            </View>

            <View style={styles.statsGrid}>
              <View style={styles.statRow}>
                <Text style={styles.statLabel}>Age</Text>
                <Text style={styles.statValue}>
                  {minutes}m {seconds}s
                </Text>
              </View>
              <View style={styles.statRow}>
                <Text style={styles.statLabel}>Living Chunks</Text>
                <Text style={styles.statValue}>{livingCount}</Text>
              </View>
              <View style={styles.statRow}>
                <Text style={styles.statLabel}>Free Spawns</Text>
                <Text style={styles.statValue}>{stats.freeSpawnsRemaining}/25</Text>
              </View>
              <View style={styles.statRow}>
                <Text style={styles.statLabel}>Discoveries Today</Text>
                <Text style={styles.statValue}>
                  {stats.discoveriesToday}/{stats.dailyDiscoveryLimit}
                </Text>
              </View>
              <View style={styles.statRow}>
                <Text style={styles.statLabel}>Credits</Text>
                <Text style={styles.statValue}>{stats.credits}</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Actions</Text>

              <TouchableOpacity
                style={styles.buyButton}
                onPress={() => applySpeedBoost(2, 5)}
              >
                <Text style={styles.buyButtonText}>⚡ Speed up 2x for 5min (20c)</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteWorld}>
                <Text style={styles.deleteButtonText}>🗑️ Delete world</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Activity</Text>
              <ScrollView style={styles.eventsList}>
                {events.length === 0 ? (
                  <Text style={styles.emptyText}>No activity yet</Text>
                ) : (
                  events.slice(0, 20).map((event) => (
                    <View key={event.id} style={styles.eventItem}>
                      <Text style={styles.eventText}>
                        • {event.message}
                        {event.count && event.count > 1 ? ` ×${event.count}` : ''}
                      </Text>
                    </View>
                  ))
                )}
              </ScrollView>
            </View>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  panel: {
    width: 340,
    maxHeight: '80%',
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
  },
  statsGrid: {
    gap: 12,
    marginBottom: 20,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  statValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  section: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  buyButton: {
    backgroundColor: '#3B82F6',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  buyButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  deleteButton: {
    backgroundColor: '#EF4444',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  deleteButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  eventsList: {
    maxHeight: 200,
  },
  eventItem: {
    paddingVertical: 6,
  },
  eventText: {
    fontSize: 13,
    color: '#555',
  },
  emptyText: {
    fontSize: 13,
    color: '#999',
    fontStyle: 'italic',
  },
});
