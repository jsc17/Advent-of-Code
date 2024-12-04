const fs = require("node:fs");
const { format } = require("node:path");
const readline = require("node:readline");

let input = [];

processLineByLine();

async function processLineByLine() {
  const filestream = fs.createReadStream("input.txt");
  const rl = readline.createInterface({
    input: filestream,
    crlfDelay: Infinity,
  });
  for await (const line of rl) {
    input.push(line.split(""));
  }

  /////// WORK HERE ////////
  let sum = 0;
  mapNumbers();

  // let output = fs.createWriteStream("array.txt");
  // input.forEach((line) => {
  //   output.write(line + "\n");
  // });
  // output.end();

  input.forEach((line, lIndex) => {
    line.forEach((char, cIndex) => {
      if (char.includes("*")) {
        let resultArray = [];
        for (let rowIndex = -1; rowIndex < 2; rowIndex++) {
          rowCheck = lIndex + rowIndex;
          for (let colIndex = -1; colIndex < 2; colIndex++) {
            colCheck = cIndex + colIndex;
            resultArray.push(getNumberAt(rowCheck, colCheck));
          }
        }
        resultArray = removeDuplicates(resultArray);
        if (resultArray.length == 2) {
          console.log("Row: " + lIndex + " " + resultArray);
          let ratio = resultArray[0] * resultArray[1];
          sum += ratio;
        }
      }
    });
  });

  console.log("sum: " + sum);
}

function mapNumbers() {
  let startIndex = -1,
    endIndex = -1;
  let number = "";
  input.forEach((line) => {
    line.forEach((character, cIndex) => {
      if (character.match(/[0-9]/) != null) {
        if (startIndex == -1) {
          startIndex = cIndex;
        }
        number += character;
        if (cIndex == line.length - 1) {
          endIndex = cIndex;
          for (
            currentIndex = startIndex;
            currentIndex <= endIndex;
            currentIndex++
          ) {
            line[currentIndex] = number;
          }
          startIndex = -1;
          number = "";
        }
      } else if (startIndex != -1) {
        endIndex = cIndex - 1;
        for (
          currentIndex = startIndex;
          currentIndex <= endIndex;
          currentIndex++
        ) {
          line[currentIndex] = number;
        }
        startIndex = -1;
        number = "";
      }
    });
  });
}

function getNumberAt(row, col) {
  if (row < 0 || row >= input.length || col < 0 || col >= input[0].length)
    return NaN;

  return parseInt(input[row][col]);
}

function removeDuplicates(array) {
  if (array[0] == array[1]) {
    array[0] = NaN;
  }
  if (array[2] == array[1]) {
    array[2] = NaN;
  }
  if (array[6] == array[7]) {
    array[6] = NaN;
  }
  if (array[8] == array[7]) {
    array[8] = NaN;
  }
  return array.filter((item) => {
    return !isNaN(item);
  });
}

///// PART ONE - sucks but works

// formattedInput.forEach((line, index, thisArray) => {
//   let results = line.match(/[0-9]+/g);
//   if (results != null) {
//     let tempLine = line;
//     results.forEach((number) => {
//       let startIndex = tempLine.indexOf(number);
//       let replacement = "";

//       for (replaceIndex = 0; replaceIndex < number.length; replaceIndex++) {
//         replacement += "0";
//       }

//       tempLine =
//         tempLine.substring(0, startIndex) +
//         replacement +
//         tempLine.substring(startIndex + number.length, tempLine.length);

//       let symbol = false;
//       for (let i = 0; i < number.length; i++) {
//         if (!symbol) {
//           for (let row = -1; row < 2; row++) {
//             let rowCheck = index + row;
//             if (rowCheck < 0) {
//               rowCheck = 0;
//             } else if (rowCheck == thisArray.length) {
//               rowCheck = index + 0;
//             }
//             for (let col = -1; col < 2; col++) {
//               let colCheck = startIndex + i + col;
//               if (colCheck < 0) {
//                 colCheck = 0;
//               } else if (colCheck == line.length) {
//                 colCheck = line.length - 1;
//               }
//               check = formattedInput[rowCheck]
//                 .charAt(colCheck)
//                 .match(/[^0-9.]/g);
//               if (check != null) {
//                 if (!symbol) {
//                   //console.log(number);
//                   allSymbols += check;
//                   symbol = true;
//                   sum += parseInt(number);
//                 }
//               }
//             }
//           }
//         }
//       }
//     });
//   }
// });
