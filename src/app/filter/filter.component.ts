import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { FilterService } from '../filter.service';
import { DrawService } from '../draw.service';

import { Filter } from '../filter';
import { Suit } from '../suit';
import { Rank } from '../rank';
import { Card } from '../card';
import { FormValidator, RankValidator } from '../validator';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})

export class FilterComponent implements OnInit {
  form: FormGroup;
  filter : Observable<Filter>;
  suits : {id: number; suit: string}[] = [];
  deck : {rank: number; card: string}[] = [];
  hand : Card[] = [];
  draw : Card[] = [];

  constructor(
    private fb: FormBuilder, 
    private filterService: FilterService,
    private drawService: DrawService) { }


  ngOnInit() {
    this.form = this.fb.group({
      ndeck: [''],
      suits: ['', [ Validators.required ]],
      size:  ['', [ Validators.min(1) ]],
      rank: new FormGroup({
        max: new FormControl(''),
        min: new FormControl(''),
      }, [RankValidator])
    }, { validator: FormValidator() });

    this.filter = this.filterService.loadFilter().pipe(
      tap(filter => this.form.patchValue(filter)));

    // Suit dropdown
    for(var n in Suit) {
      if (typeof Suit[n] === 'number') {
        this.suits.push({id: <any>Suit[n], suit: n});
      }
    }

    // Max and Min Card dropdown
    for(var n in Rank) {
      if (typeof Rank[n] === 'number') {
        this.deck.push({rank: <any>Rank[n], card: Rank.toString(Rank[n])}); 
      }
    }
  }

  onSubmit() {
    this.quickDraw(this.form.value);
  }

  quickDraw(filter:Filter) {
    this.hand = [];
    this.filterService.updateFilter(filter);
    this.drawService.getDraw()
      .subscribe(draw => this.draw = draw);

    for(let i = 0; i < filter.size; i++) {
      this.hand
        .push(<Card>this.draw[i]);
    }
    
    this.hand
      .sort((card1, card2) => Card.sort(card1, card2));
  }
}
