console.time("runtime");
const fs = require("node:fs");
const readline = require("node:readline");

let input = [];

processLineByLine();

function output(map) {
  let file = fs.createWriteStream("array.txt");
  map.forEach((line) => {
    file.write(line.toString().replaceAll(",", "") + "\n");
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

  let map = [];
  input.forEach((line) => {
    map.push(line.split(""));
  });

  let empty = getEmptyRowsAndCols(map);
  let galaxyPairs = getGalaxyPairs(map);

  //how many lines each blank line should count as
  let factor = 2;

  let sum = 0;
  galaxyPairs.forEach((pair) => {
    result = getDistance(...pair, empty, factor);
    sum += result;
  });

  //sum all distances
  console.log(sum);
  console.timeEnd("runtime");
}

//initial part 1 - 10173804 ~220ms
//refactor part 1 - 10173804 ~90ms
//part 2 - 634324905172 ~90ms

function getEmptyRowsAndCols(map) {
  let emptyResults = [[], []];
  for (let row = 0; row < map.length; row++) {
    let empty = true;
    for (let col = 0; col < map[row].length; col++) {
      if (map[row][col] == "#") {
        empty = false;
      }
    }
    if (empty) {
      emptyResults[0].push(row);
    }
  }
  for (let col = 0; col < map[0].length; col++) {
    let empty = true;
    for (let row = 0; row < map.length; row++) {
      if (map[row][col] == "#") {
        empty = false;
      }
    }
    if (empty) {
      emptyResults[1].push(col);
    }
  }
  return emptyResults;
}

function getGalaxyPairs(map) {
  let pairs = [];
  let galaxies = 0;
  for (let row = 0; row < map.length; row++) {
    for (let col = 0; col < map[row].length; col++) {
      if (map[row][col] == "#") {
        galaxies++;
        let first = Galaxy(row, col);
        let firstLine = true;
        for (let tRow = row; tRow < map.length; tRow++) {
          for (let tCol = 0; tCol < map[tRow].length; tCol++) {
            if (firstLine) {
              tCol = col;
              firstLine = false;
            } else {
              if (map[tRow][tCol] == "#") {
                let second = Galaxy(tRow, tCol);
                if (!first.equals(second)) {
                  pairs.push([first, second]);
                }
              }
            }
          }
        }
      }
    }
  }
  return pairs;
}

function getDistance(galaxyA, galaxyB, empty, factor) {
  let crossedEmpty = 0;
  let result = 0;
  let pairMaxRow = Math.max(galaxyA.row, galaxyB.row);
  let pairMinRow = Math.min(galaxyA.row, galaxyB.row);
  let pairMaxCol = Math.max(galaxyA.col, galaxyB.col);
  let pairMinCol = Math.min(galaxyA.col, galaxyB.col);

  empty[0].forEach((emptyRow) => {
    if (pairMinRow < emptyRow && emptyRow < pairMaxRow) {
      crossedEmpty++;
    }
  });
  empty[1].forEach((emptyCol) => {
    if (pairMinCol < emptyCol && emptyCol < pairMaxCol) {
      crossedEmpty++;
    }
  });
  result =
    pairMaxRow -
    pairMinRow +
    pairMaxCol -
    pairMinCol +
    crossedEmpty * (factor - 1);
  return result;
}

function Galaxy(row, col) {
  function equals(otherGalaxy) {
    if (row == otherGalaxy.row && col == otherGalaxy.col) {
      return true;
    }
    return false;
  }
  return { row, col, equals };
}
