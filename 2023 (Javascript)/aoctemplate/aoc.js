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
function parse(input) {}
