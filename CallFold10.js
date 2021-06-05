'use strict';
const inquirer = require('inquirer');
var output = [];

let callAsk = (potSize, betSize, loseFrequency, winFrequency) => {
  return "Pot Size: " + potSize + ".  Bet Size: " + betSize + ".  Estimated Frequency of a Better Hand: " + winFrequency + ".  Estimated Frequency of a Losing Hand: " + loseFrequency + ". Call or Fold?";
}


var questions = [
  {
    type: 'input',
    name: 'callFold',
    message: callAsk(Math.floor(Math.random, 4), Math.random(6, 20), Math.random(), Math.random());
    default: 'Fold';
  },
  {
    type: 'confirm',
    name: 'askAgain',
    message: 'Again?',
    default: true,
  }
];

function ask() {
  inquirer.prompt(questions).then((answers) => {
    output.push(answers.callFold);
    if (answers.askAgain) {
      ask();
    } else {
      console.log('Your answers: ' output.join(', '));
    }

  });
}
