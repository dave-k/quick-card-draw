import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { Filter } from './filter';
import { Suit } from './suit';
import { Rank } from './rank';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  private filter : Filter = new Filter();
  
  private nSuit : number = 4;
  private nRank : number = 13;
  
  constructor() { 
    this.filter.ndeck = 1;
    this.filter.suits = [];
    for(let suit:Suit = 0; suit < this.nSuit; suit++) {
      this.filter.suits.push(suit);
    }
    
    this.filter.size = 5;
    this.filter.rank['min'] = Rank._2;
    this.filter.rank['max'] = Rank._A;
  }

  getFilter(): Observable<Filter> {
    return of<Filter>(this.filter);
  }

  loadFilter(): Observable<Filter> {
    return of<Filter>(this.filter).pipe(delay(20));
  }

  updateFilter(filter:Filter) {
    this.filter = filter;
  }
}
