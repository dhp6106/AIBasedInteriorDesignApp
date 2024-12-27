import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { Controls } from './Controls';
import { Lighting } from './Lighting';
import { Room } from './Room';
import { FurnitureModels } from './FurnitureModels';
import { LoadingSpinner } from './LoadingSpinner';
import { RefreshButton } from './RefreshButton';
import { useStore } from '../../store/useStore';

export const Scene = () => {
  const { setSelectedFurnitureId } = useStore();

  const handleBackgroundClick = () => {
    setSelectedFurnitureId(null);
  };

  return (
    <div className="relative w-full h-[600px] bg-gray-50 rounded-lg overflow-hidden">
      <RefreshButton />
      <Canvas
        shadows
        camera={{ position: [10, 10, 10], fov: 50 }}
        onClick={handleBackgroundClick}
      >
        <Suspense fallback={<LoadingSpinner />}>
          <Controls />
          <Lighting />
          <Room />
          <FurnitureModels />
        </Suspense>
      </Canvas>
    </div>
  );
};