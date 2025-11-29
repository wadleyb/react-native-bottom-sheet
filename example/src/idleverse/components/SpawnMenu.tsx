import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from 'react-native';
import { useWorldStore } from '../store/worldStore';
import { SKAI_INFO, type SkaiType } from '../types/skai';

export const SpawnMenu: React.FC = () => {
  const isOpen = useWorldStore((s) => s.ui.isSpawnMenuOpen);
  const toggleSpawnMenu = useWorldStore((s) => s.toggleSpawnMenu);
  const spawnableTypes = useWorldStore((s) => s.spawnableTypes);
  const spawnSkai = useWorldStore((s) => s.spawnSkai);
  const freeSpawnsRemaining = useWorldStore((s) => s.stats.freeSpawnsRemaining);
  const credits = useWorldStore((s) => s.stats.credits);

  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  if (!isOpen) return null;

  const categories = [
    { id: 'all', label: 'All', count: spawnableTypes.length },
    {
      id: 'nature',
      label: 'Nature',
      count: spawnableTypes.filter((t) => SKAI_INFO[t].category === 'nature').length,
    },
    {
      id: 'animal',
      label: 'Animals',
      count: spawnableTypes.filter((t) => SKAI_INFO[t].category === 'animal').length,
    },
    {
      id: 'structure',
      label: 'Structures',
      count: spawnableTypes.filter((t) => SKAI_INFO[t].category === 'structure').length,
    },
  ];

  const filteredTypes = spawnableTypes.filter((type) => {
    if (selectedCategory === 'all') return true;
    return SKAI_INFO[type].category === selectedCategory;
  });

  const handleSpawn = (type: SkaiType) => {
    const result = spawnSkai(type);
    if (result) {
      toggleSpawnMenu();
    }
  };

  return (
    <Modal visible={isOpen} transparent animationType="slide">
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={toggleSpawnMenu}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={(e) => e.stopPropagation()}
        >
          <View style={styles.panel}>
            <View style={styles.header}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={toggleSpawnMenu}
              >
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.categoryTabs}>
              {categories.map((cat) => (
                <TouchableOpacity
                  key={cat.id}
                  style={[
                    styles.categoryTab,
                    selectedCategory === cat.id && styles.categoryTabActive,
                  ]}
                  onPress={() => setSelectedCategory(cat.id)}
                >
                  <Text
                    style={[
                      styles.categoryTabText,
                      selectedCategory === cat.id &&
                        styles.categoryTabTextActive,
                    ]}
                  >
                    {cat.label}
                  </Text>
                  <View
                    style={[
                      styles.categoryBadge,
                      selectedCategory === cat.id &&
                        styles.categoryBadgeActive,
                    ]}
                  >
                    <Text
                      style={[
                        styles.categoryBadgeText,
                        selectedCategory === cat.id &&
                          styles.categoryBadgeTextActive,
                      ]}
                    >
                      {cat.count}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>

            <ScrollView
              style={styles.grid}
              contentContainerStyle={styles.gridContent}
            >
              {filteredTypes.map((type) => {
                const info = SKAI_INFO[type];
                const canAfford =
                  freeSpawnsRemaining > 0 || credits >= info.spawnCost;

                return (
                  <TouchableOpacity
                    key={type}
                    style={[
                      styles.skaiCard,
                      !canAfford && styles.skaiCardDisabled,
                    ]}
                    onPress={() => canAfford && handleSpawn(type)}
                    disabled={!canAfford}
                  >
                    <View style={styles.skaiIcon}>
                      <Text style={styles.skaiIconText}>
                        {getSkaiEmoji(type)}
                      </Text>
                    </View>
                    <Text style={styles.skaiName}>{info.name}</Text>
                    <Text style={styles.skaiCost}>
                      {freeSpawnsRemaining > 0
                        ? 'Free'
                        : `${info.spawnCost}c`}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

function getSkaiEmoji(type: SkaiType): string {
  const emojiMap: Record<SkaiType, string> = {
    HUMAN: '👤',
    TREE: '🌳',
    COW: '🐄',
    WATER_PATCH: '💧',
    BEE: '🐝',
    FISH: '🐟',
    ROCK: '🪨',
    FLOWER: '🌸',
    BUSH: '🌿',
    HOUSE: '🏠',
    WOLF: '🐺',
    FIRE: '🔥',
    ROAD: '🛣️',
    UFO: '🛸',
    UNKNOWN: '❓',
  };
  return emojiMap[type] || '❓';
}

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
    paddingTop: 8,
    paddingBottom: 40,
    maxHeight: '75%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#1F2937',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
  },
  categoryTabs: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  categoryTab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    gap: 6,
  },
  categoryTabActive: {
    backgroundColor: '#3B82F6',
  },
  categoryTabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  categoryTabTextActive: {
    color: '#FFF',
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    backgroundColor: '#E5E7EB',
  },
  categoryBadgeActive: {
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  categoryBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
  },
  categoryBadgeTextActive: {
    color: '#FFF',
  },
  grid: {
    flex: 1,
    paddingHorizontal: 16,
  },
  gridContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    paddingBottom: 20,
  },
  skaiCard: {
    width: '22%',
    aspectRatio: 1,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 8,
  },
  skaiCardDisabled: {
    opacity: 0.4,
  },
  skaiIcon: {
    marginBottom: 4,
  },
  skaiIconText: {
    fontSize: 32,
  },
  skaiName: {
    fontSize: 11,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  skaiCost: {
    fontSize: 10,
    color: '#10B981',
    marginTop: 2,
  },
});
