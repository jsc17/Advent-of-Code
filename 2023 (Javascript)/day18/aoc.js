console.time("runtime");
import { getInput, output } from "./utils/inputOutput.js";
import { directions, addDirection } from "./utils/structures.js";

solve();

function solve() {
  let path = process.argv[2];
  let input = getInput(path);

  let cfg = parse(input);
  let cfg2 = parse2(cfg);
  let answer = [0, 0];

  // answer[0] = partOne(cfg);
  answer[0] = partTwo(cfg);
  answer[1] = partTwo(cfg2);

  console.log(answer);

  console.timeEnd("runtime");
} ///57196493937412 too high

//part 1 flood fill 52231 51ms
//part 1 shoelace 52231 8ms
//part 2 my shoelace 57196493937412 145ms wrong
//part 2 destructured shoelace 57196493937398 146ms correct

function partOne(cfg) {
  let graph = [[]];
  let current = [0, 0];
  cfg.forEach((command) => {
    for (let index = 0; index < parseInt(command[1]); index++) {
      current = addDirection(current, directions[command[0]]);
      if (current[0] == -1) {
        let newRow = [];
        for (let tIndex = 0; tIndex < graph[0].length; tIndex++) {
          newRow.push(".");
        }
        graph.unshift(newRow);
        current[0] = 0;
      }
      if (current[1] == -1) {
        graph.forEach((row) => {
          row.unshift(".");
        });
        current[1] = 0;
      }
      if (current[0] == graph.length) {
        let newRow = [];
        for (let tIndex = 0; tIndex < graph[0].length; tIndex++) {
          newRow.push(".");
        }
        graph.push(newRow);
      }
      if (current[1] == graph[0].length) {
        graph.forEach((row) => {
          row.push(".");
        });
      }
      if (
        (command[0] == "up" || command[0] == "down") &&
        index != command[1] - 1
      ) {
        graph[current[0]][current[1]] = "|";
      } else if (graph[current[0]][current[1]] != "|") {
        graph[current[0]][current[1]] = "-";
      }
    }
  });
  let answer = 0;

  outer: for (let row = 0; row < graph.length - 0; row++) {
    for (let col = 0; col < graph[row].length; col++) {
      if (graph[row][col] == "|") {
        floodFill(graph, [row, col + 1]);
        break outer;
      }
    }
  }
  for (let row = 0; row < graph.length - 0; row++) {
    for (let col = 0; col < graph[row].length; col++) {
      if (graph[row][col] != ".") {
        answer++;
      }
    }
  }

  // output(graph);
  // console.table(graph);
  return answer;
}

function partTwo(cfg) {
  let answer = 0;
  let current = [0, 0];
  let vertices = [];
  cfg.forEach((line, index) => {
    if (line[0] == "up") {
      current[0] -= parseInt(line[1]);
    } else if (line[0] == "down") {
      current[0] += parseInt(line[1]);
    } else if (line[0] == "right") {
      current[1] += parseInt(line[1]);
    } else {
      current[1] -= parseInt(line[1]);
    }
    vertices.push([...current]);
    answer += parseInt(line[1]);
  });
  let area = shoelace(vertices);
  answer = answer / 2 + 1 + area;
  return answer;
}

function shoelace(vertices) {
  let area = 0;

  for (let index = 0; index < vertices.length; index++) {
    let [x1, y1] = vertices[index];
    let [x2, y2] = vertices[(index + 1) % vertices.length];
    area += x1 * y2 - y1 * x2;
  }
  return Math.abs(area) / 2;
}

function floodFill(graph, start) {
  let inside = [];
  inside.push(start);
  while (inside.length) {
    let current = inside.pop();
    graph[current[0]][current[1]] = "#";
    let neighbors = getNeighbors(current);
    neighbors.forEach((neighbor) => {
      if (graph[neighbor[0]][neighbor[1]] == ".") {
        inside.push(neighbor);
      }
    });
  }
}

function getNeighbors(start) {
  let neighbors = [];
  let dir = ["up", "right", "down", "left"];

  dir.forEach((direct) => {
    neighbors.push(addDirection(start, directions[direct]));
  });
  return neighbors;
}

function parse2(cfg) {
  let cfg2 = [];
  //convert the input
  cfg.forEach((line) => {
    let tempStr = line[2]
      .replaceAll("(", "")
      .replaceAll(")", "")
      .replaceAll("#", "");
    let value = parseInt(tempStr.substring(0, 5), 16);
    let dir = ["right", "down", "left", "up"];
    let direction = dir[parseInt(tempStr.charAt(5))];
    cfg2.push([direction, value]);
  });
  return cfg2;
}

function parse(input) {
  let config = [];
  input.forEach((line) => {
    let temp = line.split(" ");
    let direction = temp[0];
    if (direction == "U") {
      temp[0] = "up";
    }
    if (direction == "R") {
      temp[0] = "right";
    }
    if (direction == "D") {
      temp[0] = "down";
    }
    if (direction == "L") {
      temp[0] = "left";
    }
    config.push(temp);
  });
  return config;
}
