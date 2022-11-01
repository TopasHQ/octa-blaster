export type DummyType = string;

export interface TopasAccountEssentials {
  username: string;
  address: Buffer;
}

export interface TopasAppEssentials {
  appId: string;
  title: string;
}

export interface DateTimeMetadata {
  unix: number;
  human: string;
}

export interface Highscore {
  user: TopasAccountEssentials;
  score: number;
  createdAt: DateTimeMetadata;
}

export type Scene = 'openWorld' | 'sixStarsArcade' | 'galex';
