console.time("runtime");
const { output, getInput } = require("./utils/inputOutput.js");
const { Pair } = require("./utils/structures.js");
const { transpose } = require("./utils/arrays.js");

let input = [];
let cache = {};
let counter = 0;
processLineByLine();

//part 1 - 109424 7.122ms

async function processLineByLine() {
  let path = process.argv[2];
  input = await getInput(path);

  /////// WORK HERE ////////
  let [platform, roundRocks] = parse(input);

  let answer = [];
  let cycles = 10;
  answer.push(partOne(platform, roundRocks));
  [platform, roundRocks] = parse(input);
  answer.push(partTwo(platform, cycles));
  console.log(cycles);
  console.log(counter);
  console.log(answer);
  console.timeEnd("runtime");
}

function shiftRock(platform, rock, direction) {
  let directions = {
    north: [-1, 0],
    east: [0, 1],
    south: [1, 0],
    west: [0, -1],
  };

  let currentPosition = Pair(rock.y, rock.x);
  let nextPosition = Pair(
    currentPosition.y + directions[direction][0],
    currentPosition.x + directions[direction][1],
  );
  while (
    nextPosition.y >= 0 &&
    nextPosition.y < platform.length &&
    nextPosition.x >= 0 &&
    nextPosition.x < platform[nextPosition.y].length &&
    platform[nextPosition.y][nextPosition.x] == "."
  ) {
    currentPosition.x = nextPosition.x;
    currentPosition.y = nextPosition.y;
    nextPosition.y += directions[direction][0];
    nextPosition.x += directions[direction][1];
  }
  return currentPosition;
}

function spin(platform) {
  let key = platform.toString("");
  if (key in cache) {
    counter++;
    return JSON.parse(cache[key]);
  }
  for (let row = 0; row < platform.length; row++) {
    for (let col = 0; col < platform[row].length; col++) {
      if (platform[row][col] == "O") {
        rock = Pair(row, col);
        let newLocation = shiftRock(platform, rock, "north");
        if (newLocation.x != rock.x || newLocation.y != rock.y) {
          platform[newLocation.y][newLocation.x] = "O";
          platform[rock.y][rock.x] = ".";
          rock.x = newLocation.x;
          rock.y = newLocation.y;
        }
      }
    }
  }
  for (let row = 0; row < platform.length; row++) {
    for (let col = 0; col < platform[row].length; col++) {
      if (platform[row][col] == "O") {
        rock = Pair(row, col);
        let newLocation = shiftRock(platform, rock, "west");
        if (newLocation.x != rock.x || newLocation.y != rock.y) {
          platform[newLocation.y][newLocation.x] = "O";
          platform[rock.y][rock.x] = ".";
          rock.x = newLocation.x;
          rock.y = newLocation.y;
        }
      }
    }
  }
  for (let row = platform.length - 1; row >= 0; row--) {
    for (let col = 0; col < platform[row].length; col++) {
      if (platform[row][col] == "O") {
        rock = Pair(row, col);
        let newLocation = shiftRock(platform, rock, "south");
        if (newLocation.x != rock.x || newLocation.y != rock.y) {
          platform[newLocation.y][newLocation.x] = "O";
          platform[rock.y][rock.x] = ".";
          rock.x = newLocation.x;
          rock.y = newLocation.y;
        }
      }
    }
  }
  for (let row = 0; row < platform.length; row++) {
    for (let col = platform[row].length - 1; col >= 0; col--) {
      if (platform[row][col] == "O") {
        rock = Pair(row, col);
        let newLocation = shiftRock(platform, rock, "east");
        if (newLocation.x != rock.x || newLocation.y != rock.y) {
          platform[newLocation.y][newLocation.x] = "O";
          platform[rock.y][rock.x] = ".";
          rock.x = newLocation.x;
          rock.y = newLocation.y;
        }
      }
    }
  }
  cache[key] = JSON.stringify(platform);
  return platform;
}

function partTwo(platform, cycles) {
  for (let index = 0; index < cycles; index++) {
    platform = spin(platform);
  }
  // console.table(platform);
  return calculateLoad(platform);
}

function partOne(platform, roundRocks) {
  roundRocks.forEach((rock) => {
    let newLocation = shiftRock(platform, rock, "north");
    if (newLocation.x != rock.x || newLocation.y != rock.y) {
      platform[newLocation.y][newLocation.x] = "O";
      platform[rock.y][rock.x] = ".";
      rock.x = newLocation.x;
      rock.y = newLocation.y;
    }
  });
  // console.log(roundRocks);
  // console.table(platform);

  return calculateLoad(platform, roundRocks);
}

function calculateLoad(platform) {
  let answer = 0;
  for (let row = 0; row < platform.length; row++) {
    for (let col = 0; col < platform[row].length; col++) {
      if (platform[row][col] == "O") {
        answer += platform.length - row;
      }
    }
  }
  return answer;
}

function parse(input) {
  let platform = [];
  let roundRocks = [];
  input.forEach((line, rowIndex) => {
    let tempArray = line.split("");
    platform.push(tempArray);
    tempArray.forEach((value, colIndex) => {
      if (value == "O") {
        roundRocks.push(Pair(rowIndex, colIndex));
      }
    });
  });
  return [platform, roundRocks];
}
