import { Furniture } from '../../types/furniture';
import { RoomLayout } from '../../types/furniture';
import { calculateOptimalPlacement } from './placementAlgorithm';
import { getFurnitureRecommendations } from './recommendationEngine';
import { validateArrangement } from './validationRules';

export interface FurniturePosition {
  furniture: Furniture;
  x: number;
  y: number;
  rotation: number;
}

export interface ArrangementResult {
  positions: FurniturePosition[];
  recommendations: Furniture[];
  score: number;
}

export const generateFurnitureArrangement = (
  selectedFurniture: Furniture[],
  roomLayout: RoomLayout
): ArrangementResult => {
  // Generate multiple arrangements and pick the best one
  const arrangements: FurniturePosition[][] = [];
  const attempts = 5;

  for (let i = 0; i < attempts; i++) {
    const positions = calculateOptimalPlacement(selectedFurniture, roomLayout);
    if (validateArrangement(positions, roomLayout)) {
      arrangements.push(positions);
    }
  }

  // Score and select the best arrangement
  const bestArrangement = arrangements.reduce((best, current) => {
    const score = scoreArrangement(current, roomLayout);
    return score > best.score ? { positions: current, score } : best;
  }, { positions: arrangements[0], score: 0 });

  // Get AI-powered recommendations for complementary furniture
  const recommendations = getFurnitureRecommendations(selectedFurniture, roomLayout);

  return {
    positions: bestArrangement.positions,
    recommendations,
    score: bestArrangement.score
  };
};