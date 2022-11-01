import { useXREvent } from '@react-three/xr';
import { useEffect, useState } from 'react';
import useSound from 'use-sound';

import gameEnd from '../assets/audio/game-end.mp3';
import gameStart from '../assets/audio/game-start.mp3';
import laserGun from '../assets/audio/lasergun.mp3';
import { GameState } from '../types';

type Props = {
  gameState: GameState;
};

const GameSounds = ({ gameState }: Props) => {
  const [lasergunPitch, setLasergunPitch] = useState(1);

  const [playLasergun] = useSound(laserGun, { volume: 0.7, playbackRate: lasergunPitch });
  const [playGameStart] = useSound(gameStart, { volume: 0.5 });
  const [playGameEnd] = useSound(gameEnd, { volume: 0.5 });

  const onLasergunTrigger = () => {
    const random = Math.random();
    setLasergunPitch(0.7 + random * 0.6); // sets playback speed between 0.7 and 1.3
    playLasergun();
  };

  useXREvent('select', onLasergunTrigger);

  // GameState sounds
  useEffect(() => {
    if (gameState === 'started') {
      playGameStart();
    }

    if (gameState === 'ended') {
      playGameEnd();
    }
  }, [gameState, playGameStart, playGameEnd]);

  return <></>;
};

export default GameSounds;
