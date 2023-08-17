// Range calc - a poker utility which accepts a frequency as a decimal between 0 and 1 and outputs a range.
// Import the readline module
const readline = require('readline');

// Create an interface instance
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let rankedArray = ['AA', 'KK', 'QQ', 'JJ', 'AKs', 'TT', 'AK', 'AQs', '99', 'AJs', 'AQ', '88', 'ATs', 'KQs', 'AJ', '77', 'KJs ', 'QJs ', 'KTs', 'KQ', 'A9s', 'AT', '66', 'A8s', 'QTs', 'JTs', 'KJ', 'A7s', 'A5s', 'K9s', 'A4s', 'A6s', '55', 'Q9s', 'A3s', 'J9s', 'KT', 'QJ', 'A9', 'T9s', 'K8s', 'A2s', 'K7s', '44', 'A8', 'QT', 'Q8s', 'JT', 'J8s', 'K6s', '98s', 'T8s', 'K5s', 'A7', 'K4s', 'K9', 'A5', '33', 'K3s', 'A4', 'Q9', '87s', 'Q7s', 'T7s', 'Q6s', 'K2s', 'J7s', 'A6', '97s', 'Q5s', 'A3', 'J9', 'T9', '22', 'K8', 'A2', 'Q4s', '76s', 'K7', '86s', '96s', 'J6s', 'J5s', 'K6', 'Q3s', 'Q2s', 'T6s', '65s', 'K5', '75s', 'Q8', '54s', 'J8', 'J4s', 'T8', '98', '85s', '95s', 'K4', 'J3s', '64s', 'T4s', 'T5s', '87', 'Q7', 'K3', 'J2s', '74s', '97', 'J7', '53s', 'Q6', 'T3s', 'K2', '94s', 'T7', '84s', '43s', '63s', 'Q5', '86', 'T2s', '93s', '76', 'Q4', '92s', '96', '73s', 'J6', 'Q3', '52s', '65', 'J5', 'T6', '82s', '42s', '83s', 'Q2', '75', '54', 'J4', '62s', '85', '32s', '95', '72s', 'J3', 'T5', 'T4', '64', 'J2', '53', '74', '84', 'T3', '43', '94', 'T2', '93', '63', '92', '73', '52', '42', '83', '82', '62', '32', '72'];
let makeRankedArray = (hArray) => {
    let iso = "";
    let isoArray = [];
    for (hand of hArray) {
        if (hand[0] == hand[1]) {
            iso = hand + "p";
            isoArray.push(iso);
        }
        else if (hand[2] == "s") {
            iso = hand;
            isoArray.push(iso);
        }
        else {
            iso = hand + "o";
            isoArray.push(iso);
        }

    }
    return isoArray;
}

let rankedIsomorphs = makeRankedArray(rankedArray);

let countIsomorphs = (isomorphs) => {
    let countedIsomorphs = [];
    for (iso of isomorphs) {
        if (iso[iso.length - 1] === "s") {
            countedIsomorphs.push([iso, 4]);
        }
        if (iso[iso.length - 1] === "o") {
            countedIsomorphs.push([iso, 12]);
        }
        if (iso[iso.length - 1] === "p") {
            countedIsomorphs.push([iso, 6]);
        }
    }
    return countedIsomorphs;
}

let countedIsos = countIsomorphs(rankedIsomorphs);

let createRange = (prob) => {
    let combos = prob * 1326;
    let range = []
    let i = 0;
    while (combos > 0) {
        combos -= countedIsos[i][1];
        if (combos > 0)
            range.push(countedIsos[i]);
        i++;
    }
    return range;
}

let countCombos = (range) => {
    let combos = 0;
    for (hand of range) {
        combos += hand[1];
    }
    return combos;
}


function getRange() { 
    // Ask the user for the frequency
    rl.question('Enter the frequency: ', (num1) => {
        // Parse the input as a number
        num1 = Number(num1);
        // Run the frequency through the range builder
        let range = createRange(num1);
        // Print the result
        console.log(range);
        // Close the interface
        //rl.close();
        if (num > 0) { 
        getRange();
        }   
    });
  
}

getRange();

