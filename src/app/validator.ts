import { FormGroup, FormControl, AbstractControl, ValidatorFn } from '@angular/forms';

// validate FormGroup
export function RankValidator(group: FormGroup) {
  const max = group ? group.get('max').value : new FormControl().value;
  const min = group ? group.get('min').value : new FormControl().value;
  const invalidObj = { 'rank': true };

  return Number(max) >= Number(min) ? null : invalidObj;
}

// validate FormControl
export function SizeValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    const group = control.parent;
    const ndeck = group ? group.get('ndeck').value : new FormControl().value;
    const max = group ? group.get('rank.max').value : new FormControl().value;
    const min = group ? group.get('rank.min').value : new FormControl().value;
    const suits = group ? group.get('suits').value : [];
    const size = group ? group.get('size').value : new FormControl().value;

    const invalidObj = { 'size': {value: true }};
    const availSize = ndeck * suits.length * (max - min + 1);

    return Number(size) > Number(availSize) ? invalidObj : null;
  };
}

export function FormValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    
    // validate size <= available card count
    const value = control.value;
    const ndeck = Number(value ? value.ndeck : 0);
    const max = Number(value ? value.rank.max : 0);
    const min = Number(value ? value.rank.min : 0);
    const nsuits = Number(value ? value.suits.length : 0);
    const size = Number(value ? value.size : 0);

    const invalidObj = { 'size': {value: true }};
    const availSize = ndeck * nsuits * (max - min + 1);

    return size > availSize ? invalidObj : null;
  };
}