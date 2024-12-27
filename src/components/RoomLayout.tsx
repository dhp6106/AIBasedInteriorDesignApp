import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { useStore } from '../store/useStore';
import { Room } from './RoomLayout/Room';
import { FurnitureModel } from './RoomLayout/FurnitureModel';
import { Controls } from './RoomLayout/Controls';
import { Lighting } from './RoomLayout/Lighting';
import { LoadingSpinner } from './RoomLayout/LoadingSpinner';

export const RoomLayout = () => {
  const { furnitureArrangement } = useStore();

  return (
    <div className="w-full h-[600px] bg-gray-50 rounded-lg">
      <Canvas shadows>
        <Suspense fallback={<LoadingSpinner />}>
          <Controls />
          <Lighting />
          <Room />
          {furnitureArrangement.map((position, index) => (
            <FurnitureModel key={`${position.furniture.id}-${index}`} position={position} />
          ))}
        </Suspense>
      </Canvas>
    </div>
  );
};