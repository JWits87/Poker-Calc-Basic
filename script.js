const positionalPlayersRemaining = {
    'UTG': 8, 'UTG1': 7, 'MP': 6, 'LJ': 5, 'HJ': 4, 'CO': 3, 'BU': 2, 'SB': 1, 'BB': 0
};

const rankedArray = ['AA', 'KK', 'QQ', 'JJ', 'AKs', 'TT', 'AK', 'AQs', '99', 'AJs', 'AQ', '88', 'ATs', 'KQs', 'AJ', '77', 'KJs', 'QJs', 'KTs', 'KQ', 'A9s', 'AT', '66', 'A8s', 'QTs', 'JTs', 'KJ', 'A7s', 'A5s', 'K9s', 'A4s', 'A6s', '55', 'Q9s', 'A3s', 'J9s', 'KT', 'QJ', 'A9', 'T9s', 'K8s', 'A2s', 'K7s', '44', 'A8', 'QT', 'Q8s', 'JT', 'J8s', 'K6s', '98s', 'T8s', 'K5s', 'A7', 'K4s', 'K9', 'A5', '33', 'K3s', 'A4', 'Q9', '87s', 'Q7s', 'T7s', 'Q6s', 'K2s', 'J7s', 'A6', '97s', 'Q5s', 'A3', 'J9', 'T9', '22', 'K8', 'A2', 'Q4s', '76s', 'K7', '86s', '96s', 'J6s', 'J5s', 'K6', 'Q3s', 'Q2s', 'T6s', '65s', 'K5', '75s', 'Q8', '54s', 'J8', 'J4s', 'T8', '98', '85s', '95s', 'K4', 'J3s', '64s', 'T4s', 'T5s', '87', 'Q7', 'K3', 'J2s', '74s', '97', 'J7', '53s', 'Q6', 'T3s', 'K2', '94s', 'T7', '84s', '43s', '63s', 'Q5', '86', 'T2s', '93s', '76', 'Q4', '92s', '96', '73s', 'J6', 'Q3', '52s', '65', 'J5', 'T6', '82s', '42s', '83s', 'Q2', '75', '54', 'J4', '62s', '85', '32s', '95', '72s', 'J3', 'T5', 'T4', '64', 'J2', '53', '74', '84', 'T3', '43', '94', 'T2', '93', '63', '92', '73', '52', '42', '83', '82', '62', '32', '72'];


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
            countedIsomorphs.push([iso.substring(0, iso.length - 1), 6]);
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

function updateGridWithRange(calculatedRange) {
    const gridCells = document.querySelectorAll('#rangeGrid div');
    gridCells.forEach(cell => {
        // Reset the cell to its default state
        cell.style.backgroundColor = '';

        // If the cell's text content is in the calculated range, highlight it
        if (calculatedRange.some(rangeHand => cell.textContent === rangeHand[0])) {
            cell.style.backgroundColor = 'green';
        }
    });
}

function parseRange(calculatedRange) {
    let rankArray = ["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2"];
    let pairs = [], suited = [], offsuit = [];
    let parsedRange = "";
    let currentRankArray = [];

    calculatedRange.forEach(hand => {
        if (hand[0].endsWith('s')) suited.push(hand[0]);
        else if (hand[0].endsWith('o')) offsuit.push(hand[0]);
        else pairs.push(hand[0]);
    });

    // Sort hands in each category if necessary
    // Example: suited.sort(), offsuit.sort(), pairs.sort()

    // Format each category

    function formatPairs(pairs) {
        // Logic to format pairs (e.g., "AA-TT")
        let formattedPairs = "";    
        let highestPair = pairs[0].toString();    
        let lowestPair = pairs[pairs.length - 1].toString();
        
        formattedPairs = formattedPairs.concat(highestPair, "-", lowestPair);
     
        
        // Return formatted string for pairs
        return formattedPairs;
    }
    
    function formatUnPaired(hands) {
        let formattedUnPaired = ""
        // Logic to format suited or offsuit hands (e.g., "AKs-A2s")
        for (rank of rankArray){
            currentRankArray = hands.filter((combo) => combo[0] == rank);
            if(currentRankArray.length > 0){
                if (currentRankArray.length >= 2){
                    formattedUnPaired = formattedUnPaired.concat(currentRankArray[0], "-", currentRankArray[currentRankArray.length - 1], ",");
                }
                else if (currentRankArray.length == 1){
                    formattedUnPaired = formattedUnPaired.concat(currentRankArray[0], ",");
                }
            
            }
        }
        // Return formatted string for suited/offsuit hands
        if(formattedUnPaired.endsWith(",")){
            formattedUnPaired = formattedUnPaired.substring(0, formattedUnPaired.length - 1);
        }
        return formattedUnPaired
    }
    // Example: "AA-TT, AKs-A2s, AKo-A2o"
    let formattedPairs = formatPairs(pairs);
    let formattedSuited = formatUnPaired(suited);
    let formattedOffsuit = formatUnPaired(offsuit);

    // Combine all categories into a single string
    return [formattedPairs, formattedSuited, formattedOffsuit].filter(Boolean).join(', ');
}

function displayParsedRange(parsedRange) {
    const parsedRangeElement = document.getElementById('parsedRangeDisplay');
    parsedRangeElement.textContent = `${parsedRange}`;
}







document.getElementById('rangeForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    
    
   
    // Extract values from the form
    let position = document.getElementById('position').value;
    let limpers = document.getElementById('limpers').value;
    let raiseSize = document.getElementById('raiseSize').value;

    let playersRemaining = positionalPlayersRemaining[position] + Number(limpers);

    // Example logic for range calculation
    let BB = 2;
    let startingPot = 1.5 * BB;
    raiseSize = raiseSize * BB;
    let currentPot = startingPot + (limpers * BB);
    let requiredRaiserSuccessFrequency = (raiseSize / (currentPot + raiseSize));
    let requiredEqualDefenseFrequency = 1 - Math.pow(requiredRaiserSuccessFrequency, (1 / playersRemaining));

    let calculatedRange = createRange(requiredEqualDefenseFrequency); // Assuming createRange is your range calculation function
    updateGridWithRange(calculatedRange);

    let parsedRange = parseRange(calculatedRange);
    displayParsedRange(parsedRange);
// Display the calculated range


});
    function populateGrid() {
        const ranks = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];
        const grid = document.getElementById('rangeGrid');
    
        for (let row = 0; row < ranks.length; row++) {
            for (let col = 0; col < ranks.length; col++) {
                const handDiv = document.createElement('div');
                if (row === col) {
                    // Pairs
                    handDiv.textContent = `${ranks[row]}${ranks[col]}`;
                } else if (row < col) {
                    // Suited hands
                    handDiv.textContent = `${ranks[row]}${ranks[col]}s`;
                } else {
                    // Offsuit hands
                    handDiv.textContent = `${ranks[col]}${ranks[row]}o`;
                }
                grid.appendChild(handDiv);
            }
        }
    }
    
    document.addEventListener('DOMContentLoaded', populateGrid);
