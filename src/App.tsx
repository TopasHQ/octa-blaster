import { Canvas } from '@react-three/fiber';
import { Controllers, VRButton, XR } from '@react-three/xr';
import OctaBlaster from 'octa-blaster/OctaBlaster';

function App() {
  return (
    <>
      <VRButton />
      <Canvas>
        <XR>
          <Controllers />
          <OctaBlaster />
        </XR>
      </Canvas>
    </>
  );
}

export default App;
