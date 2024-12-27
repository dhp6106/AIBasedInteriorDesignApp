import { Furniture } from '../../types/furniture';

export const getFurnitureByCategory = (furniture: Furniture[]): Record<string, number> => {
  return furniture.reduce((acc, item) => ({
    ...acc,
    [item.category]: (acc[item.category] || 0) + 1
  }), {} as Record<string, number>);
};

export const getMissingEssentialCategories = (
  currentCategories: Record<string, number>,
  roomSize: number
): string[] => {
  const essentials = ['seating', 'lighting'];
  if (roomSize > 150) {
    essentials.push('table', 'storage');
  }
  return essentials.filter(category => !currentCategories[category]);
};