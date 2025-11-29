import React from 'react';
import { Circle, Group, RoundedRect } from '@shopify/react-native-skia';

interface HumanSpriteProps {
  x: number;
  y: number;
  size?: number;
}

export const HumanSprite: React.FC<HumanSpriteProps> = ({ x, y, size = 32 }) => {
  const scale = size / 32;
  const headRadius = 8 * scale;
  const bodyWidth = 12 * scale;
  const bodyHeight = 16 * scale;

  return (
    <Group transform={[{ translateX: x }, { translateY: y }]}>
      <Circle cx={0} cy={-2 * scale} r={headRadius + 4} color="rgba(0,0,0,0.1)" />

      <Circle cx={0} cy={-bodyHeight / 2 - headRadius} r={headRadius} color="#FFD4A3" />

      <RoundedRect
        x={-bodyWidth / 2}
        y={-bodyHeight / 2}
        width={bodyWidth}
        height={bodyHeight}
        r={4 * scale}
        color="#FF9A62"
      />
    </Group>
  );
};
