import { useLoader } from '@react-three/fiber';
import { ReactElement } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { getAssetPath } from 'utils/assets';

const PlayArea = (): ReactElement => {
  const gltf = useLoader(GLTFLoader, getAssetPath('games/octa-blaster/objects/shooting-range.gltf'));

  return <primitive object={gltf.scene} scale={0.1} position={[0, -1, 3]} />;
};

export default PlayArea;
