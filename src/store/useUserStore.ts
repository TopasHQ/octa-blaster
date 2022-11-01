import create from 'zustand';

type Store = {
  credentials: 'mock' | null;
  user: 'mock' | null;
};

/** mock user store */
const useUserStore = create<Store>(set => ({
  credentials: 'mock',
  user: 'mock',
}));

export default useUserStore;
