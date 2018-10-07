import { Suit } from './suit';
import { Rank } from './rank';

export class Filter {
  ndeck: number;    // 1
  suits: Suit[];    // clubs ...
  size: number;     // 52
  rank: {} = { max: Rank, min: Rank };
}