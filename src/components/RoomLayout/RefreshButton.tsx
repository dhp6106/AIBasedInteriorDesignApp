import { RefreshCw } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { generateFurnitureArrangement } from '../../services/ai/furnitureArrangement';

export const RefreshButton = () => {
  const { selectedFurniture, roomLayout, setFurnitureArrangement } = useStore();

  const handleRefresh = () => {
    if (!roomLayout || selectedFurniture.length === 0) return;

    const { positions } = generateFurnitureArrangement(selectedFurniture, roomLayout);
    setFurnitureArrangement(positions);
  };

  return (
    <button
      onClick={handleRefresh}
      className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
      title="Refresh 3D Preview"
    >
      <RefreshCw className="w-5 h-5 text-gray-600" />
    </button>
  );
};