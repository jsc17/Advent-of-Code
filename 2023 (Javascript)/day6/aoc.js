console.time("runtime");

const { time } = require("node:console");
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

  const PART = 2;
  /////// WORK HERE ////////
  let raceList = [];

  if (PART == 1) {
    raceList = inputPart1(input);
  } else {
    raceList = inputPart2(input);
  }
  let waysToWin = 0;

  raceList.forEach((race) => {
    let high = highest(race);
    let low = lowest(race);
    result = high - low;
    console.log(high + " " + low);
    if (waysToWin == 0) {
      waysToWin = result;
    } else {
      waysToWin = result * waysToWin;
    }
  });

  console.log(waysToWin);
  console.timeEnd("runtime");
}

//Part 1 brute force runtime = 14.871ms
//Part 2 brute force test data = 16.751ms 71503
//Part 2 highest-lowest test data = 14.313ms 71502
//Part 2 bruteForce real runtime = 10.508s 34934171
//Part 2 highest-lowest real data = 42.089ms 34934170

function highest(race) {
  let found = false;
  let index = race.timeLimit - 1;
  while (!found) {
    let distance = index * (race.timeLimit - index);

    if (distance > race.distanceRecord) {
      found = true;
    } else {
      index--;
    }
  }
  return index;
}

function lowest(race) {
  let found = false;
  let index = 1;
  while (!found) {
    let distance = index * (race.timeLimit - index);

    if (distance > race.distanceRecord) {
      found = true;
    } else {
      index++;
    }
  }
  return index;
}

function bruteForce(race) {
  let counter = 0;
  for (let timeHeld = 0; timeHeld < race.timeLimit; timeHeld++) {
    let distance = timeHeld * (race.timeLimit - timeHeld);

    if (distance > race.distanceRecord) {
      counter++;
    }
  }
  return counter;
}

function inputPart1() {
  let raceList = [];
  let timeList = input[0].split(":")[1].trim().split(/ +/);
  let distanceList = input[1].split(":")[1].trim().split(/ +/);

  for (let index = 0; index < timeList.length; index++) {
    raceList.push(
      RaceTimeRecord(parseInt(timeList[index]), parseInt(distanceList[index]))
    );
  }
  return raceList;
}

function inputPart2() {
  let raceList = [];
  let timeLimit = input[0].replaceAll(/[^0-9]/g, "");
  let distanceToBeat = input[1].replaceAll(/[^0-9]/g, "");

  raceList.push(RaceTimeRecord(parseInt(timeLimit), parseInt(distanceToBeat)));

  return raceList;
}

function RaceTimeRecord(timeLimit, distanceRecord) {
  return { timeLimit, distanceRecord };
}
