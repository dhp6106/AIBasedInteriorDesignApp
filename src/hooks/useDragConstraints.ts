import { useRef, useState } from 'react';
import { useThree } from '@react-three/fiber';
import { useStore } from '../store/useStore';

export const useDragConstraints = (ref: any) => {
  const [isDragging, setIsDragging] = useState(false);
  const { roomLayout } = useStore();
  const { camera } = useThree();
  const dragStart = useRef({ x: 0, y: 0 });

  if (!roomLayout) return { dragConstraints: {}, isDragging: false };

  const dragConstraints = {
    onPointerDown: (e: any) => {
      e.stopPropagation();
      setIsDragging(true);
      dragStart.current = {
        x: e.point.x,
        y: e.point.z
      };
    },
    onPointerMove: (e: any) => {
      if (!isDragging || !ref.current) return;

      const newX = Math.max(
        -roomLayout.width / 2,
        Math.min(roomLayout.width / 2, e.point.x)
      );
      const newZ = Math.max(
        -roomLayout.length / 2,
        Math.min(roomLayout.length / 2, e.point.z)
      );

      ref.current.position.x = newX;
      ref.current.position.z = newZ;
    },
    onPointerUp: () => {
      setIsDragging(false);
    },
  };

  return { dragConstraints, isDragging };
};