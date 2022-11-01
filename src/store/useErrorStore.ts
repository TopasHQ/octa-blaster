import create from 'zustand';

type Store = {
  handleError: (err: unknown, callback?: Function, timeout?: number | undefined) => void;
};

/** mock error store */
const useErrorStore = create<Store>(set => ({
  handleError: (err, callback, timeout = 3000) => {
    console.error(err);
  },
}));

export default useErrorStore;
