console.time("runtime");
import { getInput } from "./utils/inputOutput.js";
import { Range } from "./utils/structures.js";

solve();

function solve() {
  let path = process.argv[2];
  let input = getInput(path);

  let [rules, parts] = [...parse(input)];
  // console.log(rules);
  // console.log(parts);
  let answer = [0, 0];

  answer[0] = partOne(rules, parts);
  answer[1] = partTwo(rules);

  console.log(answer);
  console.timeEnd("runtime");
}
//part 1 348378 35ms
//part 2

//k-d tree

function partOne(ruleList, partsList) {
  let qualities = { x: 0, m: 1, a: 2, s: 3 };
  let sum = 0;
  partsList.forEach((part) => {
    let rule = ruleList.get("in");
    let status = "P";

    while (status == "P") {
      for (let index = 0; index < rule.length; index++) {
        let step = rule[index];
        let filter, result;
        let condition, symbol, limit;

        if (step.indexOf(":") != -1) {
          [filter, result] = [...step.split(":")];
          condition = filter.substring(0, 1);
          symbol = filter.substring(1, 2);
          limit = parseInt(filter.substring(2));

          if (symbol == "<") {
            if (part[qualities[condition]] < limit) {
              if (result == "A" || result == "R") {
                status = result;
                break;
              } else {
                rule = ruleList.get(result);
                break;
              }
            }
          } else {
            if (part[qualities[condition]] > limit) {
              if (result == "A" || result == "R") {
                status = result;
                break;
              } else {
                rule = ruleList.get(result);
                break;
              }
            }
          }
        } else {
          result = step;
          if (result == "A" || result == "R") {
            status = result;
            break;
          } else {
            rule = ruleList.get(result);
            break;
          }
        }
      }
    }
    if (status == "A") {
      part.forEach((value) => {
        sum += value;
      });
    }
  });
  return sum;
}

function partTwo(ruleList) {
  let qualities = { x: 0, m: 1, a: 2, s: 3 };
  let sum = 0;
  let accepted = [];
  let queue = [];

  queue.push([
    ruleList.get("in"),
    Range(1, 4000),
    Range(1, 4000),
    Range(1, 4000),
    Range(1, 4000),
  ]);

  console.table(queue);
  while (queue.length != 0) {
    let [rule, ...xmas] = queue.pop();

    for (let index = 0; index < rule.length; index++) {
      let step = rule[index];
      if (step.indexOf(":") != -1) {
        let nxmas = [...xmas];
        let [filter, result] = [...step.split(":")];
        let condition = filter.substring(0, 1);
        let symbol = filter.substring(1, 2);
        let limit = parseInt(filter.substring(2));

        if (symbol == "<") {
          if (nxmas[qualities[condition]].lower < limit) {
            nxmas[qualities[condition]] = Range(
              nxmas[qualities[condition]].lower,
              Math.min(nxmas[qualities[condition]].upper, limit - 1),
            );
            if (result == "A") {
              accepted.push(nxmas);
            } else if (result != "R") {
              queue.push([ruleList.get(result), ...nxmas]);
            }
            if (xmas[qualities[condition]].upper > limit) {
              xmas[qualities[condition]] = Range(
                limit,
                xmas[qualities[condition]].upper,
              );
            } else {
              break;
            }
          }
        } else {
          if (nxmas[qualities[condition]].upper > limit) {
            nxmas[qualities[condition]] = Range(
              Math.max(nxmas[qualities[condition]].lower, limit + 1),
              nxmas[qualities[condition]].upper,
            );
            if (result == "A") {
              accepted.push(nxmas);
            } else if (result != "R") {
              queue.push([ruleList.get(result), ...nxmas]);
            }
            if (xmas[qualities[condition]].lower < limit) {
              xmas[qualities[condition]] = Range(
                xmas[qualities[condition]].lower,
                limit,
              );
            } else {
              break;
            }
          }
        }
      } else {
        if (step == "R") {
          continue;
        }
        if (step == "A") {
          accepted.push(xmas);
          continue;
        }
        queue.push([ruleList.get(step), ...xmas]);
      }
    }
  }
  accepted.forEach((partRange) => {
    let tempSum =
      partRange[0].length() *
      partRange[1].length() *
      partRange[2].length() *
      partRange[3].length();
    sum += tempSum;
    console.log(tempSum);
  });
  return sum;
}

function parse(input) {
  let rules = new Map();
  let partsList = [];
  let partSplit = false;

  input.forEach((line) => {
    if (line == "") {
      partSplit = true;
    } else {
      if (!partSplit) {
        let templine = line.split("{");
        templine[1] = templine[1].replace("}", "");
        rules.set(templine[0], templine[1].split(","));
      } else {
        let templine = line.replaceAll(/[{}=xmas]/g, "").split(",");
        let part = [];
        templine.forEach((value) => {
          part.push(parseInt(value));
        });
        partsList.push(part);
      }
    }
  });
  return [rules, partsList];
}
