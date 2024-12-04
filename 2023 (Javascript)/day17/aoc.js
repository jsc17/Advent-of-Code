console.time("runtime");
import { getInput } from "./utils/inputOutput.js";
import { dijkstra, dijkstra2 } from "./utils/pathfinding.js";

solve();

function solve() {
  let path = process.argv[2];
  let input = getInput(path);

  let cfg = parse(input);
  let answer = [0, 0];

  answer[0] = dijkstra(cfg);
  answer[1] = dijkstra2(cfg);

  console.log(answer);
  console.timeEnd("runtime");
}

//part 1 942 17.25s
//part 2 1082 2:52m

function parse(input) {
  let config = [];

  input.forEach((line) => {
    config.push(line.split(""));
  });

  return config;
}
