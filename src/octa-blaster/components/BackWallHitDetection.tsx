import { Plane } from '@react-three/drei';
import { Interactive } from '@react-three/xr';
import useSound from 'use-sound';

import targetMissSound from '../assets/audio/target-miss.mp3';
import { GameState } from '../types';

type Props = {
  onTargetMiss: () => void;
  gameState: GameState;
};

const BackWallHitDetection = ({ onTargetMiss, gameState }: Props) => {
  const [playTargetMiss] = useSound(targetMissSound);

  const handleTargetMiss = () => {
    if (gameState === 'started') {
      playTargetMiss();
      onTargetMiss();
    }
  };

  return (
    <Interactive onSelect={handleTargetMiss}>
      <Plane position={[0, 0, -1.99]} scale={10}>
        <meshBasicMaterial color="red" transparent opacity={0} />
      </Plane>
    </Interactive>
  );
};

export default BackWallHitDetection;
