import { FurniturePosition } from './furnitureArrangement';
import { RoomLayout } from '../../types/furniture';

export const getWallProximityScore = (
  position: FurniturePosition,
  layout: RoomLayout
): number => {
  const { x, y, furniture, rotation } = position;
  const rotated = rotation === 90 || rotation === 270;
  const width = rotated ? furniture.dimensions.depth : furniture.dimensions.width;
  const depth = rotated ? furniture.dimensions.width : furniture.dimensions.depth;

  // Prefer furniture against walls
  const distanceToNearestWall = Math.min(
    x,
    y,
    layout.width - (x + width),
    layout.length - (y + depth)
  );

  return distanceToNearestWall === 0 ? 10 : 5 / (distanceToNearestWall + 1);
};

export const getTrafficFlowScore = (
  position: FurniturePosition,
  existingPositions: FurniturePosition[],
  layout: RoomLayout
): number => {
  let score = 0;

  // Check distance from doors (maintain clear paths)
  for (const door of layout.doors) {
    const doorCenter = {
      x: door.position + door.width / 2,
      y: door.wall === 'north' || door.wall === 'south' ? 0 : door.position
    };

    const distanceToDoor = Math.sqrt(
      Math.pow(position.x - doorCenter.x, 2) +
      Math.pow(position.y - doorCenter.y, 2)
    );

    // Penalize furniture blocking traffic flow from doors
    if (distanceToDoor < 3) {
      score -= 5;
    }
  }

  // Reward balanced spacing between furniture pieces
  for (const existing of existingPositions) {
    const distance = Math.sqrt(
      Math.pow(position.x - existing.x, 2) +
      Math.pow(position.y - existing.y, 2)
    );

    // Optimal spacing between furniture (2-3 feet)
    if (distance >= 2 && distance <= 3) {
      score += 3;
    }
  }

  return score;
};