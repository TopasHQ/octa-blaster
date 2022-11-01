import { generateId } from '@topashq/toolkit';
import { cloneDeep } from 'lodash';
import create from 'zustand';

import { gameLength } from './config';
import { GameState } from './types';

const INIT = {
  score: 0,
  multiplier: 1,
  gameState: 'pregame' as GameState,
  targets: [],
  timeRemaining: gameLength,
};

type GameStore = {
  gameState: GameState;
  score: number;
  multiplier: number;
  targets: string[];
  timeRemaining: number;
  setGameState: (gameState: GameState) => void;
  increaseScore: () => void;
  resetMultiplier: () => void;
  spawnTarget: () => void;
  clearTarget: (id: string) => void;
  clearAllTargets: () => void;
  decreaseTimer: () => void;
  reset: () => void;
};

const useGameStore = create<GameStore>(set => ({
  ...INIT,
  setGameState: (gameState: GameState) => set(state => ({ gameState })),
  increaseScore: () =>
    set(state => ({
      score: (state.score += 1 * state.multiplier),
      multiplier: (state.multiplier += 1),
    })),
  resetMultiplier: () => set(state => ({ multiplier: 1 })),
  spawnTarget: () => set(state => ({ targets: [...state.targets, generateId()] })),
  clearTarget: (id: string) => set(state => ({ targets: state.targets.filter(targetId => targetId !== id) })),
  clearAllTargets: () => set(() => ({ targets: [] })),
  decreaseTimer: () => set(state => ({ timeRemaining: state.timeRemaining - 1 })),
  reset: () => set(state => ({ ...cloneDeep(INIT) })),
}));

export default useGameStore;
