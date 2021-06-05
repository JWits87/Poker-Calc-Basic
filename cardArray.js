
let suits = ['s', 'h', 'c', 'd'];
let cards = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];
let deck = [];

for( c of cards){
  for( s of suits){
    deck.push(c + s);
  }
}

console.log(suits);
console.log(cards);
console.log(deck);

function buildDistribution(deck, combination = []) {
  let combination [];
  for ( card in deck ) {
    let index = deck.indexOf(card);
    combination = combination.push(deck[index]);

  }
  combination.push(deck.next());
}
