import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FilterService } from './filter.service';
import { Filter } from './filter';

@Injectable({
  providedIn: 'root'
})
export class DrawService {

  filter : Filter = new Filter();
  draw = [];

  constructor(private filterService: FilterService) {
    this.getDraw();
  }

  getFilter(): void {
    this.filterService.getFilter()
        .subscribe(filter => this.filter = filter);
  }

  initDeck() {
    for(let deck = 0; deck < this.filter.ndeck; deck++) {
      for(let suit = 0; suit < this.filter.suits.length; suit++) {
        for(let rank = this.filter.min; rank <= this.filter.max; rank++) {
          let card = {deck: deck, rank: rank, suit: this.filter.suits[suit]};
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

  getDraw(): Observable<Event[]> {
    this.draw = [];
    this.getFilter();
    this.initDeck();
    this.shuffle();

    return of(this.draw);
  }
}
