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
    // map[map.length - 1].push(".");
    // map[map.length - 1].unshift(".");
  });

  // let tempArray = [];
  // for (let padIndex = 0; padIndex < map[0].length; padIndex++) {
  //   tempArray.push(".");
  // }

  // map.push(tempArray);
  // map.unshift(tempArray);

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
  let visited = [];
  visited.push([start.y, start.x]);

  map[start.y][start.x] = "J";

  let shapes = [];
  for (let temp = 0; temp < 6; temp++) {
    shapes.push(0);
  }

  while (current.x != start.x || current.y != start.y) {
    steps++;
    visited.push([current.y, current.x]);
    nextStep = getNextDirection(current, previous, map);
    previous = current;
    countShape(shapes, nextStep.shape);
    current = nextStep;
  }

  let sum = 0;
  let passed = false;
  for (let rIndex = 0; rIndex < map.length; rIndex++) {
    passed = false;
    for (let cIndex = 0; cIndex < map[rIndex].length; cIndex++) {
      if (visited.find((value) => value[0] == rIndex && value[1] == cIndex)) {
        if (
          map[rIndex][cIndex] == "|" ||
          map[rIndex][cIndex] == "L" ||
          map[rIndex][cIndex] == "J"
        ) {
          passed = !passed;
        }
      } else if (passed) {
        map[rIndex][cIndex] = "i";
        sum++;
      }
    }
    console.log(rIndex);
  }
  output(map);
  console.log(sum);
  console.log(steps / 2);
} //183 too low    350 too high

function countShape(shapes, nextShape) {
  switch (nextShape) {
    case "|":
      shapes[0]++;
      break;
    case "-":
      shapes[1]++;
      break;
    case "L":
      shapes[2]++;
      break;
    case "J":
      shapes[3]++;
      break;
    case "7":
      shapes[4]++;
      break;
    case "F":
      shapes[5]++;
      break;
  }
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
