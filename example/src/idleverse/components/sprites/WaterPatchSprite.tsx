import React from 'react';
import { Circle, Group } from '@shopify/react-native-skia';

interface WaterPatchSpriteProps {
  x: number;
  y: number;
  size?: number;
}

export const WaterPatchSprite: React.FC<WaterPatchSpriteProps> = ({ x, y, size = 50 }) => {
  const scale = size / 50;

  return (
    <Group transform={[{ translateX: x }, { translateY: y }]}>
      <Circle cx={0} cy={0} r={25 * scale} color="rgba(100, 180, 255, 0.3)" />
      <Circle cx={-8 * scale} cy={5 * scale} r={15 * scale} color="rgba(80, 160, 240, 0.4)" />
      <Circle cx={10 * scale} cy={-5 * scale} r={18 * scale} color="rgba(90, 170, 250, 0.35)" />
    </Group>
  );
};
