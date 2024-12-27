import { OrbitControls } from '@react-three/drei';

export const Controls = () => {
  return (
    <OrbitControls
      minPolarAngle={Math.PI / 4}
      maxPolarAngle={Math.PI / 2}
      minDistance={5}
      maxDistance={20}
      enableDamping
      dampingFactor={0.05}
    />
  );
};