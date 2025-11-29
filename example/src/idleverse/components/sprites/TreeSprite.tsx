import React from 'react';
import { Circle, Group, RoundedRect } from '@shopify/react-native-skia';

interface TreeSpriteProps {
  x: number;
  y: number;
  size?: number;
}

export const TreeSprite: React.FC<TreeSpriteProps> = ({ x, y, size = 40 }) => {
  const scale = size / 40;
  const trunkWidth = 6 * scale;
  const trunkHeight = 12 * scale;
  const crownRadius = 16 * scale;

  return (
    <Group transform={[{ translateX: x }, { translateY: y }]}>
      <Circle cx={0} cy={2 * scale} r={crownRadius + 4} color="rgba(0,0,0,0.08)" />

      <RoundedRect
        x={-trunkWidth / 2}
        y={0}
        width={trunkWidth}
        height={trunkHeight}
        r={2 * scale}
        color="#8B6F47"
      />

      <Circle cx={0} cy={-crownRadius / 2} r={crownRadius} color="#7BC74D" />
      <Circle cx={-crownRadius / 2} cy={0} r={crownRadius * 0.7} color="#68B83E" />
      <Circle cx={crownRadius / 2} cy={0} r={crownRadius * 0.7} color="#68B83E" />
    </Group>
  );
};
