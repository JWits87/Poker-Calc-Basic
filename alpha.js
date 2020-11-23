// breakEvenEquity.js - A poker break even equity drill in JavaScript
// breakEvenEquity generates a random pot size and random bet size and asks for a break even bluff success frequency

let pot, alpha, bet = 0;
betSuccess = document.getElementById("betSuccess");
betSuccess.addEventListener("keyup", function(e) {
  if (e.keyCode === 13) {
    e.preventDefault();
    document.getElementById("Submit").click();
  }
});
function resetForm() {
  pot = Math.random();
  pot = Math.floor(pot * 100)
  alpha = Math.random();
  bet = pot * alpha;
  bet = Math.floor(bet);
  alpha = (bet / (pot + bet));

  console.log("Pot Size: " + pot + "  Bet Size: " + bet);
  // Load HTML Values
  potSize = document.getElementById("potSize");
  potSize.textContent = "Pot: " + pot;
  betSize = document.getElementById("betSize");
  betSize.textContent = "Bet: " + bet;
  betSuccess.value = "";
  betSuccess.focus();
  betSuccess.select();

}
resetForm();
function checkForm() {
  let answer = intToFrequency(document.getElementById("betSuccess").value);
  let difference = 1 - (answer / alpha);
  console.log("Answer was off by " + Math.floor(difference*100) + " percent");
  console.log("Actual Required Bet Success: " + alpha);
  resetForm();
}

function intToFrequency(number) {
  let zeroString = "0."
  let numberString = number.toString();
  let frequencyString = zeroString + numberString;
  let frequency = frequencyString.valueOf();
  return frequency;
}
