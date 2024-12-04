console.time("runtime");
const { output, getInput } = require("./utils/inputOutput.js");

let input = [];

processLineByLine();

//part 1 - 505459 15.5ms
//part 2 - 228508 24ms

async function processLineByLine() {
  let path = process.argv[2];
  input = await getInput(path);

  /////// WORK HERE ////////

  let steps = input[0].split(",");
  let answer = [0, 0];
  let boxes = [];
  for (let index = 0; index < 256; index++) {
    boxes.push(new Map());
  }

  steps.forEach((step) => {
    //part 1
    answer[0] += getHash(step);

    //part 2
    let operation = step.match(/[=-]/g)[0];
    let label = step.split(operation)[0];
    let box = getHash(label);
    if (operation == "=") {
      let focal = step.split(operation)[1];
      boxes[box].set(label, parseInt(focal));
    } else {
      boxes[box].delete(label);
    }
  });

  boxes.forEach((box, boxIndex) => {
    let count = 1;
    box.forEach((value) => {
      answer[1] += value * count * (boxIndex + 1);
      count++;
    });
  });

  console.log(answer);
  console.timeEnd("runtime");
}

function getHash(str) {
  let hash = 0;

  for (let index = 0; index < str.length; index++) {
    hash += str.charCodeAt(index);
    hash = hash * 17;
    hash = hash % 256;
  }
  return hash;
}
