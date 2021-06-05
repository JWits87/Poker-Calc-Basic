function getHands(deckArray, handSize, originalTempHand = []) {
    const callbackFunction = (currentHand, currentCardValue, currentCardIndex, originalDeckArray) => { // return deck.reduce...,
        var tempHand = [...originalTempHand, currentCardValue]; // Add the next card in the (shortened) deck to the currentTempHand
        if (tempHand.length === handSize) { // if temp hand is the length of the desired hands
            currentHand.push(tempHand.join(' ')); // base case
        } else {
            /*This is where the magic happens - recurses*/
            currentHand.push(...getHands(originalDeckArray.slice(currentCardIndex + 1), handSize, tempHand)); 
            /*Recursing on originalDeckArray.slice has the effect of shortening the deck by taking out the card just pulled */
            //Recursing on tempHand has the effect of adding the next card in the shortened deck to the end of tempHand - see line 3
        }
        return currentHand;
    }
    return deckArray.reduce(callbackFunction, []);
}

var deck = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    bighands = getHands(deck, 5);

console.log(bighands.length);
console.log(bighands);
