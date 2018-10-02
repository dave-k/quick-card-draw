import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Filter } from './filter';
import { Suit } from './suit';
import { Rank } from './rank';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  private filter : Filter = new Filter();

  private nSuit : number = Object.keys(Suit).length / 2;
  private nRank : number = Object.keys(Rank).length / 2;
  
  constructor() { 
    this.filter.ndeck = 1;
    this.filter.suits = [];
    for(let suit:Suit = 0; suit < this.nSuit; suit++) {
      this.filter.suits.push(suit);
    }
    
    this.filter.size = this.nRank * this.nSuit;
    this.filter.min = Rank._2;
    this.filter.max = Rank._A;
  }

  getFilter(): Observable<Filter> {
    return of(this.filter);
  }
}
