const fs = require("node:fs");
const readline = require("node:readline");

function output(outputArray) {
  let file = fs.createWriteStream("array.txt");
  outputArray.forEach((line) => {
    file.write(line + "\n");
  });
  file.end();
}

async function getInput(path) {
  let input = [];
  const filestream = fs.createReadStream(path);
  const rl = readline.createInterface({
    input: filestream,
    crlfDelay: Infinity,
  });
  for await (const line of rl) {
    input.push(line);
  }
  return input;
}

exports.output = output;
exports.getInput = getInput;
