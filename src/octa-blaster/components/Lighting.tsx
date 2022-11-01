import { ReactElement } from 'react';

import { GameState } from '../types';

type Props = {
  gameState: GameState;
};

const Lighting = ({ gameState }: Props): ReactElement => {
  const overheadLightsPower = gameState === 'started' ? 20 : 15;
  const overheadLightsColor = gameState === 'started' ? '#f23dae' : 'PaleTurquoise';

  return (
    <>
      <ambientLight intensity={0.3} />
      <group rotation={[0, 0, 0]} position={[0, -1, 3]}>
        <pointLight position={[-3, 2, 1]} power={overheadLightsPower} color={overheadLightsColor} />
        <pointLight position={[3, 2, 1]} power={overheadLightsPower} color={overheadLightsColor} />
      </group>
    </>
  );
};

export default Lighting;
