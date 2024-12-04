console.time("runtime");
const { output, getInput } = require("./utils/inputOutput.js");
const { transpose } = require("./utils/arrays.js");

let input = [];

processLineByLine();

async function processLineByLine() {
  let path = process.argv[2];
  input = await getInput(path);

  /////// WORK HERE ////////

  let notes = parse(input);

  let answer = solve(notes);

  console.log(answer);

  console.timeEnd("runtime");
}

//part 1 - 42ms 37561
//part 2 - 1.317s 31108

function partTwo(note) {
  let horizontalResults = new Set();
  let verticalResults = new Set();
  let answer = 0;

  for (let row = 0; row < note.length; row++) {
    for (let col = 0; col < note[row].length; col++) {
      let tempNote = JSON.parse(JSON.stringify(note));
      // console.log(row + " " + col);
      if (tempNote[row][col] == "#") {
        tempNote[row][col] = ".";
      } else {
        tempNote[row][col] = "#";
      }
      // console.table(tempNote);
      // console.table(note);
      let temp = getReflections(tempNote);

      // console.table(temp);
      temp[0].forEach((value) => {
        horizontalResults.add(value);
      });
      temp[1].forEach((value) => {
        verticalResults.add(value);
      });
    }
  }
  horizontalResults.delete(-1);
  verticalResults.delete(-1);
  let original = getReflections(note);
  original[0].forEach((value) => {
    horizontalResults.delete(value);
  });
  original[1].forEach((value) => {
    verticalResults.delete(value);
  });

  horizontalResults.forEach((value) => {
    answer += value;
  });
  verticalResults.forEach((value) => {
    answer += value * 100;
  });
  console.log(answer);
  return answer;
}

function partOne(note) {
  let answer = 0;
  let temp = getReflections(note);
  if (temp[0] != -1) {
    answer += temp[0][0];
  }
  if (temp[1] != -1) {
    answer += temp[1][0] * 100;
  }
  return answer;
}

function getReflections(note) {
  let result = [];
  let transposedNote = transpose(note);
  result.push(findReflectionLine(transposedNote));
  result.push(findReflectionLine(note));
  return result;
}

function solve(notes) {
  let answer = 0;
  let answerp2 = 0;

  notes.forEach((note) => {
    answer += partOne(note);
    answerp2 += partTwo(note);
  });

  return [answer, answerp2];
}

function findReflectionLine(note) {
  let results = [];
  for (let row = 0; row < note.length - 1; row++) {
    let mirrored;
    let min = Math.min(row, note.length - 1 - (row + 1));

    for (let tIndex = 0; tIndex <= min; tIndex++) {
      if (
        note[row - tIndex].toString() == note[row + 1 + tIndex].toString() &&
        mirrored != false
      ) {
        mirrored = true;
      } else {
        mirrored = false;
      }
    }

    if (mirrored) {
      results.push(row + 1);
    }
  }
  if (results.length) {
    return results;
  }
  return [-1];
}

function parse(input) {
  let index = 0;
  let notes = [[]];
  input.forEach((line) => {
    if (line.length == 0) {
      notes.push([]);
    } else {
      notes[notes.length - 1].push(line.split(""));
    }
  });
  return notes;
}
