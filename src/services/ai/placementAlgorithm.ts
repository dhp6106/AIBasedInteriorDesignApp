import { Furniture, RoomLayout } from '../../types/furniture';
import { FurniturePosition } from './furnitureArrangement';
import { getWallProximityScore, getTrafficFlowScore } from './scoringRules';

export const calculateOptimalPlacement = (
  furniture: Furniture[],
  layout: RoomLayout
): FurniturePosition[] => {
  const positions: FurniturePosition[] = [];
  const gridSize = 0.5; // 6-inch grid

  // Sort furniture by size (larger items first)
  const sortedFurniture = [...furniture].sort((a, b) => 
    (b.dimensions.width * b.dimensions.depth) - (a.dimensions.width * a.dimensions.depth)
  );

  for (const item of sortedFurniture) {
    let bestPosition: FurniturePosition | null = null;
    let bestScore = -Infinity;

    // Try different positions and rotations
    for (let x = 0; x <= layout.width; x += gridSize) {
      for (let y = 0; y <= layout.length; y += gridSize) {
        for (let rotation of [0, 90, 180, 270]) {
          const position: FurniturePosition = { furniture: item, x, y, rotation };
          
          if (isValidPosition(position, positions, layout)) {
            const score = evaluatePosition(position, positions, layout);
            if (score > bestScore) {
              bestScore = score;
              bestPosition = position;
            }
          }
        }
      }
    }

    if (bestPosition) {
      positions.push(bestPosition);
    }
  }

  return positions;
};

const isValidPosition = (
  position: FurniturePosition,
  existingPositions: FurniturePosition[],
  layout: RoomLayout
): boolean => {
  // Check room boundaries
  const { furniture, x, y, rotation } = position;
  const { width, depth } = furniture.dimensions;
  const rotated = rotation === 90 || rotation === 270;
  const itemWidth = rotated ? depth : width;
  const itemDepth = rotated ? width : depth;

  if (x + itemWidth > layout.width || y + itemDepth > layout.length) {
    return false;
  }

  // Check collisions with other furniture
  for (const existing of existingPositions) {
    if (checkCollision(position, existing)) {
      return false;
    }
  }

  // Check door clearance
  for (const door of layout.doors) {
    if (checkDoorClearance(position, door)) {
      return false;
    }
  }

  return true;
};

const evaluatePosition = (
  position: FurniturePosition,
  existingPositions: FurniturePosition[],
  layout: RoomLayout
): number => {
  let score = 0;

  // Wall proximity score
  score += getWallProximityScore(position, layout);

  // Traffic flow score
  score += getTrafficFlowScore(position, existingPositions, layout);

  return score;
};