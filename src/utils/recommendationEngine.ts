import { Furniture, RoomLayout } from '../types/furniture';
import { rules } from './recommendationRules';

export const generateRecommendations = (
  selectedFurniture: Furniture[],
  layout: RoomLayout
): Furniture[] => {
  const recommendations: Furniture[] = [];
  
  // Apply each recommendation rule
  for (const rule of rules) {
    if (rule.check(selectedFurniture, layout)) {
      recommendations.push(rule.suggest());
    }
  }
  
  // Limit to 4 recommendations maximum
  return recommendations.slice(0, 4);
};