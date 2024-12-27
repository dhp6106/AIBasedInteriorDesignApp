import React from 'react';
import { Plus } from 'lucide-react';
import { Furniture } from '../../types/furniture';
import { useStore } from '../../store/useStore';

interface RecommendationCardProps {
  furniture: Furniture;
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({ furniture }) => {
  const { addFurnitureToRoom } = useStore();

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
      <img 
        src={furniture.image} 
        alt={furniture.name} 
        className="w-full h-48 object-cover rounded-md mb-3"
      />
      <div className="space-y-2">
        <h4 className="font-medium text-gray-900">{furniture.name}</h4>
        <p className="text-sm text-gray-500">
          {furniture.dimensions.width}' × {furniture.dimensions.depth}' × {furniture.dimensions.height}'
        </p>
        <div className="flex items-center justify-between">
          <span className="text-blue-600 font-medium">${furniture.price}</span>
          <button
            onClick={() => addFurnitureToRoom(furniture)}
            className="flex items-center space-x-1 text-sm text-blue-500 hover:text-blue-600"
          >
            <Plus size={16} />
            <span>Add to Room</span>
          </button>
        </div>
      </div>
    </div>
  );
};