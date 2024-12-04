console.time("runtime");
import { getInput } from "./utils/inputOutput.js";
import { addDirection } from "./utils/structures.js";

solve();

function solve() {
  let path = process.argv[2];
  let input = getInput(path);

  let cfg = parse(input);
  // console.log(cfg);
  let answer = [0, 0];

  answer[0] = partOne(cfg);
  answer[1] = partTwo(cfg, 26501365); //26501365

  console.log(answer);
  console.timeEnd("runtime");
}
//part 1 - 3642 40ms

function partOne(cfg) {
  return fill(cfg, 64);
}

function partTwo(cfg, steps) {
  let [start, size, rocks] = [...cfg];
  console.log(size);
  let fullgrids = Math.floor(steps / size) - 1;
  let remainingSteps = steps % size;
  let oddGrids = (Math.floor(fullgrids / 2) * 2 + 1) ** 2;
  let evenGrids = (Math.floor((fullgrids + 1) / 2) * 2) ** 2;
  let oddPoints = fill(cfg, size * 2 + 1);
  let evenPoints = fill(cfg, size * 2);
  let smalltr = fill([[size - 1, 0], size, rocks], Math.floor(size / 2) - 1);
  let smallbr = fill([[0, 0], size, rocks], Math.floor(size / 2) - 1);
  let smallbl = fill([[0, size - 1], size, rocks], Math.floor(size / 2) - 1);
  let smalltl = fill(
    [[size - 1, size - 1], size, rocks],
    Math.floor(size / 2) - 1,
  );
  let bigtr = fill(
    [[size - 1, 0], size, rocks],
    Math.floor((3 * size) / 2) - 1,
  );
  let bigbr = fill([[0, 0], size, rocks], Math.floor((3 * size) / 2) - 1);
  let bigbl = fill(
    [[0, size - 1], size, rocks],
    Math.floor((3 * size) / 2) - 1,
  );
  let bigtl = fill(
    [[size - 1, size - 1], size, rocks],
    Math.floor((3 * size) / 2) - 1,
  );
  let result = 0;
  result += oddGrids * oddPoints;
  result += evenGrids * evenPoints;
  result += fill([[size - 1, start[1]], size, rocks], size - 1);
  result += fill([[start[0], 0], size, rocks], size - 1);
  result += fill([[0, start[1]], size, rocks], size - 1);
  result += fill([[start[0], size - 1], size, rocks], size - 1);
  result += (fullgrids + 1) * (smalltr + smallbl + smalltl + smallbr);
  result += fullgrids * (bigtr + bigbr + bigtl + bigbl);
  return result;
}
// 608596985060821 too low
// 608603023131315 too high
function fill(cfg, stepsRemaining) {
  let [start, size, rocks] = [...cfg];
  let plots = new Set();
  let queue = [start];

  while (stepsRemaining >= 0) {
    let nextSteps = [];
    while (queue.length > 0) {
      let current = queue.pop();
      let neighbors = [
        addDirection(current, "up"),
        addDirection(current, "right"),
        addDirection(current, "down"),
        addDirection(current, "left"),
      ];
      neighbors.forEach((neighbor) => {
        if (
          !(
            0 > neighbor[0] ||
            neighbor[0] >= size ||
            0 > neighbor[1] ||
            neighbor[1] >= size ||
            rocks.has(neighbor.toString()) ||
            plots.has(neighbor.toString())
          )
        ) {
          if (stepsRemaining % 2 != 0) {
            plots.add(neighbor.toString());
          }
          nextSteps.push(neighbor);
        }
      });
    }
    queue = [...nextSteps];
    stepsRemaining--;
  }

  return plots.size;
}

function parse(input) {
  let size = input.length;
  let rocks = new Set();
  let start;
  for (let rowIndex = 0; rowIndex < input.length; rowIndex++) {
    const row = input[rowIndex].split("");
    for (let colIndex = 0; colIndex < row.length; colIndex++) {
      const space = row[colIndex];
      if (space == "#") {
        rocks.add([rowIndex, colIndex].toString());
      }
      if (space == "S") {
        start = [rowIndex, colIndex];
      }
    }
  }
  return [start, size, rocks];
}
