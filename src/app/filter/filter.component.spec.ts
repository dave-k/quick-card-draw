import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule }   from '@angular/forms';

import { FilterComponent } from './filter.component';
import { CardComponent } from '../card/card.component';

describe('FilterComponent', () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterComponent, 
                      CardComponent ],
      imports: [ReactiveFormsModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
