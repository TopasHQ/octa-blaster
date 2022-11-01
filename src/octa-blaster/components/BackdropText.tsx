import { Text } from '@topashq/toolkit';
import { ReactElement } from 'react';

import { GameState } from '../types';
import GameLeaderboard from './GameLeaderboard';

type Props = {
  gameState: GameState;
  score: number;
  multiplier: number;
  timeRemaining: number;
};

const BackdropText = ({ gameState, score, multiplier, timeRemaining }: Props): ReactElement => {
  return (
    <group>
      {gameState !== 'started' && (
        <group position={[0, -0.999, 2]} rotation={[Math.PI / -2, 0, 0]}>
          <Text black fontSize={0.3}>
            Octa Blaster
          </Text>
          <Text thin position={[0, -0.25, 0]}>
            v0.3.0
          </Text>
        </group>
      )}

      <group position={[0, 0, -1.9]}>
        {(gameState === 'pregame' || gameState === 'finished') && <GameLeaderboard />}
        {gameState === 'ended' && (
          <Text black fontSize={0.3}>
            Game ended! Score: {score}
          </Text>
        )}

        {gameState === 'started' && (
          <>
            <group position={[0, 0.2, -0.0001]}>
              <Text bold position={[0, -0.6, 0]} anchorY="bottom">
                SCORE
              </Text>
              <Text black position={[0, -0.5, 0]} fontSize={0.9} fillOpacity={0.3} anchorY="bottom">
                {score}
              </Text>
            </group>

            <group position={[1.6, 0.2, -0.0001]}>
              <Text bold position={[0, -0.6, 0]} anchorY="bottom">
                MULTIPLIER
              </Text>
              <Text black position={[0, -0.4, 0]} fontSize={0.5} fillOpacity={0.3} anchorY="bottom">
                {multiplier}x
              </Text>
            </group>

            <group position={[-1.6, 0.2, -0.0001]}>
              <Text bold position={[0, -0.6, 0]} anchorY="bottom">
                TIME REMAINING
              </Text>
              <Text black position={[0, -0.4, 0]} fontSize={0.5} fillOpacity={0.3} anchorY="bottom">
                {timeRemaining}s
              </Text>
            </group>
          </>
        )}
      </group>
    </group>
  );
};

export default BackdropText;
