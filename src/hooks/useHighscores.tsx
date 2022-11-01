import { Buffer } from 'buffer';
import { Highscore } from 'types';

const mockHighscores: Highscore[] = Array.from({ length: 10 })
  .map((_, i) => ({
    createdAt: { human: '2022-10-12T10:19:51.168Z', unix: 1665569991 },
    score: (i + 1) * 10,
    user: {
      username: `Fake User ${i + 1}`,
      address: Buffer.from(`fake-address-${i + 1}`),
    },
  }))
  .reverse();

/** Mock highscores hook */
const useHighscores = (appId: string) => {
  return { highscores: mockHighscores };
};

export default useHighscores;
