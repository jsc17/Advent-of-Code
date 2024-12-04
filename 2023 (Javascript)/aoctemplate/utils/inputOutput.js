import { createWriteStream, readFileSync } from "node:fs";

export function output(outputArray) {
  let file = createWriteStream("array.txt");
  outputArray.forEach((line) => {
    file.write(line + "\n");
  });
  file.end();
}

export function getInput(path) {
  const file = readFileSync(path, "utf8");
  let input = file.split("\r\n");
  return input;
}
