const fs = require("node:fs");
const readline = require("node:readline");

let input = [];

processLineByLine();

function output() {
  let file = fs.createWriteStream("array.txt");
  input.forEach((line) => {
    file.write(line + "\n");
  });
  file.end();
}

async function processLineByLine() {
  const filestream = fs.createReadStream("input.txt");
  const rl = readline.createInterface({
    input: filestream,
    crlfDelay: Infinity,
  });
  for await (const line of rl) {
    input.push(line);
  }
  //get hands
  //sort hands by strength: weakest to strongest - 1 to n
  //  sort hands by type
  //  sort hands of each type by strength
  //multiply each hands bid times it's rank to get total winnings
  /////// WORK HERE ////////

  let hands = [];
  input.forEach((line) => {
    hands.push(Hand(...line.split(" ")));
  });

  hands.sort((a, b) => {
    if (a.type == b.type) {
      return a.compareHands(b);
    }
    return a.type - b.type;
  });

  let winnings = 0;
  hands.forEach((value, index) => {
    winnings += value.bid * (index + 1);
  });
  console.log(winnings);
}
//forgot to save original code, but basically just modify the regex to look for J in addition to each card, and filter out J's from all but the first card array

//2,3,4,5,6,7,8,9,T,J,Q,K,A
//High card, one pair, two pair, three of a kind, full house, four of a kind, five of a kind
let cardStrength = "J23456789TQKA";

function Hand(cards, inputbid) {
  let type = -1;
  let bid = parseInt(inputbid);

  getStrength();

  function getStrength() {
    let sorted = [];
    for (i = 0; i < cardStrength.length; i++) {
      let matchReg = new RegExp("[" + cardStrength.charAt(i) + "J]", "g");
      sorted.push(cards.match(matchReg));
    }
    sorted = sorted.filter((value) => {
      return value != null && value != "J";
    });
    sorted = sorted.sort((a, b) => {
      return b.length - a.length;
    });

    for (let sIndex = 1; sIndex < sorted.length; sIndex++) {
      sorted[sIndex] = sorted[sIndex].filter((value) => {
        return value != "J";
      });
    }

    console.log(sorted);
    if (sorted[0].length == 5) {
      type = 7;
    } else if (sorted[0].length == 4) {
      type = 6;
    } else if (sorted[0].length == 3) {
      if (sorted[1].length == 2) {
        type = 5;
      } else {
        type = 4;
      }
    } else if (sorted[0].length == 2) {
      if (sorted[1].length == 2) {
        type = 3;
      } else {
        type = 2;
      }
    } else {
      type = 1;
    }
  }

  //should return true if this hand is stronger than other hand
  function compareHands(otherHand) {
    let winner = false;
    let index = 0;
    while (!winner) {
      if (cards.charAt(index) != otherHand.cards.charAt(index)) {
        winner = true;
      } else {
        index++;
      }
    }
    if (
      cardStrength.indexOf(cards.charAt(index)) >
      cardStrength.indexOf(otherHand.cards.charAt(index))
    ) {
      return 1;
    } else {
      return -1;
    }
  }

  return { bid, cards, type, compareHands };
}
