import React from 'react';
import { Circle, Group, RoundedRect, Path } from '@shopify/react-native-skia';

interface SpriteProps {
  x: number;
  y: number;
  size?: number;
}

export const BeeSprite: React.FC<SpriteProps> = ({ x, y, size = 16 }) => {
  const scale = size / 16;
  return (
    <Group transform={[{ translateX: x }, { translateY: y }]}>
      <Circle cx={0} cy={0} r={6 * scale} color="#FFD700" />
      <RoundedRect x={-2 * scale} y={-3 * scale} width={4 * scale} height={6 * scale} r={1} color="#333" />
      <Circle cx={-4 * scale} cy={-2 * scale} r={3 * scale} color="rgba(255,255,255,0.6)" />
      <Circle cx={4 * scale} cy={-2 * scale} r={3 * scale} color="rgba(255,255,255,0.6)" />
    </Group>
  );
};

export const FishSprite: React.FC<SpriteProps> = ({ x, y, size = 20 }) => {
  const scale = size / 20;
  return (
    <Group transform={[{ translateX: x }, { translateY: y }]}>
      <Circle cx={0} cy={0} r={8 * scale} color="#FF9A62" />
      <Circle cx={-6 * scale} cy={0} r={4 * scale} color="#FF8A52" />
      <Path
        path={`M ${8 * scale} ${-4 * scale} L ${14 * scale} 0 L ${8 * scale} ${4 * scale} Z`}
        color="#FF8A52"
      />
    </Group>
  );
};

export const RockSprite: React.FC<SpriteProps> = ({ x, y, size = 28 }) => {
  const scale = size / 28;
  return (
    <Group transform={[{ translateX: x }, { translateY: y }]}>
      <Circle cx={0} cy={2 * scale} r={12 * scale} color="rgba(0,0,0,0.08)" />
      <RoundedRect x={-10 * scale} y={-8 * scale} width={20 * scale} height={16 * scale} r={4 * scale} color="#9CA3AF" />
      <RoundedRect x={-8 * scale} y={-6 * scale} width={16 * scale} height={12 * scale} r={3 * scale} color="#B8BFC7" />
    </Group>
  );
};

export const FlowerSprite: React.FC<SpriteProps> = ({ x, y, size = 24 }) => {
  const scale = size / 24;
  return (
    <Group transform={[{ translateX: x }, { translateY: y }]}>
      <RoundedRect x={-1 * scale} y={0} width={2 * scale} height={8 * scale} r={1} color="#68B83E" />
      <Circle cx={0} cy={-8 * scale} r={6 * scale} color="#FF9AC7" />
      <Circle cx={-4 * scale} cy={-8 * scale} r={4 * scale} color="#FFB6DB" />
      <Circle cx={4 * scale} cy={-8 * scale} r={4 * scale} color="#FFB6DB" />
      <Circle cx={0} cy={-8 * scale} r={2 * scale} color="#FFD700" />
    </Group>
  );
};

export const BushSprite: React.FC<SpriteProps> = ({ x, y, size = 30 }) => {
  const scale = size / 30;
  return (
    <Group transform={[{ translateX: x }, { translateY: y }]}>
      <Circle cx={0} cy={2 * scale} r={12 * scale} color="rgba(0,0,0,0.06)" />
      <Circle cx={0} cy={0} r={10 * scale} color="#7BC74D" />
      <Circle cx={-6 * scale} cy={2 * scale} r={8 * scale} color="#68B83E" />
      <Circle cx={6 * scale} cy={2 * scale} r={8 * scale} color="#68B83E" />
    </Group>
  );
};

export const HouseSprite: React.FC<SpriteProps> = ({ x, y, size = 48 }) => {
  const scale = size / 48;
  return (
    <Group transform={[{ translateX: x }, { translateY: y }]}>
      <Circle cx={0} cy={8 * scale} r={20 * scale} color="rgba(0,0,0,0.1)" />
      <Path
        path={`M 0 ${-16 * scale} L ${-16 * scale} 0 L ${16 * scale} 0 Z`}
        color="#D97757"
      />
      <RoundedRect
        x={-14 * scale}
        y={0}
        width={28 * scale}
        height={20 * scale}
        r={2 * scale}
        color="#F5E6D3"
      />
      <RoundedRect
        x={-6 * scale}
        y={6 * scale}
        width={8 * scale}
        height={10 * scale}
        r={1 * scale}
        color="#8B6F47"
      />
    </Group>
  );
};

export const WolfSprite: React.FC<SpriteProps> = ({ x, y, size = 36 }) => {
  const scale = size / 36;
  return (
    <Group transform={[{ translateX: x }, { translateY: y }]}>
      <Circle cx={0} cy={2 * scale} r={14 * scale} color="rgba(0,0,0,0.1)" />
      <RoundedRect
        x={-12 * scale}
        y={-6 * scale}
        width={24 * scale}
        height={12 * scale}
        r={6 * scale}
        color="#6B7280"
      />
      <Circle cx={-10 * scale} cy={-8 * scale} r={6 * scale} color="#52575D" />
      <Circle cx={-12 * scale} cy={-10 * scale} r={2 * scale} color="#FFF" />
      <Circle cx={-8 * scale} cy={-10 * scale} r={2 * scale} color="#FFF" />
    </Group>
  );
};

export const FireSprite: React.FC<SpriteProps> = ({ x, y, size = 32 }) => {
  const scale = size / 32;
  return (
    <Group transform={[{ translateX: x }, { translateY: y }]}>
      <Circle cx={0} cy={0} r={10 * scale} color="#FF6B35" />
      <Circle cx={0} cy={-4 * scale} r={8 * scale} color="#FF8C42" />
      <Circle cx={0} cy={-8 * scale} r={5 * scale} color="#FFD93D" />
    </Group>
  );
};

export const RoadSprite: React.FC<SpriteProps> = ({ x, y, size = 60 }) => {
  const scale = size / 60;
  return (
    <Group transform={[{ translateX: x }, { translateY: y }]}>
      <RoundedRect
        x={-30 * scale}
        y={-4 * scale}
        width={60 * scale}
        height={8 * scale}
        r={2 * scale}
        color="#8B8680"
      />
      <RoundedRect
        x={-20 * scale}
        y={-1 * scale}
        width={10 * scale}
        height={2 * scale}
        r={1}
        color="#FFF"
      />
      <RoundedRect
        x={0}
        y={-1 * scale}
        width={10 * scale}
        height={2 * scale}
        r={1}
        color="#FFF"
      />
    </Group>
  );
};

export const UFOSprite: React.FC<SpriteProps> = ({ x, y, size = 40 }) => {
  const scale = size / 40;
  return (
    <Group transform={[{ translateX: x }, { translateY: y }]}>
      <Circle cx={0} cy={4 * scale} r={16 * scale} color="rgba(100,255,200,0.2)" />
      <Circle cx={0} cy={0} r={8 * scale} color="#B8B8FF" />
      <RoundedRect
        x={-16 * scale}
        y={0}
        width={32 * scale}
        height={6 * scale}
        r={3 * scale}
        color="#D0D0FF"
      />
    </Group>
  );
};

export const UnknownSkiaSprite: React.FC<SpriteProps> = ({ x, y, size = 32 }) => {
  const scale = size / 32;
  return (
    <Group transform={[{ translateX: x }, { translateY: y }]}>
      <Circle cx={0} cy={0} r={12 * scale} color="rgba(150,150,150,0.4)" />
      <Circle cx={0} cy={0} r={8 * scale} color="rgba(180,180,180,0.6)" />
    </Group>
  );
};
