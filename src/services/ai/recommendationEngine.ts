import { Furniture, RoomLayout } from '../../types/furniture';

export const getFurnitureRecommendations = (
  selectedFurniture: Furniture[],
  roomLayout: RoomLayout
): Furniture[] => {
  const recommendations: Furniture[] = [];
  const roomArea = roomLayout.width * roomLayout.length;
  
  // Analyze existing furniture categories
  const categories = new Set(selectedFurniture.map(f => f.category));
  
  // Essential furniture by room size
  const essentials = getEssentialsByRoomSize(roomArea);
  
  // Filter out already selected categories
  const missingEssentials = essentials.filter(item => !categories.has(item.category));
  
  // Add complementary pieces based on style and function
  recommendations.push(...missingEssentials);
  
  // Add accent pieces if room size allows
  if (roomArea > 200) { // For larger rooms
    recommendations.push(...getAccentPieces(categories));
  }
  
  return recommendations;
};

const getEssentialsByRoomSize = (area: number): Furniture[] => {
  const essentials: Furniture[] = [];
  
  // Basic essentials for any room size
  if (!essentials.some(f => f.category === 'lighting')) {
    essentials.push({
      id: 'rec_light_1',
      name: 'Modern Floor Lamp',
      category: 'lighting',
      image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c',
      model: '/models/floor_lamp.glb',
      dimensions: { width: 1.5, height: 5, depth: 1.5 },
      price: 129
    });
  }
  
  // Additional pieces for medium to large rooms
  if (area > 150) {
    essentials.push({
      id: 'rec_table_1',
      name: 'Coffee Table',
      category: 'table',
      image: 'https://images.unsplash.com/photo-1533090368676-1fd25485db88',
      model: '/models/coffee_table.glb',
      dimensions: { width: 4, height: 1.5, depth: 2 },
      price: 299
    });
  }
  
  return essentials;
};

const getAccentPieces = (existingCategories: Set<string>): Furniture[] => {
  const accents: Furniture[] = [];
  
  if (!existingCategories.has('decor')) {
    accents.push({
      id: 'rec_decor_1',
      name: 'Decorative Mirror',
      category: 'decor',
      image: 'https://images.unsplash.com/photo-1618220252344-8ec99ec624b1',
      model: '/models/mirror.glb',
      dimensions: { width: 2, height: 3, depth: 0.2 },
      price: 159
    });
  }
  
  return accents;
};