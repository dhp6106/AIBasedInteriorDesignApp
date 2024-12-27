import { useRef } from 'react';
import { Mesh } from 'three';
import { useStore } from '../../store/useStore';

export const Room = () => {
  const floorRef = useRef<Mesh>(null);
  const wallsRef = useRef<Mesh>(null);
  const { roomLayout } = useStore();

  if (!roomLayout) return null;

  const { width, length, height } = roomLayout;

  return (
    <>
      {/* Floor */}
      <mesh ref={floorRef} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[width, length]} />
        <meshStandardMaterial color="#f0f0f0" />
      </mesh>

      {/* Walls */}
      <group ref={wallsRef}>
        {/* North Wall */}
        <mesh position={[0, height / 2, -length / 2]} castShadow receiveShadow>
          <planeGeometry args={[width, height]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>

        {/* South Wall */}
        <mesh position={[0, height / 2, length / 2]} rotation={[0, Math.PI, 0]} castShadow receiveShadow>
          <planeGeometry args={[width, height]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>

        {/* East Wall */}
        <mesh position={[width / 2, height / 2, 0]} rotation={[0, -Math.PI / 2, 0]} castShadow receiveShadow>
          <planeGeometry args={[length, height]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>

        {/* West Wall */}
        <mesh position={[-width / 2, height / 2, 0]} rotation={[0, Math.PI / 2, 0]} castShadow receiveShadow>
          <planeGeometry args={[length, height]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
      </group>
    </>
  );
};