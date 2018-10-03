import { Suit } from './suit';
import { Rank } from './rank';

export class Card {
  private deck: number;     // 1
  private suit: string;     // clubs ... 
  private rank: string;     // _2 .. _A
  private rankId: Rank;     // sort order

  constructor(deck: number, suit: Suit, rank: Rank) { 
    this.deck = deck;
    this.suit = Suit[suit];
    this.rankId = rank;   
    this.rank = Rank.toString(rank);   // _2 .. _A -> 2 .. A
  }

  static sort(card1: Card, card2: Card) {
    return Suit[card1.suit] < Suit[card2.suit] ? -1 : 
            Suit[card1.suit] > Suit[card2.suit] ? 1 : 
            card1.rankId < card2.rankId ? 1 : 
            card1.rankId > card2.rankId ? -1 : 
            0;
  }
}
