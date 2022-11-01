import { Plane } from '@react-three/drei';
import { Text } from '@topashq/toolkit';
import useHighscores from 'hooks/useHighscores';
import { ReactElement } from 'react';

import { appId } from '../config';

const GameLeaderboard = (): ReactElement => {
  const { highscores } = useHighscores(appId);

  return (
    <group>
      <Plane scale={2} position={[0, -0.2, 0]}>
        <meshBasicMaterial color="black" />
      </Plane>

      <group position={[0, 0, 0.1]}>
        <Text black fontSize={0.2} position={[0, 0.45, 0]}>
          LEADERBOARD
        </Text>

        {highscores.length ? (
          <group position={[0, 0.25, 0]}>
            <Text bold textAlign="left" anchorY="top" position={[-0.58, 0, 0]} color="#808080">
              {highscores.map(score => `${score.user.username}\n`)}
            </Text>
            <Text bold textAlign="right" anchorY="top" position={[0.58, 0, 0]} color="#808080">
              {highscores.map(score => `${score.score}\n`)}
            </Text>
          </group>
        ) : (
          <Text color="#808080">No Scores yet</Text>
        )}
      </group>
    </group>
  );
};

export default GameLeaderboard;
