import { useEffect, useRef } from 'react';
import { Mesh, BoxHelper, Box3 } from 'three';

interface SelectionOutlineProps {
  meshRef: React.RefObject<Mesh>;
  isSelected: boolean;
}

export const SelectionOutline = ({ meshRef, isSelected }: SelectionOutlineProps) => {
  const outlineRef = useRef<BoxHelper>();

  useEffect(() => {
    if (!meshRef.current) return;

    const mesh = meshRef.current;
    const box = new Box3().setFromObject(mesh);
    const outline = new BoxHelper(mesh, '#2563eb');
    outline.visible = isSelected;
    outlineRef.current = outline;

    mesh.parent?.add(outline);

    return () => {
      mesh.parent?.remove(outline);
    };
  }, [meshRef, isSelected]);

  useEffect(() => {
    if (outlineRef.current) {
      outlineRef.current.visible = isSelected;
      outlineRef.current.update();
    }
  }, [isSelected]);

  return null;
};