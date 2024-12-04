console.time("runtime");
import { getInput } from "./utils/inputOutput.js";
import { Pair, directions } from "./utils/structures.js";

let path = process.argv[2];
let input = getInput(path);

let cfg = parse(input);
let answer = [0, 0];

/////// WORK HERE ////////

answer[0] = partOne(cfg);
answer[1] = partTwo(cfg);
/////////////////////////

console.log(answer);
console.timeEnd("runtime");
// part 1 - 6994 13.85ms
// part 2 - 7488 958ms
function partTwo(cfg) {
  let energized = new Set();
  let beamList = {};
  let max = 0;
  for (let row = 0; row < cfg.length; row++) {
    energized.clear();
    beamList = {};
    let answer = 0;

    followBeam(cfg, [row, 0], "right", energized, beamList);
    energized.forEach(() => {
      answer++;
    });
    if (answer > max) {
      max = answer;
    }

    energized.clear();
    beamList = {};
    answer = 0;

    followBeam(cfg, [row, cfg[row].length - 1], "left", energized, beamList);
    energized.forEach(() => {
      answer++;
    });
    if (answer > max) {
      max = answer;
    }

    if (row == 0) {
      for (let col = 0; col < cfg[row].length; col++) {
        energized.clear();
        beamList = {};
        answer = 0;
        followBeam(cfg, [row, col], "down", energized, beamList);
        energized.forEach(() => {
          answer++;
        });
        if (answer > max) {
          max = answer;
        }
      }
    }
    if (row == cfg.length - 1) {
      for (let col = 0; col < cfg[row].length; col++) {
        energized.clear();
        beamList = {};
        answer = 0;
        followBeam(cfg, [row, col], "up", energized, beamList);
        energized.forEach(() => {
          answer++;
        });
        if (answer > max) {
          max = answer;
        }
      }
    }
  }
  return max;
}

function partOne(cfg) {
  let energized = new Set();
  let beamList = {};

  followBeam(cfg, [0, 0], "right", energized, beamList);
  let answer = 0;
  energized.forEach(() => {
    answer++;
  });

  return answer;
}

function followBeam(cfg, beamStart, direction, energized, beamList) {
  let key = [beamStart, direction].toString();
  if (key in beamList) {
    return;
  } else {
    beamList[key] = "";
  }

  let currentLocation = [...beamStart];
  if (
    currentLocation[0] >= cfg.length ||
    currentLocation[1] >= cfg[0].length ||
    currentLocation[0] < 0 ||
    currentLocation[1] < 0
  ) {
    return;
  }

  energized.add(currentLocation.toString());
  //continue until something is hit
  while (
    currentLocation[0] >= 0 &&
    currentLocation[1] >= 0 &&
    currentLocation[0] < cfg.length &&
    currentLocation[1] < cfg[0].length &&
    cfg[currentLocation[0]][currentLocation[1]] == "."
  ) {
    energized.add(currentLocation.toString());
    currentLocation[0] += directions[direction][0];
    currentLocation[1] += directions[direction][1];
  }
  //hit the wall
  if (
    currentLocation[0] >= cfg.length ||
    currentLocation[1] >= cfg[0].length ||
    currentLocation[0] < 0 ||
    currentLocation[1] < 0
  ) {
    return;
  }
  energized.add(currentLocation.toString());

  //hit a mirror/splitter
  if (cfg[currentLocation[0]][currentLocation[1]] == "\\") {
    let bounce;
    if (direction == "up") {
      bounce = "left";
    }
    if (direction == "right") {
      bounce = "down";
    }
    if (direction == "down") {
      bounce = "right";
    }
    if (direction == "left") {
      bounce = "up";
    }
    followBeam(
      cfg,
      [
        currentLocation[0] + directions[bounce][0],
        currentLocation[1] + directions[bounce][1],
      ],
      bounce,
      energized,
      beamList,
    );
  }
  if (cfg[currentLocation[0]][currentLocation[1]] == "/") {
    let bounce;
    if (direction == "up") {
      bounce = "right";
    }
    if (direction == "right") {
      bounce = "up";
    }
    if (direction == "down") {
      bounce = "left";
    }
    if (direction == "left") {
      bounce = "down";
    }
    followBeam(
      cfg,
      [
        currentLocation[0] + directions[bounce][0],
        currentLocation[1] + directions[bounce][1],
      ],
      bounce,
      energized,
      beamList,
    );
  }
  if (cfg[currentLocation[0]][currentLocation[1]] == "|") {
    if (direction == "up" || direction == "down") {
      followBeam(
        cfg,
        [
          currentLocation[0] + directions[direction][0],
          currentLocation[1] + directions[direction][1],
        ],
        direction,
        energized,
        beamList,
      );
    } else {
      followBeam(
        cfg,
        [
          currentLocation[0] + directions["up"][0],
          currentLocation[1] + directions["up"][1],
        ],
        "up",
        energized,
        beamList,
      );
      followBeam(
        cfg,
        [
          currentLocation[0] + directions["down"][0],
          currentLocation[1] + directions["down"][1],
        ],
        "down",
        energized,
        beamList,
      );
    }
  }
  if (cfg[currentLocation[0]][currentLocation[1]] == "-") {
    if (direction == "left" || direction == "right") {
      followBeam(
        cfg,
        [
          currentLocation[0] + directions[direction][0],
          currentLocation[1] + directions[direction][1],
        ],
        direction,
        energized,
        beamList,
      );
    } else {
      followBeam(
        cfg,
        [
          currentLocation[0] + directions["left"][0],
          currentLocation[1] + directions["left"][1],
        ],
        "left",
        energized,
        beamList,
      );
      followBeam(
        cfg,
        [
          currentLocation[0] + directions["right"][0],
          currentLocation[1] + directions["right"][1],
        ],
        "right",
        energized,
        beamList,
      );
    }
  }
}

function parse(input) {
  let cfg = [];
  input.forEach((line) => {
    cfg.push(line.split(""));
  });
  return cfg;
}
