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
import { SKAI_INFO } from '../types/skai';

export const NewSkaiDashboard: React.FC = () => {
  const isOpen = useWorldStore((s) => s.ui.isNewSkaiOpen);
  const toggleNewSkai = useWorldStore((s) => s.toggleNewSkai);
  const discoveries = useWorldStore((s) => s.discoveries);
  const claimDiscovery = useWorldStore((s) => s.claimDiscovery);

  const unclaimedDiscoveries = discoveries.filter((d) => !d.claimed);

  if (!isOpen) return null;

  return (
    <Modal visible={isOpen} transparent animationType="slide">
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={toggleNewSkai}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={(e) => e.stopPropagation()}
        >
          <View style={styles.panel}>
            <View style={styles.header}>
              <Text style={styles.title}>New Discoveries</Text>
              <TouchableOpacity onPress={toggleNewSkai}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.list}>
              {unclaimedDiscoveries.length === 0 ? (
                <Text style={styles.emptyText}>
                  No new discoveries yet. Keep exploring!
                </Text>
              ) : (
                unclaimedDiscoveries.map((discovery) => {
                  const info = SKAI_INFO[discovery.type];
                  return (
                    <View key={discovery.id} style={styles.discoveryCard}>
                      <View style={styles.discoveryInfo}>
                        <Text style={styles.discoveryName}>{info.name}</Text>
                        <Text style={styles.discoveryDescription}>
                          {discovery.sourceDescription}
                        </Text>
                        <Text style={styles.discoveryCategory}>
                          {info.category}
                        </Text>
                      </View>
                      <TouchableOpacity
                        style={styles.claimButton}
                        onPress={() => {
                          claimDiscovery(discovery.id);
                        }}
                      >
                        <Text style={styles.claimButtonText}>Claim</Text>
                      </TouchableOpacity>
                    </View>
                  );
                })
              )}
            </ScrollView>
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
    justifyContent: 'flex-end',
  },
  panel: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    maxHeight: '70%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
  },
  closeButton: {
    fontSize: 24,
    color: '#999',
  },
  list: {
    flex: 1,
  },
  discoveryCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    marginBottom: 12,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  discoveryInfo: {
    flex: 1,
    marginRight: 12,
  },
  discoveryName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  discoveryDescription: {
    fontSize: 13,
    color: '#666',
    marginBottom: 4,
  },
  discoveryCategory: {
    fontSize: 11,
    color: '#999',
    textTransform: 'capitalize',
  },
  claimButton: {
    backgroundColor: '#10B981',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  claimButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
  },
  emptyText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    marginTop: 40,
    fontStyle: 'italic',
  },
});
