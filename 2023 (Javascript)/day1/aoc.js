const express = require("express");
const app = express();
const port = 3000;

const fs = require("node:fs");
const { format } = require("node:path");
const readline = require("node:readline");

let formattedInput = "";

app.get("/input", (req, res) => {
  res.send(formattedInput);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});

processLineByLine();

async function processLineByLine() {
  const filestream = fs.createReadStream("input.txt");
  const rl = readline.createInterface({
    input: filestream,
    crlfDelay: Infinity,
  });
  for await (const line of rl) {
    formattedInput += line + ",";
  }

  /////// WORK HERE ////////
  let inputArray = formattedInput.split(",");

  inputArray.forEach((element, index, theArray) => {
    let testString = "";
    let resultString = "";

    for (i = 0; i < element.length; i++) {
      testString += element.charAt(i);
      resultString += element.charAt(i);
      if (checkSubstring(testString)) {
        resultString += convertSubstring(testString);
        testString = testString.charAt(testString.length - 1);
      }
    }
    resultString = resultString.replaceAll(/[^0-9]/g, "");
    theArray[index] = resultString;
  });

  console.log(inputArray);
  let sum = 0;

  inputArray.forEach((element) => {
    if (element.length > 0) {
      let digit = element.charAt(0) + element.charAt(element.length - 1);
      // console.log(digit
      sum = sum + parseInt(digit);
    }
  });

  console.log(sum);
}

function checkSubstring(sub) {
  let result = false;
  if (sub.includes("one")) {
    result = true;
  }
  if (sub.includes("two")) {
    result = true;
  }
  if (sub.includes("three")) {
    result = true;
  }
  if (sub.includes("four")) {
    result = true;
  }
  if (sub.includes("five")) {
    result = true;
  }
  if (sub.includes("six")) {
    result = true;
  }
  if (sub.includes("seven")) {
    result = true;
  }
  if (sub.includes("eight")) {
    result = true;
  }
  if (sub.includes("nine")) {
    result = true;
  }
  return result;
}

function convertSubstring(sub) {
  let result;
  if (sub.includes("one")) {
    result = 1;
  }
  if (sub.includes("two")) {
    result = 2;
  }
  if (sub.includes("three")) {
    result = 3;
  }
  if (sub.includes("four")) {
    result = 4;
  }
  if (sub.includes("five")) {
    result = 5;
  }
  if (sub.includes("six")) {
    result = 6;
  }
  if (sub.includes("seven")) {
    result = 7;
  }
  if (sub.includes("eight")) {
    result = 8;
  }
  if (sub.includes("nine")) {
    result = 9;
  }
  return result;
}
