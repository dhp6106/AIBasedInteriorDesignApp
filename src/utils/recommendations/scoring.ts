import { Furniture, RoomLayout } from '../../types/furniture';

export const scoreRecommendation = (
  furniture: Furniture,
  selectedFurniture: Furniture[],
  layout: RoomLayout
): number => {
  let score = 0;

  // Score based on room size compatibility
  const roomArea = layout.width * layout.length;
  const furnitureArea = furniture.dimensions.width * furniture.dimensions.depth;
  if (furnitureArea < roomArea * 0.4) score += 2;

  // Score based on existing furniture compatibility
  const existingCategories = new Set(selectedFurniture.map(f => f.category));
  if (!existingCategories.has(furniture.category)) score += 3;

  return score;
};