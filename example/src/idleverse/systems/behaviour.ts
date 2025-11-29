import type { SkaiEntity } from '../types/skai';
import { useWorldStore } from '../store/worldStore';

export function updateEntityBehaviour(
  entity: SkaiEntity,
  deltaSeconds: number
): Partial<SkaiEntity> {
  if (!entity.alive) return {};

  const updates: Partial<SkaiEntity> = {};

  switch (entity.type) {
    case 'HUMAN':
      return updateHumanBehaviour(entity, deltaSeconds);
    case 'BEE':
      return updateBeeBehaviour(entity, deltaSeconds);
    case 'COW':
      return updateCowBehaviour(entity, deltaSeconds);
    case 'FISH':
      return updateFishBehaviour(entity, deltaSeconds);
    default:
      return {};
  }
}

function updateHumanBehaviour(
  entity: SkaiEntity,
  deltaSeconds: number
): Partial<SkaiEntity> {
  const updates: Partial<SkaiEntity> = {};

  if (!entity.targetX || !entity.targetY) {
    const radius = 150;
    updates.targetX = entity.x + (Math.random() - 0.5) * radius;
    updates.targetY = entity.y + (Math.random() - 0.5) * radius;
    updates.mood = 'MOVING';
  }

  const dx = (entity.targetX || entity.x) - entity.x;
  const dy = (entity.targetY || entity.y) - entity.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance < 5) {
    if (Math.random() < 0.3) {
      updates.mood = 'RESTING';
      updates.targetX = undefined;
      updates.targetY = undefined;
    } else {
      const radius = 150;
      updates.targetX = entity.x + (Math.random() - 0.5) * radius;
      updates.targetY = entity.y + (Math.random() - 0.5) * radius;
      updates.mood = 'MOVING';
    }
  } else {
    const speed = (entity.moveSpeed || 15) * deltaSeconds;
    updates.x = entity.x + (dx / distance) * speed;
    updates.y = entity.y + (dy / distance) * speed;
  }

  return updates;
}

function updateBeeBehaviour(
  entity: SkaiEntity,
  deltaSeconds: number
): Partial<SkaiEntity> {
  const updates: Partial<SkaiEntity> = {};

  if (!entity.targetX || !entity.targetY) {
    const radius = 100;
    updates.targetX = entity.x + (Math.random() - 0.5) * radius;
    updates.targetY = entity.y + (Math.random() - 0.5) * radius;
    updates.mood = 'MOVING';
  }

  const dx = (entity.targetX || entity.x) - entity.x;
  const dy = (entity.targetY || entity.y) - entity.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance < 3) {
    const radius = 100;
    updates.targetX = entity.x + (Math.random() - 0.5) * radius;
    updates.targetY = entity.y + (Math.random() - 0.5) * radius;
  } else {
    const speed = (entity.moveSpeed || 25) * deltaSeconds;
    updates.x = entity.x + (dx / distance) * speed;
    updates.y = entity.y + (dy / distance) * speed;
  }

  return updates;
}

function updateCowBehaviour(
  entity: SkaiEntity,
  deltaSeconds: number
): Partial<SkaiEntity> {
  const updates: Partial<SkaiEntity> = {};

  if (!entity.targetX || !entity.targetY) {
    const radius = 80;
    updates.targetX = entity.x + (Math.random() - 0.5) * radius;
    updates.targetY = entity.y + (Math.random() - 0.5) * radius;
    updates.mood = 'MOVING';
  }

  const dx = (entity.targetX || entity.x) - entity.x;
  const dy = (entity.targetY || entity.y) - entity.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance < 5) {
    if (Math.random() < 0.4) {
      updates.mood = 'RESTING';
      updates.targetX = undefined;
      updates.targetY = undefined;
    } else {
      const radius = 80;
      updates.targetX = entity.x + (Math.random() - 0.5) * radius;
      updates.targetY = entity.y + (Math.random() - 0.5) * radius;
    }
  } else {
    const speed = (entity.moveSpeed || 10) * deltaSeconds;
    updates.x = entity.x + (dx / distance) * speed;
    updates.y = entity.y + (dy / distance) * speed;
  }

  return updates;
}

function updateFishBehaviour(
  entity: SkaiEntity,
  deltaSeconds: number
): Partial<SkaiEntity> {
  const updates: Partial<SkaiEntity> = {};

  if (!entity.targetX || !entity.targetY) {
    const radius = 60;
    updates.targetX = entity.x + (Math.random() - 0.5) * radius;
    updates.targetY = entity.y + (Math.random() - 0.5) * radius;
  }

  const dx = (entity.targetX || entity.x) - entity.x;
  const dy = (entity.targetY || entity.y) - entity.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance < 3) {
    const radius = 60;
    updates.targetX = entity.x + (Math.random() - 0.5) * radius;
    updates.targetY = entity.y + (Math.random() - 0.5) * radius;
  } else {
    const speed = (entity.moveSpeed || 20) * deltaSeconds;
    updates.x = entity.x + (dx / distance) * speed;
    updates.y = entity.y + (dy / distance) * speed;
  }

  return updates;
}

export function tickBehaviours(deltaSeconds: number) {
  const store = useWorldStore.getState();
  const entities = store.entities;

  const updatedEntities = entities.map((entity) => {
    if (!entity.alive) return entity;

    const updates = updateEntityBehaviour(entity, deltaSeconds);

    return { ...entity, ...updates };
  });

  useWorldStore.setState({ entities: updatedEntities });
}
