import React from 'react';
import { useStore } from '../store/useStore';
import { Furniture } from '../types/furniture';
import { Sofa, Bed, Chair } from 'lucide-react';

const mockFurniture: Furniture[] = [
  {
    id: '1',
    name: 'Modern Sofa',
    category: 'sofa',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc',
    model: '/models/sofa.glb',
    dimensions: { width: 200, height: 85, depth: 90 },
    price: 999
  },
  // Add more mock furniture items
];

export const FurnitureCatalog: React.FC = () => {
  const { selectedFurniture, setSelectedFurniture } = useStore();

  const handleSelect = (furniture: Furniture) => {
    setSelectedFurniture([...selectedFurniture, furniture]);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Furniture Catalog</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockFurniture.map((item) => (
          <div key={item.id} className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
            <img src={item.image} alt={item.name} className="w-full h-48 object-cover rounded-md" />
            <h3 className="text-lg font-semibold mt-2">{item.name}</h3>
            <p className="text-gray-600">${item.price}</p>
            <button
              onClick={() => handleSelect(item)}
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add to Room
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};