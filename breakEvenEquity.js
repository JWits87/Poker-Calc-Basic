// breakEvenEquity.js - A poker break even equity drill in JavaScript
// breakEvenEquity generates a random pot size and random bet size and asks for a break even bluff success frequency

let potSize = Math.random(0, 100);
let breakEvenBluffSuccess = Math.random();
let bluffSize = potSize * breakEvenBluffSuccess;

console.log("Pot Size: " + potSize + "  Bluff Size: " + bluffSize + "  BreakEven Bluff Success: " + breakEvenBluffSuccess);
 
