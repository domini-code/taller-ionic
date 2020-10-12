import { Trivia } from './trivia.interface';

export interface Config {
  darkMode?: boolean;
  trivia?: Trivia[];
  token?: string;
}
