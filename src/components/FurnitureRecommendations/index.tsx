import React from 'react';
import { useStore } from '../../store/useStore';
import { RecommendationCard } from './RecommendationCard';
import { Sparkles } from 'lucide-react';

export const FurnitureRecommendations: React.FC = () => {
  const { recommendations } = useStore();

  if (!recommendations.length) return null;

  return (
    <div className="mt-8 space-y-4">
      <div className="flex items-center space-x-2">
        <Sparkles className="w-5 h-5 text-blue-500" />
        <h3 className="text-lg font-semibold">Recommended for Your Space</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {recommendations.map((item) => (
          <RecommendationCard key={item.id} furniture={item} />
        ))}
      </div>
    </div>
  );
}