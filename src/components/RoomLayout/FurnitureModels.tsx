import { useStore } from '../../store/useStore';
import { FurnitureModel } from './FurnitureModel';

export const FurnitureModels = () => {
  const { furnitureArrangement } = useStore();

  return (
    <group>
      {furnitureArrangement.map((position, index) => (
        <FurnitureModel
          key={`${position.furniture.id}-${index}`}
          position={position}
        />
      ))}
    </group>
  );
};