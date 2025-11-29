import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useWorldStore } from '../store/worldStore';

export const LeftToolbar: React.FC = () => {
  const credits = useWorldStore((s) => s.stats.credits);
  const toggleActivity = useWorldStore((s) => s.toggleActivity);
  const isSpeedBoostActive = useWorldStore((s) => s.ui.isSpeedBoostActive);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={toggleActivity}>
        <Text style={styles.buttonText}>☰</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>{isSpeedBoostActive ? '⚡' : '🕐'}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>🔍</Text>
      </TouchableOpacity>

      <View style={styles.creditsPill}>
        <Text style={styles.creditsText}>Credits: {credits}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 16,
    top: 60,
    alignItems: 'center',
    gap: 12,
  },
  button: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    fontSize: 24,
  },
  creditsPill: {
    marginTop: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  creditsText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
  },
});
