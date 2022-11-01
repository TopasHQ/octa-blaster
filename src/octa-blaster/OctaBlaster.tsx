import { FadeToBlack } from '@topashq/toolkit';
import { ReactElement, useEffect, useState } from 'react';
import useErrorStore from 'store/useErrorStore';
import useSceneStore from 'store/useSceneStore';
import useUserStore from 'store/useUserStore';
import { postScore } from 'utils/scores';
import Tipper from 'vr-app/ui/tipper/Tipper';

import BackdropText from './components/BackdropText';
import BackWallHitDetection from './components/BackWallHitDetection';
import GameSounds from './components/GameSounds';
import GameStarter from './components/GameStarter';
import Lighting from './components/Lighting';
import Target from './components/Target';
import { appId } from './config';
import PlayArea from './models/PlayArea';
import useGameStore from './store';

const OctaBlaster = (): ReactElement => {
  const setScene = useSceneStore(state => state.setScene);
  const handleError = useErrorStore(state => state.handleError);
  const { user, credentials } = useUserStore(state => ({
    user: state.user,
    credentials: state.credentials,
  }));

  const [timerIntervalId, setTimerIntervalId] = useState<ReturnType<typeof setInterval>>();

  const {
    score,
    multiplier,
    targets,
    timeRemaining,
    gameState,
    setGameState,
    increaseScore,
    resetMultiplier,
    spawnTarget,
    clearTarget,
    clearAllTargets,
    decreaseTimer,
    reset,
  } = useGameStore();

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (timeRemaining === 0) {
      setGameState('ended');
      clearAllTargets();

      timeout = setTimeout(() => {
        setGameState('finished');
      }, 3000);

      timerIntervalId && clearInterval(timerIntervalId);
    }

    return () => clearTimeout(timeout);
  }, [timeRemaining, timerIntervalId, clearAllTargets, setGameState]);

  /** reset store on component mount */
  useEffect(() => reset(), [reset]);

  useEffect(() => {
    const handlePostScore = () => {
      if (!credentials || !user) {
        handleError('Invalid user and/or credentials ');
        return;
      }

      postScore(user, credentials, appId, score)
        .then(() => null)
        .catch(err => handleError(err));
    };

    if (gameState === 'ended') {
      handlePostScore();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState]);

  useEffect(() => {
    return () => timerIntervalId && clearInterval(timerIntervalId);
  }, [timerIntervalId]);

  const startGame = () => {
    setGameState('started');

    const intervalId = setInterval(() => {
      spawnTarget();
      decreaseTimer();
    }, 1000);

    setTimerIntervalId(intervalId);
  };

  const onTargetHit = () => {
    increaseScore();
    spawnTarget();
  };

  return (
    <>
      <Tipper appId={appId} />
      <color attach="background" args={['#222']} />
      <group position={[0, 1.5, -4]} scale={1.2}>
        <Lighting gameState={gameState} />
        <PlayArea />
        <GameStarter startGame={startGame} gameState={gameState} />
        <BackWallHitDetection onTargetMiss={resetMultiplier} gameState={gameState} />
        <BackdropText gameState={gameState} score={score} multiplier={multiplier} timeRemaining={timeRemaining} />
        <GameSounds gameState={gameState} />
        {targets.map(id => (
          <Target onTargetHit={onTargetHit} clearTarget={clearTarget} key={id} id={id} />
        ))}
      </group>

      {gameState === 'finished' && <FadeToBlack callback={() => setScene('sixStarsArcade')} delay={6000} />}
    </>
  );
};

export default OctaBlaster;
