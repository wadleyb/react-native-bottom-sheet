import React, { useEffect } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { Canvas, Group, Path, Line, vec } from '@shopify/react-native-skia';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { useWorldStore } from '../store/worldStore';
import type { SkaiEntity } from '../types/skai';
import {
  HumanSprite,
  TreeSprite,
  CowSprite,
  WaterPatchSprite,
  BeeSprite,
  FishSprite,
  RockSprite,
  FlowerSprite,
  BushSprite,
  HouseSprite,
  WolfSprite,
  FireSprite,
  RoadSprite,
  UFOSprite,
  UnknownSkiaSprite,
} from './sprites';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const MIN_SCALE = 0.5;
const MAX_SCALE = 2;

export const WorldCanvas: React.FC = () => {
  const entities = useWorldStore((s) => s.entities);

  const translateX = useSharedValue(SCREEN_WIDTH / 2);
  const translateY = useSharedValue(SCREEN_HEIGHT / 2);
  const scale = useSharedValue(1);
  const savedTranslateX = useSharedValue(SCREEN_WIDTH / 2);
  const savedTranslateY = useSharedValue(SCREEN_HEIGHT / 2);
  const savedScale = useSharedValue(1);

  const panGesture = Gesture.Pan()
    .onStart(() => {
      savedTranslateX.value = translateX.value;
      savedTranslateY.value = translateY.value;
    })
    .onUpdate((e) => {
      translateX.value = savedTranslateX.value + e.translationX;
      translateY.value = savedTranslateY.value + e.translationY;
    });

  const pinchGesture = Gesture.Pinch()
    .onStart(() => {
      savedScale.value = scale.value;
    })
    .onUpdate((e) => {
      const newScale = savedScale.value * e.scale;
      scale.value = Math.min(Math.max(newScale, MIN_SCALE), MAX_SCALE);
    });

  const composed = Gesture.Simultaneous(panGesture, pinchGesture);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  const renderSprite = (entity: SkaiEntity) => {
    const props = { x: entity.x, y: entity.y, size: undefined };

    switch (entity.type) {
      case 'HUMAN':
        return <HumanSprite key={entity.id} {...props} />;
      case 'TREE':
        return <TreeSprite key={entity.id} {...props} />;
      case 'COW':
        return <CowSprite key={entity.id} {...props} />;
      case 'WATER_PATCH':
        return <WaterPatchSprite key={entity.id} {...props} />;
      case 'BEE':
        return <BeeSprite key={entity.id} {...props} />;
      case 'FISH':
        return <FishSprite key={entity.id} {...props} />;
      case 'ROCK':
        return <RockSprite key={entity.id} {...props} />;
      case 'FLOWER':
        return <FlowerSprite key={entity.id} {...props} />;
      case 'BUSH':
        return <BushSprite key={entity.id} {...props} />;
      case 'HOUSE':
        return <HouseSprite key={entity.id} {...props} />;
      case 'WOLF':
        return <WolfSprite key={entity.id} {...props} />;
      case 'FIRE':
        return <FireSprite key={entity.id} {...props} />;
      case 'ROAD':
        return <RoadSprite key={entity.id} {...props} />;
      case 'UFO':
        return <UFOSprite key={entity.id} {...props} />;
      default:
        return <UnknownSkiaSprite key={entity.id} {...props} />;
    }
  };

  return (
    <GestureDetector gesture={composed}>
      <Animated.View style={[styles.container, animatedStyle]}>
        <Canvas style={styles.canvas}>
          <Group>
            {/* Grid */}
            {Array.from({ length: 40 }).map((_, i) => {
              const offset = (i - 20) * 120;
              return (
                <React.Fragment key={`grid-${i}`}>
                  <Line
                    p1={vec(offset, -2400)}
                    p2={vec(offset, 2400)}
                    color="rgba(200,200,200,0.2)"
                    strokeWidth={1}
                  />
                  <Line
                    p1={vec(-2400, offset)}
                    p2={vec(2400, offset)}
                    color="rgba(200,200,200,0.2)"
                    strokeWidth={1}
                  />
                </React.Fragment>
              );
            })}

            {/* Land blobs */}
            <Path
              path="M -300 -200 Q -150 -300 0 -250 Q 150 -200 300 -180 Q 400 -100 380 50 Q 350 200 200 250 Q 50 280 -100 240 Q -250 200 -320 80 Q -350 -50 -300 -200 Z"
              color="#D4E7C5"
            />
            <Path
              path="M 400 100 Q 550 80 650 120 Q 720 200 680 320 Q 620 420 480 450 Q 380 430 350 350 Q 340 250 400 100 Z"
              color="#BDD9B0"
            />
            <Path
              path="M -500 300 Q -400 250 -280 280 Q -200 320 -220 420 Q -260 500 -380 520 Q -480 510 -540 440 Q -570 380 -500 300 Z"
              color="#C8DDB8"
            />

            {/* Entities */}
            {entities.filter((e) => e.alive).map(renderSprite)}
          </Group>
        </Canvas>
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#F8F9FA',
  },
  canvas: {
    flex: 1,
  },
});
