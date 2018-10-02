import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FilterService } from './filter.service';
import { Filter } from './filter';
import { Card } from './card';
import { Suit } from './suit';
import { Rank } from './rank';

@Injectable({
  providedIn: 'root'
})
export class DrawService {

  private filter : Filter = new Filter();
  private draw : Card[] = [];

  constructor(private filterService: FilterService) {
  }

  getFilter(): void {
    this.filterService.getFilter()
        .subscribe(filter => this.filter = filter);
  }

  initDeck() {
    let card : Card;
    for(let deck = 0; deck < this.filter.ndeck; deck++) {
      for(let suit:Suit = 0; suit < this.filter.suits.length; suit++) {
        for(let rank:Rank = this.filter.min; rank <= this.filter.max; rank++) {
          card = new Card(deck, this.filter.suits[suit], rank);
          this.draw.push(card);
        }
      }
    }
  }

  shuffle() {
    // for 1000 turns
    // switch the values of two random cards
    for (let i = 0; i < 1000; i++)
    {
      let location1 = Math.floor((Math.random() * this.draw.length));
      let location2 = Math.floor((Math.random() * this.draw.length));
      let tmp = this.draw[location1];

      this.draw[location1] = this.draw[location2];
      this.draw[location2] = tmp;
    }
  }

  getDraw(): Observable<Card[]> {
    this.draw = [];
    this.getFilter();
    this.initDeck();
    this.shuffle();

    return of(this.draw);
  }
}
