import { Html } from '@react-three/drei';

export const LoadingSpinner = () => {
  return (
    <Html center>
      <div className="flex flex-col items-center space-y-2">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-gray-600">Loading 3D Scene...</p>
      </div>
    </Html>
  );
};