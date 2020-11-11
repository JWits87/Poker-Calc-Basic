// breakEvenEquity.js - A poker break even equity drill in JavaScript
// breakEvenEquity generates a random pot size and random bet size and asks for a break even bluff success frequency

let potSize = Math.random();
potSize = Math.floor(potSize * 100)
let breakEvenBluffSuccess = Math.random();
let bluffSize = potSize * breakEvenBluffSuccess;
bluffSize = Math.floor(bluffSize);
breakEvenBluffSuccess = (bluffSize / (potSize + bluffSize));

console.log("Pot Size: " + potSize + "  Bluff Size: " + bluffSize + "  BreakEven Bluff Success: " + breakEvenBluffSuccess);

// Load HTML Values
let form = document.getElementById("equityForm");
form.potSize.value = potSize;
form.betSize.value = bluffSize;

function checkForm() {
  let answer = form.breakEvenSuccess.value;
  let difference = 1 - (answer / breakEvenBluffSuccess);
  alert("Answer was off by " + Math.floor(difference*100) + " percent");
}
