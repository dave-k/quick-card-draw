export enum Suit {
  clubs,
  diamonds,
  hearts,
  spades
}

export namespace Suit {
  
  export function options() {
    let options = [];
    
    for(var s =0; s < 4; ++s) { 
      options.push( {id: <any>s, suit: Suit[s]} ); 
    }
    return options;
  }
}
