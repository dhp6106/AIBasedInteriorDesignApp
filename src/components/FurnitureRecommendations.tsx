import React from 'react';
import { useStore } from '../store/useStore';
import { Sparkles } from 'lucide-react';

export const FurnitureRecommendations = () => {
  const { recommendations } = useStore();

  if (!recommendations.length) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Sparkles className="w-5 h-5 text-blue-500" />
        <h3 className="text-lg font-semibold">Recommended Furniture</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {recommendations.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
            <img src={item.image} alt={item.name} className="w-full h-48 object-cover rounded-md mb-3" />
            <h4 className="font-medium text-gray-900">{item.name}</h4>
            <p className="text-sm text-gray-500 mb-2">
              {item.dimensions.width}' × {item.dimensions.depth}' × {item.dimensions.height}'
            </p>
            <p className="text-blue-600 font-medium">${item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};