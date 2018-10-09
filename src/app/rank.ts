export enum Rank {
  _2,
  _3,
  _4,
  _5,
  _6,
  _7,
  _8,
  _9,
  _10,
  _J,
  _Q,
  _K,
  _A
}

export namespace Rank {
  export function toString(rank) {
    // _2 .. _A -> 2 .. A
    return Rank[rank].substr(1);
  }

  export function options() {
    let options = [];
    
    for(var r =0; r < 13; ++r) { 
      options.push( {rank: <any>r, card: Rank.toString(r)} ); 
    }
    return options;
  }
}