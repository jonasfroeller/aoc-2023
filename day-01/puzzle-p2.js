const fs = require('fs');

function readLines(filePath) {
  const readline = require('readline');
  const stream = fs.createReadStream(filePath);
  const rl = readline.createInterface({
    input: stream,
    crlfDelay: Infinity
  });

  let totalSum = 0;

  rl.on('line', (line) => {
    const result = Number(processLine(line));
    totalSum += result;
  });

  rl.on('close', () => {
    console.log(`Total: ${totalSum}`);
  });
}

let lineCount = 1;
function processLine(line, logging = true) {
  const digits = line.match(/\d/g); // get all digits as array
  let firstDigit = "0";
  let lastDigit = "0";

  if (digits) { // only try if there are any digits
    firstDigit = digits[0];
    lastDigit = digits[digits.length - 1];
  }

  const positionOfFirstDigit = line.indexOf(firstDigit);
  const positionOfLastDigit = line.lastIndexOf(lastDigit); // 404 => -1
  let charactersBeforeFirstDigit = line.substring(0, positionOfFirstDigit); 
  let charactersAfterLastDigit = line.substring(positionOfLastDigit, line.length); // -1 => ""
  const digitsSpelledOut = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
  let firstDigitsSpelledOut = charactersBeforeFirstDigit ? (charactersBeforeFirstDigit.match(new RegExp(`${digitsSpelledOut.join('|')}`, "g")) ?? 0) : 0;
  let lastDigitsSpelledOut = charactersAfterLastDigit ? (charactersAfterLastDigit.match(new RegExp(`${digitsSpelledOut.join('|')}`, "g")) ?? 0) : 0;
  let firstDigitSpelledOut = firstDigitsSpelledOut[0] ?? "zero";
  let lastDigitSpelledOut = lastDigitsSpelledOut[0] ?? "zero";

  if (firstDigitSpelledOut != 0 && lastDigitSpelledOut != 0) { // only try if there are spelled out digits
    // check if spelled out digit is farther away than digit
    const MINIMUM_LENGTH = digitsSpelledOut.reduce((shortest, current) => {
      return current.length < shortest ? current.length : shortest;
    }, Infinity); // fancy way of writing three (shortest string in digitsSpelledOut)

    if (charactersBeforeFirstDigit.length >= MINIMUM_LENGTH) {
      if (charactersBeforeFirstDigit.match(new RegExp(`${firstDigitSpelledOut}+`))) {
        firstDigit = String(digitsSpelledOut.indexOf(firstDigitSpelledOut) + 1);
      }
    } else {
      charactersBeforeFirstDigit = -1;
    }

    if (charactersAfterLastDigit.length >= MINIMUM_LENGTH) {
      if (charactersAfterLastDigit.match(new RegExp(`${lastDigitSpelledOut}+`))) {
        lastDigit = String(digitsSpelledOut.indexOf(lastDigitSpelledOut) + 1);
      }
    } else {
      charactersAfterLastDigit = -1;
    }
  }

  // set spelled out digits, if default persisted
  if (firstDigit === "0") firstDigit = String(digitsSpelledOut.indexOf(firstDigitSpelledOut) + 1);
  if (lastDigit === "0") lastDigit = String(digitsSpelledOut.indexOf(lastDigitSpelledOut) + 1);
  
  const concatenatedDigits = parseInt(firstDigit + lastDigit, 10);
  if (logging) console.log(`line ${lineCount}: ${line} | digits: ${digits} | digits as text: ((${charactersBeforeFirstDigit} | ${charactersAfterLastDigit}) => [${firstDigitSpelledOut}, ${lastDigitSpelledOut}]), concatenated digits: ${concatenatedDigits}`);
  lineCount++;
  
  return concatenatedDigits;
}

const filePath = 'input.txt';
readLines(filePath);
