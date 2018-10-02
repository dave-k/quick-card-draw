import { Suit } from './suit';
import { Rank } from './rank';

export class Card {
  private deck: number;     // 1
  private suit: string;     // clubs ... 
  private rank: string;     // _2 .. _A
  private rankId: Rank;     // 0 .. 12

  constructor(deck: number, suit: Suit, rank: Rank) { 
    this.deck = deck;
    this.suit = Suit[suit]; 
    this.rankId = rank;                 
    this.rank = Rank[rank].substr(1);   // Rank[0] = _2
  }

  static sort(card1: Card, card2: Card) {
    return Suit[card1.suit] < Suit[card2.suit] ? -1 : 
            Suit[card1.suit] > Suit[card2.suit] ? 1 : 
            card1.rankId < card2.rankId ? 1 : 
            card1.rankId > card2.rankId ? -1 : 
            0;
  }
}
