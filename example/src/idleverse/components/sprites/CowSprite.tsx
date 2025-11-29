import React from 'react';
import { Circle, Group, RoundedRect } from '@shopify/react-native-skia';

interface CowSpriteProps {
  x: number;
  y: number;
  size?: number;
}

export const CowSprite: React.FC<CowSpriteProps> = ({ x, y, size = 36 }) => {
  const scale = size / 36;
  const bodyWidth = 20 * scale;
  const bodyHeight = 14 * scale;
  const headSize = 10 * scale;

  return (
    <Group transform={[{ translateX: x }, { translateY: y }]}>
      <Circle cx={0} cy={2 * scale} r={bodyWidth / 2 + 3} color="rgba(0,0,0,0.1)" />

      <RoundedRect
        x={-bodyWidth / 2}
        y={-bodyHeight / 2}
        width={bodyWidth}
        height={bodyHeight}
        r={6 * scale}
        color="#F5F5F5"
      />

      <Circle cx={-bodyWidth / 2 - 2} cy={-2 * scale} r={headSize / 2} color="#E8E8E8" />

      <Circle cx={-bodyWidth / 2 - 3} cy={-4 * scale} r={2 * scale} color="#333" />
      <Circle cx={-bodyWidth / 2 + 1} cy={-4 * scale} r={2 * scale} color="#333" />
    </Group>
  );
};
