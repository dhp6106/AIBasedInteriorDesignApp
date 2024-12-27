import { useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import { Mesh, Plane, Raycaster, Vector3 } from 'three';
import { useStore } from '../store/useStore';

export const useDragControls = (
  meshRef: React.RefObject<Mesh>,
  furnitureId: string,
  roomWidth: number,
  roomLength: number
) => {
  const { camera, scene } = useThree();
  const dragPlane = useRef(new Plane(new Vector3(0, 1, 0), 0));
  const intersection = useRef(new Vector3());
  const { updateFurniturePosition, setSelectedFurnitureId, selectedFurnitureId } = useStore();
  
  useEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;

    const raycaster = new Raycaster();
    let isDragging = false;
    const offset = new Vector3();

    const onPointerDown = (event: PointerEvent) => {
      const canvas = event.target as HTMLCanvasElement;
      const rect = canvas.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera({ x, y }, camera);
      const intersects = raycaster.intersectObject(mesh);

      if (intersects.length > 0) {
        isDragging = true;
        setSelectedFurnitureId(furnitureId);
        
        // Calculate offset
        raycaster.ray.intersectPlane(dragPlane.current, intersection.current);
        offset.copy(mesh.position).sub(intersection.current);
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!isDragging) return;

      const canvas = event.target as HTMLCanvasElement;
      const rect = canvas.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera({ x, y }, camera);
      raycaster.ray.intersectPlane(dragPlane.current, intersection.current);
      
      const newPosition = intersection.current.add(offset);
      
      // Constrain to room boundaries
      const halfWidth = roomWidth / 2;
      const halfLength = roomLength / 2;
      newPosition.x = Math.max(-halfWidth, Math.min(halfWidth, newPosition.x));
      newPosition.z = Math.max(-halfLength, Math.min(halfLength, newPosition.z));
      
      mesh.position.copy(newPosition);
      updateFurniturePosition(furnitureId, newPosition.x, newPosition.z, mesh.rotation.y);
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (selectedFurnitureId !== furnitureId) return;

      if (event.key === 'r' || event.key === 'R') {
        mesh.rotation.y += Math.PI / 4;
        updateFurniturePosition(
          furnitureId,
          mesh.position.x,
          mesh.position.z,
          mesh.rotation.y
        );
      }
    };

    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('pointermove', onPointerMove);
    document.addEventListener('pointerup', onPointerUp);
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerup', onPointerUp);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [camera, furnitureId, meshRef, roomWidth, roomLength, selectedFurnitureId]);
};