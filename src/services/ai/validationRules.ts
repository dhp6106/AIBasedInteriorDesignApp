import { FurniturePosition } from './furnitureArrangement';
import { RoomLayout } from '../../types/furniture';

export const validateArrangement = (
  positions: FurniturePosition[],
  layout: RoomLayout
): boolean => {
  // Check for minimum clearance between furniture pieces
  const minClearance = 2; // 2 feet minimum clearance
  
  for (let i = 0; i < positions.length; i++) {
    for (let j = i + 1; j < positions.length; j++) {
      if (getFurnitureDistance(positions[i], positions[j]) < minClearance) {
        return false;
      }
    }
  }
  
  // Validate door clearance
  for (const door of layout.doors) {
    if (!checkDoorClearance(positions, door)) {
      return false;
    }
  }
  
  // Validate window access
  for (const window of layout.windows) {
    if (!checkWindowAccess(positions, window)) {
      return false;
    }
  }
  
  return true;
};

const getFurnitureDistance = (pos1: FurniturePosition, pos2: FurniturePosition): number => {
  const center1 = {
    x: pos1.x + (pos1.furniture.dimensions.width / 2),
    y: pos1.y + (pos1.furniture.dimensions.depth / 2)
  };
  
  const center2 = {
    x: pos2.x + (pos2.furniture.dimensions.width / 2),
    y: pos2.y + (pos2.furniture.dimensions.depth / 2)
  };
  
  return Math.sqrt(
    Math.pow(center2.x - center1.x, 2) +
    Math.pow(center2.y - center1.y, 2)
  );
};

const checkDoorClearance = (positions: FurniturePosition[], door: any): boolean => {
  const doorClearance = 3; // 3 feet minimum door clearance
  
  for (const position of positions) {
    // Calculate distance to door and check if it blocks the path
    // Implementation depends on how doors are represented in the layout
    // This is a simplified check
    const distanceToDoor = Math.abs(position.x - door.position);
    if (distanceToDoor < doorClearance) {
      return false;
    }
  }
  
  return true;
};

const checkWindowAccess = (positions: FurniturePosition[], window: any): boolean => {
  const windowClearance = 1; // 1 foot minimum window clearance
  
  for (const position of positions) {
    // Similar to door clearance check, but with smaller clearance requirement
    const distanceToWindow = Math.abs(position.x - window.position);
    if (distanceToWindow < windowClearance) {
      return false;
    }
  }
  
  return true;
};