import { Component } from '@angular/core';
import { Suit } from './suit';
import { Rank } from './rank';
import { Filter } from './filter';
import { FilterService } from './filter.service';
import { DrawService } from './draw.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Quick Draw';

  // current state
  size: number;
  min: Rank;
  max: Rank;

  hand = [];
  draw = [];
  filter : Filter = new Filter();
  suits : {id: number; suit: string}[] = [];
  deck : {rank: number; card: string}[] = [];
  
  Suit : typeof Suit = Suit;
  Rank : typeof Rank = Rank;

  constructor(private filterService: FilterService,
              private drawService: DrawService) {
  }

  ngOnInit() {

    this.getFilter();
    
    this.size = this.filter.size;
    this.min = this.filter.min;
    this.max = this.filter.max;

    for(var n in Suit) {
      if (typeof Suit[n] === 'number') {
        this.suits.push({id: <any>Suit[n], suit: n});
      }
    }

    for(var n in Rank) {
      if (typeof Rank[n] === 'number') {
        this.deck.push({rank: <any>Rank[n], card: n}); 
      }
    }
  }

  getFilter(): void {
    this.filterService.getFilter()
        .subscribe(filter => this.filter = filter);
  }

  calcSize() {
    return this.filter.ndeck * this.filter.suits.length * (this.filter.max - this.filter.min + 1);
  }

  parseSuit(value : string[], form) {
    this.size = this.calcSize();
    this.filter.size = this.size;
  }

  parseSize(size : number) {
    if (size > this.size || size < 0) {
      // Requested hand size cannot be greater than available card count
      this.filter.size = this.size;
    };
  }

  parseMax(rank : Rank) {
    if(rank >= this.filter.min) {
      this.max = rank;
      
      this.size = this.calcSize();
      if(this.filter.size > this.size) {
        // Requested hand size cannot be greater than available card count
        this.filter.size = this.size;
      }
    } else {
      // Max cannot be less than min
      setTimeout(()=>{
        this.filter.max = this.max;
      });
    }
  }

  parseMin(rank : Rank) {
    if(rank <= this.filter.max) {
      this.min = rank;
      
      this.size = this.calcSize();
      if(this.filter.size > this.size) {
        // Requested hand size cannot be greater than available card count
        this.filter.size = this.size;
      }
    } else {
      // Min cannot be greater that max
      setTimeout(()=>{
        this.filter.min = this.min;
      }); 
    }
  }

  onQuickDraw() {
    this.quickDraw();
  }

  quickDraw() {
    this.hand = [];
    this.drawService.getDraw()
      .subscribe(draw => this.draw = draw);

    for(let i = 0; i < this.filter.size; i++) {
      this.hand.push(this.draw[i]);
    }
  }
}
