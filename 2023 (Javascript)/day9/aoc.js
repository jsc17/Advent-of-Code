const fs = require("node:fs");
const { get } = require("node:https");
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
  let histories = [];
  input.forEach((line) => {
    histories.push(line.split(" "));
  });

  let sum = 0;
  let sumPart2 = 0;

  histories.forEach((history) => {
    let result = getSequence(history.map((value) => parseInt(value)));
    sum += result;
  });

  histories.forEach((history) => {
    let result = getSequence(history.map((value) => parseInt(value)).reverse());
    sumPart2 += result;
  });

  console.log(sum);
  console.log(sumPart2);
}

//get each line as an array of numbers
//get the difference of each step
//if difference is not equal to 0, repeat
//once all sequences have been found, process in reverse to get the next number in sequence
//sum all calculated numbers

function getSequence(history) {
  let newSequence = [];
  let placeholder;

  if (!history.filter((value) => value != 0).length) {
    return 0;
  }

  for (let index = 1; index < history.length; index++) {
    newSequence.push(history[index] - history[index - 1]);
  }
  placeholder = history[history.length - 1] + getSequence(newSequence);

  console.log(newSequence);
  return placeholder;
}
