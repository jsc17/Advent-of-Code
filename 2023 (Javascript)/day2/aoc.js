const fs = require("node:fs");
const { format } = require("node:path");
const readline = require("node:readline");

let formattedInput = [];

processLineByLine();

async function processLineByLine() {
  const filestream = fs.createReadStream("input.txt");
  const rl = readline.createInterface({
    input: filestream,
    crlfDelay: Infinity,
  });
  for await (const line of rl) {
    formattedInput.push(line);
  }

  /////// WORK HERE ////////
  let sum = 0;

  formattedInput.forEach((game) => {
    let minRed = 0,
      minGreen = 0,
      minBlue = 0;
    rounds = game.split(":")[1].split(";");
    rounds.forEach((round) => {
      balls = round.split(",");
      balls.forEach((color) => {
        if (color.includes("red")) {
          result = parseInt(color.replaceAll(/[^0-9]/g, ""));
          if (result > minRed) {
            minRed = result;
          }
        } else if (color.includes("green")) {
          result = parseInt(color.replaceAll(/[^0-9]/g, ""));
          if (result > minGreen) {
            minGreen = result;
          }
        } else {
          result = parseInt(color.replaceAll(/[^0-9]/g, ""));
          if (result > minBlue) {
            minBlue = result;
          }
        }
      });
    });
    let power = minRed * minGreen * minBlue;
    console.log(minRed + " * " + minGreen + " * " + minBlue + " = " + power);
    sum += power;
  });

  console.log(sum);
}

// 2-1 solution

// let sum = 0;
// let red = 12,
//   green = 13,
//   blue = 14;

// formattedInput.forEach((game) => {
//   let possible = true;
//   rounds = game.split(":")[1].split(";");
//   rounds.forEach((round) => {
//     balls = round.split(",");
//     balls.forEach((color) => {
//       if (color.includes("red")) {
//         result = parseInt(color.replaceAll(/[^0-9]/g, ""));
//         if (result > red) {
//           possible = false;
//         }
//       } else if (color.includes("green")) {
//         result = parseInt(color.replaceAll(/[^0-9]/g, ""));
//         if (result > green) {
//           possible = false;
//         }
//       } else {
//         result = parseInt(color.replaceAll(/[^0-9]/g, ""));
//         if (result > blue) {
//           possible = false;
//         }
//       }
//     });
//   });

//   if (possible) {
//     sum += parseInt(game.split(":")[0].split(" ")[1]);
//   }
// });

// console.log(sum);
