const ranks = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];
const suits = ['s', 'h', 'd', 'c'];

const buildDeck = (rankArray, suitArray) => {
  let fullDeck = [];
  for (c of rankArray) {
    for (s of suitArray) {
      fullDeck.push(c+s);
    }
  }
  return fullDeck;
};

const cardDeck = buildDeck(ranks, suits);

const buildCardObject = (card) => {
  let cardObject = {};
  cardObject.rank = card.slice(0,1);
  cardObject.suit = card.slice(1,2);
  return cardObject;
}

const buildCardObjectDeck = (deck) => {
  let objectDeck = [];
  for (card of deck) {
    objectDeck.push(buildCardObject(card));
  }
  return objectDeck;
}

let cardObjectDeck = buildCardObjectDeck(cardDeck);

const sortSuitRank = (objectDeck) => {
  let sortedDeck = [];
  for (s of suits) {
    for (card of objectDeck) {
      if(card.suit === s){
        // console.log(card);
        sortedDeck.push(card);
        delete(objectDeck.indexOf(card));
      }
    }
  }
  return sortedDeck;
}

let sortedDeck = sortSuitRank(cardObjectDeck);

const buildHandArray = (deck) => {
  let hand;
  let handArray = [];
  for (let i = 0; i < deck.length; i++) {
    for(let j = i + 1; j < deck.length; j++) {
      hand = [];
      hand.push(deck[i]);
      hand.push(deck[j]);
      handArray.push(hand);
    }
  }
  return handArray;
}

let handDistribution = buildHandArray(cardObjectDeck);

const buildHandIsomorphs = (distribution) => {
  let isomorph = "";
  let isomorphDistribution = [];
  for(hand of distribution){
    isomorph = hand[0].rank + hand[1].rank;
    if(!(hand[0].rank === hand[1].rank)) {
      if(hand[0].suit === hand[1].suit){
        isomorph += "s";
      }
      else{
        isomorph += "o";
      }
    }
    if(!isomorphDistribution.includes(isomorph)){
      isomorphDistribution.push(isomorph);
    }
  }
  return isomorphDistribution;
}

let isomorphs = buildHandIsomorphs(handDistribution);

// console.log(cardDeck);
// console.log(cardObjectDeck);
// console.log(sortedDeck);
// console.log(handDistribution);
console.log(handDistribution.length);
console.log(isomorphs);
console.log(isomorphs.length);
