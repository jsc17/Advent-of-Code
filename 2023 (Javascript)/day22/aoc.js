console.time("runtime");
import { getInput } from "./utils/inputOutput.js";

solve();

function solve() {
  let path = process.argv[2];
  let input = getInput(path);

  let cfg = parse(input);
  let answer = [0, 0];

  answer[0] = partOne();
  answer[1] = partTwo();

  console.log(answer);
  console.timeEnd("runtime");
}
function partOne() {
  return Infinity;
}
function partTwo() {
  return Infinity;
}
function parse(input) {
  let grid = [];
  for (let x = 0; x < 10; x++) {
    grid.push([]);
    for (let y = 0; y < 10; y++) {
      grid[x].push([]);
      for (let z = 0; z < 10; z++) {
        grid[x][y].push([]);
      }
    }
  }
  let id = 0;
  let bricks = [];

  input.forEach((line) => {
    let [start, end] = [...line.split("~")];
    for (let x = start[0]; x <= end[0]; x++) {
      for (let y = start[1]; y <= end[1]; y++) {
        for (let z = start[2]; z <= start[2]; z++) {
          grid[x][y][z] = id;
        }
      }
    }
    bricks.push(id);
    id++;
    console.log(grid);
  });

  return [grid, bricks];
}
