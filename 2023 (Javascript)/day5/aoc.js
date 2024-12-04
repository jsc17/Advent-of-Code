const fs = require("node:fs");
const readline = require("node:readline");

processLineByLine();

function output() {
  let file = fs.createWriteStream("output.txt");
  input.forEach((line) => {
    file.write(line + "\n");
  });
  file.end();
}

let lowest = Infinity;

async function processLineByLine() {
  let input = [];
  const filestream = fs.createReadStream("test.txt");
  const rl = readline.createInterface({
    input: filestream,
    crlfDelay: Infinity,
  });
  for await (const line of rl) {
    input.push(line);
  }

  /////// WORK HERE ////////
  let seedList = input.shift().split(":")[1].trim().split(" ");
  let seedRanges = [];

  // / Works for part 1 /; ///
  // for (let sIndex = 0; sIndex < seedList.length; sIndex++) {
  //   seedRanges.push(range(parseInt(seedList[sIndex])));
  // }

  for (let sIndex = 0; sIndex < seedList.length; sIndex = sIndex + 2) {
    seedRanges.push(
      range(
        parseInt(seedList[sIndex]),
        parseInt(seedList[sIndex]) + parseInt(seedList[sIndex + 1])
      )
    );
  }

  let maps = createMaps(input);
  seedRanges.forEach((seed) => {
    checkMap(seed, maps, 0);
  });

  console.log("Lowest: " + lowest);
}

function checkMap(inputRange, maps, mapIndex) {
  let tempRanges = [];
  if (mapIndex == maps.length) {
    lowest = Math.min(lowest, inputRange.lower);
    return inputRange.lower;
  }
  maps[mapIndex].forEach((line) => {
    let inter = inputRange.intersect(line.rule);

    if (inter != null) {
      tempRanges.push(inputRange.intersect(line.rule).add(line.offset));
      tempRanges.concat(inputRange.subtract(line.rule));
    }
  });
  if (tempRanges.length) {
    tempRanges.forEach((value) => {
      checkMap(value, maps, mapIndex + 1);
    });
  } else {
    checkMap(inputRange, maps, mapIndex + 1);
  }
}

function createMaps(input) {
  let mapArray = [];
  let tempArray = [];
  while (input.length) {
    line = input.shift();
    if (line == "") {
      input.shift();
      if (tempArray.length) {
        mapArray.push(tempArray);
        tempArray = [];
      }
    } else {
      lineArray = line.split(" ");
      for (let index = 0; index < lineArray.length; index++) {
        lineArray[index] = parseInt(lineArray[index], 10);
      }
      let map = mapLine(...lineArray);
      tempArray.push(map);
    }
  }
  mapArray.push(tempArray);
  return mapArray;
}

function mapLine(destinationStart, sourceStart, mapRange) {
  let rule = range(sourceStart, sourceStart + mapRange);
  let offset = destinationStart - sourceStart;

  return { rule, offset };
}

function range(lower, upper = null) {
  if (upper === null) {
    upper = lower;
  }
  const intersect = (otherRange) => {
    tempRange = range(
      Math.max(lower, otherRange.lower),
      Math.min(upper, otherRange.upper)
    );
    return tempRange.upper >= tempRange.lower ? tempRange : null;
  };

  const subtract = (otherRange) => {
    inter = intersect(otherRange);
    if (inter === null) {
      return [range(lower, upper)];
    } else if (lower == otherRange.lower && upper == otherRange.upper) {
      return [];
    } else if (lower == otherRange.lower) {
      return [range(otherRange.upper, upper)];
    } else if (upper == otherRange.upper) {
      return [range(lower, otherRange.lower)];
    } else {
      return [range(lower, otherRange.lower), range(otherRange.upper, upper)];
    }
  };

  const add = (offset) => {
    return range(lower + offset, upper + offset);
  };

  return { lower, upper, intersect, subtract, add };
}

//Too high: 662197086

// PART 1 - Would work but has to do like 2 billion calculations and crashes
//   let seeds = input.shift().split(":")[1].trim().split(" ");

//   let maps = createMaps(input);
//   let lowest = -1;

//   seeds.forEach((seed) => {
//     let number = parseInt(seed);

//     maps.forEach((map) => {
//       number = checkMap(number, map);
//     });

//     if (lowest == -1 || lowest > number) {
//       lowest = number;
//     }
//   });

//   console.log(seeds);
//   console.log(lowest);
// }

// function checkMap(number, map) {
//   for (let i = 0; i < map.length; i++) {
//     start = map[i].sourceStart;
//     range = map[i].range;
//     if (number >= start && number < start + range) {
//       number = number - start + map[i].destinationStart;
//       return number;
//     }
//   }
//   return number;
// }
// function mapLine() {
//   let sourceStart, destinationStart, range;

//   return { destinationStart, sourceStart, range };
// }
// function createMaps(input) {
//   let mapArray = [];
//   let tempArray = [];
//   while (input.length) {
//     line = input.shift();
//     if (line == "") {
//       input.shift();
//       if (tempArray.length) {
//         mapArray.push(tempArray);
//         tempArray = [];
//       }
//     } else {
//       let map = mapLine();
//       lineArray = line.split(" ");
//       for (let index = 0; index < lineArray.length; index++) {
//         lineArray[index] = parseInt(lineArray[index], 10);
//       }
//       [map.destinationStart, map.sourceStart, map.range] = lineArray;
//       tempArray.push(map);
//     }
//   }
//   mapArray.push(tempArray);
//   return mapArray;
// }
