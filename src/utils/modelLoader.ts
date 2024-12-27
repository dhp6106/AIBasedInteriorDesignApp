import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export const loadModel = async (url: string) => {
  try {
    const loader = new GLTFLoader();
    const gltf = await loader.loadAsync(url);
    return gltf;
  } catch (error) {
    throw new Error(`Failed to load 3D model: ${error.message}`);
  }
};