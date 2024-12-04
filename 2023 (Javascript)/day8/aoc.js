const fs = require("node:fs");
const readline = require("node:readline");
const lcm = require("compute-lcm");

processLineByLine();

// function output() {
//   let file = fs.createWriteStream("array.txt");
//   input.forEach((line) => {
//     file.write(line + "\n");
//   });
//   file.end();
// }

async function processLineByLine() {
  let input = [];
  const filestream = fs.createReadStream("input.txt");
  const rl = readline.createInterface({
    input: filestream,
    crlfDelay: Infinity,
  });
  for await (const line of rl) {
    input.push(line);
  }

  /////// WORK HERE ////////

  let directions = input.shift();
  input.shift();
  let nodes = [];

  input.forEach((line) => {
    nodes.push(Node(line));
  });

  //let startingNodes = setupPart1(nodes); ///Setup for part 1
  let startingNodes = setupPart2(nodes);

  console.log(startingNodes);
  let numberOfSteps = [];
  startingNodes.forEach((node) => {
    numberOfSteps.push(getSteps(node, nodes, directions));
  });

  console.log(numberOfSteps); /// output for part 1
  let answer = lcm(numberOfSteps);
  console.log(answer);
}

function setupPart2(nodes) {
  let startingNodes = nodes.filter((node) => {
    return node.value.charAt(node.value.length - 1) == "A";
  });

  return startingNodes;
}

function setupPart1(nodes) {
  let startingNodes = [];
  startingNodes.push(
    nodes.find((node) => {
      return node.value == "AAA";
    })
  );
  return startingNodes;
}

function Node(line) {
  let value = line.split("=")[0].trim();
  let left = line
    .split("=")[1]
    .split(",")[0]
    .replaceAll(/[^A-z0-9]/g, "");
  let right = line
    .split("=")[1]
    .split(",")[1]
    .replaceAll(/[^A-z0-9]/g, "");

  return { value, left, right };
}

function getSteps(startingNode, nodeList, directions) {
  let counter = 0;
  let dIndex = 0;
  let currentNode = startingNode;
  while (currentNode.value.charAt(currentNode.value.length - 1) != "Z") {
    if (dIndex == directions.length) {
      dIndex = 0;
    }
    let nextDirection = directions.charAt(dIndex);
    dIndex++;
    let next;
    if (nextDirection == "L") {
      next = currentNode.left;
    } else {
      next = currentNode.right;
    }
    let nextNode = nodeList.find((node) => {
      return node.value == next;
    });
    if (currentNode.value == nextNode.value) {
      console.log("in a loop");
    }
    currentNode = nextNode;
    counter++;
  }
  return counter;
}
