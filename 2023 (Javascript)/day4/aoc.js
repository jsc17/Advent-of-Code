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

  /////// WORK HERE ////////
  let sum = input.length;

  for (let index = 0; index < input.length; index++) {
    let numCorrect = parseCard(input[index]);
    sum += numCorrect + scoreCard(numCorrect, index);
  }

  console.log(sum); ///6283755
}

function scoreCard(numCorrect, startIndex) {
  let total = 0;
  for (let sIndex = 1; sIndex <= numCorrect; sIndex++) {
    let subCorrect = parseCard(input[startIndex + sIndex]);
    total += subCorrect + scoreCard(subCorrect, startIndex + sIndex);
  }
  return total;
}

function parseCard(line) {
  //splits each line into the winning and chosen numbers, and then compares the two to return the amount of correct numbers
  let winners = [];
  let chosen = [];
  let correct = 0;

  tempLine = line.split(":")[1];
  winners = tempLine
    .split("|")[0]
    .trim()
    .split(" ")
    .filter((number) => {
      return number != "";
    });
  chosen = tempLine.split("|")[1].trim().split(" ");

  winners.forEach((number) => {
    if (chosen.includes(number)) {
      correct++;
    }
  });
  return correct;
}

//// Part 1 scoring
// function scoreCard(numCorrect) {
//   let score = 0;
//   for (index = 0; index < numCorrect; index++) {
//     if (score == 0) {
//       score = 1;
//     } else {
//       score = score * 2;
//     }
//   }
//   return score;
// }
