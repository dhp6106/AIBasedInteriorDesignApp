import { Furniture, RoomLayout } from '../types/furniture';

interface RecommendationRule {
  name: string;
  check: (furniture: Furniture[], layout: RoomLayout) => boolean;
  suggest: () => Furniture;
}

export const rules: RecommendationRule[] = [
  {
    name: 'seatingBalance',
    check: (furniture) => !furniture.some(f => f.category === 'chair'),
    suggest: () => ({
      id: 'rec_chair_1',
      name: 'Accent Chair',
      category: 'chair',
      image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c',
      model: '/models/accent_chair.glb',
      dimensions: { width: 2.5, height: 3, depth: 2.5 },
      price: 299
    })
  },
  {
    name: 'lighting',
    check: (furniture) => !furniture.some(f => f.category === 'lighting'),
    suggest: () => ({
      id: 'rec_lamp_1',
      name: 'Floor Lamp',
      category: 'lighting',
      image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c',
      model: '/models/floor_lamp.glb',
      dimensions: { width: 1.5, height: 5, depth: 1.5 },
      price: 159
    })
  },
  {
    name: 'storage',
    check: (furniture, layout) => layout.width >= 12 && !furniture.some(f => f.category === 'storage'),
    suggest: () => ({
      id: 'rec_storage_1',
      name: 'Bookshelf',
      category: 'storage',
      image: 'https://images.unsplash.com/photo-1594620302200-9a762244a156',
      model: '/models/bookshelf.glb',
      dimensions: { width: 3, height: 6, depth: 1 },
      price: 399
    })
  }
];