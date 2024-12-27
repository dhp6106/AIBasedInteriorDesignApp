import { useEffect, useRef } from 'react';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Mesh } from 'three';
import { FurniturePosition } from '../../types/furniture';
import { useDragControls } from '../../hooks/useDragControls';
import { useStore } from '../../store/useStore';
import { SelectionOutline } from './SelectionOutline';

interface FurnitureModelProps {
  position: FurniturePosition;
}

export const FurnitureModel = ({ position }: FurnitureModelProps) => {
  const meshRef = useRef<Mesh>(null);
  const { scene } = useLoader(GLTFLoader, position.furniture.model);
  const { roomLayout, selectedFurnitureId, removeFurniture, setSelectedFurnitureId } = useStore();

  const isSelected = selectedFurnitureId === position.furniture.id;

  useDragControls(
    meshRef,
    position.furniture.id,
    roomLayout?.width || 0,
    roomLayout?.length || 0
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isSelected && e.key === 'Delete') {
        removeFurniture(position.furniture.id);
      } else if (isSelected && e.key === 'Escape') {
        setSelectedFurnitureId(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSelected, position.furniture.id, removeFurniture, setSelectedFurnitureId]);

  const handleClick = (e: any) => {
    e.stopPropagation();
    setSelectedFurnitureId(position.furniture.id);
  };

  const clonedScene = scene.clone();

  return (
    <group
      onClick={handleClick}
      onPointerOver={() => {
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        document.body.style.cursor = 'default';
      }}
    >
      <primitive
        ref={meshRef}
        object={clonedScene}
        position={[position.x, 0, position.y]}
        rotation={[0, position.rotation, 0]}
        castShadow
        receiveShadow
      />
      <SelectionOutline meshRef={meshRef} isSelected={isSelected} />
    </group>
  );
};