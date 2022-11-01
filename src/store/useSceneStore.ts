import { Scene } from 'types';
import create from 'zustand';

type Store = {
  currentScene: Scene;
  setScene: (scene: Scene) => void;
};

/** mock scene store */
const useSceneStore = create<Store>((set, get) => ({
  currentScene: 'openWorld',
  setScene: (scene: Scene) => set(() => ({ currentScene: scene })),
}));

export default useSceneStore;
