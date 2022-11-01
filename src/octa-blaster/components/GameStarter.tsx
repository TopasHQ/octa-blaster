import { RoundedBox, SpotLight } from '@react-three/drei';
import { Interactive } from '@react-three/xr';
import { ReactElement, useRef, useState } from 'react';
import { Mesh, Object3D, SpotLight as SpotLightType } from 'three';

import { GameState } from '../types';

type Props = {
  gameState: GameState;
  startGame: () => void;
};

const GameStarter = ({ gameState, startGame }: Props): ReactElement => {
  const [target] = useState(() => new Object3D());

  const spotLightRef = useRef<SpotLightType>(null);
  const meshRef = useRef<Mesh>(null);

  return (
    <>
      {gameState === 'pregame' && (
        <>
          <mesh ref={meshRef} onClick={startGame}>
            <Interactive onSelect={startGame}>
              <RoundedBox position={[-2, -0.5, 1]} radius={0.3} scale={0.3}>
                <meshPhongMaterial color="#888" />
              </RoundedBox>
            </Interactive>
          </mesh>

          <mesh>
            <primitive object={target} position={[-2, -0.5, 1]} />
            <SpotLight angle={0.2} ref={spotLightRef} target={target} />
          </mesh>
        </>
      )}
    </>
  );
};

export default GameStarter;
