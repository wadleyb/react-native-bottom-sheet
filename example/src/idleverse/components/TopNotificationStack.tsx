import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { useWorldStore } from '../store/worldStore';

export const TopNotificationStack: React.FC = () => {
  const notifications = useWorldStore((s) => s.notifications);

  return (
    <View style={styles.container}>
      {notifications.map((notification, index) => (
        <NotificationCard
          key={notification.id}
          message={notification.message}
          index={index}
        />
      ))}
    </View>
  );
};

const NotificationCard: React.FC<{ message: string; index: number }> = ({
  message,
  index,
}) => {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(-20);

  useEffect(() => {
    opacity.value = withSpring(1);
    translateY.value = withSpring(0);

    const timeout = setTimeout(() => {
      opacity.value = withTiming(0);
    }, 2800);

    return () => clearTimeout(timeout);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View
      style={[styles.notification, animatedStyle, { top: 80 + index * 60 }]}
    >
      <Text style={styles.notificationText}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    pointerEvents: 'none',
  },
  notification: {
    position: 'absolute',
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    maxWidth: '80%',
  },
  notificationText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
});
