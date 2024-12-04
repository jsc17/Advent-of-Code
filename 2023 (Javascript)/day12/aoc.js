console.time("runtime");
const exp = require("node:constants");
const fs = require("node:fs");
const readline = require("node:readline");

processLineByLine();

function output(outputArray) {
  let file = fs.createWriteStream("array.txt");
  outputArray.forEach((line) => {
    file.write(line.springs.toString() + " " + line.pattern.toString() + "\n");
  });
  file.end();
}

//Regex
//part 1 test - 21 15ms
//part 1 - 7407 5.96s
//part 2 test -  nope
//part 2 - HELL no not even trying

//Refactor
//part 1 test - 21 15ms
//part 1 - 7407 262ms
//part 2 test - 110ms
//part 2 test memo - 16ms
//part 2 - taking a long time
//part 2 memo - 30568243604962 650ms

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

  let records = [];
  input.forEach((line) => {
    let springs = line.split(" ")[0];
    let pattern = [];
    let inputPattern = line.split(" ")[1].split(",");
    for (let tIndex = 0; tIndex < inputPattern.length; tIndex++) {
      pattern.push(parseInt(inputPattern[tIndex]));
    }
    records.push(Record(springs, pattern));
  });

  let sum = 0;
  records.forEach((record) => {
    let tempRecord = record;

    //comment this line for part 1
    tempRecord = expandRecord(record);

    let result = getPossibilites({}, tempRecord.springs, tempRecord.pattern);
    console.log(result);
    sum += result;
  });
  // console.log(records[0]);
  // sum = getPossibilites(records[0].springs, records[0].pattern);

  console.log(sum);
  console.timeEnd("runtime");
}

function getPossibilites(cache, springs, pattern) {
  if (!springs.length) {
    if (!pattern.length) {
      return 1;
    } else {
      return 0;
    }
  }
  if (!pattern.length) {
    if (!springs.includes("#")) {
      return 1;
    } else {
      return 0;
    }
  }
  let result = 0;

  let key = [springs, pattern].toString();
  if (key in cache) {
    return cache[key];
  }
  if (springs[0] == "." || springs[0] == "?") {
    result += getPossibilites(cache, springs.substring(1), pattern);
  }

  if (springs[0] == "#" || springs[0] == "?") {
    if (
      pattern[0] <= springs.length &&
      !springs.substring(0, pattern[0]).includes(".") &&
      (pattern[0] == springs.length || springs[pattern[0]] != "#")
    ) {
      result += getPossibilites(
        cache,
        springs.substring(pattern[0] + 1),
        pattern.slice(1),
      );
    }
  }

  cache[key] = result;
  return result;
}

function expandRecord(record) {
  let expandedSprings = "";
  let expandedPattern = [];

  for (let index = 0; index < 5; index++) {
    expandedSprings += record.springs;
    expandedPattern = expandedPattern.concat(record.pattern);
    if (index != 4) {
      expandedSprings += "?";
    }
  }

  return Record(expandedSprings, expandedPattern);
}

function Record(springs, pattern) {
  return { springs, pattern };
}
