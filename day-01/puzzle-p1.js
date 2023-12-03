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
    console.log(`total: ${totalSum}`);
  });
}

function processLine(line, logging = true) {
  const digits = line.match(/\d/g);

  if (digits && digits.length >= 1) {
    const firstDigit = digits[0];
    const lastDigit = digits[digits.length - 1];
    const concatenatedDigits = parseInt(firstDigit + lastDigit, 10);

    if (logging) console.log(`line: ${line} | ${digits}, concatenated digits: ${concatenatedDigits}`);
    
    return concatenatedDigits;
  }
  
  return 0;
}

const filePath = 'input.txt';
readLines(filePath);
