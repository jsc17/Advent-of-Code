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

  let map = [];

  input.forEach((line) => {
    map.push(line.split(""));
    map[map.length - 1].push(".");
    map[map.length - 1].unshift(".");
  });

  let tempArray = [];
  for (let padIndex = 0; padIndex < map[0].length; padIndex++) {
    tempArray.push(".");
  }

  map.push(tempArray);
  map.unshift(tempArray);

  let start;

  for (let row = 0; row < map.length; row++) {
    let col = map[row].indexOf("S");
    if (col != -1) {
      start = Coordinate(row, col, "S");
      break;
    }
  }

  let current = getStartingDirection(start, map);
  let steps = 1;
  let previous = start;

  while (current.shape != "S") {
    steps++;
    steps;
    nextStep = getNextDirection(current, previous, map);
    previous = current;
    current = nextStep;
    console.log(nextStep);
  }

  console.log(steps / 2);
}

function getNextDirection(current, previous, map) {
  let north = Coordinate(
    current.y - 1,
    current.x,
    map[current.y - 1][current.x],
  );
  let east = Coordinate(
    current.y,
    current.x + 1,
    map[current.y][current.x + 1],
  );
  let south = Coordinate(
    current.y + 1,
    current.x,
    map[current.y + 1][current.x],
  );
  let west = Coordinate(
    current.y,
    current.x - 1,
    map[current.y][current.x - 1],
  );

  switch (current.shape) {
    case "|":
      if (previous.y != north.y || previous.x != north.x) {
        return north;
      } else {
        return south;
      }
    case "-":
      if (previous.y != west.y || previous.x != west.x) {
        return west;
      } else {
        return east;
      }
    case "L":
      if (previous.y != north.y || previous.x != north.x) {
        return north;
      } else {
        return east;
      }
    case "J":
      if (previous.y != north.y || previous.x != north.x) {
        return north;
      } else {
        return west;
      }
    case "7":
      if (previous.y != south.y || previous.x != south.x) {
        return south;
      } else {
        return west;
      }
    case "F":
      if (previous.y != south.y || previous.x != south.x) {
        return south;
      } else {
        return east;
      }
  }
}

function getStartingDirection(current, map) {
  //North
  let tempDirection = Coordinate(
    current.y - 1,
    current.x,
    map[current.y - 1][current.x],
  );
  if (
    tempDirection.shape == "|" ||
    tempDirection.shape == "7" ||
    tempDirection.shape == "F"
  ) {
    return tempDirection;
  }

  //East
  tempDirection = Coordinate(
    current.y,
    current.x + 1,
    map[current.y][current.x + 1],
  );
  if (
    tempDirection.shape == "-" ||
    tempDirection.shape == "J" ||
    tempDirection.shape == "7"
  ) {
    return tempDirection;
  }

  //South
  tempDirection = Coordinate(
    current.y + 1,
    current.x,
    map[current.y + 1][current.x],
  );
  if (
    tempDirection.shape == "|" ||
    tempDirection.shape == "L" ||
    tempDirection.shape == "J"
  ) {
    return tempDirection;
  }

  //West
  tempDirection = Coordinate(
    current.y - 1,
    current.x,
    map[current.y][current.x - 1],
  );
  tempDirection;
  if (
    tempDirection.shape == "-" ||
    tempDirection.shape == "L" ||
    tempDirection.shape == "F"
  ) {
    return tempDirection;
  }
}

function Coordinate(y, x, shape) {
  return { y, x, shape };
}
